import Image from 'next/image';
import Link from 'next/link';
import { getDetailSoftwareDeveloperStatusTeamCompetitionFinish } from '@/lib/actions/softwareDeveloperAction';

export const metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
  ),
  title: 'Detail Software Developer - Join Code',
  description:
    'The Application make a collaboration and competition for software developer',
  authors: [
    { name: 'Alfian Vito Anggoro', url: `${process.env.NEXT_PUBLIC_API_URL}` },
  ],
  icons: {
    icon: '/icon.png',
  },
  openGraph: {
    title: 'Detail Software Developer',
    description: 'Detail Software Developer - Join Code',
    url: `${process.env.NEXT_PUBLIC_API_URL}`,
    siteName: 'Detail Software Developer',
  },
};

export default async function CollaborationDetailPages({ params }) {
  const responseSoftwareDeveloper =
    await getDetailSoftwareDeveloperStatusTeamCompetitionFinish(params.slug);

  const user = responseSoftwareDeveloper.data;

  const subject = 'Invited Collaboration Join Code';
  const message = `Hello, ${user.name} invited you to collaborate on Join Code. Please give your collaboration ID, if you want to join.`;

  return (
    <div className="relative min-h-screen laptop:mt-20">
      <div className="bg-black">
        <div className="w-[1024px] min-h-fit  mx-auto p-10 grid gap-5 grid-cols-1 laptop:grid-cols-3">
          <div className="col-span-1 flex justify-start laptop:justify-center">
            <div className="bg-gray-600 w-56 h-56 rounded-full">
              <Image
                width={100}
                height={100}
                src={`/images/avatars/${user?.avatar}`}
                alt={user?.name}
                priority
                className="rounded-full w-56 h-56 object-cover"
              />
            </div>
          </div>
          <div className="col-span-1 laptop:col-span-2 m-0 laptop:mr-10 ">
            <div className="flex flex-col space-y-3">
              <h2 className="text-5xl font-bold text-white">{user?.name}</h2>
              {user?.softwareDevelopers?.statusCollaboration && (
                <p className="text-md bg-green-600 w-fit rounded-full p-1 px-3 mt-1 text-md font-semibold text-white my-2">
                  #OPENTOCOLLABORATE
                </p>
              )}
              <p className="text-xl text-white mt-1">
                {user?.softwareDevelopers?.skills
                  .map(skill => skill?.skill?.name)
                  .join(', ')}
              </p>
              <div className="flex justify-start items-center gap-3 mt-2">
                <Image
                  src={`/images/badges/${user?.softwareDevelopers?.badge?.image}`}
                  alt={user?.softwareDevelopers?.badge?.name}
                  width={200}
                  height={200}
                  className="w-20 h-20 object-contain my-1"
                ></Image>
                <p className="text-xl font-semibold text-white">
                  {user?.softwareDevelopers?.point} XP
                </p>
              </div>
              <div className="mt-2">
                <h2 className="font-semibold text-2xl text-white">About Me</h2>
                {user?.softwareDevelopers?.description ? (
                  <p className="text-white mt-1 text-lg">
                    {user?.softwareDevelopers?.description}
                  </p>
                ) : (
                  <p className="text-neutral-500 mt-1 text-lg">
                    Description belum tersedia
                  </p>
                )}
              </div>
              <div className="mt-2">
                <h2 className="font-semibold text-2xl text-white">
                  Social Media
                </h2>
                <div className="flex mt-1">
                  {user?.softwareDevelopers?.usernameInstagram && (
                    <Link
                      href={`https://www.instagram.com/${user?.softwareDevelopers?.usernameInstagram}`}
                      target={'_blank'}
                      className={'flex items-center w-10 h-10 mx-2'}
                    >
                      <Image
                        src="/images/icon-instagram.svg"
                        width={20}
                        height={20}
                        className="w-10 h-10 bg-gray-200 rounded-full mr-1"
                        alt="Instagram"
                      />
                    </Link>
                  )}
                  {user?.softwareDevelopers?.usernameLinkedin && (
                    <Link
                      href={`https://www.linkedin.com/in/${user?.softwareDevelopers?.usernameLinkedin}`}
                      target={'_blank'}
                      className={'flex items-center w-10 h-10 mx-2'}
                    >
                      <Image
                        src="/images/icon-linkedin.svg"
                        width={20}
                        height={20}
                        className="w-10 h-10 bg-gray-200 rounded-full"
                        alt="Linkedin"
                      />
                    </Link>
                  )}
                  {user?.softwareDevelopers?.usernameGithub && (
                    <Link
                      href={`https://www.github.com/${user?.softwareDevelopers?.usernameGithub}`}
                      target={'_blank'}
                      className={'flex items-center w-10 h-10 mx-2'}
                    >
                      <Image
                        src="/images/icon-github.svg"
                        width={20}
                        height={20}
                        className="w-10 h-10 bg-gray-200 rounded-full"
                        alt="Linkedin"
                      />
                    </Link>
                  )}

                  {!user?.softwareDevelopers?.usernameInstagram &&
                    !user?.softwareDevelopers?.usernameLinkedin &&
                    !user?.softwareDevelopers?.usernameGithub && (
                      <p className="text-neutral-500 mt-1 text-lg">
                        Belum memiliki social media
                      </p>
                    )}
                </div>

                <div className="flex flex-col mt-2">
                  <h2 className="font-semibold text-2xl text-white">
                    Portofolio Link
                  </h2>
                  {user?.softwareDevelopers?.portfolioLink ? (
                    <Link
                      href={user?.softwareDevelopers?.portfolioLink}
                      target={'_blank'}
                      className={'flex items-center mt-1 text-blue-500'}
                    >
                      {user?.softwareDevelopers?.portfolioLink}
                    </Link>
                  ) : (
                    <p className="text-neutral-500 mt-1 text-lg">
                      Belum memiliki portofolio link
                    </p>
                  )}
                </div>
                <div className="mt-5">
                  <a
                    href={`https://mail.google.com/mail/?view=cm&fs=1&to=${user.email}&su=${subject}&body=${message}`}
                    target={'_blank'}
                    className="btn bg-white text-black hover:bg-gray-300 hover:text-black rounded-full p-2 font-bold text-xl"
                  >
                    Contact Me
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-mainColor">
        <div className="w-[1024px] min-h-screen mx-auto p-10">
          <h2 className="text-black text-3xl font-bold">My Competition</h2>
          {user?.softwareDevelopers?.teams.length === 0 ? (
            <p className="text-neutral-500 font-light text-xl mt-10">
              Belum ada kompetisi yang pernah diikuti..
            </p>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-5">
              {user?.softwareDevelopers?.teams
                ?.filter(team => team?.team.competitions?.length > 0)
                .map((team, index) => (
                  <div className="grid grid-cols-1 gap-5" key={index}>
                    {team.team.competitions.map((competition, idx) => (
                      <div
                        className="bg-white w-full h-96 border border-slate-300 hover:shadow-2xl rounded p-5"
                        key={idx}
                      >
                        <Link
                          href={`/competition/detail/${competition.competition.competitionId}`}
                        >
                          <div className="grid grid-cols-3 gap-3 h-40">
                            <div className="col-span-1 flex justify-center items-center">
                              <Image
                                src={`/images/avatars/${competition?.competition?.organization?.user?.avatar}`}
                                width={50}
                                height={50}
                                alt="Software Developer"
                                priority
                                className="w-auto h-40 object-cover rounded"
                              />
                            </div>
                            <div className="col-span-2 p-3">
                              <div className="flex justify-between items-center">
                                <div className="flex justify-start items-center">
                                  <Image
                                    src="/images/icon-ok.svg"
                                    width={25}
                                    height={25}
                                    alt="Ok"
                                  />
                                  <p className="text-xl font-semibold text-green-600 ml-1">
                                    {competition.statusTeamCompetition.name}
                                  </p>
                                </div>
                                {competition.ranking && (
                                  <div className="flex justify-start items-center">
                                    <Image
                                      src="/images/icon-medal.png"
                                      width={25}
                                      height={25}
                                      alt="Medal"
                                    />
                                    <p className="text-xl font-semibold text-yellow-600 ml-1">
                                      Ranking {competition.ranking}
                                    </p>
                                  </div>
                                )}
                              </div>
                              <h1 className="text-2xl font-bold mt-2 mb-1">
                                {competition.competition.name}
                              </h1>
                              <h1 className="text-base font-semibold text-slate-600 mb-2">
                                {competition.competition.organization.user.name}
                              </h1>
                              <div className="flex justify-start items-center gap-3">
                                <div className="flex justify-start items-center gap-1">
                                  <Image
                                    src="/images/icon-time.svg"
                                    width={20}
                                    height={20}
                                    alt="Time"
                                  />
                                  <p className="text-md font-semibold text-black">
                                    {competition?.competition?.type?.name}
                                  </p>
                                </div>
                                <div className="flex justify-start items-center gap-1">
                                  <Image
                                    src="/images/icon-team.png"
                                    width={20}
                                    height={20}
                                    alt="Team"
                                  />
                                  <p className="text-md font-semibold text-black">
                                    {competition?.competition?.category?.name}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="w-full py-5 h-56">
                            <p className="text-ellipsis overflow-clip text-base h-40">
                              {competition.competition.description}
                            </p>
                          </div>
                        </Link>
                      </div>
                    ))}
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}