export default function DeleteTeamCompetitionPage() {
  return (
    <div className="flex-1 bg-white p-3 rounded-lg">
      <div className="pt-3 mb-3">
        <h2 className="text-2xl font-medium">Delete Team Competition</h2>
      </div>
      <div className=" w-full h-full">
        <h3 className="font-bold text-sm text-center my-3">
          Are you sure, you want to delete this data ?
        </h3>
        <div className="flex gap-5 justify-end items-center">
          <button className="px-2 py-1 bg-blue-600 text-white rounded">
            Yes
          </button>
          <button className="px-2 py-1 bg-red-600 text-white rounded">
            No
          </button>
        </div>
      </div>
    </div>
  );
}
