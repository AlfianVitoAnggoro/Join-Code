import Image from 'next/image';
import Link from 'next/link';

export default function CollaborationPages() {
  return (
    <div className="relative min-h-screen py-3 laptop:mt-20">
      <div className="w-[1024px] mx-auto px-10">
        <div className="flex flex-col gap-3">
          {/* Header */}
          <div className="bg-white h-fit rounded px-3 py-5">
            <h1 className="text-3xl font-bold">Collaboration</h1>
            <div className="mt-3">
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
          <div className="grid grid-cols-1 xs:grid-cols-2 tablet:grid-cols-3 laptop:grid-cols-4 dekstop:grid-cols-4 gap-3 rounded border-y border-gray-200">
            <div className=" bg-white border-2 border-gray-200 rounded-lg hover:shadow-black hover:shadow-md relative w-full">
              <Link href={'/collaboration/1'}>
                <div className="w-full h-24 bg-gray-400 rounded-t-lg">
                  <Image
                    width={50}
                    height={50}
                    src="/images/login.svg"
                    alt="Alfian Vito Anggoro"
                    priority
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute top-0 left-0 bg-green-700 text-white p-1 px-2 rounded">
                  <p className="text-xs">#OPENTOCOLLABORATE</p>
                </div>
                <div className="absolute top-10 left-1/2 transform -translate-x-1/2">
                  <Image
                    width={50}
                    height={50}
                    src="/images/test_avatar.png"
                    alt="Alfian Vito Anggoro"
                    priority
                    className="rounded-full w-24 h-24 object-cover"
                  />
                </div>
                <div className="flex justify-center items-center flex-col mt-12 m-2">
                  <h3 className="font-bold text-center">Alfian Vito Anggoro</h3>
                  <p className="text-xs text-center text-ellipsis overflow-hidden w-52 h-8 mt-1">
                    Web Developer || Android Developer || Flutter Developer
                  </p>
                  <p className="bg-gray-200 rounded-full p-1 px-3 text-xs text-center mt-2 font-semibold">
                    Newbie
                  </p>
                </div>
              </Link>
            </div>
            <div className=" bg-white border-2 border-gray-200 rounded-lg hover:shadow-black hover:shadow-md relative w-full">
              <Link href={'/collaboration/1'}>
                <div className="w-full h-24 bg-gray-400 rounded-t-lg">
                  <Image
                    width={50}
                    height={50}
                    src="/images/login.svg"
                    alt="Alfian Vito Anggoro"
                    priority
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute top-0 left-0 bg-green-700 text-white p-1 px-2 rounded">
                  <p className="text-xs">#OPENTOCOLLABORATE</p>
                </div>
                <div className="absolute top-10 left-1/2 transform -translate-x-1/2">
                  <Image
                    width={50}
                    height={50}
                    src="/images/test_avatar.png"
                    alt="Alfian Vito Anggoro"
                    priority
                    className="rounded-full w-24 h-24 object-cover"
                  />
                </div>
                <div className="flex justify-center items-center flex-col mt-12 m-2">
                  <h3 className="font-bold text-center">Alfian Vito Anggoro</h3>
                  <p className="text-xs text-center text-ellipsis overflow-hidden w-52 h-8 mt-1">
                    Web Developer || Android Developer || Flutter Developer
                  </p>
                  <p className="bg-gray-200 rounded-full p-1 px-3 text-xs text-center mt-2 font-semibold">
                    Newbie
                  </p>
                </div>
              </Link>
            </div>
            <div className=" bg-white border-2 border-gray-200 rounded-lg hover:shadow-black hover:shadow-md relative w-full">
              <Link href={'/collaboration/1'}>
                <div className="w-full h-24 bg-gray-400 rounded-t-lg">
                  <Image
                    width={50}
                    height={50}
                    src="/images/login.svg"
                    alt="Alfian Vito Anggoro"
                    priority
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute top-0 left-0 bg-green-700 text-white p-1 px-2 rounded">
                  <p className="text-xs">#OPENTOCOLLABORATE</p>
                </div>
                <div className="absolute top-10 left-1/2 transform -translate-x-1/2">
                  <Image
                    width={50}
                    height={50}
                    src="/images/test_avatar.png"
                    alt="Alfian Vito Anggoro"
                    priority
                    className="rounded-full w-24 h-24 object-cover"
                  />
                </div>
                <div className="flex justify-center items-center flex-col mt-12 m-2">
                  <h3 className="font-bold text-center">Alfian Vito Anggoro</h3>
                  <p className="text-xs text-center text-ellipsis overflow-hidden w-52 h-8 mt-1">
                    Web Developer || Android Developer || Flutter Developer
                  </p>
                  <p className="bg-gray-200 rounded-full p-1 px-3 text-xs text-center mt-2 font-semibold">
                    Newbie
                  </p>
                </div>
              </Link>
            </div>
            <div className=" bg-white border-2 border-gray-200 rounded-lg hover:shadow-black hover:shadow-md relative w-full">
              <Link href={'/collaboration/1'}>
                <div className="w-full h-24 bg-gray-400 rounded-t-lg">
                  <Image
                    width={50}
                    height={50}
                    src="/images/login.svg"
                    alt="Alfian Vito Anggoro"
                    priority
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute top-0 left-0 bg-green-700 text-white p-1 px-2 rounded">
                  <p className="text-xs">#OPENTOCOLLABORATE</p>
                </div>
                <div className="absolute top-10 left-1/2 transform -translate-x-1/2">
                  <Image
                    width={50}
                    height={50}
                    src="/images/test_avatar.png"
                    alt="Alfian Vito Anggoro"
                    priority
                    className="rounded-full w-24 h-24 object-cover"
                  />
                </div>
                <div className="flex justify-center items-center flex-col mt-12 m-2">
                  <h3 className="font-bold text-center">Alfian Vito Anggoro</h3>
                  <p className="text-xs text-center text-ellipsis overflow-hidden w-52 h-8 mt-1">
                    Web Developer || Android Developer || Flutter Developer
                  </p>
                  <p className="bg-gray-200 rounded-full p-1 px-3 text-xs text-center mt-2 font-semibold">
                    Newbie
                  </p>
                </div>
              </Link>
            </div>
            <div className=" bg-white border-2 border-gray-200 rounded-lg hover:shadow-black hover:shadow-md relative w-full">
              <Link href={'/collaboration/1'}>
                <div className="w-full h-24 bg-gray-400 rounded-t-lg">
                  <Image
                    width={50}
                    height={50}
                    src="/images/login.svg"
                    alt="Alfian Vito Anggoro"
                    priority
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute top-0 left-0 bg-green-700 text-white p-1 px-2 rounded">
                  <p className="text-xs">#OPENTOCOLLABORATE</p>
                </div>
                <div className="absolute top-10 left-1/2 transform -translate-x-1/2">
                  <Image
                    width={50}
                    height={50}
                    src="/images/test_avatar.png"
                    alt="Alfian Vito Anggoro"
                    priority
                    className="rounded-full w-24 h-24 object-cover"
                  />
                </div>
                <div className="flex justify-center items-center flex-col mt-12 m-2">
                  <h3 className="font-bold text-center">Alfian Vito Anggoro</h3>
                  <p className="text-xs text-center text-ellipsis overflow-hidden w-52 h-8 mt-1">
                    Web Developer || Android Developer || Flutter Developer
                  </p>
                  <p className="bg-gray-200 rounded-full p-1 px-3 text-xs text-center mt-2 font-semibold">
                    Newbie
                  </p>
                </div>
              </Link>
            </div>
            <div className=" bg-white border-2 border-gray-200 rounded-lg hover:shadow-black hover:shadow-md relative w-full">
              <Link href={'/collaboration/1'}>
                <div className="w-full h-24 bg-gray-400 rounded-t-lg">
                  <Image
                    width={50}
                    height={50}
                    src="/images/login.svg"
                    alt="Alfian Vito Anggoro"
                    priority
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute top-0 left-0 bg-green-700 text-white p-1 px-2 rounded">
                  <p className="text-xs">#OPENTOCOLLABORATE</p>
                </div>
                <div className="absolute top-10 left-1/2 transform -translate-x-1/2">
                  <Image
                    width={50}
                    height={50}
                    src="/images/test_avatar.png"
                    alt="Alfian Vito Anggoro"
                    priority
                    className="rounded-full w-24 h-24 object-cover"
                  />
                </div>
                <div className="flex justify-center items-center flex-col mt-12 m-2">
                  <h3 className="font-bold text-center">Alfian Vito Anggoro</h3>
                  <p className="text-xs text-center text-ellipsis overflow-hidden w-52 h-8 mt-1">
                    Web Developer || Android Developer || Flutter Developer
                  </p>
                  <p className="bg-gray-200 rounded-full p-1 px-3 text-xs text-center mt-2 font-semibold">
                    Newbie
                  </p>
                </div>
              </Link>
            </div>
            <div className=" bg-white border-2 border-gray-200 rounded-lg hover:shadow-black hover:shadow-md relative w-full">
              <Link href={'/collaboration/1'}>
                <div className="w-full h-24 bg-gray-400 rounded-t-lg">
                  <Image
                    width={50}
                    height={50}
                    src="/images/login.svg"
                    alt="Alfian Vito Anggoro"
                    priority
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute top-0 left-0 bg-green-700 text-white p-1 px-2 rounded">
                  <p className="text-xs">#OPENTOCOLLABORATE</p>
                </div>
                <div className="absolute top-10 left-1/2 transform -translate-x-1/2">
                  <Image
                    width={50}
                    height={50}
                    src="/images/test_avatar.png"
                    alt="Alfian Vito Anggoro"
                    priority
                    className="rounded-full w-24 h-24 object-cover"
                  />
                </div>
                <div className="flex justify-center items-center flex-col mt-12 m-2">
                  <h3 className="font-bold text-center">Alfian Vito Anggoro</h3>
                  <p className="text-xs text-center text-ellipsis overflow-hidden w-52 h-8 mt-1">
                    Web Developer || Android Developer || Flutter Developer
                  </p>
                  <p className="bg-gray-200 rounded-full p-1 px-3 text-xs text-center mt-2 font-semibold">
                    Newbie
                  </p>
                </div>
              </Link>
            </div>
            <div className=" bg-white border-2 border-gray-200 rounded-lg hover:shadow-black hover:shadow-md relative w-full">
              <Link href={'/collaboration/1'}>
                <div className="w-full h-24 bg-gray-400 rounded-t-lg">
                  <Image
                    width={50}
                    height={50}
                    src="/images/login.svg"
                    alt="Alfian Vito Anggoro"
                    priority
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute top-0 left-0 bg-green-700 text-white p-1 px-2 rounded">
                  <p className="text-xs">#OPENTOCOLLABORATE</p>
                </div>
                <div className="absolute top-10 left-1/2 transform -translate-x-1/2">
                  <Image
                    width={50}
                    height={50}
                    src="/images/test_avatar.png"
                    alt="Alfian Vito Anggoro"
                    priority
                    className="rounded-full w-24 h-24 object-cover"
                  />
                </div>
                <div className="flex justify-center items-center flex-col mt-12 m-2">
                  <h3 className="font-bold text-center">Alfian Vito Anggoro</h3>
                  <p className="text-xs text-center text-ellipsis overflow-hidden w-52 h-8 mt-1">
                    Web Developer || Android Developer || Flutter Developer
                  </p>
                  <p className="bg-gray-200 rounded-full p-1 px-3 text-xs text-center mt-2 font-semibold">
                    Newbie
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
