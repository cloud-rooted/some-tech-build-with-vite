import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, Moon, Sun } from 'lucide-react';

interface AuthProps {
  onAuthSuccess: () => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

function Auth({ onAuthSuccess, isDarkMode, toggleDarkMode }: AuthProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {};
    
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      onAuthSuccess();
    }, 1500);
  };

  const handleGoogleAuth = async () => {
    setIsLoading(true);
    
    // Simulate Google OAuth
    setTimeout(() => {
      setIsLoading(false);
      onAuthSuccess();
    }, 1000);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 flex items-center justify-center py-12 px-4 ${
      isDarkMode ? 'bg-gray-900' : 'bg-[#F9FAFB]'
    }`}>
      {/* Dark Mode Toggle */}
      <div className="absolute top-6 right-6">
        <button
          onClick={toggleDarkMode}
          className={`p-3 rounded-full transition-all duration-300 hover:scale-110 ${
            isDarkMode 
              ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700' 
              : 'bg-white text-gray-600 hover:bg-gray-50 shadow-md'
          }`}
        >
          {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
      </div>

      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className={`text-4xl font-bold mb-2 transition-colors duration-300 ${
            isDarkMode ? 'text-white' : 'text-[#111827]'
          }`}>
            Welcome to RAG.CX
          </h1>
          <p className={`transition-colors duration-300 ${
            isDarkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            {isLogin ? 'Sign in to your account' : 'Create your account'}
          </p>
        </div>

        {/* Auth Card */}
        <div className={`rounded-2xl shadow-lg p-8 transition-colors duration-300 ${
          isDarkMode ? 'bg-gray-800' : 'bg-white'
        }`}>
          {/* Google Auth Button */}
          <button
            onClick={handleGoogleAuth}
            disabled={isLoading}
            className={`w-full flex items-center justify-center space-x-3 py-3 px-4 border rounded-xl font-medium transition-all duration-200 hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed ${
              isDarkMode 
                ? 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600' 
                : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            <span>{isLoading ? 'Signing in...' : `${isLogin ? 'Sign in' : 'Sign up'} with Google`}</span>
          </button>

          {/* Divider */}
          <div className="relative my-6">
            <div className={`absolute inset-0 flex items-center ${
              isDarkMode ? 'text-gray-600' : 'text-gray-300'
            }`}>
              <div className="w-full border-t border-current"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className={`px-2 transition-colors duration-300 ${
                isDarkMode ? 'bg-gray-800 text-gray-400' : 'bg-white text-gray-500'
              }`}>
                Or continue with email
              </span>
            </div>
          </div>

          {/* Email/Password Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Field */}
            <div>
              <div className="relative">
                <Mail className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors duration-300 ${
                  isDarkMode ? 'text-gray-500' : 'text-gray-400'
                }`} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className={`w-full pl-10 pr-4 py-3 border rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#A259FF] focus:border-transparent ${
                    errors.email 
                      ? 'border-red-500' 
                      : isDarkMode 
                        ? 'bg-gray-700 border-gray-600 text-gray-300 placeholder-gray-500' 
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  }`}
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">{errors.email}</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <div className="relative">
                <Lock className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors duration-300 ${
                  isDarkMode ? 'text-gray-500' : 'text-gray-400'
                }`} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className={`w-full pl-10 pr-12 py-3 border rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#A259FF] focus:border-transparent ${
                    errors.password 
                      ? 'border-red-500' 
                      : isDarkMode 
                        ? 'bg-gray-700 border-gray-600 text-gray-300 placeholder-gray-500' 
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={`absolute right-3 top-1/2 transform -translate-y-1/2 transition-colors duration-300 ${
                    isDarkMode ? 'text-gray-500 hover:text-gray-400' : 'text-gray-400 hover:text-gray-600'
                  }`}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-500">{errors.password}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#A259FF] text-white py-3 px-4 rounded-xl font-medium hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-[#A259FF] focus:ring-offset-2 transition-all duration-200 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98]"
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>{isLogin ? 'Signing in...' : 'Creating account...'}</span>
                </div>
              ) : (
                isLogin ? 'Sign In' : 'Create Account'
              )}
            </button>
          </form>

          {/* Toggle Auth Mode */}
          <div className="mt-6 text-center">
            <p className={`text-sm transition-colors duration-300 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <button
                onClick={() => {
                  setIsLogin(!isLogin);
                  setErrors({});
                  setEmail('');
                  setPassword('');
                }}
                className="ml-1 text-[#A259FF] hover:text-purple-700 font-medium transition-colors duration-200"
              >
                {isLogin ? 'Sign up' : 'Sign in'}
              </button>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className={`text-xs transition-colors duration-300 ${
            isDarkMode ? 'text-gray-500' : 'text-gray-400'
          }`}>
            By continuing, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
}

export default Auth;