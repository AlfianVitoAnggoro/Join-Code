import Image from 'next/image';
import Link from 'next/link';

export default async function DetailsoftwareDevelopers(props) {
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
            <p className="text-base font-normal">{user?.role?.name}</p>
          ) : (
            <p className="text-base font-normal">-</p>
          )}
        </div>
        <div className="flex flex-col">
          <h3 className="text-lg font-medium">Collaboration Id :</h3>
          {user?.softwareDevelopers?.collaborationId ? (
            <p className="text-base font-normal">
              {user?.softwareDevelopers?.collaborationId}
            </p>
          ) : (
            <p className="text-base font-normal">-</p>
          )}
        </div>
        <div className="flex flex-col">
          <h3 className="text-lg font-medium">Gender :</h3>
          {user?.softwareDevelopers?.gender ? (
            <p className="text-base font-normal">
              {user?.softwareDevelopers?.gender}
            </p>
          ) : (
            <p className="text-base font-normal">-</p>
          )}
        </div>
        <div className="flex flex-col">
          <h3 className="text-lg font-medium">Address :</h3>
          {user?.softwareDevelopers?.address ? (
            <p className="text-base font-normal">
              {user?.softwareDevelopers?.address}
            </p>
          ) : (
            <p className="text-base font-normal">-</p>
          )}
        </div>
        <div className="flex flex-col">
          <h3 className="text-lg font-medium">Description :</h3>
          {user?.softwareDevelopers?.description ? (
            <p className="text-base font-normal">
              {user?.softwareDevelopers?.description}
            </p>
          ) : (
            <p className="text-base font-normal">-</p>
          )}
        </div>
        <div className="flex flex-col">
          <h3 className="text-lg font-medium">Skill Yang Diminati :</h3>
          {user?.softwareDevelopers?.skills.length > 0 ? (
            <p className="text-base font-normal">
              {user?.softwareDevelopers?.skills?.map((skills, index) => (
                <span key={index} className="mr-2">
                  {skills.skill.name}
                  {index !== user.softwareDevelopers.skills.length - 1 && ','}
                </span>
              ))}
            </p>
          ) : (
            <p className="text-neutral-500 text-base font-normal">
              belum menentukan skill peminatan
            </p>
          )}
        </div>
        <div className="flex flex-col">
          <h3 className="text-lg font-medium">Point :</h3>
          <p className="text-base font-normal">
            {user.softwareDevelopers.point} XP
          </p>
        </div>
        <div className="flex flex-col">
          <h3 className="text-lg font-medium">Badge :</h3>
          {user?.softwareDevelopers?.badge?.image ? (
            <Image
              src={`https://atzxitftejquqppfauyh.supabase.co/storage/v1/object/public/badges/public/${user?.softwareDevelopers?.badge?.image}`}
              width={100}
              height={100}
              alt="image-badge"
              priority
              className="rounded-full object-cover w-16 h-16"
            />
          ) : (
            <p className="text-base font-normal">-</p>
          )}
        </div>
        <div className="flex flex-col">
          <h3 className="text-lg font-medium">Status Collaboration :</h3>
          {user.softwareDevelopers?.statusCollaboration ? (
            <p className="text-base font-normal">Open To Collaboration</p>
          ) : (
            <p className="text-base font-normal">-</p>
          )}
        </div>
        <div className="flex flex-col">
          <h3 className="text-lg font-medium">Portofolio Link :</h3>
          {user?.softwareDevelopers?.portfolioLink ? (
            <p className="text-base font-normal text-blue-500">
              <Link
                href={user?.softwareDevelopers?.portfolioLink}
                target="_blank"
              >
                {user?.softwareDevelopers?.portfolioLink}
              </Link>
            </p>
          ) : (
            <p className="text-base font-normal">-</p>
          )}
        </div>
        <div className="flex flex-col">
          <h3 className="text-lg font-medium">Github :</h3>
          {user.softwareDevelopers?.usernameGithub ? (
            <p className="text-base font-normal text-blue-500">
              <Link
                href={`https://github.com/${user?.softwareDevelopers?.usernameGithub}`}
                target="_blank"
              >
                {user?.softwareDevelopers?.usernameGithub}
              </Link>
            </p>
          ) : (
            <p className="text-base font-normal">-</p>
          )}
        </div>
        <div className="flex flex-col">
          <h3 className="text-lg font-medium">Instagram :</h3>
          {user.softwareDevelopers?.usernameInstagram ? (
            <p className="text-base font-normal text-blue-500">
              <Link
                href={`https://www.instagram.com/${user?.softwareDevelopers?.usernameInstagram}`}
                target="_blank"
              >
                {user?.softwareDevelopers?.usernameInstagram}
              </Link>
            </p>
          ) : (
            <p className="text-base font-normal">-</p>
          )}
        </div>
        <div className="flex flex-col">
          <h3 className="text-lg font-medium">Linkedin :</h3>
          {user.softwareDevelopers?.usernameLinkedin ? (
            <p className="text-base font-normal text-blue-500">
              <Link
                href={`https://www.linkedin.com/in/${user?.softwareDevelopers?.usernameLinkedin}`}
                target="_blank"
              >
                {user?.softwareDevelopers?.usernameLinkedin}
              </Link>
            </p>
          ) : (
            <p className="text-base font-normal">-</p>
          )}
        </div>
      </div>
    </div>
  );
}
