'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import moment from 'moment';
import 'moment/locale/id';
import { useSession } from 'next-auth/react';
import { getDetailUser } from '@/lib/actions/userAction';

export default function Content({
  competitionsData,
  competitionId,
  competition,
}) {
  moment.locale('id');

  const { data: session, status } = useSession();
  // Header
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
  const [competitions, setCompetitions] = useState(competitionsData);
  const [search, setSearch] = useState('');
  const [checkUserHasBeenRegisteredState, setCheckUserHasBeenRegisteredState] =
    useState(false);
  const [checkCompetitionIsMaxTeamState, setCheckCompetitionIsMaxTeamState] =
    useState(false);

  const [isPageLoaded, setPageLoaded] = useState(false);

  useEffect(() => {
    // Fungsi ini akan dipanggil ketika komponen telah dipasang (mounted)
    // Di sinilah kita dapat menandai bahwa halaman telah berhasil dimuat
    setPageLoaded(true);
  }, []);

  useEffect(() => {
    if (search === '') {
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

  // Id Detail
  const [id, setId] = useState(Number(competitionId) || 0);

  useEffect(() => {
    setId(Number(competitionId) || 0);
  }, [competitionId]);

  useEffect(() => {
    const checkUser = async () => {
      try {
        if (session && status === 'authenticated') {
          const res = await getDetailUser(session?.user?.nickname);
          if (res?.success) {
            const user = res?.data;
            const checkUserHasBeenRegistered =
              user?.softwareDevelopers?.teams?.some(team =>
                team?.team?.competitions?.some(
                  competition =>
                    Number(competition?.competitionId) === Number(id),
                ),
              );

            setCheckUserHasBeenRegisteredState(checkUserHasBeenRegistered);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    checkUser();

    const checkCompetitionIsMax = () => {
      const checkTeamIsAccepted = competition?.teams?.filter(teams => {
        return teams?.isAccepted === true;
      });

      if (checkTeamIsAccepted?.length === competition?.maxTeam) {
        setCheckCompetitionIsMaxTeamState(true);
      }
    };

    checkCompetitionIsMax();
  }, [session, status, id, competition]);

  return (
    <div className="flex flex-col gap-3">
      {/* Header */}
      <div
        className={`bg-white rounded py-5 px-3 ${
          shouldDisableLayoutDetail(pathname) && 'hidden'
        }`}
      >
        <h1 className="text-3xl font-bold">Competition</h1>
        <div
          className={`mt-3 ${
            shouldDisableLayout(pathname) && 'laptop:flex hidden'
          }`}
        >
          <input
            type="text"
            name="search"
            id="search"
            className="bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block maax-w-full tablet:w-96 p-2.5 "
            placeholder="Search"
            onChange={e => setSearch(e.target.value)}
          />
        </div>
      </div>
      {/* Card */}
      <div className="grid grid-cols-5 gap-x-3">
        <div
          className={`col-span-5 hidden laptop:col-span-2 overflow-scroll laptop:flex flex-col h-screen`}
        >
          {competitions?.length == 0 ? (
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
                      className={`grid grid-cols-5 p-3 gap-x-2 border-2 rounded-lg hover:bg-sky-50 hover:bg-opacity-40 hover:border-sky-500 w-full cursor-pointer ${
                        competitionId == competition?.competitionId
                          ? 'border-sky-500 bg-sky-100'
                          : 'bg-white'
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
                          alt="avatar"
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
                              {competition?.registrationFee?.toLocaleString(
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
        <div className="col-span-5 laptop:col-span-3 flex flex-col gap-3">
          <div className="bg-white rounded p-3">
            <Image
              src={`https://atzxitftejquqppfauyh.supabase.co/storage/v1/object/public/avatars/public/${
                competition?.organization?.user?.avatar || 'default-avatar.png'
              }`}
              width={50}
              height={50}
              priority
              alt="avatar"
              className="rounded-full object-cover w-24 h-24"
            />
            <div className="my-3">
              <h1 className="text-2xl font-bold">{competition?.name}</h1>
              <p className="text-md text-neutral-500">
                {competition?.organization?.name}
              </p>
            </div>
            <div>
              {checkUserHasBeenRegisteredState && (
                <p className="text-sm text-neutral-500">
                  You have been registration in this competition
                </p>
              )}
              {checkCompetitionIsMaxTeamState && (
                <p className="text-sm text-neutral-500">
                  Competition has fully
                </p>
              )}
              {competition?.isCompleted && (
                <p className="text-sm text-neutral-500">
                  Competition has been completed
                </p>
              )}
              {isPageLoaded &&
                !checkUserHasBeenRegisteredState &&
                !checkCompetitionIsMaxTeamState &&
                !competition?.isCompleted && (
                  <Link
                    href={`/competition/browse/registration/${competition?.competitionId}`}
                    scroll={false}
                    className="bg-blue-700 text-white rounded px-4 py-2"
                  >
                    Registration
                  </Link>
                )}
            </div>
            <div className="py-3 my-2">
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
                    {moment(competition?.registrationStartDate).format('ll')} -{' '}
                    {moment(competition?.registrationEndDate).format('ll')}
                  </p>
                </div>
              </div>
              <div className="flex flex-col tablet:flex-row tablet:items-center gap-2">
                <div className="w-full tablet:w-1/2 flex items-center gap-3 p-1 my-2 bg-neutral-100 rounded">
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
                        Rp.{' '}
                        {competition?.registrationFee.toLocaleString('id-ID')}
                      </p>
                    )}
                  </div>
                </div>
                <div className="w-full tablet:w-1/2 flex items-center gap-3 p-1 my-2 bg-neutral-100 rounded">
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
                      {competition?.category?.name}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col tablet:flex-row tablet:items-center gap-2">
                <div className="w-full tablet:w-1/2 flex items-center gap-3 p-1 my-2 bg-neutral-100 rounded">
                  <Image
                    src={'/images/icons-member.png'}
                    width={40}
                    height={40}
                    alt="maks-member-team"
                    className="w-10 h-10 object-cover rounded-full"
                    priority
                  />
                  <div className="flex flex-col">
                    <p className="text-black font-semibold">Max Member Team</p>
                    <p className="text-base text-black">
                      {competition?.maxMemberTeam}
                    </p>
                  </div>
                </div>
                <div className="w-full tablet:w-1/2 flex items-center gap-3 p-1 my-2 bg-neutral-100 rounded">
                  <Image
                    src={'/images/icons-team.png'}
                    width={40}
                    height={40}
                    alt="maks-team"
                    className="w-10 h-10 object-cover rounded-full"
                    priority
                  />
                  <div className="flex flex-col">
                    <p className="text-black font-semibold">Max Team</p>
                    <p className="text-base text-black">
                      {competition?.maxTeam}
                    </p>
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
                    {competition?.place} ({competition?.type?.name})
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
                  <p className="text-black font-semibold">Competition Date</p>
                  <p className="text-base text-black">
                    {moment(competition?.startDate).format('ll')} -{' '}
                    {moment(competition?.endDate).format('ll')}
                  </p>
                </div>
              </div>
              <div className="p-1 my-2 ">
                <h2 className="text-xl font-semibold">Description</h2>
                <p className="py-1">{competition?.description}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded p-3">
            <h2 className="text-2xl font-bold">About Organization</h2>
            <div className="flex flex-col tablet:flex-row gap-y-2 tablet:gap-y-0 tablet:gap-x-3 py-2">
              <Image
                src={`https://atzxitftejquqppfauyh.supabase.co/storage/v1/object/public/avatars/public/${
                  competition?.organization?.user?.avatar ||
                  'default-avatar.png'
                }`}
                width={50}
                height={50}
                alt="Avatar"
                priority
                className="rounded-full object-cover w-24 h-24"
              />
              <div className="flex flex-col">
                <h3 className="text-lg font-semibold text-wrap">
                  {competition?.organization?.user?.name}
                </h3>
                {competition?.organization?.address ? (
                  <p className="text-sm text-black text-wrap">
                    {competition?.organization?.address}
                  </p>
                ) : (
                  <p className="text-sm text-neutral-500">
                    Address is not available
                  </p>
                )}
                {competition?.organization?.organizationLink ? (
                  <Link
                    href={competition?.organization?.organizationLink}
                    target="_blank"
                    className="text-blue-700 text-sm text-wrap"
                  >
                    {competition?.organization?.organizationLink}
                  </Link>
                ) : (
                  <p className="text-sm text-neutral-500">
                    Organization Link is not available
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
