'use client';
import { competitionRegistration } from '@/lib/actions/competitionAction';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { getDetailUser } from '@/lib/actions/userAction';
import { useSession } from 'next-auth/react';

export default function FormCompetitionRegistration({
  competitionId,
  competition,
  softwareDevelopers,
}) {
  const { data: session, status } = useSession();
  const [user, setUser] = useState();
  const [proofOfPayment, setProofOfPayment] = useState('');
  const [proofOfPaymentFile, setProofOfPaymentFile] = useState(null);
  const [name, setName] = useState('');
  const [members, setMembers] = useState([]);

  // Error Handle
  const [errorName, setErrorName] = useState('');
  const [errorMember, setErrorMember] = useState('');
  const [errorProofOfPaymentFile, setErrorProofOfPaymentFile] = useState('');

  // Load Handle
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState();
  const [message, setMessage] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchUserDetail = async () => {
      try {
        if (session && status === 'authenticated') {
          const res = await getDetailUser(session.user.nickname);
          setUser(res.data);
        } else {
          router.push('/login');
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserDetail();
  }, [session, router, status]);

  useEffect(() => {
    const updatedMembers = [...members]; // Salin array members
    updatedMembers[0] = user?.softwareDevelopers?.collaborationId;
    setMembers(updatedMembers);
    const name = user?.name.indexOf(' ');
    const firstName = user?.name.substring(0, name);
    setName(firstName || '' + ' ' + 'Team');
  }, [user]);

  const handleMemberChange = (index, value) => {
    const updatedMembers = [...members]; // Salin array members
    updatedMembers[index] = value; // Atur nilai di index yang sesuai
    setMembers(updatedMembers); // Perbarui array members
  };

  const handleUploadProofOfPayment = async () => {
    if (proofOfPaymentFile) {
      const formData = new FormData();
      formData.append('file', proofOfPaymentFile); // Gunakan append untuk menambahkan file ke FormData

      try {
        const res = await fetch('/api/upload/proofOfPayment', {
          method: 'POST',
          body: formData,
        });

        if (!res.ok) {
          throw new Error(await res.text());
        }

        const resUploadProofOfPayment = await res.json(); // Ambil nama file dari respons JSON

        return { data: resUploadProofOfPayment.data, success: true };
      } catch (error) {
        return { success: false, message: error.message };
      }
    }
  };

  const handleProofOfPaymentChange = e => {
    const file = e.target.files[0];
    if (file?.type != 'image/jpeg' && file?.type != 'image/png') {
      setErrorProofOfPaymentFile('Type file is not supported!');
    } else if (file?.size > 1000000) {
      setErrorProofOfPaymentFile('Size file must be less than 1 MB!');
    } else {
      setErrorProofOfPaymentFile('');
      setProofOfPayment(URL.createObjectURL(file));
      setProofOfPaymentFile(file);
    }
  };

  useEffect(() => {
    if (name) {
      const regex = /^[a-zA-Z\s]+$/;
      const nameRegex = regex.test(name);
      if (!nameRegex) {
        setErrorName('Name must be letters');
      } else if (name.length < 5) {
        setErrorName('Name must be more than 5 letters');
      } else {
        setErrorName('');
      }
    }

    if (members.length > 0) {
      members.forEach((collaborationId, index) => {
        if (collaborationId) {
          // Lakukan pemeriksaan apakah collaboration ID ada pada pengguna yang valid
          const collaborationIdMatch = softwareDevelopers.find(
            softwareDeveloper =>
              softwareDeveloper.collaborationId == collaborationId,
          );

          if (!collaborationIdMatch) {
            setErrorMember(
              `Member ${
                index + 1
              } is not valid or not available for collaboration`,
            );
          } else {
            const checkCollaborationIdHaveRegistered = competition.teams.some(
              teams =>
                teams.team.softwareDevelopers.some(
                  softwareDevelopers =>
                    softwareDevelopers.collaborationId == collaborationId,
                ),
            );

            if (checkCollaborationIdHaveRegistered) {
              setErrorMember(
                `Member ${index + 1} has been registered in this competition`,
              );
            } else {
              setErrorMember('');
            }
          }
        }
      });

      const isUnique = members.every(
        (value, index) => members.indexOf(value) === index,
      );
      if (!isUnique) {
        setErrorMember('Member must be unique');
      } else {
        setErrorMember('');
      }
    }
  }, [name, members, competition?.teams, softwareDevelopers]);

  const handleSubmit = async e => {
    e.preventDefault();
    setIsLoading(true);
    if (name == '') {
      setErrorName('Name is required');
      setIsSuccess(false);
      setMessage('Failed, please check your input');
      setIsLoading(false);
      return;
    }

    if (competition.registrationFee > 0) {
      if (proofOfPaymentFile == null) {
        setErrorProofOfPaymentFile('Proof of Payment is required');
        setIsSuccess(false);
        setMessage('Failed, please check your input');
        setIsLoading(false);
        return;
      }
    }

    if (errorName != '' || errorProofOfPaymentFile != '' || errorMember != '') {
      setIsSuccess(false);
      setMessage('Failed, please check your input');
      setIsLoading(false);
      return;
    }

    const data = {
      name: name,
      members: members,
    };

    if (proofOfPaymentFile) {
      const resUploadProofOfPayment = await handleUploadProofOfPayment();
      if (!resUploadProofOfPayment.success) {
        setIsSuccess(false);
        setMessage('Failed, please check your file proof of payment');
        setIsLoading(false);
        return;
      } else {
        data.proofOfPayment = resUploadProofOfPayment.data;
      }
    }

    const result = await competitionRegistration(competitionId, data);

    if (!result.success) {
      setIsSuccess(false);
      setMessage('Failed, Something went wrong');
      setIsLoading(false);
      return;
    }

    setIsSuccess(true);
    setMessage('Success, Your team has been registered');
    router.back();
    setTimeout(() => {
      window.location.reload();
    }, [1000]);
    setIsLoading(false);
  };

  return (
    <div className="p-3 overflow-y-auto max-h-[80vh] min-h-[fit] w-[70vw]">
      {message !== '' && (
        <div
          className={`rounded-md py-2 px-3 text-sm text-white flex justify-between gap-x-3 items-center mb-2 ${
            isSuccess ? 'bg-green-600' : 'bg-red-600'
          }`}
        >
          <p>{message}</p>{' '}
          <button className="font-bold text-xl" onClick={() => setMessage('')}>
            X
          </button>
        </div>
      )}
      <form action="" className={`space-y-3`}>
        <div>
          <label className="font-medium">Team Name</label>
          <input
            type="text"
            name="name"
            id="name"
            className="bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            placeholder="Your Team Name"
            value={name}
            readOnly={competition?.maxMemberTeam === 1 ? true : false}
            onChange={e => setName(e.target.value)}
          />
          {errorName && (
            <span className="text-red-500 text-sm italic">{errorName}</span>
          )}
        </div>
        <div className="border-b border-black w-full"></div>
        <div className={`space-y-3`}>
          <h3 className="text-xl font-medium">Member of team</h3>
          {[...Array(Number(competition?.maxMemberTeam))].map((_, index) => (
            <div key={index}>
              <label className="font-medium">Member {index + 1}</label>
              <input
                type="text"
                name={`member${index}`}
                id={`member${index}`}
                className={`bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
                placeholder={`Inputkan Collaboration ID Member ${index + 1}`}
                readOnly={index === 0 ? true : false}
                defaultValue={members[index]} // Gunakan nilai dari array members
                onChange={e => handleMemberChange(index, e.target.value)}
              />
              {errorMember && (
                <span className="text-red-500 text-sm italic">
                  {errorMember}
                </span>
              )}
            </div>
          ))}
        </div>
        <div className="border-b border-black w-full"></div>
        {competition?.registrationFee !== 0 && (
          <div className="space-y-3">
            <h3 className="text-xl font-medium">Pembayaran</h3>
            <div className="p-3 bg-neutral-200 rounded">
              <p className="text-lg text-black font-normal">
                {competition?.organization?.payment?.service}
              </p>
              <p className="text-lg text-black font-normal">
                a/n {competition?.organization?.payment?.name}
              </p>
              <p className="text-lg text-black font-normal">
                {competition?.organization?.payment?.noVirtualAccount}
              </p>
            </div>
            <div>
              <label className="font-medium">Upload Bukti Pembayaran</label>
              {proofOfPayment && (
                <Image
                  src={proofOfPayment}
                  alt="preview-proofOfPayment"
                  width={200}
                  height={200}
                  className="w-1/4 h-auto object-cover"
                />
              )}
              <input
                type="file"
                name="proofOfPayment"
                id="proofOfPayment"
                className="bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                placeholder="Upload Bukti Pembayaran"
                onChange={handleProofOfPaymentChange}
              />
              <span className="text-neutral-500 text-sm block">
                Format file must be jpg,png and jpeg, max size 1 MB
              </span>
              {errorProofOfPaymentFile && (
                <span className="text-red-500 text-sm italic">
                  {errorProofOfPaymentFile}
                </span>
              )}
            </div>
          </div>
        )}
      </form>
      <div className="flex flex-col tablet:flex-row justify-start gap-3 py-3">
        {isLoading && <p className="italic text-neutral-500">Loading...</p>}
        {!isLoading && (
          <button
            disabled={isLoading}
            onClick={handleSubmit}
            className="w-full tablet:w-fit bg-blue-500 text-white p-2 rounded"
          >
            {isLoading ? 'Loading...' : 'Submit'}
          </button>
        )}
        {!isLoading && (
          <button
            disabled={isLoading}
            onClick={() => router.back()}
            className="w-full tablet:w-fit bg-red-500 text-white p-2 rounded"
          >
            {isLoading ? 'Loading...' : 'Cancel'}
          </button>
        )}
      </div>
    </div>
  );
}
