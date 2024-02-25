import Image from 'next/image';

export default function UpdateCompetitionPage(params) {
  return (
    <div className="flex-1 bg-mainColor px-3">
      <div className="pt-3 mb-3">
        <h2 className="text-2xl font-medium">Update Competition {params.id}</h2>
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
  );
}
