import { getLeaderboardFilterByDate } from '@/lib/actions/leaderboardAction';
import Table from './Table';

export const metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
  ),
  title: 'Leaderboard - Join Code',
  description:
    'The Application make a collaboration and competition for software developer',
  authors: [
    { name: 'Alfian Vito Anggoro', url: `${process.env.NEXT_PUBLIC_API_URL}` },
  ],
  icons: {
    icon: '/icon.png',
  },
  openGraph: {
    title: 'Leaderboard',
    description: 'Leaderboard - Join Code',
    url: `${process.env.NEXT_PUBLIC_API_URL}`,
    siteName: 'Leaderboard',
  },
};

export default async function LeaderboardPages() {
  const nowDate = new Date();
  const response = await getLeaderboardFilterByDate(nowDate);
  const leaderboard = response.data;
  return (
    <div className="relative min-h-screen py-3 laptop:mt-20">
      <div className="w-[1024px] mx-auto px-10">
        <Table leaderboard={leaderboard} />
      </div>
    </div>
  );
}
