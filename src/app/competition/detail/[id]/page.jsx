import Image from 'next/image';
import Link from 'next/link';
import { getDetailCompetition } from '@/lib/actions/competitionAction';
import moment from 'moment';
import 'moment/locale/id';

export const metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
  ),
  title: 'Detail Competition - Join Code',
  description:
    'The Application make a collaboration and competition for software developer',
  authors: [
    { name: 'Alfian Vito Anggoro', url: `${process.env.NEXT_PUBLIC_API_URL}` },
  ],
  icons: {
    icon: '/icon.png',
  },
  openGraph: {
    title: 'Detail Competition',
    description: 'Detail Competition - Join Code',
    url: `${process.env.NEXT_PUBLIC_API_URL}`,
    siteName: 'Detail Competition',
  },
};

export default async function DetailCompetition({ params }) {
  moment.locale('id');
  const responseDetailCompetition = await getDetailCompetition(params.id);
  const competition = responseDetailCompetition.data;
  return (
    <div className="col-span-5 flex flex-col gap-3">
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
                <p className="text-base text-black">
                  Rp. {competition.registrationFee.toLocaleString('id-ID')}
                </p>
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
      <div className="bg-white rounded p-3">
        <h2 className="text-2xl font-bold">About Organization</h2>
        <div className="flex gap-x-3 py-2">
          <Image
            src={`/images/avatars/${competition.organization.user.avatar}`}
            width={50}
            height={50}
            alt="Avatar"
            priority
            className="rounded object-cover w-24 h-24"
          />
          <div className="flex flex-col">
            <h3 className="text-lg font-semibold ">
              {competition.organization.user.name}
            </h3>
            {competition?.organization?.address ? (
              <p className="text-sm text-black">
                {competition?.organization?.address}
              </p>
            ) : (
              <p className="text-sm text-neutral-500">alamat tidak tersedia</p>
            )}
            {competition?.organization?.organizationLink ? (
              <Link
                href={competition?.organization?.organizationLink}
                className="text-blue-700 text-sm"
              >
                {competition?.organization?.organizationLink}
              </Link>
            ) : (
              <p className="text-sm text-neutral-500">
                link organisasi tidak tersedia
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
