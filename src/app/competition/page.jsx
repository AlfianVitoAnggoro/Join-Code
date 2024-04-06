import { getCompetitionByRegistrationDate } from '@/lib/actions/competitionAction';
import Content from './Content';

export const metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
  ),
  title: 'Competitions - Join Code',
  description:
    'The Application make a collaboration and competition for software developer',
  authors: [
    { name: 'Alfian Vito Anggoro', url: `${process.env.NEXT_PUBLIC_API_URL}` },
  ],
  icons: {
    icon: '/icon.png',
  },
  openGraph: {
    title: 'Competitions',
    description: 'Competitions - Join Code',
    url: `${process.env.NEXT_PUBLIC_API_URL}`,
    siteName: 'Competitions',
  },
};

export default async function CompetitionPage() {
  const nowDate = new Date();
  const responseCompetition = await getCompetitionByRegistrationDate(nowDate);
  const competitions = responseCompetition.data;

  return (
    <>
      <Content competitionsData={competitions} />
    </>
  );
}
