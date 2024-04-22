'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { completeCompetition } from '@/lib/actions/competitionAction';
import { getTeamCompetitionByFilter } from '@/lib/actions/teamCompetitionAction';

export default function FormSubmit({ id }) {
  const [teamCompetitions, setTeamCompetitions] = useState([]);
  const [ranking, setRanking] = useState([]);
  // Load Handling
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState();
  const [message, setMessage] = useState('');

  useEffect(() => {
    const getTeamCompetitionsFunction = async () => {
      const res = await getTeamCompetitionByFilter(id);
      if (res.success) {
        const teamCompetitions = res.data || [];
        setTeamCompetitions(teamCompetitions);
      } else {
        setTeamCompetitions([]);
      }
    };

    getTeamCompetitionsFunction();
    // Fungsi ini akan dipanggil ketika komponen telah dipasang (mounted)
    // Di sinilah kita dapat menandai bahwa halaman telah berhasil dimuat
  }, []);
  const handleRankingChange = (index, value) => {
    const updatedRanking = [...ranking]; // Salin array Ranking
    updatedRanking[index] = value; // Atur nilai di index yang sesuai
    setRanking(updatedRanking); // Perbarui array rangking
  };

  const router = useRouter();
  const handleSubmit = async e => {
    e.preventDefault();
    setIsLoading(true);
    if (ranking.length <= 0) {
      setSuccess(false);
      setMessage('Failed, Please choose team that will win the competition');
      setIsLoading(false);
      return;
    }

    if (ranking.length == 2) {
      if (ranking[0] == ranking[1]) {
        setSuccess(false);
        setMessage(
          'Failed, Team that will win the competition must be different',
        );
        setIsLoading(false);
        return;
      }
    }

    if (ranking.length == 3) {
      if (
        ranking[0] == ranking[1] ||
        ranking[0] == ranking[2] ||
        ranking[1] == ranking[2]
      ) {
        setSuccess(false);
        setMessage(
          'Failed, Team that will win the competition must be different',
        );
        setIsLoading(false);
        return;
      }
    }

    const data = {
      ranking: ranking,
    };

    const res = await completeCompetition(id, data);

    if (!res.success) {
      setSuccess(false);
      setMessage('Failed, Something went wrong');
      setIsLoading(false);
      return;
    }

    setSuccess(true);
    setMessage('Success, Competition has been completed');
    setIsLoading(false);
    router.back();
    setTimeout(() => {
      window.location.reload();
    }, [1000]);
  };
  return (
    <div className="py-3 overflow-y-auto max-h-[80vh] min-h-[fit] w-[70vw]">
      {message !== '' && (
        <div
          className={`rounded-md ${
            success ? 'bg-green-600' : 'bg-red-600'
          } py-2 px-3 text-sm text-white flex justify-between gap-x-3 items-center mb-2`}
        >
          <p className="text-wrap">{message}</p>{' '}
          <button className=" font-bold text-xl" onClick={() => setMessage('')}>
            X
          </button>
        </div>
      )}
      {teamCompetitions.length === 0 ? (
        <>
          <p className="text-neutral-500 italic text-lg pb-2">
            Nothing team have finished or submit project
          </p>
          <button
            disabled={isLoading}
            onClick={() => router.back()}
            className="w-fit bg-red-500 text-white p-2 rounded"
          >
            {isLoading ? 'Loading...' : 'Cancel'}
          </button>
        </>
      ) : (
        <>
          <form className="space-y-3">
            <div className="flex flex-col gap-3">
              {teamCompetitions.slice(0, 3).map((teamCompetition, index) => (
                <div key={index}>
                  <label className="font-medium">{`Ranking ${
                    index + 1
                  }`}</label>
                  <select
                    name={`ranking${index + 1}`}
                    id={`ranking${index + 1}`}
                    className="bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                    placeholder={`Select team competition ranking ${index + 1}`}
                    value={ranking[index] || ''} // Set the selected value
                    onChange={e => handleRankingChange(index, e.target.value)} // Use onChange to handle changes
                  >
                    <option value="">
                      Select team competition ranking {index + 1}
                    </option>
                    {teamCompetitions.map(teamCompetition => (
                      <option
                        key={teamCompetition.teamId}
                        value={teamCompetition.teamId}
                      >
                        {teamCompetition.team.name}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
          </form>
          <div className="flex flex-col tablet:flex-row justify-start gap-3 py-3">
            {isLoading && <p className="italic text-neutral-500">Loading...</p>}
            {!isLoading && (
              <button
                disabled={isLoading}
                className="w-full bg-blue-500 text-white py-2 rounded"
                onClick={e => handleSubmit(e)}
              >
                {isLoading ? 'Loading...' : 'Submit'}
              </button>
            )}
            {!isLoading && (
              <button
                disabled={isLoading}
                onClick={() => router.back()}
                className="w-fit bg-red-500 text-white p-2 rounded"
              >
                {isLoading ? 'Loading...' : 'Cancel'}
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
}
