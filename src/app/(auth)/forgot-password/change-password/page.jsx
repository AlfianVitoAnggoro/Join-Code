import Image from 'next/image';
import Form from './Form';
import { Suspense } from 'react';

export const metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
  ),
  title: 'Forgot Password - Join Code',
  description:
    'The Application make a collaboration and competition for software developer',
  authors: [
    { name: 'Alfian Vito Anggoro', url: `${process.env.NEXT_PUBLIC_API_URL}` },
  ],
  icons: {
    icon: '/icon.png',
  },
  openGraph: {
    title: 'Forgot Password',
    description: 'Forgot Password - Join Code',
    url: `${process.env.NEXT_PUBLIC_API_URL}`,
    siteName: 'Login',
  },
};

export default function Page() {
  return (
    <div className="relative">
      <div className="max-w-[1024px] min-h-screen max-h-fit mx-auto px-10 flex justify-center items-center gap-2">
        <Suspense fallback={<div>Loading...</div>}>
          <div className="w-full tablet:w-3/6 laptop:flex justify-center items-center hidden my-5">
            <Image
              src="/images/forgot_password.svg"
              width={200}
              height={200}
              alt="Login"
              className="w-auto h-96"
              priority
            />
          </div>
          <Form />
        </Suspense>
      </div>
    </div>
  );
}
