import Form from './Form';
export default function SubmitProjectCompetition({ params }) {
  return (
    <div className="flex-1 px-3 bg-white rounded-lg">
      <div className="pt-3 mb-3">
        <h2 className="text-2xl font-medium">Submit Project Competition</h2>
      </div>
      <Form competitionId={params.id} teamId={params.teamId} />
    </div>
  );
}
