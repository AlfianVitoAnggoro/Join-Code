import Form from './Form';

export const metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
  ),
  title: 'Change Password - Join Code',
  description:
    'The Application make a collaboration and competition for software developer',
  authors: [
    { name: 'Alfian Vito Anggoro', url: `${process.env.NEXT_PUBLIC_API_URL}` },
  ],
  icons: {
    icon: '/icon.png',
  },
  openGraph: {
    title: 'Change Password',
    description: 'Change Password - Join Code',
    url: `${process.env.NEXT_PUBLIC_API_URL}`,
    siteName: 'Change Password',
  },
};
export default function ChangePasswordSettingsPage() {
  return (
    <div className="col-span-9 laptop:col-span-6 bg-white rounded h-max flex flex-col gap-3 p-3">
      <div className="border-b-2 border-neutral-500 py-3">
        <h2 className="text-3xl font-semibold">Change Password</h2>
      </div>
      <Form />
    </div>
  );
}
