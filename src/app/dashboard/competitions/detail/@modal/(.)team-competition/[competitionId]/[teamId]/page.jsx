import dynamic from 'next/dynamic';
const Modal = dynamic(() =>
  import('../../../../../../../../components/core/Modal'),
);
import Form from './Form';

export const metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
  ),
  title: 'Detail Team Competition - Join Code',
  description:
    'The Application make a collaboration and competition for software developer',
  authors: [
    { name: 'Alfian Vito Anggoro', url: `${process.env.NEXT_PUBLIC_API_URL}` },
  ],
  icons: {
    icon: '/icon.png',
  },
  openGraph: {
    title: 'Detail Team Competition',
    description: 'Detail Team Competition - Join Code',
    url: `${process.env.NEXT_PUBLIC_API_URL}`,
    siteName: 'Detail Team Competition',
  },
};

export default async function TeamCompetitionPage({ params }) {
  return (
    <Modal>
      <div className="flex-1 px-3 bg-white rounded-lg">
        <div className="pt-3 mb-3">
          <h2 className="text-2xl font-medium">Detail Team Competition</h2>
        </div>
        <Form competitionId={params.competitionId} teamId={params.teamId} />
      </div>
    </Modal>
  );
}
