'use client';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function Table({ leaderboard }) {
  const { data: session, status } = useSession();
  const [userLoginLeaderboard, setUserLoginLeaderboard] = useState();

  useEffect(() => {
    if (session && status === 'authenticated') {
      const userLoginLeaderboardFilter = leaderboard.softwareDevelopers.find(
        softwareDeveloper =>
          softwareDeveloper.softwareDeveloper.user.nickname ===
          session.user.nickname,
      );
      const sortedLeaderboard = leaderboard.softwareDevelopers.sort(
        (a, b) => b.point_leaderboard - a.point_leaderboard,
      );

      // Temukan data pengguna berdasarkan softwareDeveloperId
      const targetUserIndex = sortedLeaderboard.findIndex(
        softwareDeveloper =>
          softwareDeveloper.softwareDeveloper.user.nickname ===
          session.user.nickname,
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
  }, [session, status]);
  return (
    <div className="flex flex-col gap-3">
      {/* Header */}
      <div className="bg-white rounded py-5 px-3">
        <h1 className="text-3xl font-bold m-3">
          Leaderboard Season {leaderboard.season}
        </h1>
      </div>
      {/* Card */}
      <div>
        <div>
          <table className="table-auto min-w-full rounded-lg">
            <thead className="bg-black text-white font-bold text-sm text-left uppercase tracking-wider">
              <tr>
                <th className="px-6 py-3 w-[15%]">Peringkat</th>
                <th className="px-6 py-3 w-[65%]">Software Developer</th>
                <th className="px-6 py-3 w-[20%]">Point</th>
              </tr>
            </thead>
          </table>
        </div>
        <div className="overflow-y-auto min-h-max max-h-60">
          <table className="table-auto min-w-full rounded-lg">
            <tbody>
              {leaderboard?.softwareDevelopers?.map(
                (softwareDeveloper, index) => (
                  <tr
                    className="even:bg-gray-100 odd:bg-gray-200 hover:bg-gray-300 transition-colors duration-200"
                    key={index}
                  >
                    <td className="px-6 py-4 whitespace-nowrap w-[15%]">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap w-[65%]">
                      <div className="flex items-center gap-3">
                        <Image
                          src={`/images/avatars/${softwareDeveloper?.softwareDeveloper?.user?.avatar}`}
                          width={50}
                          height={50}
                          alt={softwareDeveloper?.softwareDeveloper?.user?.name}
                          priority
                          className="rounded-full object-cover w-10 h-10"
                        />
                        <div className="flex flex-col gap-1">
                          <p className="text-base font-semibold">
                            {softwareDeveloper?.softwareDeveloper?.user?.name}
                          </p>
                          <p className="text-sm text-neutral-400">
                            {softwareDeveloper?.softwareDeveloper?.user?.email}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap w-[20%]">
                      {softwareDeveloper?.point_leaderboard}
                    </td>
                  </tr>
                ),
              )}
            </tbody>
          </table>
        </div>
        <div>
          <table className="table-auto min-w-full rounded-lg">
            <tfoot>
              <tr className="bg-neutral-700 text-white hover:bg-neutral-800 font-bold text-left tracking-wider transition-colors duration-200">
                <td className="px-6 py-4 whitespace-nowrap w-[15%]">
                  {userLoginLeaderboard?.ranking}{' '}
                </td>
                <td className="px-6 py-4 whitespace-nowrap w-[65%]">
                  <div className="flex items-center gap-3">
                    <Image
                      src={`/images/avatars/${userLoginLeaderboard?.softwareDeveloper?.user?.avatar}`}
                      width={50}
                      height={50}
                      alt={userLoginLeaderboard?.softwareDeveloper?.user?.name}
                      className="rounded-full object-cover w-10 h-10"
                      priority
                    />
                    <div className="flex flex-col gap-1">
                      <p className="text-base font-semibold">
                        {userLoginLeaderboard?.softwareDeveloper?.user?.name}
                      </p>
                      <p className="text-sm text-neutral-400">
                        {userLoginLeaderboard?.softwareDeveloper?.user?.email}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap w-[20%]">
                  {userLoginLeaderboard?.point_leaderboard}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
}
