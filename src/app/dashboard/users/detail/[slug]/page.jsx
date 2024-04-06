import DetailSoftwareDeveloper from './DetailSoftwareDeveloper.jsx';
import DetailOrganization from './DetailOrganization.jsx';
import DetailAdmin from './DetailAdmin.jsx';
import { getDetailUser } from '@/lib/actions/userAction/';

export const metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
  ),
  title: 'Detail User - Join Code',
  description:
    'The Application make a collaboration and competition for software developer',
  authors: [
    { name: 'Alfian Vito Anggoro', url: `${process.env.NEXT_PUBLIC_API_URL}` },
  ],
  icons: {
    icon: '/icon.png',
  },
  openGraph: {
    title: 'Detail User',
    description: 'Detail User - Join Code',
    url: `${process.env.NEXT_PUBLIC_API_URL}`,
    siteName: 'Detail User',
  },
};
export default async function DetailUserPage({ params }) {
  const response = await getDetailUser(params.slug);
  const user = response.data;

  return (
    <div className="flex-1 bg-mainColor px-3">
      <div className="pt-3 mb-3">
        <h2 className="text-2xl font-medium">Detail User</h2>
      </div>
      <div className="p-3 bg-white space-y-3">
        {user ? (
          <>
            {user.roleId === 1 && <DetailSoftwareDeveloper user={user} />}
            {user.roleId === 2 && <DetailOrganization user={user} />}
            {user.roleId === 3 && <DetailAdmin user={user} />}
          </>
        ) : (
          <p>User not found</p>
        )}
      </div>
    </div>
  );
}
