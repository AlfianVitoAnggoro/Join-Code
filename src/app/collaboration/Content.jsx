'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getSoftwareDevelopers } from '@/lib/actions/softwareDeveloperAction';

export default function Content() {
  const [softwareDevelopersData, setSoftwareDevelopersData] = useState([]);
  const [softwareDevelopers, setSoftwareDevelopers] = useState([]);
  const [statusFetchData, setStatusFetchData] = useState(false);
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const getSoftwareDevelopersData = async () => {
      const res = await getSoftwareDevelopers();
      if (res?.success) {
        const softwareDevelopers = res?.data;
        setSoftwareDevelopersData(softwareDevelopers);
        setStatusFetchData(true);
      } else {
        setSoftwareDevelopersData([]);
        setStatusFetchData(false);
      }
      setIsLoading(false);
    };
    getSoftwareDevelopersData();
  }, []);

  useEffect(() => {
    if (search == '') {
      setSoftwareDevelopers(softwareDevelopersData);
    } else {
      const filtered = softwareDevelopersData?.filter(softwareDeveloper => {
        const userNameMatch = softwareDeveloper?.user?.name
          .toLowerCase()
          .includes(search.toLowerCase());
        const skillNameMatch = softwareDeveloper?.skills?.some(skill =>
          skill.skill.name.toLowerCase().includes(search.toLowerCase()),
        );
        const badgeNameMatch = softwareDeveloper?.badge?.name
          .toLowerCase()
          .includes(search.toLowerCase());

        return userNameMatch || skillNameMatch || badgeNameMatch;
      });
      setSoftwareDevelopers(filtered);
    }
  }, [search, softwareDevelopersData]);

  return (
    <div className="flex flex-col gap-3">
      {/* Header */}
      <div className="bg-white h-fit rounded px-3 py-5">
        <h1 className="text-3xl font-bold">Collaboration</h1>
        <div className="mt-3">
          <input
            type="text"
            name="search"
            id="search"
            className="bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 max-w-full tablet:w-96"
            placeholder="Search"
            onChange={e => setSearch(e.target.value)}
          />
        </div>
      </div>
      {/* Card */}
      <div
        className={`grid ${
          softwareDevelopers?.length == 0
            ? 'grid-cols-1'
            : 'grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-3 dekstop:grid-cols-4'
        }  gap-3 rounded border-y border-gray-200`}
      >
        {isLoading && (
          <div className="flex justify-center mt-10">
            <p className="text-neutral-500 text-center text-base italic">
              Loading...
            </p>
          </div>
        )}

        {!isLoading && !statusFetchData && (
          <div className="flex justify-center mt-10">
            <p className="text-neutral-500 text-center text-base italic">
              Failed to load software developers
            </p>
          </div>
        )}
        {!isLoading && statusFetchData && softwareDevelopers?.length == 0 ? (
          <div className="flex justify-center mt-10">
            <p className="text-neutral-500 text-center text-base italic">
              Software Developers are not available for collaboration at this
              time{' '}
            </p>
          </div>
        ) : (
          softwareDevelopers?.map((softwareDeveloper, index) => {
            return (
              <div
                className="bg-white border-2 border-gray-200 rounded-lg hover:shadow-black hover:shadow-md relative w-full"
                key={index}
              >
                <Link
                  href={`/collaboration/${softwareDeveloper?.user?.nickname}`}
                >
                  <div className="w-full h-24 bg-gray-400 rounded-t-lg">
                    <Image
                      width={50}
                      height={50}
                      src="/images/login.svg"
                      alt={softwareDeveloper?.user?.name}
                      priority
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {softwareDeveloper?.statusCollaboration && (
                    <div className="absolute top-0 left-0 bg-green-700 text-white p-1 px-2 rounded">
                      <p className="text-xs">#OPENTOCOLLABORATE</p>
                    </div>
                  )}
                  <div className="absolute top-10 left-1/2 transform -translate-x-1/2">
                    <Image
                      width={50}
                      height={50}
                      src={`https://atzxitftejquqppfauyh.supabase.co/storage/v1/object/public/avatars/public/${
                        softwareDeveloper?.user?.avatar || 'default-avatar.png'
                      }`}
                      alt="avatar"
                      priority
                      className="rounded-full w-24 h-24 object-cover bg-neutral-500"
                    />
                  </div>
                  <div className="flex justify-center items-center flex-col mt-12 m-2">
                    <h3 className="font-bold text-center">
                      {softwareDeveloper?.user?.name}
                    </h3>
                    {softwareDeveloper?.skills?.length > 0 ? (
                      <p className="text-xs text-black text-center text-ellipsis overflow-hidden w-52 h-8 mt-1">
                        {softwareDeveloper?.skills
                          .map(skill => skill?.skill?.name)
                          .join(', ')}
                      </p>
                    ) : (
                      <p className="text-xs text-neutral-500 text-center text-ellipsis overflow-hidden w-52 h-8 mt-1 ">
                        Skills have not been available
                      </p>
                    )}
                    <Image
                      src={`https://atzxitftejquqppfauyh.supabase.co/storage/v1/object/public/badges/public/${softwareDeveloper?.badge?.image}`}
                      alt={softwareDeveloper?.badge?.name}
                      width={150}
                      height={150}
                      className="w-16 h-16 object-contain my-1"
                    ></Image>
                  </div>
                </Link>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
