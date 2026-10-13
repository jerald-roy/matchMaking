'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { HeartHandshake } from 'lucide-react'; 


export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();
     router.push('/dashboard');
    // Functional credential check
    // if (email === 'matchmaker@company.com' && password === 'secret123') {
    //   router.push('/dashboard');
    // } else {
    //   setError('Invalid credentials. Try matchmaker@company.com / secret123');
    // }
  };

  return (
    <div className="w-full min-h-screen bg-[#F4F5F7] flex items-center justify-center p-0 md:p-6 font-sans antialiased overflow-x-hidden">
      {/* Outer Card Container */}
      <div className="w-full max-w-[1560px] h-full md:min-h-[88vh] my-auto bg-white rounded-none md:rounded-2xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2 ">
        
        {/* Left Column - Form */}
        <div className="flex flex-col justify-center p-8 md:p-16 lg:p-20">
          <div>
            {/* Logo */}
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 bg-[#ffe853] rounded-full flex items-center justify-center shadow-sm">
                <HeartHandshake className="w-6 h-6 text-black" />
              </div>
            </div>

            {/* Heading */}
            <h1 className="text-2xl font-bold text-center mb-6 text-gray-900 tracking-tight">
              Join Matchmaker Portal
            </h1>

            {/* login heading */}
            <div className="flex  p-2 rounded-lg mb-6 max-w-[100px] mx-auto">
              <button
                type="button"
                className="flex-1 py-1.5 text-sm font-semibold rounded-md bg-[#222222] text-white shadow-sm"
              >
                Log In
              </button>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-4 p-2.5 bg-red-50 border border-red-200 text-red-600 text-xs rounded-md">
                {error}
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleLogin} className="space-y-4">
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Email address
                </label>
                <input
                  type="email"
                  value={email || ''}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="matchmaker@company.com"
                  required
                  className="w-full px-3.5 py-2.5 bg-gray-100 text-gray-900 text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-[#ffe853] border border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password || ''}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="secret123"
                    required
                    className="w-full px-3.5 py-2.5 bg-gray-100 text-gray-900 text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-[#ffe853] border border-transparent pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {showPassword ? (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858-5.908a10.016 10.016 0 011.682-.063c4.478 0 8.268 2.943 9.542 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21M3 3l18 18" />
                      ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      )}
                    </svg>
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between text-[11px] text-gray-500 pt-1">
                <label className="flex items-center gap-1.5 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded border-gray-300 text-[#ffe853] focus:ring-[#ffe853]"
                  />
                  Remember Me
                </label>
                <a href="#" className="hover:underline text-gray-600">
                  Forgot Password?
                </a>
              </div>

              {/* Yellow Submit Button */}
              <button
                type="submit"
                className="w-full py-2.5 bg-[#ffe853] hover:bg-[#ebd33f] text-gray-900 font-bold text-xs rounded-md transition-colors shadow-sm mt-2"
              >
                Log In
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-6 text-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200 border-dashed" />
              </div>
              <span className="relative bg-white px-2 text-[10px] text-gray-400 tracking-wider">
                Or Log In with
              </span>
            </div>

            {/* Non-functional Social Buttons */}
            <div className="space-y-2">
              <button
                type="button"
                className="w-full py-2 px-4 border border-gray-200 rounded-md flex items-center justify-center gap-2 text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
                Continue with Google
              </button>

              <button
                type="button"
                className="w-full py-2 px-4 border border-gray-200 rounded-md flex items-center justify-center gap-2 text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <svg className="w-4 h-4 fill-current text-black" viewBox="0 0 24 24">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.32c.62-.75 1.04-1.8 0.93-2.85-.9.04-2 .6-2.64 1.35-.57.66-1.07 1.73-.93 2.76 1.01.08 2.02-.51 2.64-1.26z" />
                </svg>
                Continue with Apple
              </button>
            </div>
          </div>

          {/* Footer Info */}
          <div className="mt-6 space-y-3">

            <p className="text-[10px] text-gray-400 leading-tight">
              By creating account, you agree to our <a href="#" className="underline">Terms of Service</a> and <a href="#" className="underline">Privacy Policy</a>
            </p>
          </div>
        </div>

        {/* Right Column - Image Panel */}
        <div className="hidden md:block relative bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop')" }}>
         
        </div>

      </div>
    </div>
  );
}