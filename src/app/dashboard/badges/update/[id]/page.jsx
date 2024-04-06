import FormUpdate from './FormUpdate';

export const metadata = {
  title: 'Update Badges - Join Code',
  description: 'Dashboard Update Badges - Join Code',
};

export default function UpdateBadgePage(params) {
  return (
    <div className="flex-1 bg-mainColor px-3">
      <div className="pt-3 mb-3">
        <h2 className="text-2xl font-medium">Update Badge</h2>
      </div>
      <FormUpdate />
    </div>
  );
}
