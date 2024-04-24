import Image from 'next/image';
import Link from 'next/link';

export default function ContentOrganization({ competition }) {
  return (
    <>
      <div className="bg-white rounded p-3">
        <h2 className="text-2xl font-bold">About Organization</h2>
        <div className="flex flex-col tablet:flex-row gap-y-2 tablet:gap-y-0 tablet:gap-x-3 py-2">
          <Image
            src={`https://atzxitftejquqppfauyh.supabase.co/storage/v1/object/public/avatars/public/${
              competition?.organization?.user?.avatar || 'default-avatar.png'
            }`}
            width={50}
            height={50}
            alt="avatar"
            priority
            className="rounded-full object-cover w-24 h-24"
          />
          <div className="flex flex-col">
            <h3 className="text-lg font-semibold text-wrap">
              {competition?.organization?.user?.name}
            </h3>
            {competition?.organization?.address ? (
              <p className="text-sm text-black text-wrap">
                {competition?.organization?.address}
              </p>
            ) : (
              <p className="text-sm text-neutral-500">
                Address is not available
              </p>
            )}
            {competition?.organization?.organizationLink ? (
              <Link
                href={competition?.organization?.organizationLink}
                target="_blank"
                className="text-blue-700 text-sm text-wrap"
              >
                {competition?.organization?.organizationLink}
              </Link>
            ) : (
              <p className="text-sm text-neutral-500">
                Organization Link is not available
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
