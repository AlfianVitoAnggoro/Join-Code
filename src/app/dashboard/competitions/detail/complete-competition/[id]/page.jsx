import Image from 'next/image';

export default function CompleteCompetitionPage() {
  return (
    <div className="flex-1 bg-mainColor px-3">
      <div className="pt-3 mb-3">
        <h2 className="text-2xl font-medium">Complete the Competition</h2>
      </div>
      <div className="p-3 bg-white">
        <form action="" className="space-y-3">
          <div className="flex flex-col gap-3">
            <div>
              <label className="font-medium">Ranking 1</label>
              <select
                name="ranking1"
                id="ranking1"
                className="bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                placeholder="Choose team ranking 1"
              >
                <option value="1">Alfian Team</option>
              </select>
            </div>
            <div>
              <label className="font-medium">Ranking 2</label>
              <select
                name="ranking2"
                id="ranking2"
                className="bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                placeholder="Choose team ranking 2"
              >
                <option value="1">Alfian Team</option>
              </select>
            </div>
            <div>
              <label className="font-medium">Ranking 3</label>
              <select
                name="ranking3"
                id="ranking3"
                className="bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                placeholder="Choose team ranking 3"
              >
                <option value="1">Alfian Team</option>
              </select>
            </div>
          </div>

          <button className="w-full bg-blue-500 text-white py-2 rounded">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
