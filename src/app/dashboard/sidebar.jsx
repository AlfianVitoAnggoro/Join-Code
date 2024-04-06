'use client';
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { Permanent_Marker } from 'next/font/google';

const permanent_Marker = Permanent_Marker({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-permanent-marker',
});

export default function SidebarDashboard() {
  const { data: session, status } = useSession();
  return (
    <div className="flex-none bg-white border-e-2 border-gray-300 w-64 h-screen">
      <div className="p-5 flex flex-col gap-3 justify-center items-center">
        <Image
          src={'/icon.png'}
          width={50}
          height={50}
          alt="join-code"
          className={'w-14 h-auto'}
          priority
        />
        <h3 className={`${permanent_Marker.className} text-2xl font-bold`}>
          Join Code
        </h3>
      </div>
      <div>
        <h3 className="text-sm text-neutral-500 border-y-2 border-neutral-200 px-5 py-3">
          Menu
        </h3>
        <ul className="space-y-3 px-5 py-3 text-md">
          <li>
            <Link href={'/dashboard'}>Dashboard</Link>
          </li>
          {session?.user?.role === 'Admin' && (
            <li>
              <Link href={'/dashboard/users'}>Users</Link>
            </li>
          )}

          <li>
            <Link href={'/dashboard/competitions'}>Competitions</Link>
          </li>
          {session?.user?.role === 'Admin' && (
            <li>
              <Link href={'/dashboard/badges'}>Badges</Link>
            </li>
          )}
        </ul>
        <h3 className="text-sm text-neutral-500 border-y-2 border-neutral-200 px-5 py-3">
          Account
        </h3>
        <ul className="space-y-3 px-5 py-3 text-md">
          <li>
            <Link href={`/dashboard/settings/${session?.user?.nickname}`}>
              Settings
            </Link>
          </li>
          <li>
            <Link href={`/dashboard/settings/change-password`}>
              Change Password
            </Link>
          </li>
          <li>
            <button
              onClick={() =>
                signOut({
                  callbackUrl: `/login`,
                })
              }
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}
