import { getDetailCompetition } from '@/lib/actions/competitionAction';
import { getSoftwareDevelopers } from '@/lib/actions/softwareDeveloperAction';
import FormCompetitionRegistration from './FormCompetitionRegistration';

export const metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
  ),
  title: 'Registration Competition - Join Code',
  description:
    'The Application make a collaboration and competition for software developer',
  authors: [
    { name: 'Alfian Vito Anggoro', url: `${process.env.NEXT_PUBLIC_API_URL}` },
  ],
  icons: {
    icon: '/icon.png',
  },
  openGraph: {
    title: 'Registration Competition',
    description: 'Registration Competition - Join Code',
    url: `${process.env.NEXT_PUBLIC_API_URL}`,
    siteName: 'Registration Competition',
  },
};

export default async function RegistrationCompetition({ params }) {
  const responseDetailCompetition = await getDetailCompetition(params.id);
  const competition = responseDetailCompetition.data;
  const responseSoftwareDevelopers = await getSoftwareDevelopers();
  const softwareDevelopers = responseSoftwareDevelopers.data;
  return (
    <div className="flex-1 px-3 bg-white rounded-lg">
      <div className="pt-3 mb-3">
        <h2 className="text-2xl font-medium">Competition Registration</h2>
      </div>
      <FormCompetitionRegistration
        competitionId={params.id}
        competition={competition}
        softwareDevelopers={softwareDevelopers}
      />
    </div>
  );
}
