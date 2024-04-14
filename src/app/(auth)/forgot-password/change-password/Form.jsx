'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import {
  changePasswordByForgotPassword,
  checkEmailVerified,
} from '@/lib/actions/authAction';

export default function Form() {
  const searchParams = useSearchParams();
  const email = searchParams.get('email');
  const token = searchParams.get('token');

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorPassword, setErrorPassword] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState();
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (password) {
      if (password.length < 6) {
        setErrorPassword('Password must be more than 6 characters');
      } else if (password !== confirmPassword) {
        setErrorPassword('Password and confirm password must be same');
      } else {
        setErrorPassword('');
      }
    }
  }, [password, confirmPassword]);

  const router = useRouter();

  const handleChangePassword = async e => {
    e.preventDefault();
    setIsLoading(true);

    if (password == '' || confirmPassword == '') {
      setSuccess(false);
      setErrorPassword('Password and Confirm Password cannot be empty');
      setMessage('Password cannot be empty');
      setIsLoading(false);
      return;
    }

    if (errorPassword != '') {
      setSuccess(false);
      setMessage('Failed, check your field');
      setIsLoading(false);
      return;
    }

    const res = await checkEmailVerified(email);
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

    const data = {
      email: email,
      token: token,
      newPassword: password,
    };

    const response = await changePasswordByForgotPassword(data);
    if (!response?.success) {
      setSuccess(false);
      setMessage('Failed, Email or token is invalid or expired');
      setIsLoading(false);
      setTimeout(() => {
        router.push('/forgot-password');
      }, 2000);
      return;
    }

    e.target.reset();
    setSuccess(true);
    setMessage('Success, Please check your email for forgot password');
    setIsLoading(false);
    setTimeout(() => {
      router.push('/login');
    }, 2000);
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
      <form className="space-y-6" onSubmit={handleChangePassword}>
        <div>
          <label
            htmlFor="newPassword"
            className="text-sm font-medium text-black block mb-2"
          >
            New Password
          </label>
          <input
            type="password"
            name="newPassword"
            id="newPassword"
            className="bg-gray-50 border border-black text-black sm:text-sm rounded-lg focus:ring-black focus:border-black block w-full p-2.5 "
            placeholder="******"
            onChange={e => setPassword(e.target.value)}
          />
          {errorPassword && (
            <span className="text-red-500 text-sm italic">{errorPassword}</span>
          )}
        </div>
        <div>
          <label
            htmlFor="confirmNewPassword"
            className="text-sm font-medium text-black block mb-2"
          >
            Confirm New Password
          </label>
          <input
            type="password"
            name="confirmNewPassword"
            id="confirmNewPassword"
            className="bg-gray-50 border border-black text-black sm:text-sm rounded-lg focus:ring-black focus:border-black block w-full p-2.5 "
            placeholder="******"
            onChange={e => setConfirmPassword(e.target.value)}
          />
          {errorPassword && (
            <span className="text-red-500 text-sm italic">{errorPassword}</span>
          )}
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
