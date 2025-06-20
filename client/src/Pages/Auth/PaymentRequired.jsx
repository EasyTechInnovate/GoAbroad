import { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { apiService } from '@/services/api.services';
import { getUser, clearAuth } from '@/lib/auth';
import { toast } from 'sonner';
import { useRazorpay } from '@/hooks/use-razorpay';
import Cookies from 'js-cookie';

const PaymentRequired = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(5);
  const [loading, setLoading] = useState(false);
  const user = getUser();
  const razorpayLoaded = useRazorpay();

  const handleProceed = useCallback(async () => {
    if (loading || !razorpayLoaded) return;
    
    try {
      setLoading(true);
        // Initialize payment
      const response = await apiService.post('/payment/initiate');
      
      // If fee is already paid, clear auth and redirect to login to refresh user data
      if (response.message === 'Already Fee Paid') {
        toast.success('Payment already completed! Redirecting to login...');
        clearAuth();
        navigate('/login');
        return;
      }
      
      if (!response.data?.orderId || !response.data?.key) {
        throw new Error('Invalid payment details received');
      }

      const options = {
        key: response.data.key,
        amount: response.data.amount,
        currency: response.data.currency || 'INR',
        name: 'GoAbroad',
        description: 'Registration Fee',
        order_id: response.data.orderId,
        prefill: {
          name: user?.name || '',
          email: user?.email || '',
          contact: user?.phoneNumber || ''
        },
        handler: async function (response) {
          try {
            const verifyResponse = await apiService.post('/payment/verify', {
              paymentId: response.razorpay_payment_id,
              orderId: response.razorpay_order_id,
              signature: response.razorpay_signature
            });            
            if (verifyResponse.success) {
              toast.success('Payment successful! Please log in again.');

              localStorage.removeItem('user');
              localStorage.removeItem('authToken');
              Cookies.remove('accessToken');
              navigate('/login');
            } else {
              throw new Error('Payment verification failed');
            }
          } catch (error) {
            console.error('Payment verification failed:', error);
            toast.error('Payment verification failed. Please contact support.');
          }
        },        modal: {
          ondismiss: function() {
            setLoading(false);

            setCountdown(5);
          }
        }
      };      const razorpay = new window.Razorpay(options);
      razorpay.on('payment.failed', function () {
        toast.error('Payment failed');
        setLoading(false);
        navigate('/auth/payment-failed');
      });
      razorpay.open();
    } catch (error) {
      console.error('Payment initiation failed:', error);
      toast.error(error.message || 'Failed to initiate payment. Please try again.');
      setLoading(false);
    }
  }, [loading, navigate, user, razorpayLoaded]);

  useEffect(() => {
    if (!user) {
      navigate('/auth/login');
      return;
    }

    // If user is already verified and has paid, redirect to dashboard
    if (user.isVerified && user.isFeePaid) {
      clearAuth(); // Clear auth to ensure fresh data
      navigate('/login'); // Redirect to login to get fresh user data
      return;
    }

    let timer;
    // Only start countdown if payment is actually needed
    if (!user.isFeePaid) {
      if (countdown > 0 && razorpayLoaded) {
        timer = setInterval(() => setCountdown(c => c - 1), 1000);
      } else if (countdown === 0 && !loading && razorpayLoaded) {
        handleProceed();
      }
    }

    // Cleanup function to prevent memory leaks and stop polling
    return () => {
      if (timer) clearInterval(timer);
      // Clean up any existing Razorpay instances
      if (window.Razorpay && window.Razorpay.cleanup) {
        window.Razorpay.cleanup();
      }
    };
  }, [countdown, user, navigate, loading, handleProceed, razorpayLoaded]);

  if (!razorpayLoaded) {
    return (
      <div className="container mx-auto p-8 text-center">
        <h1 className="text-2xl font-semibold mb-4">Loading Payment Gateway...</h1>
        <p className="text-gray-600">Please wait while we set up the payment system.</p>
      </div>
    );
  }

  if (user?.isFeePaid && !user?.isVerified) {
    return (
      <div className="container mx-auto p-8 text-center">
        <h1 className="text-2xl font-semibold mb-4">Verification Pending</h1>
        <p className="text-gray-600 mb-4">
          Your payment has been received. Our team will verify your details shortly.
        </p>
        <p className="text-gray-600 mb-4">
          For any queries, please contact our support team at support@goabroad.com
        </p>
        <Button asChild variant="outline">
          <Link to="/auth/login">Back to Login</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-8 text-center">
      <h1 className="text-2xl font-semibold mb-4">Payment Required</h1>
      <p className="text-gray-600 mb-4">
        To access the dashboard, you need to complete the registration payment.
      </p>
      <p className="text-gray-600 mb-4">
        You will be redirected to the payment page in {countdown} seconds.
      </p>
      <Button 
        onClick={handleProceed} 
        disabled={loading}
        className="min-w-[200px]"
      >
        {loading ? 'Processing...' : 'Proceed to Payment'}
      </Button>
    </div>
  );
};

export default PaymentRequired;
