import FormCreate from './FormCreate';
import { getRoles } from '@/lib/actions/roleAction/';

export const metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
  ),
  title: 'Create User - Join Code',
  description:
    'The Application make a collaboration and competition for software developer',
  authors: [
    { name: 'Alfian Vito Anggoro', url: `${process.env.NEXT_PUBLIC_API_URL}` },
  ],
  icons: {
    icon: '/icon.png',
  },
  openGraph: {
    title: 'Create User',
    description: 'Create User - Join Code',
    url: `${process.env.NEXT_PUBLIC_API_URL}`,
    siteName: 'Detail Competition',
  },
};
export default async function CreateUserPage() {
  const dataRoles = await getRoles();
  const roles = dataRoles.data;

  return (
    <div className="flex-1 px-3 bg-white rounded-lg">
      <div className="pt-3 mb-3">
        <h2 className="text-2xl font-medium">Create User</h2>
      </div>
      <FormCreate roles={roles} />
    </div>
  );
}
