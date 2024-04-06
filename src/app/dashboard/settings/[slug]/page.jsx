import FormOrganization from './FormOrganization';
import FormAdmin from './FormAdmin';
import { getUsers, getDetailUser } from '@/lib/actions/userAction';

export const metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
  ),
  title: 'Settings - Join Code',
  description:
    'The Application make a collaboration and competition for software developer',
  authors: [
    { name: 'Alfian Vito Anggoro', url: `${process.env.NEXT_PUBLIC_API_URL}` },
  ],
  icons: {
    icon: '/icon.png',
  },
  openGraph: {
    title: 'Settings',
    description: 'Settings - Join Code',
    url: `${process.env.NEXT_PUBLIC_API_URL}`,
    siteName: 'Settings',
  },
};

export default async function Page({ params }) {
  const [dataUsers, dataUser] = await Promise.all([
    getUsers(),
    getDetailUser(params.slug),
  ]);
  const users = dataUsers.data;
  const user = dataUser.data;
  return (
    <div className="flex-1 bg-mainColor px-3">
      <div className="pt-3 mb-3">
        <h2 className="text-2xl font-medium">Settings</h2>
      </div>
      {user ? (
        <>
          {user?.role.name === 'Organization' && (
            <FormOrganization users={users} user={user} />
          )}
          {user?.role.name === 'Admin' && (
            <FormAdmin users={users} user={user} />
          )}
        </>
      ) : (
        <p>User not found</p>
      )}
    </div>
  );
}
