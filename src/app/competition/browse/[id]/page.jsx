import Content from './Content';
import { getDetailCompetition } from '@/lib/actions/competitionAction';

export const metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
  ),
  title: 'Browse Competition - Join Code',
  description:
    'The Application make a collaboration and competition for software developer',
  authors: [
    { name: 'Alfian Vito Anggoro', url: `${process.env.NEXT_PUBLIC_API_URL}` },
  ],
  icons: {
    icon: '/icon.png',
  },
  openGraph: {
    title: 'Browse Competition',
    description: 'Browse Competition - Join Code',
    url: `${process.env.NEXT_PUBLIC_API_URL}`,
    siteName: 'Browse Competition',
  },
};

export default async function Page({ params }) {
  const response = await getDetailCompetition(params.id);
  const competition = response?.data;
  return (
    <>
      <Content competition={competition} competitionId={params.id} />
    </>
  );
}
