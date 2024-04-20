'use client';
import { deleteUser } from '@/lib/actions/userAction';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Form({ slug }) {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState();
  const [message, setMessage] = useState('');

  const handleDelete = async e => {
    e.preventDefault();
    setIsLoading(true);
    const res = await deleteUser(slug);
    if (!res.success) {
      setSuccess(false);
      setMessage('Failed, Something went wrong');
      setIsLoading(false);
      return;
    }
    router.back();
    setIsLoading(false);
  };
  return (
    <div className=" w-full h-full">
      {message !== '' && (
        <div
          className={`rounded-md ${
            success ? 'bg-green-600' : 'bg-red-600'
          } py-2 px-3 text-sm text-white flex justify-between gap-x-3 items-center mb-2`}
        >
          <p className="text-wrap">{message}</p>{' '}
          <button className=" font-bold text-xl" onClick={() => setMessage('')}>
            X
          </button>
        </div>
      )}
      <h3 className="font-bold text-sm text-center my-3">
        Are you sure, you want to delete this data ?
      </h3>
      <div className="flex flex-col tablet:flex-row justify-start gap-3">
        <button
          disabled={isLoading}
          onClick={handleDelete}
          className="w-fit bg-blue-500 text-white p-2 rounded"
        >
          {isLoading ? 'Loading...' : 'Submit'}
        </button>
        <button
          disabled={isLoading}
          onClick={() => router.back()}
          className="w-fit bg-red-500 text-white p-2 rounded"
        >
          {isLoading ? 'Loading...' : 'Cancel'}
        </button>
      </div>
    </div>
  );
}
