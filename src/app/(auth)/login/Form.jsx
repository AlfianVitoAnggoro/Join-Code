'use client';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { useState } from 'react';

export default function Form() {
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
          callbackUrl?.includes('login')
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
      console.log(err);
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
          <input
            type="password"
            name="password"
            id="password"
            className="bg-gray-50 border border-black text-black sm:text-sm rounded-lg focus:ring-black focus:border-black block w-full p-2.5 "
            placeholder="********"
            required
          />
        </div>

        <button
          disabled={isLoading}
          type="submit"
          className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          {isLoading ? 'Loading...' : 'Login'}
        </button>
        <div className="text-sm text-center font-medium text-gray-500 ">
          Don't have account ? Create account as{' '}
          <div className="flex justify-evenly items-center gap-2">
            <Link
              href="/register/software_developer"
              className="text-blue-700 hover:underline"
            >
              Software Developer
            </Link>
            <Link
              href="/register/organization"
              className="text-blue-700 hover:underline"
            >
              Organization
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}
