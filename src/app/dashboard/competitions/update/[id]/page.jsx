import { getDetailCompetition } from '@/lib/actions/competitionAction';
import { getCategories } from '@/lib/actions/categoryAction';
import { getTypes } from '@/lib/actions/typeAction';
import { getOrganizations } from '@/lib/actions/organizationAction';
import FormUpdate from './FormUpdate';

export const metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
  ),
  title: 'Update Competition - Join Code',
  description:
    'The Application make a collaboration and competition for software developer',
  authors: [
    { name: 'Alfian Vito Anggoro', url: `${process.env.NEXT_PUBLIC_API_URL}` },
  ],
  icons: {
    icon: '/icon.png',
  },
  openGraph: {
    title: 'Update Competition',
    description: 'Update Competition - Join Code',
    url: `${process.env.NEXT_PUBLIC_API_URL}`,
    siteName: 'Update Competition',
  },
};

export default async function UpdateCompetitionPage(props) {
  const { params } = props;
  const responseDetailCompetition = await getDetailCompetition(params.id);
  const competition = responseDetailCompetition.data;
  const responseCategories = await getCategories();
  const categories = responseCategories.data;
  const responseTypes = await getTypes();
  const types = responseTypes.data;
  const responseOrganizations = await getOrganizations();
  const organizations = responseOrganizations.data;

  return (
    <div className="flex-1 bg-mainColor px-3">
      <div className="pt-3 mb-3">
        <h2 className="text-2xl font-medium">Update Competition</h2>
      </div>
      <FormUpdate
        competition={competition}
        categories={categories}
        types={types}
        organizations={organizations}
      />
    </div>
  );
}
