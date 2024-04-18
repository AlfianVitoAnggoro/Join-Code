'use client';
import { deleteTeamCompetition } from '@/lib/actions/teamCompetitionAction';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Form({ competitionId, teamId }) {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState();
  const [message, setMessage] = useState('');

  const handleDelete = async e => {
    e.preventDefault();
    setIsLoading(true);
    const res = await deleteTeamCompetition(competitionId, teamId);
    if (!res.success) {
      setSuccess(false);
      setMessage('Failed, Something went wrong');
      setIsLoading(false);
      return;
    }
    router.push(`/dashboard/competitions/detail/${competitionId}`);
    router.refresh();
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
        Are you sure, you want to delete this team ?
      </h3>
      <div className="flex gap-5 justify-center tablet:justify-end items-center">
        <button
          disabled={isLoading}
          className="px-2 py-1 bg-blue-600 text-white rounded"
          onClick={handleDelete}
        >
          Yes
        </button>
        <button
          disabled={isLoading}
          className="px-2 py-1 bg-red-600 text-white rounded"
          onClick={() => router.back()}
        >
          No
        </button>
      </div>
    </div>
  );
}
