import dynamic from 'next/dynamic';
const Modal = dynamic(() => import('../../../../../../components/core/Modal'));
import FormDelete from './FormDelete';

export const metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
  ),
  title: 'Delete Badge - Join Code',
  description:
    'The Application make a collaboration and competition for software developer',
  authors: [
    { name: 'Alfian Vito Anggoro', url: `${process.env.NEXT_PUBLIC_API_URL}` },
  ],
  icons: {
    icon: '/icon.png',
  },
  openGraph: {
    title: 'Delete Badge',
    description: 'Delete Badge - Join Code',
    url: `${process.env.NEXT_PUBLIC_API_URL}`,
    siteName: 'Delete Badge',
  },
};

export default function DeleteBadgePage({ params }) {
  return (
    <Modal>
      <div className="flex-1 bg-white p-3 rounded-lg">
        <div className="pt-3 mb-3">
          <h2 className="text-2xl font-medium">Delete Badge</h2>
        </div>
        <FormDelete badgeId={params.id} />
      </div>
    </Modal>
  );
}
