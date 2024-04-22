import Image from 'next/image';
import Link from 'next/link';

export default async function DetailOrganization(props) {
  const { user } = props;
  return (
    <div className="grid grid-cols-5 gap-2">
      <div className="col-span-5 tablet:col-span-1">
        <Image
          src={`https://atzxitftejquqppfauyh.supabase.co/storage/v1/object/public/avatars/public/${user?.avatar}`}
          width={50}
          height={50}
          alt="image-user"
          priority
          className="rounded-full object-cover w-36 h-36"
        />
      </div>
      <div className="col-span-5 tablet:col-span-4 flex flex-col gap-y-1">
        <div className="flex flex-col">
          <h3 className="text-lg font-medium">Nama :</h3>
          {user?.name ? (
            <p className="text-base font-normal">{user?.name}</p>
          ) : (
            <p className="text-base font-normal">-</p>
          )}
        </div>
        <div className="flex flex-col">
          <h3 className="text-lg font-medium">Nickname :</h3>
          {user?.nickname ? (
            <p className="text-base font-normal">{user?.nickname}</p>
          ) : (
            <p className="text-base font-normal">-</p>
          )}
        </div>
        <div className="flex flex-col">
          <h3 className="text-lg font-medium">Email :</h3>
          {user?.email ? (
            <p className="text-base font-normal">{user?.email}</p>
          ) : (
            <p className="text-base font-normal">-</p>
          )}
        </div>
        <div className="flex flex-col">
          <h3 className="text-lg font-medium">Role :</h3>
          {user?.role?.name ? (
            <p className="text-base font-normal">{user.role?.name}</p>
          ) : (
            <p className="text-base font-normal">-</p>
          )}
        </div>
        <div className="flex flex-col">
          <h3 className="text-lg font-medium">Address :</h3>
          {user?.organizations?.address ? (
            <p className="text-base font-normal">
              {user.organizations?.address}
            </p>
          ) : (
            <p className="text-base font-normal">-</p>
          )}
        </div>
        <div className="flex flex-col">
          <h3 className="text-lg font-medium">Organization Link :</h3>
          {user?.organizations?.organizationLink ? (
            <p className="text-base font-normal text-blue-500">
              <Link href={user?.organizations?.organizationLink}>
                {user?.organizations?.organizationLink}
              </Link>
            </p>
          ) : (
            <p className="text-base font-normal">-</p>
          )}
        </div>
        <div className="flex flex-col">
          <h3 className="text-lg font-medium">Document Support :</h3>
          {user?.organizations?.document ? (
            <Link
              href={`https://atzxitftejquqppfauyh.supabase.co/storage/v1/object/public/documents/public/${user?.organizations?.document}`}
              target="_blank"
              className="text-base font-normal text-blue-500"
            >
              File Document Support
            </Link>
          ) : (
            <p className="text-base font-normal">-</p>
          )}
        </div>
        <div className="flex flex-col mt-2">
          <h2 className="text-xl font-bold mb-2 ">Payment</h2>
          <div className="flex flex-col">
            <h3 className="text-lg font-medium">Atas Nama :</h3>
            {user?.organizations?.payment?.name ? (
              <p className="text-base font-normal">
                {user.organizations?.payment?.name}
              </p>
            ) : (
              <p className="text-base font-normal">-</p>
            )}
          </div>
          <div className="flex flex-col">
            <h3 className="text-lg font-medium">Service :</h3>
            {user?.organizations?.payment?.service ? (
              <p className="text-base font-normal">
                {user.organizations?.payment?.service}
              </p>
            ) : (
              <p className="text-base font-normal">-</p>
            )}
          </div>
          <div className="flex flex-col">
            <h3 className="text-lg font-medium">No Virtual Account :</h3>
            {user?.organizations?.payment?.noVirtualAccount ? (
              <p className="text-base font-normal">
                {user.organizations?.payment?.noVirtualAccount}
              </p>
            ) : (
              <p className="text-base font-normal">-</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
