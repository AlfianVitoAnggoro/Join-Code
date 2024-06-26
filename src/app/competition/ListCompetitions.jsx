'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { getCompetitionByRegistrationDate } from '@/lib/actions/competitionAction';

export default function ListCompetitions({ children }) {
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

  // Search
  const [competitionsData, setCompetitionsData] = useState([]);
  const [competitions, setCompetitions] = useState(competitionsData);
  const [statusFetchData, setStatusFetchData] = useState(false);
  const [competitionId, setCompetitionId] = useState('');
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getCompetitionsData = async () => {
      const nowDate = new Date();
      const res = await getCompetitionByRegistrationDate(nowDate);
      if (res.success) {
        const data = res.data;
        setCompetitionsData(data);
        setStatusFetchData(true);
      } else {
        setCompetitionsData([]);
        setStatusFetchData(false);
      }
      setIsLoading(false);
    };

    getCompetitionsData();
  }, []);

  useEffect(() => {
    if (shouldDisableLayout(pathname)) {
      const parts = pathname.split('/'); // Membagi path menjadi array berdasarkan tanda '/'
      const competitionId = parts[parts.length - 1];
      setCompetitionId(competitionId);
    }
  }, [pathname]);

  useEffect(() => {
    if (search == '') {
      setCompetitions(competitionsData);
    } else {
      const filtered = competitionsData.filter(competition => {
        const competitionNameMatch = competition?.name
          .toLowerCase()
          .includes(search.toLowerCase());
        const organizationNameMatch = competition?.organization?.user?.name
          .toLowerCase()
          .includes(search.toLowerCase());
        const typeNameMatch = competition?.type?.name
          .toLowerCase()
          .includes(search.toLowerCase());
        const categoryNameMatch = competition?.category?.name
          .toLowerCase()
          .includes(search.toLowerCase());

        return (
          competitionNameMatch ||
          organizationNameMatch ||
          typeNameMatch ||
          categoryNameMatch
        );
      });
      setCompetitions(filtered);
    }
  }, [search, competitionsData]);

  return (
    <div className="flex flex-col gap-3">
      {/* Header */}
      <div className={`bg-white rounded py-5 px-3`}>
        <h1 className="text-3xl font-bold">Competition</h1>
        <div
          className={`mt-3 ${
            shouldDisableLayout(pathname) && 'laptop:flex hidden'
          } ${shouldDisableLayoutDetail(pathname) && 'hidden'}`}
        >
          <input
            type="text"
            name="search"
            id="search"
            className="bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block max-w-full tablet:w-96 p-2.5 "
            placeholder="Search"
            onChange={e => setSearch(e.target.value)}
          />
        </div>
      </div>
      {/* Card */}
      <div className={`grid grid-cols-5 gap-x-3`}>
        <div
          className={`col-span-5 laptop:col-span-2 overflow-scroll flex-col h-screen ${
            shouldDisableLayout(pathname) ? 'hidden laptop:flex' : 'flex'
          } ${shouldDisableLayoutDetail(pathname) && 'hidden'}`}
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
                Failed to load competitions
              </p>
            </div>
          )}
          {!isLoading && statusFetchData && competitions?.length == 0 ? (
            <div className="flex justify-center mt-10">
              <p className="text-neutral-500 text-center text-base italic">
                Competitions are not available at this time{' '}
              </p>
            </div>
          ) : (
            competitions?.map((competition, index) => {
              return (
                <div key={index}>
                  <Link
                    href={`/competition/browse/${competition?.competitionId}`}
                  >
                    <div
                      className={`grid grid-cols-5 p-3 gap-x-2 border-2 rounded-lg bg-white hover:bg-sky-100 hover:bg-opacity-40 hover:border-sky-500 w-full cursor-pointer ${
                        competitionId &&
                        competition?.competitionId == competitionId &&
                        'bg-sky-200 bg-opacity-40 border-sky-500'
                      }`}
                    >
                      <div className="col-span-1 flex justify-center mt-1">
                        <Image
                          src={`https://atzxitftejquqppfauyh.supabase.co/storage/v1/object/public/avatars/public/${
                            competition?.organization?.user?.avatar ||
                            'default-avatar.png'
                          }`}
                          width={50}
                          height={50}
                          priority
                          alt={'avatar'}
                          className="rounded-full object-cover w-14 h-14"
                        />
                      </div>
                      <div className="col-span-4">
                        <h2 className="text-md text-black font-bold">
                          {competition?.name}
                        </h2>
                        <p className="text-sm text-neutral-500">
                          {competition?.organization?.user?.name}
                        </p>
                        <div className="flex space-x-2">
                          <p className="text-sm text-neutral-500">
                            {competition?.place} ({competition?.type?.name})
                          </p>
                        </div>
                        <div className="flex justify-between space-x-3">
                          <p className="text-sm text-neutral-500">
                            {competition?.category?.name}
                          </p>
                          {competition?.registrationFee == 0 ? (
                            <p className="text-sm text-black font-medium">
                              Free
                            </p>
                          ) : (
                            <p className="text-sm text-black font-medium">
                              Rp.{' '}
                              {competition?.registrationFee.toLocaleString(
                                'id-ID',
                              )}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })
          )}
        </div>
        {children}
      </div>
    </div>
  );
}
