'use client';
import Image from 'next/image';
import Link from 'next/link';
import moment from 'moment';
import 'moment/locale/id';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { getCollaborationId } from '@/lib/actions/userAction';
import { checkAvailableUserInTeamCompetititon } from '@/lib/actions/teamCompetitionAction';
import { useRouter } from 'next/navigation';
export default function ContentCompetition({
  competition,
  competitionId,
  teamId,
}) {
  moment.locale('id');
  const { data: session, status } = useSession();
  const router = useRouter();
  const [teamCompetition, setTeamCompetition] = useState();
  const [
    submitProjectButtonByCompetitionDate,
    setSubmitProjectButtonByCompetitionDate,
  ] = useState(false);
  const [teamHaveSubmitProject, setTeamHaveSubmitProject] = useState(false);

  useEffect(() => {
    if (session && status === 'authenticated') {
      const checkUser = async () => {
        const resCollaboration = await getCollaborationId(
          session?.user?.userId,
        );
        if (resCollaboration?.success) {
          const user = resCollaboration?.data;
          const res = await checkAvailableUserInTeamCompetititon(
            competitionId,
            teamId,
            user.softwareDevelopers.collaborationId,
          );
          if (res.success) {
            const teamCompetition = res.data;
            if (teamCompetition.projectLink && teamCompetition.repositoryLink) {
              setTeamHaveSubmitProject(true);
            }
            setTeamCompetition(teamCompetition);
          } else {
            router.back();
          }
        }
      };
      checkUser();

      if (competition.startDate && competition.endDate) {
        const currentDate = new Date();
        const startDate = new Date(competition.startDate);
        const endDate = new Date(competition.endDate);

        const isActiveCompetition =
          currentDate >= startDate && currentDate <= endDate;

        setSubmitProjectButtonByCompetitionDate(isActiveCompetition);
      }
    }
  }, [session, competition, competitionId, router, status, teamId]);
  return (
    <>
      <div className="bg-white rounded p-3">
        <Image
          src={`/images/avatars/${competition.organization.user.avatar}`}
          width={50}
          height={50}
          alt={competition?.organization?.user?.name}
          priority
          className="rounded object-cover w-24 h-24"
        />
        <div className="my-3">
          <h1 className="text-2xl font-bold">{competition.name}</h1>
          <p className="text-md text-neutral-500">
            {competition.organization.user.name}
          </p>
        </div>
        {teamCompetition &&
        teamCompetition.statusTeamCompetition.name == 'Registered' &&
        submitProjectButtonByCompetitionDate &&
        !teamHaveSubmitProject ? (
          <div>
            <Link
              href={`/competition/detail/submit_project/${competitionId}/${teamId}`}
              scroll={false}
              className="bg-blue-700 text-white rounded px-4 py-2"
            >
              Submit Project
            </Link>
          </div>
        ) : (
          <p className="text-neutral-500 text-sm italic">
            Submit project is not available
          </p>
        )}
        <div className="py-3">
          <h2 className="text-2xl font-semibold">About Competition</h2>
          <div className="flex items-center gap-3 p-1 my-2 bg-neutral-100 rounded">
            <Image
              src={'/images/icon-time.svg'}
              width={40}
              height={40}
              alt="time"
              className="w-10 h-10 object-cover rounded-full"
              priority
            />
            <div className="flex flex-col">
              <p className="text-black font-semibold">Registration Date</p>
              <p className="text-base text-black">
                {moment(competition.registrationStartDate).format('ll')}-{' '}
                {moment(competition.registrationEndDate).format('ll')}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1/2 flex items-center gap-3 p-1 my-2 bg-neutral-100 rounded">
              <Image
                src={'/images/icons-rupiah.png'}
                width={40}
                height={40}
                alt="registration-fee"
                className="w-10 h-10 object-cover rounded-full"
                priority
              />
              <div className="flex flex-col">
                <p className="text-black font-semibold">Registration Fee</p>
                {competition?.registrationFee === 0 ? (
                  <p className="text-base text-black">Free</p>
                ) : (
                  <p className="text-base text-black">
                    Rp. {competition?.registrationFee.toLocaleString('id-ID')}
                  </p>
                )}
              </div>
            </div>
            <div className="w-1/2 flex items-center gap-3 p-1 my-2 bg-neutral-100 rounded">
              <Image
                src={'/images/icons-group.png'}
                width={40}
                height={40}
                alt="category"
                className="w-10 h-10 object-cover rounded-full"
                priority
              />
              <div className="flex flex-col">
                <p className="text-black font-semibold">Category</p>
                <p className="text-base text-black">
                  {competition.category.name}
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1/2 flex items-center gap-3 p-1 my-2 bg-neutral-100 rounded">
              <Image
                src={'/images/icons-member.png'}
                width={40}
                height={40}
                alt="maks-member-team"
                className="w-10 h-10 object-cover rounded-full"
                priority
              />
              <div className="flex flex-col">
                <p className="text-black font-semibold">Maks Member Team</p>
                <p className="text-base text-black">
                  {competition.maxMemberTeam}
                </p>
              </div>
            </div>
            <div className="w-1/2 flex items-center gap-3 p-1 my-2 bg-neutral-100 rounded">
              <Image
                src={'/images/icons-team.png'}
                width={40}
                height={40}
                alt="maks-team"
                className="w-10 h-10 object-cover rounded-full"
                priority
              />
              <div className="flex flex-col">
                <p className="text-black font-semibold">Maks Team</p>
                <p className="text-base text-black">{competition.maxTeam}</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 p-1 my-2 bg-neutral-100 rounded">
            <Image
              src={'/images/icons-place.png'}
              width={40}
              height={40}
              alt="place"
              className="w-10 h-10 object-cover rounded-full"
              priority
            />
            <div className="flex flex-col">
              <p className="text-black font-semibold">Competition Place</p>
              <p className="text-base text-black">
                {competition.place} ({competition?.type.name})
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-1 my-2 bg-neutral-100 rounded">
            <Image
              src={'/images/icons-date.png'}
              width={40}
              height={40}
              alt="competition-start-date"
              className="w-10 h-10 object-cover rounded-full"
              priority
            />
            <div className="flex flex-col">
              <p className="text-black font-semibold">Competition Start Date</p>
              <p className="text-base text-black">
                {moment(competition.startDate).format('ll')}-{' '}
                {moment(competition.endDate).format('ll')}
              </p>
            </div>
          </div>
          <div className="p-1 my-2 ">
            <h2 className="text-xl font-semibold">Description</h2>
            <p className="py-1">{competition.description}</p>
          </div>
        </div>
      </div>
    </>
  );
}
