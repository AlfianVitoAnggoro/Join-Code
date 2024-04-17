import Image from 'next/image';
import Form from './Form';

export const metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
  ),
  title: 'Register Organization - Join Code',
  description:
    'The Application make a collaboration and competition for software developer',
  authors: [
    { name: 'Alfian Vito Anggoro', url: `${process.env.NEXT_PUBLIC_API_URL}` },
  ],
  icons: {
    icon: '/icon.png',
  },
  openGraph: {
    title: 'Register Organization',
    description: 'Register Organization - Join Code',
    url: `${process.env.NEXT_PUBLIC_API_URL}`,
    siteName: 'Register Organization',
  },
};

export default async function RegisterOrganizationPages() {
  return (
    <div className="relaltive laptop:mt-20">
      <div className="max-w-[1024px] mx-auto min-h-fit flex justify-center items-center px-10">
        <div className="w-full tablet:w-3/6 laptop:flex justify-center items-center hidden my-5">
          <Image
            src="/images/register_organization.svg"
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
