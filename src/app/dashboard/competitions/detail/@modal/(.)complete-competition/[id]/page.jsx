import dynamic from 'next/dynamic';
const Modal = dynamic(() =>
  import('../../../../../../../components/core/Modal'),
);
import FormSubmit from './FormSubmit';
import { getTeamCompetitionByFilter } from '@/lib/actions/teamCompetitionAction';

export const metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
  ),
  title: 'Complete Competition - Join Code',
  description:
    'The Application make a collaboration and competition for software developer',
  authors: [
    { name: 'Alfian Vito Anggoro', url: `${process.env.NEXT_PUBLIC_API_URL}` },
  ],
  icons: {
    icon: '/icon.png',
  },
  openGraph: {
    title: 'Complete Competition',
    description: 'Complete Competition - Join Code',
    url: `${process.env.NEXT_PUBLIC_API_URL}`,
    siteName: 'Complete Competition',
  },
};

export default async function CompleteCompetitionPage(props) {
  const { params } = props;
  const responseTeamCompetitionByFilter = await getTeamCompetitionByFilter(
    params.id,
  );
  const teamCompetitions = responseTeamCompetitionByFilter.data;
  return (
    <Modal>
      <div className="flex-1 px-3 bg-white rounded-lg">
        <div className="pt-3 mb-3">
          <h2 className="text-2xl font-medium">Complete The Competition</h2>
        </div>
        <FormSubmit teamCompetitions={teamCompetitions} id={params.id} />
      </div>
    </Modal>
  );
}
