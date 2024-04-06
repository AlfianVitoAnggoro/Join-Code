import UpdateSoftwareDeveloper from './UpdateSoftwareDeveloper';
import UpdateOrganization from './UpdateOrganization';
import UpdateAdmin from './UpdateAdmin';
import { getUsers, getDetailUser } from '@/lib/actions/userAction';
import { getSkills } from '@/lib/actions/skillAction';

export const metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
  ),
  title: 'Update User - Join Code',
  description:
    'The Application make a collaboration and competition for software developer',
  authors: [
    { name: 'Alfian Vito Anggoro', url: `${process.env.NEXT_PUBLIC_API_URL}` },
  ],
  icons: {
    icon: '/icon.png',
  },
  openGraph: {
    title: 'Update User',
    description: 'Update User - Join Code',
    url: `${process.env.NEXT_PUBLIC_API_URL}`,
    siteName: 'Update User',
  },
};

export default async function UpdateUserPage({ params }) {
  const [dataUsers, dataUser, dataSkills] = await Promise.all([
    getUsers(),
    getDetailUser(params.slug),
    getSkills(),
  ]);
  const users = dataUsers.data;
  const user = dataUser.data;
  const skills = dataSkills.data;
  return (
    <div className="flex-1 bg-mainColor px-3">
      <div className="pt-3 mb-3">
        <h2 className="text-2xl font-medium">Update User</h2>
      </div>
      {user ? (
        <>
          {user.role.name === 'Software Developer' && (
            <UpdateSoftwareDeveloper
              users={users}
              user={user}
              skills={skills}
            />
          )}
          {user.role.name === 'Organization' && (
            <UpdateOrganization users={users} user={user} />
          )}
          {user.role.name === 'Admin' && (
            <UpdateAdmin users={users} user={user} />
          )}
        </>
      ) : (
        <p>User not found</p>
      )}
    </div>
  );
}
