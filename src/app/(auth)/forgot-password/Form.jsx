'use client';
import Link from 'next/link';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { forgotPassword, checkEmailVerified } from '@/lib/actions/authAction';

export default function Form() {
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState();
  const [message, setMessage] = useState('');

  const handleForgotPassword = async e => {
    e.preventDefault();
    setIsLoading(true);
    const res = await checkEmailVerified(e.target.email.value);
    if (!res.success) {
      setSuccess(false);
      setMessage('Failed, email is not found');
      setIsLoading(false);
      return;
    }

    if (!res?.data?.isEmailVerified) {
      setSuccess(false);
      setMessage('Failed, email have not been verified');
      setIsLoading(false);
      return;
    }
    const response = await forgotPassword(e.target.email.value);

    if (!response.success) {
      setSuccess(false);
      setMessage('Failed, Something went wrong');
      setIsLoading(false);
      return;
    }

    setSuccess(true);
    setMessage('Success, Please check your email for forgot password');
    setIsLoading(false);
    return;
  };
  return (
    <div className="w-3/6 bg-white shadow-md border border-gray-200 rounded-e-sm p-4 sm:p-6 lg:p-8 my-5">
      <h3 className="text-xl font-medium text-black my-3">Forgot Password</h3>
      {message != '' && (
        <div
          className={`rounded-md ${
            success ? 'bg-green-600' : 'bg-red-600'
          } py-2 px-3 text-sm text-white flex justify-between items-center mb-2`}
        >
          <p className="text-wrap">{message}</p>{' '}
          <button
            className=" font-bold text-2xl"
            onClick={() => setMessage('')}
          >
            X
          </button>
        </div>
      )}
      <form className="space-y-6" onSubmit={handleForgotPassword}>
        <div>
          <label
            htmlFor="email"
            className="text-sm font-medium text-black block mb-2"
          >
            Your Email
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
        <button
          disabled={isLoading}
          type="submit"
          className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          {isLoading ? 'Loading...' : 'Submit'}
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
      <div className="text-sm font-medium text-gray-500 my-2">
        Do you have an account?{' '}
        <button
          onClick={() => signIn()}
          className="text-blue-700 hover:underline "
        >
          Signin
        </button>
      </div>
    </div>
  );
}
