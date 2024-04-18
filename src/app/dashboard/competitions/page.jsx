import { getCompetition } from '@/lib/actions/competitionAction/index.js';
import TableCompetitions from './TableCompetitions';
import { Suspense } from 'react';

export const metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
  ),
  title: 'Competitions Dashboard - Join Code',
  description:
    'The Application make a collaboration and competition for software developer',
  authors: [
    { name: 'Alfian Vito Anggoro', url: `${process.env.NEXT_PUBLIC_API_URL}` },
  ],
  icons: {
    icon: '/icon.png',
  },
  openGraph: {
    title: 'Competitions Dashboard',
    description: 'Competitions Dashboard - Join Code',
    url: `${process.env.NEXT_PUBLIC_API_URL}`,
    siteName: 'Competitions Dashboard',
  },
};
export default async function CompetitionsDashboardPages() {
  const competitionsData = await getCompetition();
  const competitions = competitionsData.data;

  return (
    <div className="flex-1 min-h-screen bg-mainColor">
      <Suspense fallback={<div>Loading...</div>}>
        <TableCompetitions competitionsData={competitions} />
      </Suspense>
    </div>
  );
}
