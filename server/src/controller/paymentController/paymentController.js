import httpResponse from '../../util/httpResponse.js';
import responseMessage from '../../constant/responseMessage.js';
import httpError from '../../util/httpError.js';
import quicker from '../../util/quicker.js';
import config from '../../config/config.js';
import Payment from '../../model/paymentModel.js';
import Student from '../../model/studentModel.js';
import crypto from "crypto"
import { razorpayInstance } from '../../config/razorpayConfig.js';

export default {
    initiatePayment: async (req, res, next) => {
        try {

            const studentId = req.authenticatedStudent._id.toString();
            const amount = config.DEFAULT_FEE;
            const timestamp = Date.now().toString().slice(-6);
            const receipt = `rcpt_${studentId.slice(0, 12)}_${timestamp}`.slice(0, 40);


            const order = await quicker.createRazorpayOrder(amount, 'INR', receipt);

            const payment = new Payment({
                studentId,
                orderId: order.id,
                amount,
                currency: 'INR'
            });
            await payment.save();

            return httpResponse(req, res, 200, responseMessage.SUCCESS, {
                orderId: order.id,
                amount,
                currency: 'INR',
                key: config.RAZORPAY_KEY_ID
            });
        } catch (err) {
            console.log(err);

            return httpError(next, err, req, 500);
        }
    },

    verifyPayment: async (req, res, next) => {
        const studentId = req.authenticatedStudent._id;
        try {
            const { paymentId, orderId, signature } = req.body;

            if (!paymentId || !orderId || !signature) {
                return httpError(next, new Error(responseMessage.CUSTOM_MESSAGE('Missing payment details')), req, 400);
            }

            // Manual signature verification
            const generatedSignature = crypto
                .createHmac('sha256', config.RAZORPAY_KEY_SECRET)
                .update(`${orderId}|${paymentId}`)
                .digest('hex');

            if (generatedSignature !== signature) {
                return httpError(next, new Error('Invalid payment signature'), req, 400);
            }

            // Fetch payment details from Razorpay
            const paymentDetails = await razorpayInstance.payments.fetch(paymentId);
            if (paymentDetails.status !== 'captured' || paymentDetails.order_id !== orderId) {
                return httpError(next, new Error('Payment not captured or invalid'), req, 400);
            }

            const payment = await Payment.findOneAndUpdate(
                { orderId, studentId, status: 'PENDING' },
                { paymentId, status: 'SUCCESS' },
                { new: true }
            );

            if (!payment) {
                return httpResponse(req, res, 404, responseMessage.NOT_FOUND('Payment'));
            }

            httpResponse(req, res, 200, responseMessage.SUCCESS, { paymentId, status: 'success' });
        } catch (err) {
            console.log("Error during payment verification:", err);
            httpError(next, err, req, 500);
        }
    }
};