import Image from 'next/image';
import Form from './Form';
import { Suspense } from 'react';

export const metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
  ),
  title: 'Login - Join Code',
  description:
    'The Application make a collaboration and competition for software developer',
  authors: [
    { name: 'Alfian Vito Anggoro', url: `${process.env.NEXT_PUBLIC_API_URL}` },
  ],
  icons: {
    icon: '/icon.png',
  },
  openGraph: {
    title: 'Login',
    description: 'Login - Join Code',
    url: `${process.env.NEXT_PUBLIC_API_URL}`,
    siteName: 'Login',
  },
};

export default function LoginPages() {
  return (
    <div className="relative">
      <div className="max-w-[1024px] min-h-screen max-h-fit mx-auto px-10 flex justify-center items-center">
        <Suspense fallback={<div>Loading...</div>}>
          <Form />
          <div className="w-3/6 laptop:flex justify-center items-center hidden my-5">
            <Image
              src="/images/login.svg"
              width={200}
              height={200}
              alt="Login"
              className="w-auto h-96"
              priority
            />
          </div>
        </Suspense>
      </div>
    </div>
  );
}
