export const metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
  ),
  title: 'Competitions - Join Code',
  description:
    'The Application make a collaboration and competition for software developer',
  authors: [
    { name: 'Alfian Vito Anggoro', url: `${process.env.NEXT_PUBLIC_API_URL}` },
  ],
  icons: {
    icon: '/icon.png',
  },
  openGraph: {
    title: 'Competitions',
    description: 'Competitions - Join Code',
    url: `${process.env.NEXT_PUBLIC_API_URL}`,
    siteName: 'Competitions',
  },
};

export default async function CompetitionPage() {
  return (
    <div className="hidden col-span-3 laptop:flex flex-col gap-3">
      <div className="bg-white rounded p-3 h-screen flex justify-center items-center ">
        <p className="text-neutral-500 italic">
          You have not chosen a competition yet
        </p>
      </div>
    </div>
  );
}
