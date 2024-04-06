import Image from 'next/image';

export default async function DetailOrganization(props) {
  const { user } = props;
  return (
    <div className="grid grid-cols-5 gap-2">
      <div className="col-span-1">
        <Image
          src={`/images/avatars/${user.avatar}`}
          width={50}
          height={50}
          alt="image-user"
          priority
          className="rounded-full object-cover w-36 h-36"
        />
      </div>
      <div className="col-span-4 flex flex-col gap-y-1">
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
      </div>
    </div>
  );
}
