'use client';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { changePassword } from '@/lib/actions/userAction';
import { useRouter } from 'next/navigation';

export default function Form() {
  const router = useRouter();
  const { data: session } = useSession();
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

  // Error Handling
  const [errorOldPassword, setErrorOldPassword] = useState();
  const [errorNewPassword, setErrorNewPassword] = useState();
  const [errorConfirmNewPassword, setErrorConfirmNewPassword] = useState();

  // Message Handling
  const [isLoading, setIsLoading] = useState();
  const [isSuccess, setIsSuccess] = useState();
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (newPassword) {
      if (newPassword.length < 6) {
        setErrorNewPassword('Password must be at least 6 characters');
      } else if (newPassword !== confirmNewPassword) {
        setErrorNewPassword('Password and Confirm password not match');
      } else {
        setErrorNewPassword('');
      }
    }
    if (confirmNewPassword) {
      if (newPassword !== confirmNewPassword) {
        setErrorConfirmNewPassword('Password and Confirm password not match');
      } else {
        setErrorConfirmNewPassword('');
      }
    }

    if (oldPassword) {
      if (oldPassword.length < 6) {
        setErrorOldPassword('Password must be more than 6 characters');
      } else {
        setErrorOldPassword('');
      }
    }
  }, [oldPassword, confirmNewPassword, newPassword]);

  const handleSubmit = async e => {
    e.preventDefault();
    setIsLoading(true);
    if (oldPassword === '' || newPassword === '' || confirmNewPassword === '') {
      if (oldPassword === '') {
        setErrorOldPassword('Old Password is required');
      }
      if (newPassword === '') {
        setErrorNewPassword('New Password is required');
      }
      if (confirmNewPassword === '') {
        setErrorConfirmNewPassword('Confirm New Password is required');
      }

      setIsSuccess(false);
      setMessage('Failed, Any field is required');
      setIsLoading(false);
      return;
    }

    if (errorOldPassword || errorNewPassword || errorConfirmNewPassword) {
      setIsSuccess(false);
      setMessage('Failed, Please check your input');
      setIsLoading(false);
      return;
    }

    if (oldPassword === newPassword) {
      setIsSuccess(false);
      setMessage('Failed, New password must be different from old password');
      setIsLoading(false);
      return;
    }

    const data = {
      oldPassword: oldPassword,
      newPassword: newPassword,
    };

    const res = await changePassword(session?.user?.userId, data);

    if (!res.success) {
      setIsSuccess(false);
      setMessage('Failed, Old password is incorrect');
      setIsLoading(false);
      return;
    }
    setOldPassword('');
    setNewPassword('');
    setConfirmNewPassword('');
    setIsSuccess(true);
    setMessage('Success, Password has been changed');
    setIsLoading(false);
    router.refresh();
  };

  return (
    <div className="p-3 bg-white">
      {message !== '' && (
        <div
          className={`rounded-md py-2 px-3 text-sm text-white flex justify-between gap-x-3 items-center mb-2 ${
            isSuccess ? 'bg-green-600' : 'bg-red-600'
          }`}
        >
          <p>{message}</p>{' '}
          <button className="font-bold text-xl" onClick={() => setMessage('')}>
            X
          </button>
        </div>
      )}
      <form action="" className="space-y-3">
        <div className="mb-5">
          <label className="font-medium">Old Password</label>
          <div className="relative">
            <input
              type={showOldPassword ? 'text' : 'password'}
              name="old_password"
              id="old_password"
              className="bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              placeholder="*******"
              value={oldPassword}
              onChange={e => setOldPassword(e.target.value)}
            />
            {showOldPassword ? (
              <button
                id="toggleOldPasswordFalse"
                type="button"
                className="absolute inset-y-0 right-0 px-3 flex items-center"
                onClick={() => setShowOldPassword(false)}
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
                id="toggleOldPasswordTrue"
                type="button"
                className="absolute inset-y-0 right-0 px-3 flex items-center"
                onClick={() => setShowOldPassword(true)}
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
          {errorOldPassword && (
            <span className="text-red-500 text-sm italic">
              {errorOldPassword}
            </span>
          )}
        </div>
        <div>
          <label className="font-medium">New Password</label>
          <div className="relative">
            <input
              type={showNewPassword ? 'text' : 'password'}
              name="new_password"
              id="new_password"
              className="bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              placeholder="*******"
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
            />
            {showNewPassword ? (
              <button
                id="toggleNewPasswordFalse"
                type="button"
                className="absolute inset-y-0 right-0 px-3 flex items-center"
                onClick={() => setShowNewPassword(false)}
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
                id="toggleNewPasswordTrue"
                type="button"
                className="absolute inset-y-0 right-0 px-3 flex items-center"
                onClick={() => setShowNewPassword(true)}
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
          {errorNewPassword && (
            <span className="text-red-500 text-sm italic">
              {errorNewPassword}
            </span>
          )}
        </div>
        <div>
          <label className="font-medium">Confirm New Password</label>
          <div className="relative">
            <input
              type={showConfirmNewPassword ? 'text' : 'password'}
              name="confirm_new_password"
              id="confirm_new_password"
              className="bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              placeholder="*******"
              value={confirmNewPassword}
              onChange={e => setConfirmNewPassword(e.target.value)}
            />
            {showConfirmNewPassword ? (
              <button
                id="toggleConfirmNewPasswordFalse"
                type="button"
                className="absolute inset-y-0 right-0 px-3 flex items-center"
                onClick={() => setShowConfirmNewPassword(false)}
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
                id="toggleConfirmNewPasswordTrue"
                type="button"
                className="absolute inset-y-0 right-0 px-3 flex items-center"
                onClick={() => setShowConfirmNewPassword(true)}
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
          {errorConfirmNewPassword && (
            <span className="text-red-500 text-sm italic">
              {errorConfirmNewPassword}
            </span>
          )}
        </div>

        <button
          disabled={isLoading}
          className="w-full bg-blue-500 text-white py-2 rounded"
          onClick={handleSubmit}
        >
          {isLoading ? 'Loading...' : 'Submit'}
        </button>
      </form>
    </div>
  );
}
