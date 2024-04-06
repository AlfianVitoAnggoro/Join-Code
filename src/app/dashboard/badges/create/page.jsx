import Image from 'next/image';

export const metadata = {
  title: 'Create Badges - Join Code',
  description: 'Dashboard Create Badges - Join Code',
};
export default function CreateBadgePage() {
  return (
    <div className="flex-1 bg-mainColor px-3">
      <div className="pt-3 mb-3">
        <h2 className="text-2xl font-medium">Create Badge</h2>
      </div>
      <div className="p-3 bg-white">
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
            <label className="font-medium">Minimal Point</label>
            <input
              type="number"
              name="min_point"
              id="min_point"
              className="bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              placeholder="Minimal Point"
            />
          </div>
          <button className="w-full bg-blue-500 text-white py-2 rounded">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
