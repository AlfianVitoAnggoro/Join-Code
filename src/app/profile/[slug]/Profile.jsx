'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
export default function Profile({ user }) {
  const [filter, setFilter] = useState('');
  const [teams, setTeams] = useState();

  useEffect(() => {
    if (filter === '') {
      setTeams(user?.softwareDevelopers?.teams);
    } else {
      const filteredTeams = user?.softwareDevelopers?.teams?.map(team => {
        return {
          ...team,
          team: {
            ...team.team,
            competitions: team?.team?.competitions?.filter(competition =>
              competition?.statusTeamCompetition?.name
                .toLowerCase()
                .includes(filter.toLowerCase()),
            ),
          },
        };
      });
      setTeams(filteredTeams);
    }
  }, [filter, user]);

  return (
    <>
      <div className="bg-black">
        <div className="max-w-[1024px] min-h-fit mx-auto p-10 grid gap-5 grid-cols-1 laptop:grid-cols-3">
          <div className="col-span-1 flex justify-start laptop:justify-center">
            <div className="bg-gray-600 w-36 h-36 tablet:w-56 tablet:h-56 rounded-full">
              <Image
                width={100}
                height={100}
                src={`/images/avatars/${user?.avatar}`}
                alt={user?.name}
                priority
                className="rounded-full w-36 h-36 tablet:w-56 tablet:h-56 object-cover"
              />
            </div>
          </div>
          <div className="col-span-1 laptop:col-span-2 m-0 laptop:mr-10">
            <div className="flex flex-col space-y-3">
              <h2 className="text-2xl tablet:text-5xl font-bold text-white">
                {user?.name}
              </h2>
              {user?.softwareDevelopers?.statusCollaboration == 2 && (
                <p className="text-md bg-green-600 w-fit rounded-full p-1 px-3 mt-1 text-md font-semibold text-white my-2">
                  #OPENTOCOLLABORATE
                </p>
              )}

              {user?.softwareDevelopers?.skills?.length > 0 ? (
                <p className="text-xl text-white mt-1">
                  {user?.softwareDevelopers?.skills
                    .map(skill => skill?.skill?.name)
                    .join(', ')}
                </p>
              ) : (
                <p className="text-lg text-neutral-500 mt-1">
                  Skills have not been available
                </p>
              )}

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
                    Description has not been available
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
                      href={`https://www.instagram.com/${user?.softwareDevelopers.usernameInstagram}`}
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
                  {!user?.softwareDevelopers?.usernameGithub &&
                    !user?.softwareDevelopers?.usernameLinkedin &&
                    !user?.softwareDevelopers?.usernameInstagram && (
                      <p className="text-neutral-500 mt-1 text-lg">
                        Socials Media have not been available
                      </p>
                    )}
                </div>
              </div>
              <div className="flex flex-col mt-2">
                <h2 className="font-semibold text-2xl text-white">
                  Portfolio Link
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
                    Portfolio Link has not been available
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-mainColor">
        <div className="maax-w-[1024px] min-h-screen mx-auto p-10">
          <h2 className="text-black text-3xl font-bold">My Competition</h2>
          <div className="flex justify-start tablet:justify-end items-center gap-3">
            <label htmlFor="filter" className="text-lg">
              Tampilkan:{' '}
            </label>
            <select
              name="filter"
              id="filter"
              className="py-2 px-3 rounded"
              onChange={e => setFilter(e.target.value)}
            >
              <option value="">See All</option>
              <option value="Registrant">Registrant</option>
              <option value="Registered">Registered</option>
              {/* <option value="Progress">Progress</option> */}
              <option value="Finish">Finish</option>
              <option value="Not Finish">Not Finish</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
          {teams?.length === 0 ? (
            <p className="text-neutral-500 font-light text-xl mt-10">
              Belum ada kompetisi yang pernah diikuti..
            </p>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 tablet:gap-5 mt-5">
              {teams
                ?.filter(team => team?.team?.competitions?.length > 0)
                .map((team, index) => (
                  <div className="grid grid-cols-1 gap-5" key={index}>
                    {team?.team?.competitions?.map((competition, idx) => (
                      <div
                        className="bg-white max-w-full max-h-fit tablet:h-96 border border-slate-300 hover:shadow-2xl rounded p-5"
                        key={idx}
                      >
                        <Link
                          href={`/competition/detail/${competition?.competition?.competitionId}/${competition?.teamId}`}
                        >
                          <div className="grid grid-cols-1 tablet:grid-cols-3 gap-3">
                            <div className="col-span-1 flex justify-center items-center">
                              <Image
                                src={`/images/avatars/${competition?.competition?.organization?.user?.avatar}`}
                                width={50}
                                height={50}
                                alt="Software Developer"
                                priority
                                className="w-40 h-40 object-cover rounded"
                              />
                            </div>
                            <div className="col-span-1 tablet:col-span-2 tablet:p-3">
                              <div className="flex flex-col tablet:flex-row justify-between tablet:items-center">
                                <div className="flex justify-start items-center">
                                  <p
                                    className={`text-xl font-semibold ${
                                      competition?.statusTeamCompetition
                                        ?.name === 'Registrant' &&
                                      'text-gray-600'
                                    } ${
                                      competition?.statusTeamCompetition
                                        ?.name === 'Registered' &&
                                      'text-sky-600'
                                    }
                                    ${
                                      competition?.statusTeamCompetition
                                        ?.name === 'Progress' && 'text-blue-600'
                                    } ${
                                      competition?.statusTeamCompetition
                                        ?.name === 'Finish' && 'text-green-600'
                                    } ${
                                      competition?.statusTeamCompetition
                                        ?.name === 'Not Finish' &&
                                      'text-yellow-600'
                                    }
                                    ${
                                      competition?.statusTeamCompetition
                                        ?.name === 'Rejected' && 'text-red-600'
                                    }`}
                                  >
                                    {competition?.statusTeamCompetition?.name}
                                  </p>
                                </div>
                                {competition?.ranking && (
                                  <div className="flex justify-start items-center">
                                    <Image
                                      src="/images/icon-medal.png"
                                      width={25}
                                      height={25}
                                      alt="Medal"
                                      className="hidden tablet:block"
                                    />
                                    <p className="text-xl font-semibold text-yellow-600 tablet:ml-1">
                                      Ranking {competition?.ranking}
                                    </p>
                                  </div>
                                )}
                              </div>
                              <h1 className="text-2xl font-bold mt-2 mb-1">
                                {competition?.competition?.name}
                              </h1>
                              <h1 className="text-base font-semibold text-slate-600 mb-2">
                                {
                                  competition?.competition?.organization?.user
                                    ?.name
                                }
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
                              {competition?.competition?.description}
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
    </>
  );
}
