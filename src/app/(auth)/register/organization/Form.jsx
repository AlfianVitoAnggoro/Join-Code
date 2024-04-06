'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { registerOrganization } from '@/lib/actions/authAction';
import { getUsers } from '../../../../lib/actions/userAction';
import { signIn } from 'next-auth/react';

export default function Form() {
  // Value form
  const [users, setUsers] = useState();
  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [document, setDocument] = useState('');
  const [documentFile, setDocumentFile] = useState(null);

  // Error form
  const [errorName, setErrorName] = useState();
  const [errorNickname, setErrorNickname] = useState('');
  const [errorEmail, setErrorEmail] = useState();
  const [errorConfirmPassword, setErrorConfirmPassword] = useState();
  const [errorDocument, setErrorDocument] = useState();

  // Pop up
  const [isLoading, setIsLoading] = useState(false);
  const [popUp, setPopUp] = useState(false);
  const [success, setSuccess] = useState();
  const [message, setMessage] = useState();

  const getUsersData = async () => {
    try {
      const result = await getUsers();
      setUsers(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUsersData();
  }, []);

  useEffect(() => {
    if (name) {
      const regex = /^[a-zA-Z\s]+$/;
      const nameRegex = regex.test(name);
      if (!nameRegex) {
        setErrorName('Nama harus berupa huruf');
      } else if (name.length < 5) {
        setErrorName('Nama harus lebih dari 5 huruf');
      } else {
        setErrorName('');
      }
    }

    if (nickname) {
      const regex = /^[a-zA-Z]+$/;
      const nicnameRegex = regex.test(nickname);
      const nicknameMatch = users.find(user => user.nickname === nickname);
      if (!nicnameRegex) {
        setErrorNickname('Nickname harus berupa huruf dan tanpa spasi');
      } else if (nickname.length < 5 || nickname.length > 10) {
        setErrorNickname('Nickname harus 5 - 10 karakter');
      } else if (nicknameMatch) {
        setErrorNickname('Nickname sudah digunakan');
      } else {
        setErrorNickname('');
      }
    }

    if (email) {
      const userMatch = users.find(user => user.email === email);
      const regex = /@gmail\.com$/; // Ekspresi reguler untuk memeriksa apakah email berakhiran dengan "@gmail.com"
      const emailRegex = regex.test(email);
      if (userMatch) {
        setErrorEmail('Email sudah digunakan');
      } else if (!emailRegex) {
        setErrorEmail('Email harus berakhiran dengan "@gmail.com"');
      } else {
        setErrorEmail('');
      }
    }

    if (password) {
      if (password.length < 6) {
        setErrorConfirmPassword('Password harus lebih dari 6 karakter');
      } else if (password !== confirmPassword) {
        setErrorConfirmPassword('Password dan Confirm password tidak cocok');
      } else {
        setErrorConfirmPassword('');
      }
    }

    if (documentFile) {
      if (documentFile.type != 'application/pdf') {
        setErrorDocument('Tipe file harus PDF');
      } else if (documentFile.size > 2000000) {
        setErrorDocument('Ukuran file harus lebih kecil dari 2 MB');
      } else {
        setErrorDocument('');
      }
    }
  }, [password, confirmPassword, users, email, name, documentFile, nickname]);

  const handleChangeDocument = e => {
    const document = e.target.files[0];
    setDocument(URL.createObjectURL(document));
    setDocumentFile(document); // Simpan file yang diunggah ke dalam state avatarFile
  };

  const handleUploadDocument = async () => {
    if (documentFile) {
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

        return { data: resUploadDocument.data, success: true };
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
      password == '' ||
      confirmPassword == '' ||
      document == '' ||
      nickname == ''
    ) {
      if (name == '') {
        setErrorName('Nama harus diisi');
      }

      if (nickname == '') {
        setErrorName('Nickname harus diisi');
      }

      if (email == '') {
        setErrorEmail('Email harus diisi');
      }

      if (password == '' || confirmPassword == '') {
        setErrorConfirmPassword('Password dan Confirm Password harus diisi');
      }

      if (document == '') {
        setErrorDocument('Document harus diisi');
      }
      setPopUp(true);
      setSuccess(false);
      setMessage('Failed, please check empty input');
      setIsLoading(false);
      return;
    }

    if (
      errorConfirmPassword != '' ||
      errorEmail != '' ||
      errorName != '' ||
      errorDocument != '' ||
      errorNickname != ''
    ) {
      setPopUp(true);
      setSuccess(false);
      setMessage('Failed, please check your input');
      setIsLoading(false);
      return;
    }

    const data = {
      name: name,
      nickname: nickname,
      email: email,
      password: password,
      roleId: 2,
      avatar: 'default-avatar.png',
    };

    const resUploadDocument = await handleUploadDocument();

    if (resUploadDocument.success) {
      data.document = resUploadDocument.data;
    } else {
      setPopUp(true);
      setSuccess(false);
      setMessage('Failed, please check your document input');
      setIsLoading(true);
      return;
    }

    const result = await registerOrganization(data);

    setName('');
    setNickname('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setDocument(null);
    setPopUp(true);
    setSuccess(result.success);
    setMessage(result.message);
    setIsLoading(false);
    router.refresh();
  };

  return (
    <div className="bg-white shadow-md border border-gray-200 rounded-lg p-4 sm:p-6 lg:p-8">
      {popUp && !success && (
        <div className="rounded-md bg-red-600 py-2 px-3 text-sm text-white flex justify-between gap-x-3 items-center mb-2">
          <p>{message}</p>{' '}
          <button
            className=" font-bold text-xl"
            onClick={() => setPopUp(false)}
          >
            X
          </button>
        </div>
      )}
      {popUp && success && (
        <div className="rounded-md bg-green-600 py-2 px-3 text-sm text-white flex justify-between gap-x-3 items-center mb-2">
          <p>{message}</p>{' '}
          <button
            className=" font-bold text-2xl"
            onClick={() => setPopUp(false)}
          >
            X
          </button>
        </div>
      )}
      <form className="space-y-3">
        <h3 className="text-xl font-medium text-black">
          Sign up as Organization
        </h3>
        <div>
          <label
            htmlFor="name"
            className="text-sm font-medium text-black block mb-2"
          >
            Organization Name
          </label>
          <input
            type="name"
            name="name"
            id="name"
            className="bg-gray-50 border border-black text-black sm:text-sm rounded-lg focus:ring-black focus:border-black block w-full p-2.5 "
            placeholder="Organization of Name"
            onChange={e => setName(e.target.value)}
          />
          {errorName && (
            <span className="text-red-500 text-sm italic">{errorName}</span>
          )}
        </div>
        <div>
          <label
            htmlFor="name"
            className="text-sm font-medium text-black block mb-2"
          >
            Nickname
          </label>
          <input
            type="text"
            name="nickname"
            id="nickname"
            className="bg-gray-50 border border-black text-black sm:text-sm rounded-lg focus:ring-black focus:border-black block w-full p-2.5 "
            placeholder="Organization Nickname"
            onChange={e => setNickname(e.target.value)}
            required
          />
          {errorNickname && (
            <span className="text-red-500 text-sm italic">{errorNickname}</span>
          )}
        </div>
        <div>
          <label
            htmlFor="email"
            className="text-sm font-medium text-black block mb-2"
          >
            Organization Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="bg-gray-50 border border-black text-black sm:text-sm rounded-lg focus:ring-black focus:border-black block w-full p-2.5 "
            placeholder="name@company.com"
            onChange={e => setEmail(e.target.value)}
          />
          {errorEmail && (
            <span className="text-red-500 text-sm italic">{errorEmail}</span>
          )}
        </div>
        <div>
          <label
            htmlFor="password"
            className="text-sm font-medium text-black block mb-2"
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            className="bg-gray-50 border border-black text-black sm:text-sm rounded-lg focus:ring-black focus:border-black block w-full p-2.5 "
            placeholder="*******"
            onChange={e => setPassword(e.target.value)}
          />
          {errorConfirmPassword && (
            <span className="text-red-500 text-sm italic">
              {errorConfirmPassword}
            </span>
          )}
        </div>
        <div>
          <label
            htmlFor="confirm_password"
            className="text-sm font-medium text-black block mb-2"
          >
            Confirm Password
          </label>
          <input
            type="password"
            name="confirm_password"
            id="confirm_password"
            className="bg-gray-50 border border-black text-black sm:text-sm rounded-lg focus:ring-black focus:border-black block w-full p-2.5 "
            placeholder="*******"
            onChange={e => setConfirmPassword(e.target.value)}
          />
          {errorConfirmPassword && (
            <span className="text-red-500 text-sm italic">
              {errorConfirmPassword}
            </span>
          )}
        </div>
        <div>
          <label
            htmlFor="document"
            className="text-sm font-medium text-black block mb-2"
          >
            Upload your document support as organization
          </label>
          {document && (
            <Link
              href={document}
              target="_blank"
              className="text-blue-500 text-sm block pt-2 pb-1"
            >
              Preview Document Support
            </Link>
          )}
          <input
            type="file"
            name="document"
            id="document"
            className="bg-gray-50 border border-black text-black sm:text-sm rounded-lg focus:ring-black focus:border-black block w-full p-2.5 "
            placeholder="Upload your document support as organization"
            onChange={handleChangeDocument}
          />
          {errorDocument && (
            <span className="text-red-500 text-sm italic">{errorDocument}</span>
          )}
        </div>
        <button
          disabled={isLoading}
          type="submit"
          className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={handleSubmit}
        >
          {isLoading ? 'Loading...' : ' Signup Account'}
        </button>
        <div className="text-sm font-medium text-gray-500">
          Create account as{' '}
          <Link
            href="/register/software_developer"
            className="text-blue-700 hover:underline "
          >
            Software Developer
          </Link>
        </div>

        <div className="text-sm font-medium text-gray-500">
          Do you have an account?{' '}
          <button
            onClick={() => signIn()}
            className="text-blue-700 hover:underline"
          >
            Signin
          </button>
        </div>
      </form>
    </div>
  );
}
