import { Permanent_Marker } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';

const permanent_Marker = Permanent_Marker({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-permanent-marker',
});
export default function Footer() {
  return (
    <div className="relative mb-20 laptop:mb-0">
      <div className="h-max bg-neutral-900 text-white py-10">
        <div className="w-[1024px] mx-auto px-5 flex justify-between items-center gap-3">
          <div className="flex justify-center gap-x-2 items-center">
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
          <div className="flex flex-col justify-center space-y-3">
            <h3>Navigasi</h3>
            <Link href={'/'}>Home</Link>
            <Link href={'/'}>Home</Link>
            <Link href={'/'}>Home</Link>
            <Link href={'/'}>Home</Link>
          </div>
          <div className="flex justify-center items-center">
            <h3>Alfian Vito Anggoro</h3>
          </div>
        </div>
      </div>
    </div>
  );
}
