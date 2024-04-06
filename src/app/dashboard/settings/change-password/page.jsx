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

export default async function Page() {
  return (
    <div className="flex-1 bg-mainColor px-3">
      <div className="pt-3 mb-3">
        <h2 className="text-2xl font-medium">Change Password</h2>
      </div>
      <Form />
    </div>
  );
}
