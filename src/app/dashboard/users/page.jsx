import { getUsers } from '@/lib/actions/userAction/index.js';
import TableUsers from './TableUsers';
import { Suspense } from 'react';

export const metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
  ),
  title: 'Users Dashboard - Join Code',
  description:
    'The Application make a collaboration and competition for software developer',
  authors: [
    { name: 'Alfian Vito Anggoro', url: `${process.env.NEXT_PUBLIC_API_URL}` },
  ],
  icons: {
    icon: '/icon.png',
  },
  openGraph: {
    title: 'Users Dashboard',
    description: 'Users Dashboard - Join Code',
    url: `${process.env.NEXT_PUBLIC_API_URL}`,
    siteName: 'Users Dashboard',
  },
};

export default async function UsersDashboardPages() {
  const res = await getUsers();
  const users = res.data;

  return (
    <div className="flex-1 min-h-screen bg-mainColor">
      <Suspense fallback={<div>Loading...</div>}>
        <TableUsers users={users} />
      </Suspense>
    </div>
  );
}
