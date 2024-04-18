import Form from './Form';

export const metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
  ),
  title: 'Delete User - Join Code',
  description:
    'The Application make a collaboration and competition for software developer',
  authors: [
    { name: 'Alfian Vito Anggoro', url: `${process.env.NEXT_PUBLIC_API_URL}` },
  ],
  icons: {
    icon: '/icon.png',
  },
  openGraph: {
    title: 'Delete User',
    description: 'Delete User - Join Code',
    url: `${process.env.NEXT_PUBLIC_API_URL}`,
    siteName: 'Delete User',
  },
};

export default function DeleteUserPage({ params }) {
  return (
    <div className="flex-1 bg-white p-3 rounded-lg">
      <div className="pt-3 mb-3">
        <h2 className="text-2xl font-medium">Delete User</h2>
      </div>
      <Form slug={params.slug} />
    </div>
  );
}
