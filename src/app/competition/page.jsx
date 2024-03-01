import Image from 'next/image';
import Link from 'next/link';

export default function CompetitionPage() {
  return (
    <div className="hidden col-span-3 laptop:flex flex-col gap-3">
      <div className="bg-white rounded p-3 h-screen flex justify-center items-center ">
        <p className="text-neutral-500">You haven't chosen a competition yet</p>
      </div>
    </div>
  );
}
