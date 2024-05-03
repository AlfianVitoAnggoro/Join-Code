'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function RegistrationCompetition({ params }) {
  const router = useRouter();
  useEffect(() => {
    router.push('/competition/browse/' + params.id);
  }, []);

  return (
    <div className="col-span-5 laptop:col-span-3 flex flex-col gap-3">
      <div className="bg-white rounded p-3 h-screen flex justify-center items-center ">
        <p className="text-neutral-500 italic">Loading...</p>
      </div>
    </div>
  );
}
