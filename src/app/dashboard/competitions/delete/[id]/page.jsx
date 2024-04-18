import dynamic from 'next/dynamic';
const Modal = dynamic(() => import('@/components/core/Modal'));
import Form from './Form';

export const metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
  ),
  title: 'Delete Competition - Join Code',
  description:
    'The Application make a collaboration and competition for software developer',
  authors: [
    { name: 'Alfian Vito Anggoro', url: `${process.env.NEXT_PUBLIC_API_URL}` },
  ],
  icons: {
    icon: '/icon.png',
  },
  openGraph: {
    title: 'Delete Competition',
    description: 'Delete Competition - Join Code',
    url: `${process.env.NEXT_PUBLIC_API_URL}`,
    siteName: 'Delete Competition',
  },
};

export default function DeleteCompetitionPage(props) {
  const { params } = props;
  return (
    <div className="flex-1 bg-white p-3 rounded-lg">
      <div className="pt-3 mb-3">
        <h2 className="text-2xl font-medium">Delete Competition</h2>
      </div>
      <Form id={params.id} />
    </div>
  );
}
