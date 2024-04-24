'use client';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { getLeaderboardFilterByDate } from '@/lib/actions/leaderboardAction';

export default function Table() {
  const { data: session, status } = useSession();
  const [leaderboard, setLeaderboard] = useState({});
  const [userLoginLeaderboard, setUserLoginLeaderboard] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getLeaderboardData = async () => {
      const nowDate = new Date();

      const response = await getLeaderboardFilterByDate(nowDate);

      if (response.success) {
        const data = response.data;
        setLeaderboard(data);
      } else {
        setLeaderboard({});
      }
      setIsLoading(false);
    };

    getLeaderboardData();
  }, []);

  useEffect(() => {
    if (session && status === 'authenticated') {
      const userLoginLeaderboardFilter = leaderboard?.softwareDevelopers?.find(
        softwareDeveloper =>
          softwareDeveloper?.softwareDeveloper?.user?.nickname ===
          session?.user?.nickname,
      );
      const sortedLeaderboard = leaderboard?.softwareDevelopers?.sort(
        (a, b) => b?.point_leaderboard - a?.point_leaderboard,
      );

      // Temukan data pengguna berdasarkan softwareDeveloperId
      const targetUserIndex = sortedLeaderboard?.findIndex(
        softwareDeveloper =>
          softwareDeveloper?.softwareDeveloper?.user?.nickname ===
          session?.user?.nickname,
      );

      // Jika data pengguna ditemukan, hitung peringkatnya
      if (targetUserIndex !== -1) {
        const ranking = targetUserIndex + 1; // Peringkat dimulai dari 1, bukan dari 0

        // Tambahkan peringkat ke data pengguna
        const userDataWithRanking = {
          ...userLoginLeaderboardFilter,
          ranking: ranking,
        };
        // Atau gunakan nilai peringkat tersebut sesuai kebutuhan Anda
        setUserLoginLeaderboard(userDataWithRanking);
      }
    }
  }, [session, status, leaderboard?.softwareDevelopers]);

  return (
    <div className="flex flex-col gap-3">
      {/* Header */}
      <div className="bg-white rounded py-5 px-3">
        <h1 className="text-3xl font-bold m-3">
          Leaderboard Season {leaderboard?.season}
        </h1>
      </div>
      {/* Card */}
      <div>
        <div>
          <table className="table-auto min-w-full rounded-lg">
            <thead className="bg-black text-white text-xs tablet:text-sm text-left tracking-wider w-full">
              <tr>
                <th className="px-2 tablet:px-6 py-3 w-[15%]">Rank</th>
                <th className="px-2 tablet:px-6 py-3 w-[65%]">Name</th>
                <th className="px-2 tablet:px-6 py-3 w-[20%]">Point</th>
              </tr>
            </thead>
          </table>
        </div>
        <div className="overflow-y-auto min-h-max max-h-60">
          <table className="table-auto min-w-full rounded-lg">
            <tbody>
              {isLoading && (
                <tr className="even:bg-gray-100 odd:bg-gray-200 hover:bg-gray-300 transition-colors duration-200">
                  <td
                    colSpan={3}
                    className="text-center text-neutral-500 italic py-2"
                  >
                    Loading...
                  </td>
                </tr>
              )}
              {!isLoading && !leaderboard.softwareDevelopers && (
                <tr className="even:bg-gray-100 odd:bg-gray-200 hover:bg-gray-300 transition-colors duration-200">
                  <td
                    colSpan={3}
                    className="text-center text-neutral-500 italic py-2"
                  >
                    Failed to load leaderboard
                  </td>
                </tr>
              )}
              {!isLoading &&
              leaderboard?.softwareDevelopers &&
              leaderboard?.softwareDevelopers?.length === 0 ? (
                <tr className="even:bg-gray-100 odd:bg-gray-200 hover:bg-gray-300 transition-colors duration-200">
                  <td
                    colSpan={3}
                    className="text-center text-neutral-500 italic py-2"
                  >
                    Not any Software Developers
                  </td>
                </tr>
              ) : (
                leaderboard?.softwareDevelopers?.map(
                  (softwareDeveloper, index) => (
                    <tr
                      className="even:bg-gray-100 odd:bg-gray-200 hover:bg-gray-300 transition-colors duration-200"
                      key={index}
                    >
                      <td className="px-2 tablet:px-6 py-4 whitespace-nowrap w-[15%]">
                        {index + 1}
                      </td>
                      <td className="px-5 tablet:px-6 py-4 whitespace-nowrap w-[65%]">
                        <div className="flex items-center gap-3">
                          <Image
                            src={`https://atzxitftejquqppfauyh.supabase.co/storage/v1/object/public/avatars/public/${
                              softwareDeveloper?.softwareDeveloper?.user
                                ?.avatar || 'default-avatar.png'
                            }`}
                            width={50}
                            height={50}
                            alt="Avatar"
                            priority
                            className="rounded-full object-cover w-5 h-5 tablet:w-10 tablet:h-10"
                          />
                          <div className="flex flex-col gap-1">
                            <p className="text-sm tablet:text-base font-semibold text-wrap">
                              {
                                softwareDeveloper?.softwareDeveloper?.user?.name
                                  .trim()
                                  .split(' ')[0]
                              }
                            </p>
                            <p className="text-xs tablet:text-base text-neutral-400 hidden tablet:block">
                              {
                                softwareDeveloper?.softwareDeveloper?.user
                                  ?.email
                              }
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="text-xs tablet:text-sm px-2 tablet:px-6 py-4 whitespace-nowrap w-[20%]">
                        {softwareDeveloper?.point_leaderboard}
                      </td>
                    </tr>
                  ),
                )
              )}
            </tbody>
          </table>
        </div>
        {!isLoading && leaderboard?.softwareDevelopers && (
          <div>
            <table className="table-auto min-w-full rounded-lg">
              <tfoot>
                {!userLoginLeaderboard ? (
                  <tr className="bg-neutral-700 text-white hover:bg-neutral-800 font-bold text-left tracking-wider transition-colors duration-200">
                    <td
                      colSpan={3}
                      className="text-center text-neutral-500 italic py-2"
                    >
                      User login not available
                    </td>
                  </tr>
                ) : (
                  <tr className="bg-neutral-700 text-white hover:bg-neutral-800 font-bold text-left tracking-wider transition-colors duration-200">
                    <td className="px-2 tablet:px-6 py-4 whitespace-nowrap w-[15%]">
                      {userLoginLeaderboard?.ranking}{' '}
                    </td>
                    <td className="px-5 tablet:px-6 py-4 whitespace-nowrap w-[65%]">
                      <div className="flex items-center gap-3">
                        <Image
                          src={`https://atzxitftejquqppfauyh.supabase.co/storage/v1/object/public/avatars/public/${
                            userLoginLeaderboard?.softwareDeveloper?.user
                              ?.avatar || 'default-avatar.png'
                          }`}
                          width={50}
                          height={50}
                          alt="Avatar"
                          className="rounded-full object-cover w-5 h-5 tablet:w-10 tablet:h-10"
                          priority
                        />
                        <div className="flex flex-col gap-1">
                          <p className="text-sm tablet:text-base font-semibold text-wrap">
                            {
                              userLoginLeaderboard?.softwareDeveloper?.user?.name
                                .trim()
                                .split(' ')[0]
                            }
                          </p>
                          <p className="text-xs tablet:text-sm text-neutral-400 text-wrap hidden tablet:block">
                            {
                              userLoginLeaderboard?.softwareDeveloper?.user
                                ?.email
                            }
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="text-xs tablet:text-sm px-2 tablet:px-6 py-4 whitespace-nowrap w-[20%]">
                      {userLoginLeaderboard?.point_leaderboard}
                    </td>
                  </tr>
                )}
              </tfoot>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
