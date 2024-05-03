'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function SubmitProjectCompetition({ params }) {
  const router = useRouter();
  useEffect(() => {
    router.push('/competition/detail/' + params.id + '/' + params.teamId);
  }, []);
  return (
    <div className="col-span-5 flex flex-col gap-3">
      <div className="bg-white rounded p-3">
        <p>Loading...</p>{' '}
      </div>
    </div>
  );
}
