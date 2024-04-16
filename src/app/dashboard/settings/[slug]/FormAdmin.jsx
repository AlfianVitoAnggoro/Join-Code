'use client';
import Image from 'next/image';
import { useState } from 'react';
import { updateAdmin } from '@/lib/actions/adminAction';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function FormAdmin({ users, user }) {
  const [avatar, setAvatar] = useState('');
  const [avatarFile, setAvatarFile] = useState(null);
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');

  // LOAD HANDLING
  const [isLoading, setIsLoading] = useState();
  const [isSuccess, setIsSuccess] = useState();
  const [message, setMessage] = useState('');

  // ERROR HANDLING
  const [errorName, setErrorName] = useState('');
  const [errorAvatar, setErrorAvatar] = useState('');
  const [errorEmail, setErrorEmail] = useState('');

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
  }, [name, email, users, user.email]);

  const router = useRouter();

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

  const handleFileChange = e => {
    const file = e.target.files[0];
    if (
      file?.type != 'image/jpeg' &&
      file?.type != 'image/png' &&
      file?.type != 'image/webp' &&
      file?.type != 'image/svg'
    ) {
      setErrorAvatar('Type file avatar must be jpeg, png, webp, svg!');
    } else if (file?.size > 1000000) {
      setErrorAvatar('Size file avatar must be less than 1 MB!');
    } else {
      setErrorAvatar('');
      setAvatar(URL.createObjectURL(file));
      setAvatarFile(file);
    } // Simpan file yang diunggah ke dalam state avatarFile
  };

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

    if (errorEmail != '' || errorName != '' || errorAvatar != '') {
      setIsSuccess(false);
      setMessage('Failed, Please check your input');
      setIsLoading(false);
      return;
    }
    const data = {
      name: name,
      email: email,
    };

    if (avatarFile) {
      const resUploadAvatar = await handleUploadAvatar();
      if (!resUploadAvatar.success) {
        setIsSuccess(false);
        setMessage('Failed, please check your file image');
        setIsLoading(false);
        return;
      } else {
        data.avatar = resUploadAvatar?.data;
      }
    }

    const result = await updateAdmin(user?.userId, data);

    if (!result.success) {
      setIsSuccess(false);
      setMessage('Failed, Account has not been updated');
      setIsLoading(false);
      return;
    }
    setIsSuccess(true);
    setMessage('Success, Account has been updated');
    setIsLoading(false);
    router.refresh();
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
          <label className="font-medium">Avatar</label>
          <Image
            src={avatar ? avatar : `/images/avatars/${user?.avatar}`}
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
            onChange={handleFileChange}
          />
          <span className="text-neutral-500 text-sm block">
            Type File must be jpeg/svg/webp/png, Max size file is 1 MB
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
            placeholder="User Email"
            defaultValue={email}
            onChange={e => setEmail(e.target.value)}
          />
          {errorEmail && (
            <span className="text-red-500 text-sm italic">{errorEmail}</span>
          )}
        </div>

        <button
          disabled={isLoading}
          className="w-full bg-blue-500 text-white py-2 rounded"
          onClick={handleSubmit}
        >
          {isLoading ? 'Laoding...' : 'Submit'}
        </button>
      </form>
    </div>
  );
}
