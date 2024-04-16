'use client';
import { useEffect, useState } from 'react';
import moment from 'moment';
import 'moment/locale/id';
import { updateCompetition } from '@/lib/actions/competitionAction';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

export default function FormUpdate({
  competition,
  categories,
  types,
  organizations,
}) {
  moment.locale('id');
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session && status === 'authenticated') {
      if (session?.user?.role === 'Organization') {
        if (
          session?.user?.nickname !== competition?.organization?.user?.nickname
        ) {
          router.back();
        }
      }
    }
  }, [session, status, competition?.organization?.user?.nickname, router]);

  const [name, setName] = useState(competition?.name || '');
  const [place, setPlace] = useState(competition?.place || '');
  const [description, setDescription] = useState(
    competition?.description || '',
  );
  const [maxMemberTeam, setMaxMemberTeam] = useState(
    competition?.maxMemberTeam || '',
  );
  const [maxTeam, setMaxTeam] = useState(competition?.maxTeam || '');
  const [categoryId, setCategoryId] = useState(
    competition?.categoryId ? competition?.categoryId : '',
  );
  const [typeId, setTypeId] = useState(
    competition?.typeId ? competition?.typeId : '',
  );
  const [registrationFee, setRegistrationFee] = useState(
    competition?.registrationFee || 0,
  );
  const [registrationStartDate, setRegistrationStartDate] = useState(
    competition?.registrationStartDate || '',
  );
  const [registrationEndDate, setRegistrationEndDate] = useState(
    competition?.registrationEndDate || '',
  );
  const [startDate, setStartDate] = useState(competition?.startDate || '');
  const [endDate, setEndDate] = useState(competition?.endDate || '');
  const [organizationId, setOrganizationId] = useState(
    competition?.organizationId || '',
  );

  const [maxMemberTeamReadOnly, setMaxMemberTeamReadOnly] = useState(false);

  // Error Handler
  const [errorName, setErrorName] = useState('');
  const [errorPlace, setErrorPlace] = useState('');
  const [errorDescription, setErrorDescription] = useState('');
  const [errorMaxMemberTeam, setErrorMaxMemberTeam] = useState('');
  const [errorMaxTeam, setErrorMaxTeam] = useState('');
  const [errorCategoryId, setErrorCategoryId] = useState('');
  const [errorTypeId, setErrorTypeId] = useState('');
  const [errorRegistrationFee, setErrorRegistrationFee] = useState('');
  const [errorOrganizationId, setErrorOrganizationId] = useState('');
  const [errorRegistrationStartDate, setErrorRegistrationStartDate] =
    useState('');
  const [errorRegistrationEndDate, setErrorRegistrationEndDate] = useState('');
  const [errorStartDate, setErrorStartDate] = useState('');
  const [errorEndDate, setErrorEndDate] = useState('');

  // Submit Handler
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState();
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (categoryId == 1) {
      setMaxMemberTeam('1');
      setMaxMemberTeamReadOnly(true);
    } else {
      setMaxMemberTeamReadOnly(false);
    }

    if (maxMemberTeam == '0' || maxMemberTeam == '') {
      setMaxMemberTeam(1);
    }

    if (maxTeam == '0' || maxTeam == '') {
      setMaxTeam(1);
    }
  }, [categoryId, maxMemberTeam, maxTeam]);

  const handleSubmit = async e => {
    e.preventDefault();

    setIsLoading(true);
    if (competition?.isCompleted) {
      setIsSuccess(false);
      setMessage('Failed,Competition is already completed');
      setIsLoading(false);
      return;
    }
    if (
      name === '' ||
      place === '' ||
      description === '' ||
      maxMemberTeam === '' ||
      maxTeam === '' ||
      registrationStartDate === '' ||
      registrationEndDate === '' ||
      registrationFee === '' ||
      startDate === '' ||
      endDate === '' ||
      categoryId === '' ||
      typeId === '' ||
      organizationId === ''
    ) {
      if (name === '') setErrorName('Name is required');
      if (place === '') setErrorPlace('Place is required');
      if (description === '') setErrorDescription('Description is required');
      if (maxMemberTeam === '')
        setErrorMaxMemberTeam('Max Member Team is required');
      if (maxTeam === '') setErrorMaxTeam('Max Team is required');
      if (registrationStartDate === '')
        setErrorRegistrationStartDate('Registration Start Date is required');
      if (registrationEndDate === '')
        setErrorRegistrationEndDate('Registration End Date is required');
      if (registrationFee === '')
        setErrorRegistrationFee('Registration Fee is required');
      if (startDate === '') setErrorStartDate('Start Date is required');
      if (endDate === '') setErrorEndDate('End Date is required');
      if (categoryId === '') setErrorCategoryId('Category is required');
      if (typeId === '') setErrorTypeId('Type is required');
      if (organizationId === '')
        setErrorOrganizationId('Organization is required');
      setIsSuccess(false);
      setMessage('Failed, Please fill in all required fields');
      setIsLoading(false);
      return;
    }

    if (
      errorName != '' ||
      errorPlace != '' ||
      errorDescription != '' ||
      errorMaxMemberTeam != '' ||
      errorMaxTeam != '' ||
      errorCategoryId != '' ||
      errorTypeId != '' ||
      errorRegistrationFee != '' ||
      errorOrganizationId != '' ||
      errorRegistrationStartDate != '' ||
      errorRegistrationEndDate != '' ||
      errorStartDate != '' ||
      errorEndDate != ''
    ) {
      setIsSuccess(false);
      setMessage('Failed,Please check your form');
      setIsLoading(false);
      return;
    }

    const data = {
      name: name,
      place: place,
      description: description,
      maxMemberTeam: Number(maxMemberTeam),
      maxTeam: Number(maxTeam),
      registrationStartDate: new Date(registrationStartDate),
      registrationEndDate: new Date(registrationEndDate),
      registrationFee: Number(registrationFee),
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      categoryId: Number(categoryId),
      typeId: Number(typeId),
      organizationId: Number(organizationId),
    };
    const res = await updateCompetition(competition.competitionId, data);
    if (!res.success) {
      setIsSuccess(false);
      setMessage('Failed, Competition have not been updated');
      setIsLoading(false);
      return;
    }
    setIsSuccess(true);
    setMessage('Success, Competition have been updated');
    setIsLoading(false);
    router.refresh();
  };

  return (
    <div className="p-3 bg-white">
      {message !== '' && (
        <div
          className={`rounded-md ${
            isSuccess ? 'bg-green-600' : 'bg-red-600'
          } py-2 px-3 text-sm text-white flex justify-between gap-x-3 items-center mb-2`}
        >
          <p className="text-wrap">{message}</p>{' '}
          <button className=" font-bold text-xl" onClick={() => setMessage('')}>
            X
          </button>
        </div>
      )}
      <form action={handleSubmit} className="space-y-3">
        <div className="space-y-2">
          <div>
            <label className="font-medium">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              className="bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              defaultValue={name}
              onChange={e => setName(e.target.value)}
              placeholder="Name of competition"
            />
            {errorName && (
              <span className="text-red-500 text-sm italic">{errorName}</span>
            )}
          </div>
          <div>
            <label className="font-medium">Place</label>
            <input
              type="text"
              name="place"
              id="place"
              className="bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              defaultValue={place}
              onChange={e => setPlace(e.target.value)}
              placeholder="Place of competition"
            />
            {errorPlace && (
              <span className="text-red-500 text-sm italic">{errorPlace}</span>
            )}
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
              defaultValue={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Description of competition"
            ></textarea>
            {errorDescription && (
              <span className="text-red-500 text-sm italic">
                {errorDescription}
              </span>
            )}
          </div>
          <div className="flex gap-x-2">
            <div className="basis-1/2">
              <label className="font-medium">Max Member of team</label>
              <input
                type="number"
                name="max_mamber_of_team"
                id="max_mamber_of_team"
                className="bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                readOnly={maxMemberTeamReadOnly}
                value={maxMemberTeam}
                onChange={e => setMaxMemberTeam(e.target.value)}
                placeholder="Maximal member of the team"
              />
              {errorMaxMemberTeam && (
                <span className="text-red-500 text-sm italic">
                  {errorMaxMemberTeam}
                </span>
              )}
            </div>
            <div className="basis-1/2">
              <label className="font-medium">Max team</label>
              <input
                type="number"
                name="max_team"
                id="max_team"
                className="bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                value={maxTeam}
                onChange={e => setMaxTeam(e.target.value)}
                placeholder="Maximal team of competition"
              />
              {errorMaxTeam && (
                <span className="text-red-500 text-sm italic">
                  {errorMaxTeam}
                </span>
              )}
            </div>
          </div>
        </div>
        <div>
          <label className="font-medium">Category</label>
          <select
            name="category"
            id="category"
            className="bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            placeholder="Category of competition"
            onChange={e => setCategoryId(e.target.value)}
            defaultValue={categoryId}
          >
            <option value="">Select Category</option>
            {categories?.map(category => (
              <option key={category.categoryId} value={category.categoryId}>
                {category.name}
              </option>
            ))}
          </select>
          {errorCategoryId && (
            <span className="text-red-500 text-sm italic">
              {errorCategoryId}
            </span>
          )}
        </div>
        <div>
          <label className="font-medium">Type</label>
          <select
            name="type"
            id="type"
            className="bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            placeholder="Type of competition"
            defaultValue={typeId}
            onChange={e => setTypeId(e.target.value)}
          >
            <option value="">Select Type</option>
            {types?.map(type => (
              <option key={type.typeId} value={type.typeId}>
                {type.name}
              </option>
            ))}
          </select>
          {errorTypeId && (
            <span className="text-red-500 text-sm italic">{errorTypeId}</span>
          )}
        </div>
        <div>
          <label className="font-medium">Registration Fee</label>
          <input
            type="number"
            name="fee"
            id="fee"
            className="bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            placeholder="Fee of competition"
            defaultValue={registrationFee}
            onChange={e => setRegistrationFee(e.target.value)}
          />
          {errorRegistrationFee && (
            <span className="text-red-500 text-sm italic">
              {errorRegistrationFee}
            </span>
          )}
        </div>
        <div className={session?.user?.role == 'Organization' ? 'hidden' : ''}>
          <label className="font-medium">Organization</label>
          <select
            name="organization"
            id="organization"
            className="bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            placeholder="Select Organization"
            defaultValue={organizationId}
            onChange={e => setOrganizationId(e.target.value)}
          >
            <option value="">Select Organization</option>
            {organizations?.map(organization => (
              <option
                value={organization?.organizationId}
                key={organization?.organizationId}
              >
                {organization?.user?.name}
              </option>
            ))}
          </select>
          {errorOrganizationId && (
            <span className="text-red-500 text-sm italic">
              {errorOrganizationId}
            </span>
          )}
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
              defaultValue={moment(registrationStartDate).format('YYYY-MM-DD')}
              onChange={e => setRegistrationStartDate(e.target.value)}
            />
            {errorRegistrationStartDate && (
              <span className="text-red-500 text-sm italic">
                {errorRegistrationStartDate}
              </span>
            )}
          </div>
          <div className="basis-1/2">
            <label className="font-medium">Registration End Date</label>
            <input
              type="date"
              name="registration_end_date"
              id="registration_end_date"
              className="bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              placeholder="End date of registration competition"
              defaultValue={moment(registrationEndDate).format('YYYY-MM-DD')}
              onChange={e => setRegistrationEndDate(e.target.value)}
            />
            {errorRegistrationEndDate && (
              <span className="text-red-500 text-sm italic">
                {errorRegistrationEndDate}
              </span>
            )}
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
              defaultValue={moment(startDate).format('YYYY-MM-DD')}
              onChange={e => setStartDate(e.target.value)}
            />
            {errorStartDate && (
              <span className="text-red-500 text-sm italic">
                {errorStartDate}
              </span>
            )}
          </div>
          <div className="basis-1/2">
            <label className="font-medium">Competition End Date</label>
            <input
              type="date"
              name="competition_end_date"
              id="competition_end_date"
              className="bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              placeholder="End date of competition"
              defaultValue={moment(endDate).format('YYYY-MM-DD')}
              onChange={e => setEndDate(e.target.value)}
            />
            {errorEndDate && (
              <span className="text-red-500 text-sm italic">
                {errorEndDate}
              </span>
            )}
          </div>
        </div>
        <button
          disabled={isLoading}
          className="w-full bg-blue-500 text-white py-2 rounded"
          onClick={handleSubmit}
        >
          {isLoading ? 'Loading...' : 'Submit'}
        </button>
      </form>
    </div>
  );
}
