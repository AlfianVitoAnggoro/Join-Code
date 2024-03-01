'use client';
import dynamic from 'next/dynamic';
import Image from 'next/image';
const Modal = dynamic(() => import('../../../../../components/core/Modal'));

export default function CreateUserPage() {
  return (
    <Modal>
      <div className="flex-1 px-3 bg-white rounded-lg">
        <div className="pt-3 mb-3">
          <h2 className="text-2xl font-medium">Create User</h2>
        </div>
        <div className="p-3 overflow-y-auto max-h-[80vh] min-h-[fit] w-[70vw]">
          <form action="" className="space-y-3">
            <div>
              <label className="font-medium">Name User</label>
              <input
                type="text"
                name="name"
                id="name"
                className="bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                placeholder="Name User"
              />
            </div>
            <div>
              <label className="font-medium">Email</label>
              <input
                type="text"
                name="email"
                id="email"
                className="bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                placeholder="Email User"
              />
            </div>
            <div>
              <label className="font-medium">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                className="bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                placeholder="Password User"
              />
            </div>
            <div>
              <label className="font-medium">Role</label>
              <select
                name="role"
                id="role"
                className="bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              >
                <option value="software_developer">Software Developer</option>
                <option value="organization">Organization</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <button className="w-full bg-blue-500 text-white py-2 rounded">
              Submit
            </button>
          </form>
        </div>
      </div>
    </Modal>
  );
}
