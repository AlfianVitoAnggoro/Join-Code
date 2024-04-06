import Content from './content';
export const metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
  ),
  title: 'Dashboard - Join Code',
  description:
    'The Application make a collaboration and competition for software developer',
  authors: [
    { name: 'Alfian Vito Anggoro', url: `${process.env.NEXT_PUBLIC_API_URL}` },
  ],
  icons: {
    icon: '/icon.png',
  },
  openGraph: {
    title: 'Dashboard',
    description: 'Dashboard - Join Code',
    url: `${process.env.NEXT_PUBLIC_API_URL}`,
    siteName: 'Dashboard',
  },
};
export default function DashboardPages() {
  return (
    <div className="flex-1 bg-mainColor">
      <div className="w-full border-b-2 border-neutral-300 bg-white py-5 px-3">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
      </div>
      <Content />
    </div>
  );
}
