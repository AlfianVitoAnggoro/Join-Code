import { getBadge } from '@/lib/actions/badgeAction';
import TableBadges from './TableBadges';

export const metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
  ),
  title: 'Badges Dashboard - Join Code',
  description:
    'The Application make a collaboration and competition for software developer',
  authors: [
    { name: 'Alfian Vito Anggoro', url: `${process.env.NEXT_PUBLIC_API_URL}` },
  ],
  icons: {
    icon: '/icon.png',
  },
  openGraph: {
    title: 'Badges Dashboard',
    description: 'Badges Dashboard - Join Code',
    url: `${process.env.NEXT_PUBLIC_API_URL}`,
    siteName: 'Badges Dashboard',
  },
};

export default async function BadgesDashboardPages() {
  const badgesData = await getBadge();
  const badges = badgesData.data;

  return (
    <div className="flex-1 bg-mainColor">
      <TableBadges badges={badges} />
    </div>
  );
}
