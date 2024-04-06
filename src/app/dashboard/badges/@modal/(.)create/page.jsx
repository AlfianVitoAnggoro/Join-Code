import dynamic from 'next/dynamic';
const Modal = dynamic(() => import('../../../../../components/core/Modal'));
import FormCreate from './FormCreate';

export const metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
  ),
  title: 'Create Badge - Join Code',
  description:
    'The Application make a collaboration and competition for software developer',
  authors: [
    { name: 'Alfian Vito Anggoro', url: `${process.env.NEXT_PUBLIC_API_URL}` },
  ],
  icons: {
    icon: '/icon.png',
  },
  openGraph: {
    title: 'Create Badge',
    description: 'Create Badge - Join Code',
    url: `${process.env.NEXT_PUBLIC_API_URL}`,
    siteName: 'Create Badge',
  },
};

export default function CreateBadgePage() {
  return (
    <Modal>
      <div className="flex-1 px-3 bg-white rounded-lg">
        <div className="pt-3 mb-3">
          <h2 className="text-2xl font-medium">Create Badge</h2>
        </div>
        <FormCreate />
      </div>
    </Modal>
  );
}
