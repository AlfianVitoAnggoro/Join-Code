export default function DetailTeamCompetitionPage(params) {
  return (
    <div className="flex-1 bg-mainColor px-3">
      <div className="pt-3 mb-3">
        <h2 className="text-2xl font-medium">
          Detail Team Competition {params.id}
        </h2>
      </div>
      <div className="p-3 bg-white space-y-3">
        <div className="flex flex-col laptop:flex-row gap-2">
          <div className="basis-1/2 space-y-2">
            <div className="flex flex-col">
              <h3 className="text-lg font-medium">Name of competition :</h3>
              <p className="text-base font-normal">Web Developer Competition</p>
            </div>
            <div className="flex flex-col">
              <h3 className="text-lg font-medium">Place of competition :</h3>
              <p className="text-base font-normal">
                Universitas Singaperbangsa Karawang
              </p>
            </div>
            <div className="flex flex-col">
              <h3 className="text-lg font-medium">Address :</h3>
              <p className="text-base font-normal">Kabupaten Karawang</p>
            </div>
            <div className="flex flex-col">
              <h3 className="text-lg font-medium">Organization :</h3>
              <p className="text-base font-normal">Himtika</p>
            </div>
            <div className="flex flex-col">
              <h3 className="text-lg font-medium">Max member of team :</h3>
              <p className="text-base font-normal">4</p>
            </div>
            <div className="flex flex-col">
              <h3 className="text-lg font-medium">Max team of competition :</h3>
              <p className="text-base font-normal">8</p>
            </div>
          </div>
          <div className="basis-1/2 space-y-2">
            <div className="flex flex-col">
              <h3 className="text-lg font-medium">Category :</h3>
              <p className="text-base font-normal">Offline</p>
            </div>
            <div className="flex flex-col">
              <h3 className="text-lg font-medium">Type :</h3>
              <p className="text-base font-normal">Group</p>
            </div>
            <div className="flex flex-col">
              <h3 className="text-lg font-medium">Fee of registration :</h3>
              <p className="text-base font-normal">Rp. 0</p>
            </div>
            <div className="flex flex-col">
              <h3 className="text-lg font-medium">Registration Date :</h3>
              <p className="text-base font-normal">01/03/2024 - 01/04/2024</p>
            </div>
            <div className="flex flex-col">
              <h3 className="text-lg font-medium">Competition Date :</h3>
              <p className="text-base font-normal">05/04/2024 - 05/05/2024</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col">
          <h3 className="text-lg font-medium">Team Competition :</h3>
          <table className="table-auto min-w-full">
            <thead className="bg-white text-black font-bold text-sm text-left uppercase tracking-wider border-b border-gray-200">
              <tr>
                <th className="py-3 text-center">NO</th>
                <th className="py-3 text-center">Name</th>
                <th className="py-3 text-center">Link Project</th>
                <th className="py-3 text-center">Link Repository</th>
                <th className="py-3 text-center">Rating</th>
                <th className="py-3 text-center">Accepted</th>
              </tr>
            </thead>
            <tbody>
              <tr className="odd:bg-neutral-100 even:bg-neutral-200 hover:bg-neutral-300 transition-colors duration-200 border-b border-gray-200">
                <td className="py-2 text-center whitespace-nowrap">1</td>
                <td className="py-2 text-center whitespace-nowrap">
                  Alfian Team
                </td>
                <td className="py-2 text-center whitespace-nowrap">
                  https://alfianteam.com
                </td>
                <td className="py-2 text-center whitespace-nowrap">
                  https://github.com/alfianteam
                </td>
                <td className="py-2 text-center whitespace-nowrap">1</td>
                <td className="py-2 text-center whitespace-nowrap">Yes</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
