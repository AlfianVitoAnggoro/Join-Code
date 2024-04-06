import { getDetailCompetition } from '@/lib/actions/competitionAction';
import ContentCompetition from './ContentCompetition';
import ContentOrganization from './ContentOrganization';

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

export default async function DetailCompetitionTeam({ params }) {
  const responseDetailCompetition = await getDetailCompetition(params.id);
  const competition = responseDetailCompetition.data;
  return (
    <div className="col-span-5 flex flex-col gap-3">
      <ContentCompetition
        competition={competition}
        competitionId={params.id}
        teamId={params.teamId}
      />
      <ContentOrganization competition={competition} />
    </div>
  );
}
