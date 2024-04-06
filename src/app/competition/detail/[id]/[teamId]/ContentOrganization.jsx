import Image from 'next/image';
import Link from 'next/link';

export default function ContentOrganization({ competition }) {
  return (
    <>
      <div className="bg-white rounded p-3">
        <h2 className="text-2xl font-bold">About Organization</h2>
        <div className="flex gap-x-3 py-2">
          <Image
            src={`/images/avatars/${competition.organization.user.avatar}`}
            width={50}
            height={50}
            alt="Avatar"
            priority
            className="rounded-full object-cover w-24 h-24"
          />
          <div className="flex flex-col">
            <h3 className="text-lg font-semibold ">
              {competition.organization.user.name}
            </h3>
            {competition?.organization?.address ? (
              <p className="text-sm text-black">
                {competition?.organization?.address}
              </p>
            ) : (
              <p className="text-sm text-neutral-500">alamat tidak tersedia</p>
            )}
            {competition?.organization?.organizationLink ? (
              <Link
                href={competition?.organization?.organizationLink}
                className="text-blue-700 text-sm"
              >
                {competition?.organization?.organizationLink}
              </Link>
            ) : (
              <p className="text-sm text-neutral-500">
                link organisasi tidak tersedia
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
