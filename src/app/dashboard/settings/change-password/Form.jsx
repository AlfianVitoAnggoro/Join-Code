'use client';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { changePassword } from '@/lib/actions/userAction';
import { useRouter } from 'next/navigation';

export default function Form() {
  const router = useRouter();
  const { data: session } = useSession();
  const [oldPassword, setOldPassword] = useState();
  const [newPassword, setNewPassword] = useState();
  const [confirmNewPassword, setConfirmNewPassword] = useState();

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
  }, [confirmNewPassword, newPassword]);

  const handleSubmit = async e => {
    e.preventDefault();

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

    setIsLoading(true);
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
          <input
            type="password"
            name="old_password"
            id="old_password"
            className="bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            placeholder="*******"
            onChange={e => setOldPassword(e.target.value)}
          />
          {errorOldPassword && (
            <span className="text-red-500 text-sm italic">
              {errorOldPassword}
            </span>
          )}
        </div>
        <div>
          <label className="font-medium">New Password</label>
          <input
            type="password"
            name="new_password"
            id="new_password"
            className="bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            placeholder="*******"
            onChange={e => setNewPassword(e.target.value)}
          />
          {errorNewPassword && (
            <span className="text-red-500 text-sm italic">
              {errorNewPassword}
            </span>
          )}
        </div>
        <div>
          <label className="font-medium">Confirm New Password</label>
          <input
            type="password"
            name="confirm_new_password"
            id="confirm_new_password"
            className="bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            placeholder="*******"
            onChange={e => setConfirmNewPassword(e.target.value)}
          />
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
