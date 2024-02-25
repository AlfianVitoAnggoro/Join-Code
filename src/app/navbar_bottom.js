'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signIn, useSession, signOut } from 'next-auth/react';
import Image from 'next/image';
import { Permanent_Marker } from 'next/font/google';
import { useState } from 'react';

const permanent_Marker = Permanent_Marker({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-permanent-marker',
});

export default function NavbarBottom() {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="h-20 py-2 bg-white border-b-2 border-gray-200 fixed w-full bottom-0 left-0 z-50 laptop:hidden">
      <div className="max-w-[1024px] px-5 mx-auto">
        <div className="flex justify-between items-center h-16">
          <Link
            href="/"
            className={`${
              pathname === '/' ? 'text-black font-semibold' : 'text-black'
            } hover:bg-gray-200 p-1 rounded flex flex-col justify-center items-center w-36`}
          >
            <Image
              src="/images/icon-home.svg"
              width={50}
              height={50}
              alt="join-code"
              className="w-6 h-6 object-cover"
              priority
            />
            <p>Home</p>
          </Link>
          <Link
            href="/collaboration"
            className={`${
              pathname === '/collaboration'
                ? 'text-black font-semibold'
                : 'text-black'
            } hover:bg-gray-200 p-1 rounded flex flex-col justify-center items-center w-36`}
          >
            <Image
              src="/images/icon-collaboration.png"
              width={50}
              height={50}
              alt="join-code"
              className="w-6 h-6 object-cover"
              priority
            />
            <p>Collaboration</p>
          </Link>
          <Link
            href="/competition"
            className={`${
              pathname === '/competition'
                ? 'text-black font-semibold'
                : 'text-black'
            } hover:bg-gray-200 p-1 rounded flex flex-col justify-center items-center w-36`}
          >
            <Image
              src="/images/icon-competition.png"
              width={50}
              height={50}
              alt="join-code"
              className="w-6 h-6 object-cover"
              priority
            />
            <p>Competition</p>
          </Link>

          <Link
            href="/leaderboard"
            className={`${
              pathname === '/leaderboard'
                ? 'text-black font-semibold'
                : 'text-black'
            } hover:bg-gray-200 p-1 rounded flex flex-col justify-center items-center w-36`}
          >
            <Image
              src="/images/icon-leaderboard.png"
              width={50}
              height={50}
              alt="leaderboard"
              className="w-6 h-6 object-cover"
              priority
            />
            <p>Leaderboard</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
