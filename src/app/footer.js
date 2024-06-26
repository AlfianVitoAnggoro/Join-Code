import { useSession } from 'next-auth/react';
import { Permanent_Marker } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';

const permanent_Marker = Permanent_Marker({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-permanent-marker',
});
export default function Footer() {
  const { status } = useSession();
  return (
    <div className="relative mb-20 laptop:mb-0 bg-neutral-900">
      <div className="h-max max-w-[1024px] mx-auto text-white py-20">
        <div className="mx-auto flex flex-col tablet:flex-row justify-center items-center laptop:justify-between gap-y-10 mb-32 px-2">
          <div className="tablet:w-1/3 flex justify-center gap-x-2 items-center">
            <Image
              src="/icon.png"
              width={50}
              height={50}
              alt="join-code"
              className="w-auto h-20 mr-2"
              priority
            />
            <h4 className={`${permanent_Marker.className} text-3xl text-white`}>
              JOIN CODE
            </h4>
          </div>
          <div className="tablet:w-2/3 px-3">
            <div className="flex flex-wrap justify-center tablet:justify-end items-center gap-x-2 tablet:gap-x-10 gap-y-2 mb-5">
              <Link href={'/'}>Home</Link>
              <Link href={'/collaboration'}>Collaboration</Link>
              <Link href={'/competition'}>Competition</Link>
              {status === 'authenticated' && (
                <Link href={'/leaderboard'}>Leaderboard</Link>
              )}
            </div>
            <div className="flex flex-wrap justify-center tablet:justify-end items-center gap-x-5 ">
              <Link
                href={'https://www.linkedin.com/in/alfianvitoanggoro/'}
                target="_blank"
              >
                <Image
                  src={'/images/icon-linkedin.svg'}
                  width={50}
                  height={50}
                  alt="icon-linkedin"
                  className="w-auto h-8 bg-white object-cover rounded-full"
                />
              </Link>
              <Link
                href={'https://www.instagram.com/atokemen_/'}
                target="_blank"
              >
                <Image
                  src={'/images/icon-instagram.svg'}
                  width={50}
                  height={50}
                  alt="icon-instagram"
                  className="w-auto h-8 bg-white object-cover rounded-full"
                />
              </Link>
              <Link
                href={'https://github.com/AlfianVitoAnggoro'}
                target="_blank"
              >
                <Image
                  src={'/images/icon-github.svg'}
                  width={50}
                  height={50}
                  alt="icon-github"
                  className="w-auto h-8 bg-white object-cover rounded-full"
                />
              </Link>
              <Link href={'mailto:alfianvitoanggoro@gmail.com'} target="_blank">
                <Image
                  src={'/images/icon-gmail.svg'}
                  width={50}
                  height={50}
                  alt="icon-gmail"
                  className="w-auto h-8 bg-white object-cover rounded-full"
                />
              </Link>
            </div>
          </div>
        </div>
        <div className="mx-auto">
          <p className="text-white text-center">
            Copyright © 2024 JOIN CODE Developed by Alfian Vito Anggoro All
            right reserved
          </p>
        </div>
      </div>
    </div>
  );
}
