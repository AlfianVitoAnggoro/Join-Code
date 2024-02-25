'use client';
import dynamic from 'next/dynamic';
const Modal = dynamic(() => import('../../../../../../components/core/Modal'));

export default function DeleteCompetitionPage() {
  return (
    <Modal>
      <div className="flex-1 bg-white p-3">
        <div className="pt-3 mb-3">
          <h2 className="text-2xl font-medium">Delete Competition</h2>
        </div>
        <div className="p-3 w-full h-full">
          <h3 className="font-bold text-sm text-center my-3">
            Are you sure, you want to delete this data ?
          </h3>
          <div className="flex gap-5 justify-center items-center">
            <button className="p-2 bg-blue-600 text-white">Yes</button>
            <button className="p-2 bg-red-600 text-white">No</button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
