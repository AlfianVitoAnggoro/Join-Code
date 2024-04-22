import Form from './Form';

export const metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
  ),
  title: 'Detail Competition - Join Code',
  description:
    'The Application make a collaboration and competition for software developer',
  authors: [
    { name: 'Alfian Vito Anggoro', url: `${process.env.NEXT_PUBLIC_API_URL}` },
  ],
  icons: {
    icon: '/icon.png',
  },
  openGraph: {
    title: 'Detail Competition',
    description: 'Detail Competition - Join Code',
    url: `${process.env.NEXT_PUBLIC_API_URL}`,
    siteName: 'Detail Competition',
  },
};

export default async function DetailCompetitionPage({ params }) {
  return (
    <div className="flex-1 bg-mainColor px-3 mb-5">
      <div className="pt-3 mb-3">
        <h2 className="text-2xl font-medium">Detail Competition</h2>
      </div>
      <Form id={params.id} />
    </div>
  );
}
