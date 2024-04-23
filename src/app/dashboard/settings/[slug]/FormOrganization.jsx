'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { updateOrganization } from '@/lib/actions/organizationAction';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
export default function FormOrganization({ users, user }) {
  const { update } = useSession();
  const [avatar, setAvatar] = useState('');
  const [avatarFile, setAvatarFile] = useState(null);
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [description, setDescription] = useState(
    user?.organizations?.description || '',
  );
  const [address, setAddress] = useState(user?.organizations?.address || '');
  const [organizationLink, setOrganizationLink] = useState(
    user?.organizations?.organizationLink || '',
  );
  const [paymentName, setPaymentName] = useState(
    user?.organizations?.payment?.name || '',
  );
  const [service, setService] = useState(
    user?.organizations?.payment?.service || '',
  );
  const [noVirtualAccount, setNoVirtualAccount] = useState(
    user?.organizations?.payment?.noVirtualAccount || '',
  );

  // LOAD HANDLING
  const [isLoading, setIsLoading] = useState();
  const [isSuccess, setIsSuccess] = useState();
  const [message, setMessage] = useState('');
  const [messageWarning, setMessageWarning] = useState('');
  const [isWarning, setIsWarning] = useState(false);

  // ERROR HANDLING
  const [errorAvatar, setErrorAvatar] = useState('');
  const [errorName, setErrorName] = useState('');
  const [errorEmail, setErrorEmail] = useState('');
  const [errorPaymentName, setErrorPaymentName] = useState('');
  const [errorService, setErrorService] = useState('');
  const [errorNoVirtualAccount, setErrorNoVirtualAccount] = useState('');
  const [errorOrganizationLink, setErrorOrganizationLink] = useState('');

  useEffect(() => {
    const checkPaymentOrganization = () => {
      if (
        !user?.organizations?.payment?.name ||
        !user?.organizations?.payment?.service ||
        !user?.organizations?.payment?.noVirtualAccount
      ) {
        setIsWarning(true);
        setMessageWarning(
          'Warning, you must fill payment information for manage your competitions',
        );
      }
    };

    checkPaymentOrganization();
  }, [user]);

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

    if (email) {
      const emailMatch = users.find(users => users.email === email);
      const regex = /@gmail\.com$/; // Ekspresi reguler untuk memeriksa apakah email berakhiran dengan "@gmail.com"
      const emailRegex = regex.test(email);
      if (emailMatch && user.email !== email) {
        setErrorEmail('Email already exist');
      } else if (!emailRegex) {
        setErrorEmail('Email must end with "@gmail.com"');
      } else {
        setErrorEmail('');
      }
    }

    if (organizationLink) {
      const regex = /^(https?:\/\/)/;
      const organizationLinkRegex = regex.test(organizationLink);
      if (!organizationLinkRegex) {
        setErrorOrganizationLink(
          'Project link must be started with http:// or https://',
        );
      } else {
        setErrorOrganizationLink('');
      }
    } else {
      setErrorOrganizationLink('');
    }

    if (paymentName) {
      const regex = /^[a-zA-Z\s]+$/;
      const paymentNameRegex = regex.test(paymentName);
      if (!paymentNameRegex) {
        setErrorPaymentName('Payment Name must be letters');
      } else {
        setErrorPaymentName('');
      }
    }

    if (service) {
      setErrorService('');
    }

    if (noVirtualAccount) {
      setErrorNoVirtualAccount('');
    }
  }, [
    name,
    email,
    users,
    organizationLink,
    paymentName,
    service,
    noVirtualAccount,
    user.email,
  ]);

  const handleChangeAvatar = e => {
    const file = e.target.files[0];
    if (file?.type != 'image/jpeg' && file?.type != 'image/png') {
      setErrorAvatar('Type file avatar must be jpeg, png, jpg!');
    } else if (file?.size > 1000000) {
      setErrorAvatar('Size file avatar must be less than 1 MB!');
    } else {
      setErrorAvatar('');
      setAvatar(URL.createObjectURL(file));
      setAvatarFile(file);
    }
    // Simpan file yang diunggah ke dalam state avatarFile
  };
  const handleUploadAvatar = async () => {
    if (avatarFile) {
      const formData = new FormData();
      formData.append('file', avatarFile); // Gunakan append untuk menambahkan file ke FormData

      try {
        const res = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        if (!res.ok) {
          throw new Error(await res.text());
        }

        const resUploadImage = await res.json(); // Ambil nama file dari respons JSON

        if (resUploadImage.success) {
          // DELETE AVATAR BEFORE
          if (user?.avatar !== 'default-avatar.png') {
            formData.append('nowFile', user?.avatar);
            const res = await fetch('/api/upload', {
              method: 'DELETE',
              body: formData,
            });
            if (!res.ok) {
              throw new Error(await res.text());
            }
          }
        }

        return { data: resUploadImage.data, success: true };
      } catch (error) {
        return { success: false, message: error.message };
      }
    }
  };

  const router = useRouter();

  const handleSubmit = async e => {
    e.preventDefault();

    setIsLoading(true);
    if (
      name == '' ||
      email == '' ||
      paymentName == '' ||
      service == '' ||
      noVirtualAccount == ''
    ) {
      if (name == '') {
        setErrorName('Name is required');
      }

      if (email == '') {
        setErrorEmail('Email is requred');
      }

      if (paymentName == '') {
        setErrorPaymentName('Payment Name is required');
      }

      if (service == '') {
        setErrorService('Service is required');
      }

      if (noVirtualAccount == '') {
        setErrorNoVirtualAccount('No Virtual Account is required');
      }

      setIsSuccess(false);
      setMessage('Failed, Any form cannot be empty');
      setIsLoading(false);
      return;
    }

    if (
      errorEmail != '' ||
      errorName != '' ||
      errorAvatar != '' ||
      errorPaymentName != '' ||
      errorService != '' ||
      errorNoVirtualAccount != ''
    ) {
      setIsSuccess(false);
      setMessage('Failed, please check your input');
      setIsLoading(false);
      return;
    }
    const data = {
      name: name,
      email: email,
      description: description,
      address: address,
      organizationLink: organizationLink,
      paymentName: paymentName,
      service: service,
      noVirtualAccount: noVirtualAccount,
    };

    if (avatarFile) {
      const responseUploadAvatar = await handleUploadAvatar();
      if (!responseUploadAvatar.success) {
        setIsSuccess(false);
        setMessage('Failed, please check your file image');
        setIsLoading(false);
        return;
      } else {
        data.avatar = responseUploadAvatar.data;
      }
    }

    const result = await updateOrganization(user?.userId, data);
    if (!result.success) {
      setIsSuccess(false);
      setMessage('Failed, Account has not been updated');
      setIsLoading(false);
      return;
    }

    const dataUpdateSession = {
      name: name,
    };

    if (data.avatar != undefined) {
      dataUpdateSession.avatar = data.avatar;
    }

    update(dataUpdateSession);
    setIsSuccess(true);
    setMessage('Success, Account has been updated');
    setIsLoading(false);
    router.refresh();
  };

  return (
    <div className="p-3 bg-white">
      {messageWarning !== '' && (
        <div
          className={`rounded-md py-2 px-3 text-sm text-white flex justify-between gap-x-3 items-center mb-2 ${
            isWarning ? 'bg-yellow-600' : ''
          }`}
        >
          <p>{messageWarning}</p>{' '}
          <button
            className="font-bold text-xl"
            onClick={() => setMessageWarning('')}
          >
            X
          </button>
        </div>
      )}
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
      <form action="" className="space-y-3">
        <div className="space-y-2">
          <label className="font-medium">Avatar</label>
          <Image
            src={
              avatar
                ? avatar
                : `https://atzxitftejquqppfauyh.supabase.co/storage/v1/object/public/avatars/public/${user?.avatar}`
            }
            width={50}
            height={50}
            alt="avatar-user"
            priority
            className="rounded-full object-cover w-28 h-28"
          />
          <input
            type="file"
            name="avatar"
            id="avatar"
            className="bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            placeholder="Your Avatar"
            onChange={handleChangeAvatar}
          />
          <span className="text-neutral-500 text-sm block">
            Type file must be jpg, jpeg, png, Max size file is 1 MB
          </span>
          {errorAvatar && (
            <span className="text-red-500 text-sm italic">{errorAvatar}</span>
          )}
        </div>
        <div>
          <label className="font-medium">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            className="bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            placeholder="Name"
            defaultValue={name ? name : ''}
            onChange={e => setName(e.target.value)}
          />
          {errorName && (
            <span className="text-red-500 text-sm italic">{errorName}</span>
          )}
        </div>
        <div>
          <label className="font-medium">Email</label>
          <input
            type="text"
            name="email"
            id="email"
            className="bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            placeholder="email user"
            defaultValue={email ? email : ''}
            onChange={e => setEmail(e.target.value)}
          />
          {errorEmail && (
            <span className="text-red-500 text-sm italic">{errorEmail}</span>
          )}
        </div>
        <div>
          <label className="font-medium">Decription</label>
          <textarea
            name="description"
            id="description"
            cols="10"
            rows="10"
            className="bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            defaultValue={description ? description : ''}
            onChange={e => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div>
          <label className="font-medium">Address</label>
          <textarea
            name="address"
            id="address"
            cols="10"
            rows="10"
            className="bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            defaultValue={address ? address : ''}
            onChange={e => setAddress(e.target.value)}
          ></textarea>
        </div>
        <div>
          <label className="font-medium">Organization Link</label>
          <input
            type="text"
            name="organizationLink"
            id="organizationLink"
            className="bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            placeholder="Portofolio Link"
            defaultValue={organizationLink}
            onChange={e => setOrganizationLink(e.target.value)}
          />
          {errorOrganizationLink && (
            <span className="text-red-500 text-sm italic">
              {errorOrganizationLink}
            </span>
          )}
        </div>

        <div className="flex flex-col">
          <h3 className="text-xl font-semibold mb-3">Payment</h3>
          <div>
            <label className="font-medium">Atas Nama</label>
            <input
              type="text"
              name="payment_name"
              id="payment_name"
              className="bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              placeholder="Atas Nama"
              defaultValue={paymentName}
              onChange={e => setPaymentName(e.target.value)}
            />
            {errorPaymentName && (
              <span className="text-red-500 text-sm italic">
                {errorPaymentName}
              </span>
            )}
          </div>
          <div>
            <label className="font-medium">Service</label>
            <select
              name="service"
              id="service"
              className="bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              defaultValue={service}
              onChange={e => setService(e.target.value)}
            >
              <option value="">Select Service</option>
              <option value="DANA">DANA</option>
              <option value="SHOPEE">SHOPEE</option>
              <option value="OVO">OVO</option>
              <option value="GOPAY">GOPAY</option>
              <option value="BCA">BCA</option>
              <option value="BRI">BRI</option>
              <option value="MANDIRI">MANDIRI</option>
            </select>
            {errorService && (
              <span className="text-red-500 text-sm italic">
                {errorService}
              </span>
            )}
          </div>
          <div>
            <label className="font-medium">No Virtual Account</label>
            <input
              type="number"
              name="noVirtualAccount"
              id="noVirtualAccount"
              className="bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              placeholder="No Virtual Account"
              defaultValue={noVirtualAccount}
              onChange={e => setNoVirtualAccount(e.target.value)}
            />
            {errorNoVirtualAccount && (
              <span className="text-red-500 text-sm italic">
                {errorNoVirtualAccount}
              </span>
            )}
          </div>
        </div>

        <button
          disabled={isLoading}
          className="w-full bg-blue-500 text-white py-2 rounded"
          onClick={handleSubmit}
        >
          {isLoading ? 'Loading...' : 'Update'}
        </button>
      </form>
    </div>
  );
}
