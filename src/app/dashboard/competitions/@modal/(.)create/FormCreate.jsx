'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { createCompetition } from '@/lib/actions/competitionAction';
import { useSession } from 'next-auth/react';
import { getDetailOrganization } from '@/lib/actions/organizationAction';
import { getCategories } from '@/lib/actions/categoryAction';
import { getTypes } from '@/lib/actions/typeAction';
import { getOrganizations } from '@/lib/actions/organizationAction';

export default function FormCreate() {
  const { data: session, status } = useSession();
  const currentDate = new Date().toISOString().split('T')[0];
  const router = useRouter('');

  const [categories, setCategories] = useState([]);
  const [types, setTypes] = useState([]);
  const [organizations, setOrganizations] = useState([]);

  const [name, setName] = useState('');
  const [place, setPlace] = useState('');
  const [description, setDescription] = useState('');
  const [maxMemberTeam, setMaxMemberTeam] = useState('1');
  const [maxTeam, setMaxTeam] = useState('1');
  const [registrationStartDate, setRegistrationStartDate] =
    useState(currentDate);
  const [registrationEndDate, setRegistrationEndDate] = useState(currentDate);
  const [registrationFee, setRegistrationFee] = useState('0');
  const [startDate, setStartDate] = useState(currentDate);
  const [endDate, setEndDate] = useState(currentDate);
  const [categoryId, setCategoryId] = useState('');
  const [typeId, setTypeId] = useState('');
  const [organizationId, setOrganizationId] = useState('');

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

  const getCategoriesData = async () => {
    try {
      const res = await getCategories();
      if (res.success) {
        const categories = res.data;
        setCategories(categories);
      } else {
        setCategories([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getTypesData = async () => {
    try {
      const res = await getTypes();
      if (res.success) {
        const types = res.data;
        setTypes(types);
      } else {
        setTypes([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getOrganizationsData = async () => {
    try {
      const res = await getOrganizations();
      if (res.success) {
        const organizations = res.data;
        setOrganizations(organizations);
      } else {
        setOrganizations([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategoriesData();
    getTypesData();
    getOrganizationsData();
  }, []);

  useEffect(() => {
    const getOrganization = async () => {
      if (session && status === 'authenticated') {
        if (session?.user?.role === 'Organization') {
          const res = await getDetailOrganization(session?.user?.userId);
          if (res?.success) {
            const user = res.data;
            if (
              !user?.organizations?.payment?.name ||
              !user?.organizations?.payment?.service ||
              !user?.organizations?.payment?.noVirtualAccount
            ) {
              router.push(`/dashboard/settings/${session?.user?.nickname}`);
            } else {
              setOrganizationId(user?.organizations?.organizationId);
            }
          }
        }
      }
    };

    getOrganization();
  }, [session, status, router]);

  useEffect(() => {
    if (name) {
      setErrorName('');
    }

    if (place) {
      setErrorPlace('');
    }

    if (description) {
      setErrorDescription('');
    }

    if (maxMemberTeam) {
      setErrorMaxMemberTeam('');
    }

    if (maxTeam) {
      setErrorMaxTeam('');
    }

    if (categoryId) {
      setErrorCategoryId('');
    }

    if (typeId) {
      setErrorTypeId('');
    }

    if (organizationId) {
      setErrorOrganizationId('');
    }

    if (registrationFee != '') {
      setErrorRegistrationFee('');
    }

    if (registrationStartDate) {
      setErrorRegistrationStartDate('');
    }

    if (registrationEndDate) {
      setErrorRegistrationEndDate('');
    }

    if (startDate) {
      setErrorStartDate('');
    }

    if (endDate) {
      setErrorEndDate('');
    }
  }, [
    name,
    place,
    description,
    maxMemberTeam,
    maxTeam,
    registrationStartDate,
    registrationEndDate,
    registrationFee,
    startDate,
    endDate,
    categoryId,
    typeId,
    organizationId,
  ]);

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

    if (registrationFee > 0) {
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

    const res = await createCompetition(data);

    if (!res.success) {
      setIsSuccess(false);
      setMessage('Failed, Competition have not been created');
      setIsLoading(false);
      return;
    }
    setIsSuccess(true);
    setMessage('Success, Competition have been created');
    setIsLoading(false);
    router.back();
    setTimeout(() => {
      window.location.reload();
    }, [1000]);
  };
  return (
    <div className="p-3 overflow-y-auto max-h-[80vh] min-h-[fit] w-[70vw]">
      {message !== '' && (
        <div
          className={`rounded-md ${isSuccess ? 'bg-green-600' : 'bg-red-600'}
          } py-2 px-3 text-sm text-white flex justify-between gap-x-3 items-center mb-2`}
        >
          <p className="text-wrap">{message}</p>

          <button className=" font-bold text-xl" onClick={() => setMessage('')}>
            X
          </button>
        </div>
      )}
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
                placeholder="Name of competition"
                onChange={e => setName(e.target.value)}
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
                placeholder="Place of competition"
                onChange={e => setPlace(e.target.value)}
              />
              {errorPlace && (
                <span className="text-red-500 text-sm italic">
                  {errorPlace}
                </span>
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
                placeholder="Description of competition"
                onChange={e => setDescription(e.target.value)}
              ></textarea>
              {errorDescription && (
                <span className="text-red-500 text-sm italic">
                  {errorDescription}
                </span>
              )}
            </div>
            <div className="flex flex-col tablet:flex-row tablet:gap-x-2 gap-y-2 tablet:gap-y-0">
              <div className="basis-1/2">
                <label className="font-medium">Max Member of team</label>
                <input
                  type="number"
                  name="max_mamber_of_team"
                  id="max_mamber_of_team"
                  className="bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                  placeholder="Maximal member of the team"
                  readOnly={maxMemberTeamReadOnly}
                  value={maxMemberTeam}
                  onChange={e => setMaxMemberTeam(e.target.value)}
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
                  placeholder="Maximal team of competition"
                  value={maxTeam}
                  onChange={e => setMaxTeam(e.target.value)}
                />
                {errorMaxTeam && (
                  <span className="text-red-500 text-sm italic">
                    {errorMaxTeam}
                  </span>
                )}
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
                onChange={e => setCategoryId(e.target.value)}
              >
                <option value="">Select Category</option>
                {categories.map(category => (
                  <option value={category.categoryId} key={category.categoryId}>
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
                placeholder="Category of competition"
                onChange={e => setTypeId(e.target.value)}
              >
                <option value="">Select Type</option>
                {types.map(type => (
                  <option value={type.typeId} key={type.typeId}>
                    {type.name}
                  </option>
                ))}
              </select>
              {errorTypeId && (
                <span className="text-red-500 text-sm italic">
                  {errorTypeId}
                </span>
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
            <div
              className={session?.user?.role == 'Organization' ? 'hidden' : ''}
            >
              <label className="font-medium">Organization</label>
              <select
                name="organization"
                id="organization"
                className="bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                placeholder="Select Organization"
                value={organizationId}
                onChange={e => setOrganizationId(e.target.value)}
              >
                <option value="">Select Organization</option>
                {organizations.map(organization => (
                  <option
                    value={organization?.organizationId}
                    key={organization?.organizationId}
                  >
                    {organization.user.name}
                  </option>
                ))}
              </select>
              {errorOrganizationId && (
                <span className="text-red-500 text-sm italic">
                  {errorOrganizationId}
                </span>
              )}
            </div>
            <div className="flex flex-col tablet:flex-row tablet:gap-x-2 gap-y-2 tablet:gap-y-0">
              <div className="basis-1/2">
                <label className="font-medium">Registration Start Date</label>
                <input
                  type="date"
                  name="registration_start_date"
                  id="registration_start_date"
                  className="bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                  placeholder="Start date of registration competition"
                  defaultValue={registrationStartDate}
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
                  defaultValue={registrationEndDate}
                  onChange={e => setRegistrationEndDate(e.target.value)}
                />
                {errorRegistrationEndDate && (
                  <span className="text-red-500 text-sm italic">
                    {errorRegistrationEndDate}
                  </span>
                )}
              </div>
            </div>
            <div className="flex flex-col tablet:flex-row tablet:gap-x-2 gap-y-2 tablet:gap-y-0">
              <div className="basis-1/2">
                <label className="font-medium">Competition Start Date</label>
                <input
                  type="date"
                  name="competition_start_date"
                  id="competition_start_date"
                  className="bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                  placeholder="Start date of competition"
                  defaultValue={startDate}
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
                  defaultValue={endDate}
                  onChange={e => setEndDate(e.target.value)}
                />
                {errorEndDate && (
                  <span className="text-red-500 text-sm italic">
                    {errorEndDate}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </form>
      <div className="flex flex-col tablet:flex-row justify-start gap-3 py-3">
        {isLoading && <p className="italic text-neutral-500">Loading...</p>}
        {!isLoading && (
          <button
            disabled={isLoading}
            onClick={handleSubmit}
            className="w-fit bg-blue-500 text-white p-2 rounded"
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
    </div>
  );
}
