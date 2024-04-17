import { getDetailSoftwareDeveloperStatusTeamCompetitionFinish } from '@/lib/actions/softwareDeveloperAction';
import Content from './Content';
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

  return (
    <div className="relative laptop:mt-20">
      <Content user={user} />
    </div>
  );
}
