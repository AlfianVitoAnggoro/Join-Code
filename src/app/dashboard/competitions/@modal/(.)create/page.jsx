import dynamic from 'next/dynamic';
const Modal = dynamic(() => import('../../../../../components/core/Modal'));
import FormCreate from './FormCreate';
import { getCategories } from '@/lib/actions/categoryAction';
import { getTypes } from '@/lib/actions/typeAction';
import { getOrganizations } from '@/lib/actions/organizationAction';

export const metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
  ),
  title: 'Create Competition - Join Code',
  description:
    'The Application make a collaboration and competition for software developer',
  authors: [
    { name: 'Alfian Vito Anggoro', url: `${process.env.NEXT_PUBLIC_API_URL}` },
  ],
  icons: {
    icon: '/icon.png',
  },
  openGraph: {
    title: 'Create Competition',
    description: 'Create Competition - Join Code',
    url: `${process.env.NEXT_PUBLIC_API_URL}`,
    siteName: 'Create Competition',
  },
};

export default async function CreateCompetitionPage() {
  const responseCategories = await getCategories();
  const categories = responseCategories.data;
  const responseTypes = await getTypes();
  const types = responseTypes.data;
  const responseOrganizations = await getOrganizations();
  const organizations = responseOrganizations.data;
  return (
    <Modal>
      <div className="flex-1 px-3 bg-white rounded-lg">
        <div className="pt-3 mb-3">
          <h2 className="text-2xl font-medium">Create Competition</h2>
        </div>
        <FormCreate
          categories={categories}
          types={types}
          organizations={organizations}
        />
      </div>
    </Modal>
  );
}
