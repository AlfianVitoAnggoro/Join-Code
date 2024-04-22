'use client';
import Link from 'next/link';
import moment from 'moment';
import 'moment/locale/id';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import {
  acceptTeamCompetition,
  // updateStatusTeamCompetition,
} from '@/lib/actions/teamCompetitionAction';
import { getDetailCompetition } from '@/lib/actions/competitionAction';

export default function Form({ id }) {
  moment.locale('id');
  const { data: session, status } = useSession();

  const [competition, setCompetition] = useState();

  const [acceptedMaxTeam, setAcceptedMaxTeam] = useState(false);
  const [
    statusUpdateButtonByCompetitionDate,
    setStatusUpdateButtonByCompetitionDate,
  ] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState();
  const [message, setMessage] = useState('');

  const [isPageLoaded, setPageLoaded] = useState(false);
  useEffect(() => {
    const getCompetitionData = async () => {
      try {
        const res = await getDetailCompetition(id);
        if (res?.success) {
          const competition = res?.data;
          setCompetition(competition);
        } else {
          setCompetition({});
        }
      } catch (error) {
        console.log(error);
      }
    };
    getCompetitionData();
    // Fungsi ini akan dipanggil ketika komponen telah dipasang (mounted)
    // Di sinilah kita dapat menandai bahwa halaman telah berhasil dimuat
    setPageLoaded(true);
  }, []);

  const router = useRouter();
  useEffect(() => {
    if (session && status === 'authenticated') {
      if (session?.user?.role === 'Organization') {
        if (competition) {
          if (
            session?.user?.nickname !==
            competition?.organization?.user?.nickname
          ) {
            router.back();
          }
        }
      }
    }
  }, [session, status, competition?.organization?.user?.nickname, router]);

  useEffect(() => {
    const checkAcceptedMaxTeam = competition?.teams?.filter(team => {
      return team?.isAccepted == true;
    });
    if (Number(checkAcceptedMaxTeam?.length) == Number(competition?.maxTeam)) {
      setAcceptedMaxTeam(true);
    }

    if (competition?.startDate && competition?.endDate) {
      const currentDate = new Date();
      const startDate = new Date(competition?.startDate);
      const endDate = new Date(competition?.endDate);

      const isActiveCompetition =
        currentDate >= startDate && currentDate <= endDate;

      setStatusUpdateButtonByCompetitionDate(isActiveCompetition);
    }
  }, [competition]);

  const handleAcceptTeam = async teamId => {
    setIsLoading(true);
    const res = await acceptTeamCompetition(id, teamId);
    if (!res.success) {
      setSuccess(false);
      setMessage('Failed, Team cannot be accepted');
      setIsLoading(false);
      return;
    }
    setSuccess(true);
    setMessage('Succes, Team has been accepted');
    setIsLoading(false);
    setTimeout(() => {
      window.location.reload();
    }, [1000]);
  };

  // const handleUpdateStatusTeamCompetition = async teamId => {
  //   setIsLoading(true);
  //   const res = await updateStatusTeamCompetition(id, teamId);
  //   if (!res.success) {
  //     setSuccess(false);
  //     setMessage('Failed, Team cannot be updated');
  //     setIsLoading(false);
  //     return;
  //   }
  //   setSuccess(true);
  //   setMessage('Succes, Team has been updated');
  //   setIsLoading(false);
  //   router.refresh();
  // };
  return (
    <div className="p-3 bg-white space-y-3">
      {message !== '' && (
        <div
          className={`rounded-md ${
            success ? 'bg-green-600' : 'bg-red-600'
          } py-2 px-3 text-sm text-white flex justify-between gap-x-3 items-center mb-2`}
        >
          <p className="text-wrap">{message}</p>{' '}
          <button className=" font-bold text-xl" onClick={() => setMessage('')}>
            X
          </button>
        </div>
      )}
      <div className="flex flex-col laptop:flex-row gap-2">
        <div className="basis-1/2 space-y-2">
          <div className="flex flex-col">
            <h3 className="text-lg font-medium">Name of competition :</h3>
            {competition?.name ? (
              <p className="text-base font-normal">{competition?.name}</p>
            ) : (
              <p className="text-base text-neutral-500 font-normal">
                belum ada nama kompetisi
              </p>
            )}
          </div>
          <div className="flex flex-col">
            <h3 className="text-lg font-medium">Place of competition :</h3>
            {competition?.place ? (
              <p className="text-base font-normal">{competition.place}</p>
            ) : (
              <p className="text-base text-neutral-500 font-normal">
                belum menentukan lokasi kompetisi
              </p>
            )}
          </div>
          <div className="flex flex-col">
            <h3 className="text-lg font-medium">Organization :</h3>
            {competition?.organization?.user?.name ? (
              <p className="text-base font-normal">
                {competition?.organization?.user?.name}
              </p>
            ) : (
              <p className="text-base text-neutral-500 font-normal">
                belum menentukan organisasi pemilik kompetisi
              </p>
            )}
          </div>
          <div className="flex flex-col">
            <h3 className="text-lg font-medium">Max member of team :</h3>
            {competition?.maxMemberTeam ? (
              <p className="text-base font-normal">
                {competition?.maxMemberTeam}
              </p>
            ) : (
              <p className="text-base text-neutral-500 font-normal">
                belum menentukan maksimal member
              </p>
            )}
          </div>
          <div className="flex flex-col">
            <h3 className="text-lg font-medium">Max team of competition :</h3>
            {competition?.maxTeam ? (
              <p className="text-base font-normal">{competition?.maxTeam}</p>
            ) : (
              <p className="text-base text-neutral-500 font-normal">
                belum menentukan maksimal team
              </p>
            )}
          </div>
        </div>
        <div className="basis-1/2 space-y-2">
          <div className="flex flex-col">
            <h3 className="text-lg font-medium">Category :</h3>
            {competition?.category?.name ? (
              <p className="text-base font-normal">
                {competition?.category?.name}
              </p>
            ) : (
              <p className="text-base text-neutral-500 font-normal">
                belum menentukan kategori kompetisi
              </p>
            )}
          </div>
          <div className="flex flex-col">
            <h3 className="text-lg font-medium">Type :</h3>
            {competition?.type?.name ? (
              <p className="text-base font-normal">{competition?.type?.name}</p>
            ) : (
              <p className="text-base text-neutral-500 font-normal">
                belum menentukan tipe kompetisi
              </p>
            )}
          </div>
          <div className="flex flex-col">
            <h3 className="text-lg font-medium">Fee of registration :</h3>
            {competition?.registrationFee >= 0 ? (
              competition.registrationFee != 0 ? (
                <p className="text-base font-normal">
                  Rp. {competition?.registrationFee}
                </p>
              ) : (
                <p className="text-base font-normal">Free</p>
              )
            ) : (
              <p className="text-base text-neutral-500 font-normal">
                belum menentukan harga pendaftaran kompetisi
              </p>
            )}
          </div>
          <div className="flex flex-col">
            <h3 className="text-lg font-medium">Registration Date :</h3>
            {competition?.registrationStartDate &&
            competition?.registrationEndDate ? (
              <p className="text-base font-normal">
                {moment(competition?.registrationStartDate).format('ll')} -{' '}
                {moment(competition?.registrationEndDate).format('ll')}
              </p>
            ) : (
              <p className="text-base text-neutral-500 font-normal">
                belum menentukan tanggal awal dan akhir pendaftaran kompetisi
              </p>
            )}
          </div>
          <div className="flex flex-col">
            <h3 className="text-lg font-medium">Competition Date :</h3>
            {competition?.startDate && competition?.endDate ? (
              <p className="text-base font-normal">
                {moment(competition?.startDate).format('ll')} -{' '}
                {moment(competition?.endDate).format('ll')}
              </p>
            ) : (
              <p className="text-base text-neutral-500 font-normal">
                belum menentukan tanggal awal dan akhir kompetisi
              </p>
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <h3 className="text-lg font-medium">Description :</h3>
        {competition?.description ? (
          <p className="text-base font-normal">{competition?.description}</p>
        ) : (
          <p className="text-base text-neutral-500 font-normal">
            belum menentukan deskripsi kompetisi
          </p>
        )}
      </div>
      <div className="flex flex-col w-full overflow-auto">
        <h3 className="text-lg font-medium">Team Competition :</h3>
        <table className="table-auto overflow-x-auto w-full">
          <thead className="bg-white text-black font-bold text-sm text-left uppercase tracking-wider border-b border-gray-200">
            <tr>
              <th className="py-3 text-center">NO</th>
              <th className="py-3 text-center">Name</th>
              <th className="py-3 text-center">Link Project</th>
              <th className="py-3 text-center">Link Repository</th>
              <th className="py-3 text-center">Ranking</th>
              <th className="py-3 text-center">Accepted</th>
              <th className="py-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {competition?.teams?.length > 0 ? (
              competition?.teams?.map((team, index) => (
                <tr
                  className="odd:bg-neutral-100 even:bg-neutral-200 hover:bg-neutral-300 transition-colors duration-200 border-b border-gray-200"
                  key={index}
                >
                  <td className="py-2 text-center whitespace-nowrap">
                    {index + 1}
                  </td>
                  <td className="py-2 text-center whitespace-nowrap">
                    {team?.team?.name ? team?.team?.name : ''}
                  </td>
                  <td className="py-2 text-center whitespace-nowrap">
                    {team?.projectLink ? (
                      <Link
                        href={team?.projectLink}
                        target="_blank"
                        className="text-base font-normal text-blue-500"
                      >
                        {team?.projectLink}
                      </Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="py-2 text-center whitespace-nowrap">
                    {team?.repositoryLink ? (
                      <Link
                        href={team?.repositoryLink}
                        target="_blank"
                        className="text-base font-normal text-blue-500"
                      >
                        {team?.repositoryLink}
                      </Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="py-2 text-center whitespace-nowrap">
                    {team?.ranking ? team?.ranking : ''}
                  </td>
                  <td className="py-2 text-center whitespace-nowrap">
                    {competition?.isCompleted || acceptedMaxTeam ? (
                      team?.isAccepted ? (
                        'Yes'
                      ) : (
                        'No'
                      )
                    ) : team?.isAccepted ? (
                      'Yes'
                    ) : (
                      <button
                        disabled={isLoading}
                        className="px-2 py-1 bg-green-600 text-white rounded"
                        onClick={() => handleAcceptTeam(team.teamId)}
                      >
                        {isLoading ? 'Loading...' : 'Accepted'}
                      </button>
                    )}
                  </td>
                  <td className="py-2 text-center whitespace-nowrap space-x-2">
                    {isPageLoaded && (
                      <Link
                        href={`/dashboard/competitions/detail/team-competition/${id}/${team?.teamId}`}
                        scroll={false}
                        className="px-1 py-2 rounded bg-yellow-600 text-white w-16 text-sm"
                      >
                        Detail
                      </Link>
                    )}

                    {/* {team?.isAccepted &&
                      !competition?.isCompleted &&
                      team?.statusTeamCompetitionId == 2 &&
                      statusUpdateButtonByCompetitionDate && (
                        <button
                          className="px-2 py-1 bg-blue-600 text-white rounded"
                          onClick={() =>
                            handleUpdateStatusTeamCompetition(team.teamId)
                          }
                        >
                          Update
                        </button>
                      )} */}
                    {isPageLoaded && !competition?.isCompleted && (
                      <Link
                        href={`/dashboard/competitions/detail/team-competition/delete/${id}/${team?.teamId}`}
                        scroll={false}
                        className="px-1 py-2 rounded bg-red-600 text-white w-16 text-sm"
                      >
                        Delete
                      </Link>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="py-2 text-center whitespace-nowrap">
                  Belum ada daftar team competition
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {isPageLoaded && !competition?.isCompleted && (
        <div>
          <Link
            href={`/dashboard/competitions/detail/complete-competition/${id}`}
            scroll={false}
            className="px-1 py-2 rounded bg-blue-600 text-white w-16 text-sm"
          >
            Complete The Competition
          </Link>
        </div>
      )}
    </div>
  );
}
