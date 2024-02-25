import Image from 'next/image';

export default function DetailCompetitionPage(params) {
  return (
    <div className="flex-1 bg-mainColor px-3">
      <div className="pt-3 mb-3">
        <h2 className="text-2xl font-medium">Detail Competition {params.id}</h2>
      </div>
      <div className="p-3 bg-white space-y-3">
        <div className="flex">
          <h3>Name :</h3>
          <h3>Alfian Vito Anggoro</h3>
        </div>
        <div className="flex">
          <h3>Name :</h3>
          <h3>Alfian Vito Anggoro</h3>
        </div>
        <div className="flex">
          <h3>Name :</h3>
          <h3>Alfian Vito Anggoro</h3>
        </div>
        <div className="flex">
          <h3>Name :</h3>
          <h3>Alfian Vito Anggoro</h3>
        </div>
        <div className="flex">
          <h3>Name :</h3>
          <h3>Alfian Vito Anggoro</h3>
        </div>
      </div>
    </div>
  );
}
