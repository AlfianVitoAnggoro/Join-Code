'use client';
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { Permanent_Marker } from 'next/font/google';
import { useState } from 'react';

const permanent_Marker = Permanent_Marker({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-permanent-marker',
  display: 'swap',
  adjustFontFallback: false,
});

export default function SidebarDashboard() {
  const { data: session, status } = useSession();
  const [showSidebar, setShowSidebar] = useState(false);
  const handleShowSidebar = () => {
    if (showSidebar) {
      setShowSidebar(false);
    } else {
      setShowSidebar(true);
    }
  };
  return (
    <>
      <div
        className={`bg-white border-e-2 border-gray-300 fixed z-30 bottom-0 top-0 ${
          showSidebar ? 'fixed left-0 right-0 tablet:w-64 w-full' : '-left-44'
        } transition-all duration-300`}
      >
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
          <ul className="space-y-3 px-5 py-3 text-md overflow-y-auto max-h-52">
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
      <button
        className={`text-5xl fixed bottom-5 rounded-full h-14 w-14 z-30 bg-neutral-500 p-3 text-white hover:bg-black ${
          showSidebar ? 'right-5 tablet:left-72 ' : 'left-5'
        } transition-all duration-300`}
        onClick={handleShowSidebar}
      >
        <div className="flex justify-center items-center ">
          <svg
            className="burger-icon"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3 12H21M3 6H21M3 18H21"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ transition: 'stroke-dashoffset 0.3s ease-in-out' }}
            />
          </svg>
        </div>
      </button>
    </>
  );
}
