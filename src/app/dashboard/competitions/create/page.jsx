import Image from 'next/image';

export default function CreateCompetitionPage() {
  return (
    <div className="flex-1 bg-mainColor px-3">
      <div className="pt-3 mb-3">
        <h2 className="text-2xl font-medium">Create Competition</h2>
      </div>
      <div className="p-3 bg-white">
        <form action="" className="space-y-3">
          <div className="flex flex-col laptop:flex-row gap-3">
            <div className="basis-1/2 space-y-2">
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
                <label className="font-medium">Place</label>
                <input
                  type="text"
                  name="place"
                  id="place"
                  className="bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                  placeholder="Place of competition"
                />
              </div>
              <div>
                <label className="font-medium">Description</label>
                <textarea
                  name="place"
                  id="place"
                  cols={10}
                  rows={9}
                  className="bg-gray-50
                    border border-gray-300 text-black sm:text-sm rounded-lg
                    focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
                    "
                  placeholder="Description of competition"
                ></textarea>
              </div>
              <div className="flex gap-x-2">
                <div className="basis-1/2">
                  <label className="font-medium">Max Member of team</label>
                  <input
                    type="number"
                    name="max_mamber_of_team"
                    id="max_mamber_of_team"
                    className="bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                    placeholder="Maximal member of the team"
                  />
                </div>
                <div className="basis-1/2">
                  <label className="font-medium">Max team</label>
                  <input
                    type="number"
                    name="max_team"
                    id="max_team"
                    className="bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                    placeholder="Maximal team of competition"
                  />
                </div>
              </div>
            </div>
            <div className="basis-1/2 space-y-3">
              <div>
                <label className="font-medium">Category</label>
                <select
                  name="category"
                  id="category"
                  className="bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                  placeholder="Category of competition"
                >
                  <option value="offline">Offline</option>
                  <option value="online">Online</option>
                  <option value="hybrid">Hybrid</option>
                </select>
              </div>
              <div>
                <label className="font-medium">Type</label>
                <select
                  name="type"
                  id="type"
                  className="bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                  placeholder="Category of competition"
                >
                  <option value="individual">Individual</option>
                  <option value="Group">Group</option>
                </select>
              </div>
              <div>
                <label className="font-medium">Fee</label>
                <input
                  type="number"
                  name="fee"
                  id="fee"
                  className="bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                  placeholder="Fee of competition"
                />
              </div>
              <div>
                <label className="font-medium">Organization</label>
                <select
                  name="organization"
                  id="organization"
                  className="bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                  placeholder="Choose Organization"
                >
                  <option value="organization">Organization</option>
                  <option value="organization2">Organization2</option>
                  <option value="organization3">Organization3</option>
                </select>
              </div>
              <div className="flex gap-x-2">
                <div className="basis-1/2">
                  <label className="font-medium">Registration Start Date</label>
                  <input
                    type="date"
                    name="registration_start_date"
                    id="registration_start_date"
                    className="bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                    placeholder="Start date of registration competition"
                  />
                </div>
                <div className="basis-1/2">
                  <label className="font-medium">Registration End Date</label>
                  <input
                    type="date"
                    name="registration_end_date"
                    id="registration_end_date"
                    className="bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                    placeholder="End date of registration competition"
                  />
                </div>
              </div>
              <div className="flex gap-x-2">
                <div className="basis-1/2">
                  <label className="font-medium">Competition Start Date</label>
                  <input
                    type="date"
                    name="competition_start_date"
                    id="competition_start_date"
                    className="bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                    placeholder="Start date of competition"
                  />
                </div>
                <div className="basis-1/2">
                  <label className="font-medium">Competition End Date</label>
                  <input
                    type="date"
                    name="competition_end_date"
                    id="competition_end_date"
                    className="bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                    placeholder="End date of competition"
                  />
                </div>
              </div>
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
