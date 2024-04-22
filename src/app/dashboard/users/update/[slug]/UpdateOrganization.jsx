'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { updateOrganization } from '@/lib/actions/organizationAction';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
export default function UpdateOrganization({ users, user }) {
  const [avatar, setAvatar] = useState('');
  const [avatarFile, setAvatarFile] = useState(null);
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [document, setDocument] = useState('');
  const [documentFile, setDocumentFile] = useState(null);
  const [description, setDescription] = useState(
    user?.organizations?.description || '',
  );
  const [address, setAddress] = useState(user?.organizations?.address || '');
  const [organizationLink, setOrganizationLink] = useState(
    user?.organizations?.organizationLink || '',
  );
  const [isValidDocument, setIsValidDocument] = useState(
    user?.organizations?.isValidDocument || false,
  );
  const [isEmailVerified, setIsEmailVerified] = useState(
    user?.isEmailVerified || false,
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

  // ERROR HANDLING
  const [errorAvatar, setErrorAvatar] = useState('');
  const [errorName, setErrorName] = useState('');
  const [errorEmail, setErrorEmail] = useState('');
  const [errorDocument, setErrorDocument] = useState('');
  const [errorOrganizationLink, setErrorOrganizationLink] = useState('');
  const [errorPaymentName, setErrorPaymentName] = useState('');
  const [errorService, setErrorService] = useState('');
  const [errorNoVirtualAccount, setErrorNoVirtualAccount] = useState('');

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
        setErrorEmail('Email is required');
      } else if (!emailRegex) {
        setErrorEmail('Email must be ended with "@gmail.com"');
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
    }
  }, [name, email, users, organizationLink, user.email]);

  const handleChangeAvatar = e => {
    const file = e.target.files[0];
    if (file.type != 'image/jpeg') {
      setErrorAvatar('Type file avatar is not supported!');
    } else if (file.size > 1000000) {
      setErrorAvatar('Size file avatar less than 1 MB!');
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

        return { newFileName: resUploadImage.data, success: true };
      } catch (error) {
        return { success: false, message: error.message };
      }
    }
  };

  const handleChangeDocument = e => {
    const document = e.target.files[0];
    if (document) {
      if (document.type != 'application/pdf') {
        setErrorDocument('Type document file must be pdf!');
      } else if (document.size > 1000000) {
        setErrorDocument('Size document file less than 1 MB!');
      } else {
        setDocument(URL.createObjectURL(document));
        setDocumentFile(document);
        setErrorDocument('');
      }
    }
  };

  const handleUploadDocument = async () => {
    if (documentFile) {
      console.log(documentFile);
      const formData = new FormData();
      formData.append('file', documentFile); // Gunakan append untuk menambahkan file ke FormData

      try {
        const res = await fetch('/api/upload/document', {
          method: 'POST',
          body: formData,
        });

        if (!res.ok) {
          throw new Error(await res.text());
        }

        const resUploadDocument = await res.json(); // Ambil nama file dari respons JSON

        if (resUploadDocument.success) {
          // DELETE AVATAR BEFORE
          if (user?.organizations?.document) {
            formData.append('nowFile', user?.organizations?.document);
            const res = await fetch('/api/upload/document', {
              method: 'DELETE',
              body: formData,
            });
            if (!res.ok) {
              throw new Error(await res.text());
            }
          }
        }

        return { newFileName: resUploadDocument.data, success: true };
      } catch (error) {
        return { success: false, message: error.message };
      }
    }
  };

  const router = useRouter();

  const handleSubmit = async e => {
    e.preventDefault();

    setIsLoading(true);
    if (name == '' || email == '') {
      if (name == '') {
        setErrorName('Name is required');
      }

      if (email == '') {
        setErrorEmail('Email is required');
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
      errorDocument != '' ||
      errorOrganizationLink != '' ||
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
      isValidDocument: isValidDocument,
      isEmailVerified: isEmailVerified,
    };

    if (avatarFile) {
      const responseUploadAvatar = await handleUploadAvatar();
      if (!responseUploadAvatar.success) {
        setIsSuccess(false);
        setMessage('Failed, please check your file image');
        setIsLoading(false);
        return;
      } else {
        data.avatar = responseUploadAvatar.newFileName;
      }
    }

    if (documentFile) {
      const responseUploadDocument = await handleUploadDocument();
      if (!responseUploadDocument.success) {
        setIsSuccess(false);
        setMessage('Failed, please check your file document');
        setIsLoading(false);
        return;
      } else {
        data.document = responseUploadDocument.newFileName;
      }
    }

    const result = await updateOrganization(user?.userId, data);
    if (!result.success) {
      setIsSuccess(false);
      setMessage('Failed, Something went wrong');
      setIsLoading(false);
      return;
    }

    setIsSuccess(true);
    setMessage('Success, Account has been updated');
    setIsLoading(false);
    window.location.reload();
  };

  return (
    <div className="p-3 bg-white">
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
          <label className="font-medium">Image</label>
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
            Format file must be jpg, max size 1 MB
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
            defaultValue={name}
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
            defaultValue={email}
            onChange={e => setEmail(e.target.value)}
          />
          {errorEmail && (
            <span className="text-red-500 text-sm italic">{errorEmail}</span>
          )}
        </div>
        <div>
          <label className="font-medium">Status Verified Email</label>
          <select
            name="statusVerifiedEmail"
            id="statusVerifiedEmail"
            className="bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            defaultValue={isEmailVerified}
            onChange={e => setIsEmailVerified(e.target.value)}
          >
            <option value="false">No</option>
            <option value="true">Yes</option>
          </select>
        </div>
        <div>
          <label className="font-medium">Decription</label>
          <textarea
            name="description"
            id="description"
            cols="10"
            rows="10"
            className="bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            defaultValue={description}
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
            defaultValue={address}
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
        <div>
          <label className="font-medium block">Document Support</label>
          {user?.organizations?.document && (
            <Link
              href={
                document
                  ? document
                  : `https://atzxitftejquqppfauyh.supabase.co/storage/v1/object/public/documents/public/${user?.organizations?.document}`
              }
              target="_blank"
              className="text-blue-500 text-sm block pt-2 pb-1"
            >
              {document ? 'New File Document Support' : 'File Document Support'}
            </Link>
          )}
          <input
            type="file"
            name="document"
            id="document"
            className="bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            placeholder="Document Support"
            onChange={handleChangeDocument}
          />
          <span className="text-neutral-500 text-sm block">
            Upload file with only format pdf, max size 1 MB
          </span>
          {errorDocument && (
            <span className="text-red-500 text-sm italic">{errorDocument}</span>
          )}
        </div>
        <div>
          <label className="font-medium">Status Valid Document</label>
          <select
            name="statusDocument"
            id="statusDocument"
            className="bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            defaultValue={isValidDocument}
            onChange={e => setIsValidDocument(e.target.value)}
          >
            <option value="false">No</option>
            <option value="true">Yes</option>
          </select>
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
