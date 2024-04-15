'use client';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { useState } from 'react';

export default function Form() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [popUp, setPopUp] = useState(false);
  const [success, setSuccess] = useState();
  const [message, setMessage] = useState();
  const params = useSearchParams();
  const router = useRouter();
  const callbackUrl = params.get('callbackUrl') || '/';

  const handleLogin = async e => {
    e.preventDefault();
    setSuccess();
    setMessage('');
    setIsLoading(true);
    try {
      const res = await signIn('credentials', {
        redirect: false,
        email: e.target.email.value,
        password: e.target.password.value,
        callbackUrl: callbackUrl,
      });

      if (!res?.error) {
        if (
          callbackUrl?.includes('register') ||
          callbackUrl?.includes('login') ||
          callbackUrl?.includes('forgot-password')
        ) {
          e.target.reset();
          router.push('/');
          setIsLoading(false);
          return;
        }
        router.push(callbackUrl);
      } else {
        setPopUp(true);
        setSuccess(false);
        setMessage(res.error);
        setIsLoading(false);
      }
    } catch (err) {
      setMessage(err);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="w-3/6 bg-white shadow-md border border-gray-200 rounded-e-sm p-4 sm:p-6 lg:p-8 my-5">
      {popUp && !success && (
        <div className="rounded-md bg-red-600 py-2 px-3 text-sm text-white flex justify-between items-center mb-2">
          <p className="text-wrap">{message}</p>{' '}
          <button
            className=" font-bold text-xl"
            onClick={() => setPopUp(false)}
          >
            X
          </button>
        </div>
      )}
      {popUp && success && (
        <div className="rounded-md bg-green-600 py-2 px-3 text-sm text-white flex justify-between items-center mb-2">
          <p className="text-wrap">{message}</p>{' '}
          <button
            className=" font-bold text-2xl"
            onClick={() => setPopUp(false)}
          >
            X
          </button>
        </div>
      )}
      <form className="space-y-6" onSubmit={handleLogin}>
        <h3 className="text-xl font-medium text-black">
          Sign in to our platform
        </h3>
        <div>
          <label
            htmlFor="email"
            className="text-sm font-medium text-black block mb-2"
          >
            Your email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="bg-gray-50 border border-black text-black sm:text-sm rounded-lg focus:ring-black focus:border-black block w-full p-2.5 "
            placeholder="name@gmail.com"
            required
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="text-sm font-medium text-black block mb-2"
          >
            Your Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              id="password"
              className="bg-gray-50 border border-black text-black sm:text-sm rounded-lg focus:ring-black focus:border-black block w-full p-2.5 "
              placeholder="********"
              required
            />
            {showPassword ? (
              <button
                id="togglePassword"
                type="button"
                className="absolute inset-y-0 right-0 px-3 flex items-center"
                onClick={() => setShowPassword(false)}
              >
                <svg
                  id="eyeIcon"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M2 12s3-8 10-8 10 8 10 8-3 8-10 8-10-8-10-8z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6"
                    transform="rotate(-90 12 12)"
                  />
                </svg>
              </button>
            ) : (
              <button
                id="togglePassword"
                type="button"
                className="absolute inset-y-0 right-0 px-3 flex items-center"
                onClick={() => setShowPassword(true)}
              >
                <svg
                  id="eyeIcon"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M2 12s3-8 10-8 10 8 10 8-3 8-10 8-10-8-10-8z"
                  />
                </svg>
              </button>
            )}
          </div>
        </div>

        <button
          disabled={isLoading}
          type="submit"
          className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          {isLoading ? 'Loading...' : 'Login'}
        </button>
      </form>
      <div className="text-sm font-medium text-gray-500 flex gap-1 my-2">
        Create account as{' '}
        <Link
          href="/register/software_developer"
          className="text-blue-700 hover:underline"
        >
          Software Developer
        </Link>
        <span>or</span>
        <Link
          href="/register/organization"
          className="text-blue-700 hover:underline"
        >
          Organization
        </Link>
      </div>
      <div className="my-2">
        <Link
          href={'/forgot-password'}
          className="text-blue-700 font-medium hover:underline text-sm text-center"
        >
          Forgot password?
        </Link>
      </div>
    </div>
  );
}
