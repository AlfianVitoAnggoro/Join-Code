'use client';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
export default function Sidebar() {
  const { data: session } = useSession();
  const pathname = usePathname();

  return (
    <div className="col-span-9 laptop:col-span-3 space-y-2 bg-white rounded p-3 h-max">
      <h1 className="text-3xl font-semibold mb-5">Settings</h1>
      <div className="flex w-full justify-between items-center laptop:flex-col laptop:space-y-2">
        <Link
          href={`/settings/profile/${session?.user?.nickname}`}
          className={` p-3 rounded w-full flex justify-center laptop:justify-start items-center gap-3 ${
            pathname.startsWith('/settings/profile')
              ? 'bg-blue-500 text-white'
              : 'text-black bg-gray-300'
          }`}
        >
          <Image
            src={'/images/icons-profile-settings.png'}
            width={50}
            height={50}
            alt="join-code"
            priority
            className="object-cover w-8 h-8 rounded"
          />
          <h3>Profile</h3>
        </Link>
        <Link
          href={`/settings/change-password/${session?.user?.nickname}`}
          className={` p-3 rounded w-full flex justify-center laptop:justify-start items-center gap-3 ${
            pathname.startsWith('/settings/change-password')
              ? 'bg-blue-500 text-white'
              : 'text-black bg-gray-300'
          }`}
        >
          <Image
            src={'/images/icons-change-password.png'}
            width={50}
            height={50}
            alt="join-code"
            priority
            className="object-cover w-8 h-8 rounded"
          />
          <h3>Change Password</h3>
        </Link>
      </div>
    </div>
  );
}
