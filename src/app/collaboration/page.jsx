import { getSoftwareDevelopers } from '@/lib/actions/softwareDeveloperAction';
import Content from './Content';

export const metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
  ),
  title: 'Collaborations - Join Code',
  description:
    'The Application make a collaboration and competition for software developer',
  authors: [
    { name: 'Alfian Vito Anggoro', url: `${process.env.NEXT_PUBLIC_API_URL}` },
  ],
  icons: {
    icon: '/icon.png',
  },
  openGraph: {
    title: 'Collaborations',
    description: 'Collaborations - Join Code',
    url: `${process.env.NEXT_PUBLIC_API_URL}`,
    siteName: 'Collaborations',
  },
};

export default async function CollaborationPages() {
  const responseSoftwareDevelopers = await getSoftwareDevelopers();
  const softwareDevelopers = responseSoftwareDevelopers.data;

  return (
    <div className="relative min-h-screen py-3 laptop:mt-20">
      <div className="w-[1024px] mx-auto px-10">
        <Content softwareDevelopersData={softwareDevelopers} />
      </div>
    </div>
  );
}
