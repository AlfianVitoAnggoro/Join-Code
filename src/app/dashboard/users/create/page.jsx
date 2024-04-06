import dynamic from 'next/dynamic';
import FormCreate from './FormCreate';
import { getRoles } from '@/lib/actions/roleAction/';

export const metadata = {
  title: 'Create User - Join Code',
  description: 'Dashboard Create User - Join Code',
  icons: {
    icon: '/icon.png',
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
