import Image from 'next/image';

export default function ChangePasswordSettingsPage() {
  return (
    <div className="col-span-9 laptop:col-span-6 bg-white rounded h-max flex flex-col gap-3 p-3">
      <div className="border-b-2 border-neutral-500 py-3">
        <h2 className="text-3xl font-semibold">Change Password</h2>
      </div>
      <form action="" className="space-y-3">
        <div className="mb-10">
          <label className="font-medium">Old Password</label>
          <input
            type="text"
            name="old_password"
            id="old_password"
            className="bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            placeholder="Old Password"
            value={'*******'}
          />
        </div>
        <div>
          <label className="font-medium">New Password</label>
          <input
            type="text"
            name="new_password"
            id="new_password"
            className="bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            placeholder="New Password"
            value={'*******'}
          />
        </div>
        <div>
          <label className="font-medium">Repeat New Password</label>
          <input
            type="text"
            name="repeat_new_password"
            id="repeat_new_password"
            className="bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            placeholder="Repeat New Password"
            value={'*******'}
          />
        </div>

        <button className="w-full bg-blue-500 text-white py-2 rounded">
          Submit
        </button>
      </form>
    </div>
  );
}
