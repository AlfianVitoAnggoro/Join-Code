import Image from 'next/image';
import Link from 'next/link';

export default function DetailCompetition() {
  return (
    <div className="col-span-5 flex flex-col gap-3">
      <div className="bg-white rounded p-3">
        <Image
          src={'/icon.png'}
          width={50}
          height={50}
          priority
          className="rounded object-cover w-24 h-24"
        />
        <div className="my-3">
          <h1 className="text-2xl font-bold">Competition Name</h1>
          <p className="text-md text-neutral-500">Organisasi Name</p>
        </div>
        <div>
          <Link
            href={'/competition/detail/1/submit_project'}
            className="bg-blue-700 text-white rounded px-4 py-2"
          >
            Submit Your Project
          </Link>
        </div>
        <div className="py-3">
          <h2 className="text-2xl font-semibold">About Competition</h2>
          <div className="flex items-center gap-3 p-1 my-2 bg-neutral-100 rounded">
            <Image
              src={'/images/icon-time.svg'}
              width={40}
              height={40}
              alt="time"
              className="w-10 h-10 object-cover rounded-full"
              priority
            />
            <div className="flex flex-col">
              <p className="text-black font-semibold">Registration Date</p>
              <p className="text-base text-black">01 Feb 2024 - 01 Mar 2024</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1/2 flex items-center gap-3 p-1 my-2 bg-neutral-100 rounded">
              <Image
                src={'/images/icons-rupiah.png'}
                width={40}
                height={40}
                alt="registration-fee"
                className="w-10 h-10 object-cover rounded-full"
                priority
              />
              <div className="flex flex-col">
                <p className="text-black font-semibold">Registration Fee</p>
                <p className="text-base text-black">Rp. 20.000</p>
              </div>
            </div>
            <div className="w-1/2 flex items-center gap-3 p-1 my-2 bg-neutral-100 rounded">
              <Image
                src={'/images/icons-group.png'}
                width={40}
                height={40}
                alt="category"
                className="w-10 h-10 object-cover rounded-full"
                priority
              />
              <div className="flex flex-col">
                <p className="text-black font-semibold">Category</p>
                <p className="text-base text-black">Group</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1/2 flex items-center gap-3 p-1 my-2 bg-neutral-100 rounded">
              <Image
                src={'/images/icons-member.png'}
                width={40}
                height={40}
                alt="maks-member-team"
                className="w-10 h-10 object-cover rounded-full"
                priority
              />
              <div className="flex flex-col">
                <p className="text-black font-semibold">Maks Member Team</p>
                <p className="text-base text-black">4</p>
              </div>
            </div>
            <div className="w-1/2 flex items-center gap-3 p-1 my-2 bg-neutral-100 rounded">
              <Image
                src={'/images/icons-team.png'}
                width={40}
                height={40}
                alt="maks-team"
                className="w-10 h-10 object-cover rounded-full"
                priority
              />
              <div className="flex flex-col">
                <p className="text-black font-semibold">Maks Team</p>
                <p className="text-base text-black">8</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 p-1 my-2 bg-neutral-100 rounded">
            <Image
              src={'/images/icons-place.png'}
              width={40}
              height={40}
              alt="place"
              className="w-10 h-10 object-cover rounded-full"
              priority
            />
            <div className="flex flex-col">
              <p className="text-black font-semibold">Competition Place</p>
              <p className="text-base text-black">
                Universitas Singaperbangsa Karawang (Offline)
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-1 my-2 bg-neutral-100 rounded">
            <Image
              src={'/images/icons-date.png'}
              width={40}
              height={40}
              alt="competition-start-date"
              className="w-10 h-10 object-cover rounded-full"
              priority
            />
            <div className="flex flex-col">
              <p className="text-black font-semibold">Competition Start Date</p>
              <p className="text-base text-black">05 Apr 2024 - 01 Mei 2024</p>
            </div>
          </div>
          <div className="p-1 my-2 ">
            <h2 className="text-xl font-semibold">Description</h2>
            <p className="py-1">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem
              dicta repudiandae voluptates consequuntur esse, ducimus, libero
              fugit sint minus error incidunt quidem neque. Facere quo itaque
              necessitatibus eligendi ab repellendus, amet sint facilis
              doloremque ducimus labore veniam dicta doloribus aliquid vitae,
              nam odit nihil cum a sed ea molestias aspernatur natus laboriosam.
              Eos modi, dicta quo veniam culpa aliquid pariatur voluptatum vel
              omnis sapiente harum? Sint illo nulla cumque at explicabo maxime
              rem dicta error quia odit consequuntur sunt odio eaque ipsa
              recusandae labore provident delectus, suscipit architecto,
              voluptatibus perspiciatis ipsam facere? Ipsum unde nesciunt ut
              tempora possimus. Itaque, dolor.
            </p>
          </div>
        </div>
      </div>
      <div className="bg-white rounded p-3">
        <h2 className="text-2xl font-bold">About Organization</h2>
        <div className="flex gap-x-3 py-2">
          <Image
            src={'/icon.png'}
            width={50}
            height={50}
            alt="Avatar"
            priority
            className="rounded object-cover w-24 h-24"
          />
          <div className="flex flex-col">
            <h3 className="text-lg font-semibold ">Organisasi Name</h3>
            <p className="text-sm text-black">
              Universitas Singaperbangsa Karawang
            </p>
            <Link
              href={'https://github.com/alfianvitoanggoro'}
              className="text-blue-700 text-sm"
            >
              https://github.com/alfianvitoanggoro
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
