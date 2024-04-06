import dynamic from 'next/dynamic';
const Modal = dynamic(() =>
  import('../../../../../../../../components/core/Modal'),
);
import { getDetailTeamCompetition } from '@/lib/actions/teamCompetitionAction';

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

export default async function TeamCompetitionPage(props) {
  const { params } = props;
  const competitionId = params.competitionId;
  const teamId = params.teamId;

  const responseDetailTeamCompetition = await getDetailTeamCompetition(
    competitionId,
    teamId,
  );
  const teamCompetition = responseDetailTeamCompetition.data;
  return (
    <Modal>
      <div className="flex-1 px-3 bg-white rounded-lg">
        <div className="pt-3 mb-3">
          <h2 className="text-2xl font-medium">Detail Team Competition</h2>
        </div>
        <div className="p-3 overflow-y-auto max-h-[80vh] min-h-[fit] w-[70vw]">
          <div className="flex flex-col laptop:flex-row gap-2">
            <div className="basis-1/2 space-y-2">
              <div className="flex flex-col">
                <h3 className="text-lg font-medium">Team Name</h3>
                {teamCompetition?.team?.name ? (
                  <p className="text-base font-normal">
                    {teamCompetition?.team?.name}
                  </p>
                ) : (
                  <p className="text-base font-normal text-neutral-500">-</p>
                )}
              </div>
              <div className="flex flex-col">
                <h3 className="text-lg font-medium">Link Project :</h3>
                {teamCompetition?.projectLink ? (
                  <p className="text-base font-normal">
                    {teamCompetition?.projectLink}
                  </p>
                ) : (
                  <p className="text-base font-normal text-neutral-500">
                    belum tersedia
                  </p>
                )}
              </div>
              <div className="flex flex-col">
                <h3 className="text-lg font-medium">Link Repository :</h3>
                {teamCompetition?.repositoryLink ? (
                  <p className="text-base font-normal">
                    {teamCompetition?.repositoryLink}
                  </p>
                ) : (
                  <p className="text-base font-normal text-neutral-500">
                    belum tersedia
                  </p>
                )}
              </div>
              <div className="flex flex-col">
                <h3 className="text-lg font-medium">Bukti Pembayaran :</h3>
                {teamCompetition?.proofOfPayment ? (
                  <a
                    href={`/images/proofOfPayments/${teamCompetition?.proofOfPayment}`}
                    className="text-base font-normal text-blue-500"
                    target="_blank"
                  >
                    File Bukti Pembayaran
                  </a>
                ) : (
                  <p className="text-base font-normal text-neutral-500">
                    belum tersedia
                  </p>
                )}
              </div>
            </div>
            <div className="basis-1/2 space-y-2">
              <div className="flex flex-col">
                <h3 className="text-lg font-medium">Accepted :</h3>
                {teamCompetition?.isAccepted ? (
                  <p className="text-base font-normal">Yes</p>
                ) : (
                  <p className="text-base font-normal">No</p>
                )}
              </div>
              <div className="flex flex-col">
                <h3 className="text-lg font-medium">Ranking :</h3>
                {teamCompetition?.ranking ? (
                  <p className="text-base font-normal">
                    {teamCompetition?.ranking}
                  </p>
                ) : (
                  <p className="text-base font-normal text-neutral-500">
                    belum tersedia
                  </p>
                )}
              </div>
              <div className="flex flex-col">
                <h3 className="text-lg font-medium">Status :</h3>
                {teamCompetition?.statusTeamCompetition?.name ? (
                  <p className="text-base font-normal">
                    {teamCompetition?.statusTeamCompetition?.name}
                  </p>
                ) : (
                  <p className="text-base font-normal text-neutral-500">
                    belum tersedia
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-col mt-3">
            <h3 className="text-lg font-medium">List Member of team</h3>
            <table className="table-auto min-w-full">
              <thead className="bg-neutral-200 text-black font-bold text-sm text-left uppercase tracking-wider border-b border-gray-200">
                <tr>
                  <th className="py-3 text-center">NO</th>
                  <th className="py-3 text-center">Name</th>
                  <th className="py-3 text-center">Email</th>
                  <th className="py-3 text-center">Point</th>
                </tr>
              </thead>
              <tbody>
                {teamCompetition?.team?.softwareDevelopers.map(
                  (softwareDeveloper, index) => (
                    <tr
                      className="odd:bg-neutral-100 even:bg-neutral-200 hover:bg-neutral-300 transition-colors duration-200 border-b border-gray-200"
                      key={index}
                    >
                      <td className="py-2 text-center whitespace-nowrap">
                        {index++ + 1}
                      </td>
                      <td className="py-2 text-center whitespace-nowrap">
                        {softwareDeveloper?.softwareDeveloper?.user?.name}
                      </td>
                      <td className="py-2 text-center whitespace-nowrap">
                        {softwareDeveloper?.softwareDeveloper?.user?.email}
                      </td>
                      <td className="py-2 text-center whitespace-nowrap">
                        {softwareDeveloper?.softwareDeveloper?.point}
                      </td>
                    </tr>
                  ),
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Modal>
  );
}
