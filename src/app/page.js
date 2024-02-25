import { Permanent_Marker } from 'next/font/google';

const permanent_Marker = Permanent_Marker({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-permanent-marker',
});

export const metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
  ),
  title: 'Join Code',
  description:
    'The Application make a collaboration and competition for software developer',
  authors: [
    { name: 'Alfian Vito Anggoro', url: `${process.env.NEXT_PUBLIC_API_URL}` },
  ],
  icons: {
    icon: '/icon.png',
  },
  openGraph: {
    title: 'Home',
    description: 'Home - Join Code',
    url: `${process.env.NEXT_PUBLIC_API_URL}`,
    siteName: 'Home',
  },
};

export default function Home() {
  return (
    <div className="relative min-h-screen laptop:mt-20">
      <div className="w-[1024px] h-screen px-10 mx-auto flex flex-col items-center justify-center">
        <h1 className={`${permanent_Marker.className} text-8xl text-center`}>
          JOIN CODE
        </h1>
        <p className="text-xl text-center text-wrap mt-4">
          Up Your Skill With{' '}
          <span className="font-bold"> Collaboration and Competition </span>
          For Make Amazing Inovation Together
        </p>
      </div>
      <div className="bg-black h-screen flex justify-center items-center">
        <div className="w-[1024px] p-10 mx-auto flex flex-col justify-center items-center">
          <h2 className="font-semibold mb-3 text-5xl text-center text-white">
            Collaboration
          </h2>
          <p className="text-center text-xl text-white">
            Collaboration is the process of two or more people, entities or
            organizations working together to complete a task or achieve a goal.
            Collaboration is similar to cooperation. Most collaboration requires
            leadership, although the form of leadership can be social within a
            decentralized and egalitarian group.{' '}
          </p>
        </div>
      </div>
      <div className="bg-white h-screen flex justify-center items-center">
        <div className="w-[1024px] p-10 mx-auto flex flex-col justify-center items-center">
          <h2 className="font-semibold mb-3 text-5xl text-center text-black">
            Competition
          </h2>
          <p className="text-center text-xl text-black">
            Collaboration is the process of two or more people, entities or
            organizations working together to complete a task or achieve a goal.
            Collaboration is similar to cooperation. Most collaboration requires
            leadership, although the form of leadership can be social within a
            decentralized and egalitarian group.{' '}
          </p>
        </div>
      </div>
      <div className="bg-neutral-200 h-screen flex justify-center items-center">
        <div className="w-[1024px] p-10 mx-auto flex flex-col justify-center items-center">
          <h2 className="font-semibold mb-3 text-5xl text-center text-black">
            Leaderboard
          </h2>
          <p className="text-center text-xl text-black">
            Leaderboard is the process of two or more people, entities or
            organizations working together to complete a task or achieve a goal.
            Collaboration is similar to cooperation. Most collaboration requires
            leadership, although the form of leadership can be social within a
            decentralized and egalitarian group.{' '}
          </p>
        </div>
      </div>
    </div>
  );
}
