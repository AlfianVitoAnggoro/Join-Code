'use client';
import { getDetailTeamCompetition } from '@/lib/actions/teamCompetitionAction';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Form({ competitionId, teamId }) {
  const router = useRouter();

  const [teamCompetition, setTeamCompetition] = useState({});

  useEffect(() => {
    const getDetailTeamCompetitionData = async () => {
      const res = await getDetailTeamCompetition(competitionId, teamId);
      if (res.success) {
        const teamCompetition = res.data;
        setTeamCompetition(teamCompetition);
      } else {
        setTeamCompetition({});
      }
    };

    getDetailTeamCompetitionData();
  }, []);

  return (
    <div className="p-3 overflow-y-auto max-h-[80vh] min-h-[fit] w-[70vw]">
      <div className="flex flex-col laptop:flex-row gap-2">
        <div className="basis-1/2 space-y-2">
          <div className="flex flex-col">
            <h3 className="text-lg font-medium">Team Name</h3>
            {teamCompetition?.team?.name ? (
              <p className="text-base font-normal">
                {teamCompetition?.team?.name}
              </p>
            ) : (
              <p className="text-base font-normal text-neutral-500">-</p>
            )}
          </div>
          <div className="flex flex-col">
            <h3 className="text-lg font-medium text-wrap">Link Project :</h3>
            {teamCompetition?.projectLink ? (
              <Link
                href={teamCompetition?.projectLink}
                target="_blank"
                className="text-base font-normal text-blue-500"
              >
                {teamCompetition?.projectLink}
              </Link>
            ) : (
              <p className="text-base font-normal text-neutral-500">
                belum tersedia
              </p>
            )}
          </div>
          <div className="flex flex-col">
            <h3 className="text-lg font-medium whitespace-pre-wrap">
              Link Repository :
            </h3>
            {teamCompetition?.repositoryLink ? (
              <Link
                href={teamCompetition?.repositoryLink}
                target="_blank"
                className="text-base font-normal text-blue-500"
              >
                {teamCompetition?.repositoryLink}
              </Link>
            ) : (
              <p className="text-base font-normal text-neutral-500">
                belum tersedia
              </p>
            )}
          </div>
          <div className="flex flex-col">
            <h3 className="text-lg font-medium">Bukti Pembayaran :</h3>
            {teamCompetition?.proofOfPayment ? (
              <Link
                href={`https://atzxitftejquqppfauyh.supabase.co/storage/v1/object/public/proofOfPayments/public/${teamCompetition?.proofOfPayment}`}
                className="text-base font-normal text-blue-500"
                target="_blank"
              >
                File Bukti Pembayaran
              </Link>
            ) : (
              <p className="text-base font-normal text-neutral-500">
                belum tersedia
              </p>
            )}
          </div>
        </div>
        <div className="basis-1/2 space-y-2">
          <div className="flex flex-col">
            <h3 className="text-lg font-medium">Accepted :</h3>
            {teamCompetition?.isAccepted ? (
              <p className="text-base font-normal">Yes</p>
            ) : (
              <p className="text-base font-normal">No</p>
            )}
          </div>
          <div className="flex flex-col">
            <h3 className="text-lg font-medium">Ranking :</h3>
            {teamCompetition?.ranking ? (
              <p className="text-base font-normal">
                {teamCompetition?.ranking}
              </p>
            ) : (
              <p className="text-base font-normal text-neutral-500">
                belum tersedia
              </p>
            )}
          </div>
          <div className="flex flex-col">
            <h3 className="text-lg font-medium">Status :</h3>
            {teamCompetition?.statusTeamCompetition?.name ? (
              <p className="text-base font-normal">
                {teamCompetition?.statusTeamCompetition?.name}
              </p>
            ) : (
              <p className="text-base font-normal text-neutral-500">
                belum tersedia
              </p>
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-col mt-3">
        <h3 className="text-lg font-medium">List Member of team</h3>
        <table className="table-auto min-w-full">
          <thead className="bg-neutral-200 text-black font-bold text-sm text-left uppercase tracking-wider border-b border-gray-200">
            <tr>
              <th className="py-3 text-center">NO</th>
              <th className="py-3 text-center">Name</th>
              <th className="py-3 text-center">Email</th>
              <th className="py-3 text-center">Point</th>
            </tr>
          </thead>
          <tbody>
            {teamCompetition?.team?.softwareDevelopers.map(
              (softwareDeveloper, index) => (
                <tr
                  className="odd:bg-neutral-100 even:bg-neutral-200 hover:bg-neutral-300 transition-colors duration-200 border-b border-gray-200"
                  key={index}
                >
                  <td className="py-2 text-center whitespace-nowrap">
                    {index++ + 1}
                  </td>
                  <td className="py-2 text-center whitespace-nowrap">
                    {softwareDeveloper?.softwareDeveloper?.user?.name}
                  </td>
                  <td className="py-2 text-center whitespace-nowrap">
                    {softwareDeveloper?.softwareDeveloper?.user?.email}
                  </td>
                  <td className="py-2 text-center whitespace-nowrap">
                    {softwareDeveloper?.softwareDeveloper?.point}
                  </td>
                </tr>
              ),
            )}
          </tbody>
        </table>
      </div>
      <div></div>
      <div className="flex flex-col tablet:flex-row justify-start gap-3 mt-3">
        <button
          onClick={() => router.back()}
          className="w-fit bg-red-500 text-white p-2 rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
}
