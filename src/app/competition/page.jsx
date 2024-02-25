import Image from 'next/image';
import Link from 'next/link';

export default function CompetitionSoftwareDeveloperPages() {
  return (
    <div className="relative min-h-screen py-3 laptop:mt-20">
      <div className="w-[1024px] mx-auto px-10">
        <div className="flex flex-col gap-3">
          {/* Header */}
          <div className="bg-white rounded py-5 px-3">
            <h1 className="text-3xl font-bold m-3">Competition</h1>
            <div className="ml-3 mt-3">
              <input
                type="text"
                name="search"
                id="search"
                className="bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-96 p-2.5 "
                placeholder="Search"
              />
            </div>
          </div>
          {/* Card */}
          <div className="grid grid-cols-1">
            <div className="p-3 bg-white border-2 border-gray-200 rounded-lg hover:bg-sky-100 hover:bg-opacity-40 hover:border-sky-500 w-full laptop:hidden">
              <Link href={'/competition/1'}>
                <div className="grid grid-cols-10 gap-x-2">
                  <div className="col-span-1 flex justify-center">
                    <Image
                      src={'/images/test_avatar.png'}
                      width={50}
                      height={50}
                      priority
                      className="rounded object-cover w-16 h-16"
                    />
                  </div>
                  <div className="col-span-9">
                    <h2 className="text-md text-black font-bold">
                      Competition Name
                    </h2>
                    <p className="text-sm text-neutral-500">Organisasi Name</p>
                    <div className="flex space-x-2">
                      <p className="text-sm text-neutral-500">
                        Universitas Singaperbangsa Karawang (Offline)
                      </p>
                    </div>
                    <div className="flex space-x-3">
                      <p className="text-sm text-neutral-500">1 bulan</p>
                      <p className="text-sm text-black font-medium">Group</p>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
            <div className="hidden laptop:grid grid-cols-5 gap-x-3">
              <div className="col-span-2 overflow-scroll flex flex-col h-screen">
                <div className="grid grid-cols-5 p-3 gap-x-2 bg-white border-2 border-gray-200 rounded-lg hover:bg-sky-100 hover:bg-opacity-40 hover:border-sky-500 w-full cursor-pointer">
                  <div className="col-span-1 flex justify-center">
                    <Image
                      src={'/icon.png'}
                      width={50}
                      height={50}
                      priority
                      className="rounded object-cover w-16 h-16"
                    />
                  </div>
                  <div className="col-span-4">
                    <h2 className="text-md text-black font-bold">
                      Competition Name
                    </h2>
                    <p className="text-sm text-neutral-500">Organisasi Name</p>
                    <div className="flex space-x-2">
                      <p className="text-sm text-neutral-500">
                        Universitas Singaperbangsa Karawang (Offline)
                      </p>
                    </div>
                    <div className="flex space-x-3">
                      <p className="text-sm text-neutral-500">1 bulan</p>
                      <p className="text-sm text-black font-medium">Group</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-span-3 flex flex-col gap-3">
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
                    <p className="text-md text-neutral-500">
                      Universitas Singaperbangsa Karawang (Offline)
                    </p>
                    <p className="text-black font-semibold rounded bg-neutral-200 text-center px-3 py-2">
                      Group
                    </p>
                  </div>
                  <div>
                    <button className="bg-blue-700 text-white rounded px-4 py-2">
                      Daftar
                    </button>
                  </div>
                  <div className="py-3">
                    <h2 className="text-2xl font-semibold">
                      About Competition
                    </h2>
                    <div className="flex gap-3 p-1 my-2 bg-neutral-100 rounded">
                      <Image
                        src={'/images/icon-time.svg'}
                        width={40}
                        height={40}
                        alt="time"
                        priority
                      />
                      <div className="flex flex-col">
                        <p className="text-sm text-neutral-500">Durasi</p>
                        <p className="text-base text-black">
                          1 Bulan{' '}
                          <span className="text-neutral-500">
                            (01 Feb - 01 Mar 2024)
                          </span>
                        </p>
                      </div>
                    </div>
                    <div className="p-1 my-2 ">
                      <h2 className="text-xl font-semibold">Description</h2>
                      <p className="py-1">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Autem dicta repudiandae voluptates consequuntur esse,
                        ducimus, libero fugit sint minus error incidunt quidem
                        neque. Facere quo itaque necessitatibus eligendi ab
                        repellendus, amet sint facilis doloremque ducimus labore
                        veniam dicta doloribus aliquid vitae, nam odit nihil cum
                        a sed ea molestias aspernatur natus laboriosam. Eos
                        modi, dicta quo veniam culpa aliquid pariatur voluptatum
                        vel omnis sapiente harum? Sint illo nulla cumque at
                        explicabo maxime rem dicta error quia odit consequuntur
                        sunt odio eaque ipsa recusandae labore provident
                        delectus, suscipit architecto, voluptatibus perspiciatis
                        ipsam facere? Ipsum unde nesciunt ut tempora possimus.
                        Itaque, dolor.
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
                      <h3 className="text-lg font-semibold ">
                        Organisasi Name
                      </h3>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
