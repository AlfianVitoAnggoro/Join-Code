'use client';
import dynamic from 'next/dynamic';
const Modal = dynamic(() => import('../../../../../../components/core/Modal'));
export default function SubmitProjectCompetition() {
  return (
    <Modal>
      <div className="flex-1 px-3 bg-white rounded-lg">
        <div className="pt-3 mb-3">
          <h2 className="text-2xl font-medium">Submit Project Competition</h2>
        </div>
        <div className="p-3 overflow-y-auto max-h-[80vh] min-h-[fit] w-[60vw]">
          <form action="" className="space-y-3">
            <div>
              <label className="font-medium">Project Link</label>
              <input
                type="text"
                name="project_link"
                id="project_link"
                className="bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                placeholder="Input your project link here"
              />
            </div>
            <div>
              <label className="font-medium">Repository Link</label>
              <input
                type="text"
                name="repository_link"
                id="repository_link"
                className="bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                placeholder="Input your repository link here"
              />
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
