'use client';
import { useSession } from 'next-auth/react';

export default function Content() {
  const { data: session, status } = useSession();
  return (
    <div className="px-3 py-5">
      <h2 className="text-xl font-medium">
        Welcome to Dashboard, {session?.user?.name} 🙌
      </h2>
    </div>
  );
}
