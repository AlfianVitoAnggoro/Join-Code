'use client';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';
import {
  verificationUser,
  checkEmailVerified,
  resendVerificationEmail,
} from '@/lib/actions/authAction';
import { useRouter } from 'next/navigation';

export default function Page() {
  const searchParams = useSearchParams();
  const email = searchParams.get('email');
  const token = searchParams.get('token');
  const router = useRouter();
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isAvailableEmail, setIsAvailableEmail] = useState(false);
  const [statusVerificationEmail, setStatusVerificationEmail] = useState();
  const [isClickVerifyEmail, setIsClickVerifyEmail] = useState(false);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState();

  useEffect(() => {
    const checkEmail = async () => {
      if (email) {
        const user = await checkEmailVerified(email);
        if (!user.success) {
          setIsAvailableEmail(false);
        } else {
          setIsAvailableEmail(true);
          if (!user.data.isEmailVerified) {
            setIsEmailVerified(false);
          } else {
            setIsEmailVerified(true);
          }
        }
      }
    };
    checkEmail();
    setLoading(false);
  }, [email]);

  const handleVerifyEmail = async () => {
    setLoading(true);
    if (email && token) {
      const data = {
        email: email,
        token: token,
      };
      try {
        const res = await verificationUser(data);
        if (!res.success) {
          setStatusVerificationEmail(false);
          setSuccess(false);
          setMessage('Failed, Email and Token is not valid or expired');
        } else {
          setStatusVerificationEmail(true);
          setSuccess(true);
          setMessage('Success, Your Email Has been verified');
          setTimeout(() => {
            router.push('/login');
          }, 2000); // Navigate to login after 3 seconds
        }
      } catch (error) {
        console.error('Verification error:', error);
        setStatusVerificationEmail(false);
        setSuccess(false);
        setMessage('Failed to verify email');
      }
    }
    setIsClickVerifyEmail(true);
    setLoading(false);
  };

  const handlerResendVerifyEmail = async () => {
    setLoading(true);
    if ((email, token)) {
      const data = {
        email: email,
        token: token,
      };
      const res = await resendVerificationEmail(data);
      if (!res.success) {
        setSuccess(false);
        setMessage('Failed, email or token is invalid');
      } else {
        setSuccess(true);
        setMessage('Success, resend verification email has been sent');
      }
    }
    setLoading(false);
  };
  return (
    <div className="relative">
      <div className="max-w-[1024px] min-h-screen max-h-fit mx-auto px-10 flex flex-col justify-center items-center">
        {message != '' && (
          <div
            className={`rounded-md ${
              success ? 'bg-green-600' : 'bg-red-600'
            } py-2 px-3 text-sm text-white flex justify-between gap-x-3 items-center mb-2`}
          >
            <p className="text-wrap">{message}</p>{' '}
            <button
              className="font-bold text-xl"
              onClick={() => setMessage('')}
            >
              X
            </button>
          </div>
        )}
        <Suspense fallback={<div>Loading...</div>}>
          {loading && <h1>Loading...</h1>}
          {!loading && !isAvailableEmail && (
            <h1>Email has not been registered </h1>
          )}
          {!loading && isAvailableEmail && isEmailVerified && (
            <h1>Email has been verified</h1>
          )}
          {!loading &&
            isAvailableEmail &&
            !isEmailVerified &&
            !isClickVerifyEmail && (
              <div className="flex flex-col gap-y-2 justify-center items-center">
                <h1>Click the button below for verify email</h1>
                <button
                  className="bg-blue-500 hover:bg-blue-700 font-semibold text-white py-2 px-4 rounded w-max"
                  onClick={handleVerifyEmail}
                >
                  Verify Email
                </button>
              </div>
            )}
          {!loading &&
            isAvailableEmail &&
            !isEmailVerified &&
            isClickVerifyEmail &&
            !statusVerificationEmail && (
              <div className="flex flex-col gap-y-2 justify-center items-center">
                <h1>Click the button below for resend verify email</h1>
                <button
                  className="bg-yellow-500 hover:bg-yellow-700 font-semibold text-white py-2 px-4 rounded w-max"
                  onClick={handlerResendVerifyEmail}
                >
                  Resend Verify Email
                </button>
              </div>
            )}
        </Suspense>
      </div>
    </div>
  );
}
