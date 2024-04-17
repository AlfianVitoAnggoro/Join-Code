import Profile from './Profile';
import { getDetailUser } from '@/lib/actions/userAction';

export const metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
  ),
  title: 'Profile - Join Code',
  description:
    'The Application make a collaboration and competition for software developer',
  authors: [
    { name: 'Alfian Vito Anggoro', url: `${process.env.NEXT_PUBLIC_API_URL}` },
  ],
  icons: {
    icon: '/icon.png',
  },
  openGraph: {
    title: 'Profile',
    description: 'Profile - Join Code',
    url: `${process.env.NEXT_PUBLIC_API_URL}`,
    siteName: 'Profile',
  },
};

export default async function Page({ params }) {
  const res = await getDetailUser(params.slug);
  const user = res.data;
  return (
    <div className="relative laptop:mt-20">
      <Profile user={user} />
    </div>
  );
}
