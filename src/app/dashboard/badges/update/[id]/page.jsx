import FormUpdate from './FormUpdate';
import { getDetailBadge } from '@/lib/actions/badgeAction';

export const metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
  ),
  title: 'Update Badge - Join Code',
  description:
    'The Application make a collaboration and competition for software developer',
  authors: [
    { name: 'Alfian Vito Anggoro', url: `${process.env.NEXT_PUBLIC_API_URL}` },
  ],
  icons: {
    icon: '/icon.png',
  },
  openGraph: {
    title: 'Update Badge',
    description: 'Update Badge - Join Code',
    url: `${process.env.NEXT_PUBLIC_API_URL}`,
    siteName: 'Update Badge',
  },
};

export default async function UpdateBadgeModal({ params }) {
  const data = await getDetailBadge(params.id);
  const badge = data.data;
  return (
    <div className="flex-1 px-3 bg-white rounded-lg">
      <div className="pt-3 mb-3">
        <h2 className="text-2xl font-medium">Update Badge</h2>
      </div>
      <FormUpdate badge={badge} />
    </div>
  );
}
