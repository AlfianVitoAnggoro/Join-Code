'use client';
import dynamic from 'next/dynamic';
const Modal = dynamic(() => import('../../../../../../components/core/Modal'));
export default function RegistrationCompetition() {
  return (
    <Modal>
      <div className="flex-1 px-3 bg-white rounded-lg">
        <div className="pt-3 mb-3">
          <h2 className="text-2xl font-medium">Competition Registration</h2>
        </div>
        <div className="p-3 overflow-y-auto max-h-[80vh] min-h-[fit] w-[70vw]">
          <form action="" className="space-y-3">
            <div>
              <label className="font-medium">Team Name</label>
              <input
                type="text"
                name="name"
                id="name"
                className="bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                placeholder="Your Team Name"
              />
            </div>
            <div class="border-b border-black w-full"></div>
            <div className="space-y-3">
              <h3 className="text-xl font-medium">Member of team</h3>
              <div>
                <label className="font-medium">Member 1</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                  placeholder="ID Collaboration Member 1"
                />
              </div>
              <div>
                <label className="font-medium">Member 2</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                  placeholder="ID Collaboration Member 2"
                />
              </div>
              <div>
                <label className="font-medium">Member 3</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                  placeholder="ID Collaboration Member 3"
                />
              </div>
            </div>
            <div class="border-b border-black w-full"></div>
            <div className="space-y-3">
              <h3 className="text-xl font-medium">Pembayaran</h3>
              <div className="p-3 bg-neutral-200 rounded">
                <p className="text-lg text-black font-normal">DANA</p>
                <p className="text-lg text-black font-normal">a/n HIMTIKA</p>
                <p className="text-lg text-black font-normal">083872720879</p>
              </div>
              <div>
                <label className="font-medium">Upload Bukti Pembayaran</label>
                <input
                  type="file"
                  name="upload_bukti_pembayaran"
                  id="upload_bukti_pembayaran"
                  className="bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                  placeholder="Upload Bukti Pembayaran"
                />
              </div>
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
