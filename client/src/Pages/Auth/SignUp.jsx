import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear password error when user starts typing in either password field
    if (name === 'password' || name === 'confirmPassword') {
      setPasswordError('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      setPasswordError('Passwords do not match');
      return;
    }
    
    console.log('Sign Up submitted:', formData);
  };

  return (
    <div className="min-h-screen w-screen flex flex-col md:flex-row">

      <div className="w-full md:w-full p-6 md:p-12 flex flex-col justify-center">
        <div className="max-w-md mx-auto w-full">

          <div className="mb-10">
            <img src="/logo.svg" alt="GoAbroad Logo" className="h-10 w-10" />
          </div>


          <h1 className="text-2xl font-semibold mb-2">Sign Up</h1>
          <p className="text-gray-600 mb-8">Already have an account? <Link to="/login" className="text-primary-1 hover:underline">Login</Link></p>


          <form onSubmit={handleSubmit} className="space-y-6">
           

            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-1/50 focus:border-primary-1"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <button 
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-sm text-gray-500 flex items-center"
                >
                  {showPassword ? 'Hide' : 'Show'}
                  {showPassword ? <EyeOff className="ml-1 h-4 w-4" /> : <Eye className="ml-1 h-4 w-4" />}
                </button>
              </div>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-1/50 focus:border-primary-1"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Password must be at least 8 characters long with a number and a special character.
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                  Confirm Password
                </label>
                <button 
                  type="button" 
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="text-sm text-gray-500 flex items-center"
                >
                  {showConfirmPassword ? 'Hide' : 'Show'}
                  {showConfirmPassword ? <EyeOff className="ml-1 h-4 w-4" /> : <Eye className="ml-1 h-4 w-4" />}
                </button>
              </div>
              <div className="relative">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-1/50 focus:border-primary-1"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
              </div>
              {passwordError && <p className="text-xs text-red-500 mt-1">{passwordError}</p>}
            </div>

            <Button 
              type="submit" 
              className="w-full cursor-pointer bg-primary-1 hover:bg-primary-1/90 text-white py-2 rounded-md transition-colors"
            >
              Sign Up
            </Button>
          </form>


          <div className="mt-8 pt-4 border-t border-gray-200">
            <p className="text-xs text-center text-gray-500">
              By signing up, you agree to GoAbroad&apos;s <a href="#" className="text-primary-1 hover:underline">Terms of Service</a> and <a href="#" className="text-primary-1 hover:underline">Privacy Policy</a>.
            </p>
          </div>
        </div>
      </div>


      <div className="hidden md:block md:w-1/2 bg-gray-900 relative overflow-hidden">
        <img
          src="/auth.png"
          alt="Abstract 3D shapes"
          className="w-full h-screen object-center"
        />
      </div>
    </div>
  );
};

export default SignUp;