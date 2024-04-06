import Form from './Form';
import { getSkills } from '@/lib/actions/skillAction';
import { getDetailUser } from '@/lib/actions/userAction';

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

export default async function ProfileSettingsPage({ params }) {
  const resUser = await getDetailUser(params.slug);
  const user = resUser.data;
  const resSkill = await getSkills();
  const skills = resSkill.data;

  return (
    <div className="col-span-9 laptop:col-span-6 bg-white rounded h-max flex flex-col gap-3 p-3">
      <div className="border-b-2 border-neutral-500 py-3">
        <h2 className="text-3xl font-semibold">Profile</h2>
      </div>
      <Form user={user} skills={skills} />
    </div>
  );
}
