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

export default function NavbarTop() {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className="bg-white h-20 py-2 border-b-2 border-gray-200 relative laptop:fixed top-0 left-0 right-0 z-50">
      <div className="max-w-[1024px] px-5 mx-auto">
        <div className="h-16 flex justify-between items-center">
          <div className="flex justify-start items-center">
            <Link href={'/'} className="flex justify-center items-center">
              <Image
                src="/icon.png"
                width={50}
                height={50}
                alt="join-code"
                className="w-10 h-10 object-cover mr-2"
                priority
              />
              <h5
                className={`${permanent_Marker.className} text-black text-2xl`}
              >
                JOIN CODE
              </h5>
            </Link>
          </div>
          <div className="hidden laptop:flex justify-between items-center space-x-4">
            <Link
              href="/"
              className={`mr-3 cursor-pointer ${
                pathname === '/' ? 'text-black font-semibold' : 'text-black'
              } hover:bg-gray-200 p-1 rounded`}
            >
              Home
            </Link>
            <Link
              href="/collaboration"
              className={`mr-3 cursor-pointer  ${
                pathname === '/collaboration'
                  ? 'text-black font-semibold'
                  : 'text-black'
              } hover:bg-gray-200 p-1 rounded`}
            >
              Collaboration
            </Link>
            <Link
              href="/competition"
              className={`mr-3 cursor-pointer  ${
                pathname === '/competition'
                  ? 'text-black font-semibold'
                  : 'text-black'
              } hover:bg-gray-200 p-1 rounded`}
            >
              Competition
            </Link>

            <Link
              href="/leaderboard"
              className={`mr-3 cursor-pointer  ${
                pathname === '/leaderboard'
                  ? 'text-black font-semibold'
                  : 'text-black'
              } hover:bg-gray-200 p-1 rounded`}
            >
              Leaderboard
            </Link>
          </div>
          <div className="flex items-center">
            <div className="hidden justify-start items-center">
              <Link
                href={'/login'}
                className="bg-black text-white font-medium px-3 py-2 rounded-full flex justify-start items-center gap-1"
              >
                <Image
                  src={'/images/icon-login.png'}
                  width="50"
                  height="50"
                  priority
                  className="w-5 h-5 object-cover"
                />
                LOGIN
              </Link>
            </div>
            <div className="relative ml-3">
              <div className="flex justify-center items-center gap-3">
                <h4 className="text-black font-semibold text-lg">
                  {session?.user?.fullname || 'Guest'}
                </h4>
                <button
                  type="button"
                  className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  id="user-menu-button"
                  aria-expanded="false"
                  aria-haspopup="true"
                  onClick={() => setIsOpen(!isOpen)}
                >
                  <span className="absolute -inset-1.5"></span>
                  <span className="sr-only">Open user menu</span>
                  <Image
                    className="h-8 w-8 rounded-full object-cover"
                    width={50}
                    height={50}
                    src={'/images/test_avatar.png'}
                    alt="Avatar"
                  />
                </button>
              </div>

              <div
                className={`absolute right-0 z-20 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none ${
                  isOpen ? 'block' : 'hidden'
                }`}
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="user-menu-button"
              >
                <Link
                  href={'/profile/1'}
                  className="block px-4 py-2 text-sm text-black"
                >
                  Your Profile
                </Link>
                <Link
                  href={'/settings/1'}
                  className="block px-4 py-2 text-sm text-black"
                >
                  Settings
                </Link>
                <button
                  className="block px-4 py-2 text-sm text-black cursor-pointer"
                  onClick={() => signOut()}
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
