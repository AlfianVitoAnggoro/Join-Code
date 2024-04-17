import Image from 'next/image';
import Form from './Form';

export const metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
  ),
  title: 'Register Software Developer - Join Code',
  description:
    'The Application make a collaboration and competition for software developer',
  authors: [
    { name: 'Alfian Vito Anggoro', url: `${process.env.NEXT_PUBLIC_API_URL}` },
  ],
  icons: {
    icon: '/icon.png',
  },
  openGraph: {
    title: 'Register Software Developer',
    description: 'Register Software Developer - Join Code',
    url: `${process.env.NEXT_PUBLIC_API_URL}`,
    siteName: 'Register Software Developer',
  },
};

export default async function RegisterSoftwareDeveloperPages() {
  return (
    <div className="relative laptop:mt-20">
      <div className="max-w-[1024px] mx-auto px-10 min-h-full flex justify-center items-center">
        <div className="w-full tablet:w-3/6 laptop:flex justify-center items-center hidden my-5">
          <Image
            src="/images/register_software_developer.svg"
            width={200}
            height={200}
            alt="register_software_developer"
            className="w-auto h-96"
            priority
          />
        </div>
        <div className="w-full tablet:w-3/6 my-5">
          <Form />
        </div>
      </div>
    </div>
  );
}
