'use client';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import HeaderCompetition from './header';

export default function Layout({ children }) {
  const disableLayout = ['/competition/browse'];
  disableLayout.push(...['/competition/browse.*']);
  const regexRoutes = disableLayout.map(route => new RegExp(`^${route}$`));
  const shouldDisableLayout = pathname => {
    return regexRoutes.some(regex => regex.test(pathname));
  };

  const disableLayoutDetail = ['/competition/detail'];
  disableLayoutDetail.push(...['/competition/detail.*']);
  const regexRoutesDetail = disableLayoutDetail.map(
    route => new RegExp(`^${route}$`),
  );
  const shouldDisableLayoutDetail = pathname => {
    return regexRoutesDetail.some(regex => regex.test(pathname));
  };
  const pathname = usePathname();
  return (
    <div className="relative min-h-screen py-3 laptop:mt-20">
      <div className="w-[1024px] mx-auto px-10">
        <div className="flex flex-col gap-3">
          {/* Header */}
          {!shouldDisableLayoutDetail(pathname) && <HeaderCompetition />}
          {/* Card */}
          <div className="grid grid-cols-5 gap-x-3">
            <div
              className={`col-span-5 laptop:col-span-2 overflow-scroll flex flex-col h-screen ${
                shouldDisableLayout(pathname) && 'laptop:flex hidden'
              } ${shouldDisableLayoutDetail(pathname) && 'hidden'}`}
            >
              <Link href={'/competition/browse/1'}>
                <div className="grid grid-cols-5 p-3 gap-x-2 bg-white border-2 border-gray-200 rounded-lg hover:bg-sky-100 hover:bg-opacity-40 hover:border-sky-500 w-full cursor-pointer">
                  <div className="col-span-1 flex justify-center items-center">
                    <Image
                      src={'/icon.png'}
                      width={50}
                      height={50}
                      priority
                      className="rounded object-cover w-14 h-14"
                    />
                  </div>
                  <div className="col-span-4">
                    <h2 className="text-md text-black font-bold">
                      Competition Name
                    </h2>
                    <p className="text-sm text-neutral-500">Organisasi Name</p>
                    <div className="flex space-x-2">
                      <p className="text-sm text-neutral-500">
                        Universitas Singaperbangsa Karawang (Offline)
                      </p>
                    </div>
                    <div className="flex justify-between space-x-3">
                      <p className="text-sm text-neutral-500">Group</p>
                      <p className="text-sm text-black font-medium">
                        Rp. 20.000
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
