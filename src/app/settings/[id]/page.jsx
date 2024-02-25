import Image from 'next/image';

export default function SettingsPages() {
  return (
    <div className="relative min-h-screen py-3 laptop:mt-20">
      <div className="w-[1024px] mx-auto px-10">
        <div className="grid grid-cols-9 gap-3">
          <div className="col-span-9 laptop:col-span-3 space-y-5 bg-white rounded p-3 h-max">
            <h1 className="text-3xl font-semibold">Settings</h1>
            <div className="flex w-full justify-between items-center laptop:flex-col laptop:space-y-5">
              <div className="bg-gray-300 p-3 rounded w-full flex justify-center laptop:justify-start items-center gap-3">
                <Image
                  src={'/images/icons-profile-settings.png'}
                  width={50}
                  height={50}
                  alt="join-code"
                  priority
                  className="object-cover w-8 h-8 rounded"
                />
                <h3>Profile</h3>
              </div>
            </div>
          </div>
          <div className="col-span-9 laptop:col-span-6 bg-white rounded h-max flex flex-col gap-3 p-3">
            <div className="border-b-2 border-neutral-500 py-3">
              <h2 className="text-3xl font-semibold">Profile</h2>
            </div>
            <form action="" className="space-y-3">
              <div className="space-y-2">
                <label className="font-medium">Image</label>
                <Image
                  src={'/images/test_avatar.png'}
                  width={50}
                  height={50}
                  alt="join-code"
                  priority
                  className="rounded object-cover w-28 h-28"
                />
                <input
                  type="file"
                  name="image"
                  id="image"
                  className="bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                  placeholder="Your Image"
                />
              </div>
              <div>
                <label className="font-medium">Name</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                  placeholder="Your Name"
                />
              </div>
              <div>
                <label className="font-medium">Description</label>
                <input
                  type="text"
                  name="Description"
                  id="Description"
                  className="bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                  placeholder="Your Name"
                />
              </div>
              <div>
                <label className="font-medium">Instagram Link</label>
                <input
                  type="text"
                  name="instagram_link"
                  id="instagram_link"
                  className="bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                  placeholder="Instagram Link"
                />
              </div>
              <div>
                <label className="font-medium">Linkedin Link</label>
                <input
                  type="text"
                  name="linkedin_link"
                  id="linkedin_link"
                  className="bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                  placeholder="Linkedin Link"
                />
              </div>
              <div>
                <label className="font-medium">Portofolio Link</label>
                <input
                  type="text"
                  name="portofolio_link"
                  id="portofolio_link"
                  className="bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                  placeholder="Portofolio Link"
                />
              </div>
              <button className="w-full bg-blue-500 text-white py-2 rounded">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
