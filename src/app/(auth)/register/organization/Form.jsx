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
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Error form
  const [errorName, setErrorName] = useState();
  const [errorNickname, setErrorNickname] = useState('');
  const [errorEmail, setErrorEmail] = useState();
  const [errorConfirmPassword, setErrorConfirmPassword] = useState();
  const [errorDocument, setErrorDocument] = useState();

  // Pop up
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState();
  const [message, setMessage] = useState('');

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
        setErrorName('Name must be letters');
      } else if (name.length < 5) {
        setErrorName('Name must be more than 5 letters');
      } else {
        setErrorName('');
      }
    }

    if (nickname) {
      const regex = /^[a-zA-Z]+$/;
      const nicnameRegex = regex.test(nickname);
      const nicknameMatch = users.find(user => user.nickname === nickname);
      if (!nicnameRegex) {
        setErrorNickname('Nickname must be letters and without spaces');
      } else if (nickname.length < 5 || nickname.length > 10) {
        setErrorNickname('Nickname must be 5 to 10 letters');
      } else if (nicknameMatch) {
        setErrorNickname('Nickname already used');
      } else {
        setErrorNickname('');
      }
    }

    if (email) {
      const userMatch = users.find(user => user.email === email);
      const regex = /@gmail\.com$/; // Ekspresi reguler untuk memeriksa apakah email berakhiran dengan "@gmail.com"
      const emailRegex = regex.test(email);
      if (userMatch) {
        setErrorEmail('Email already used');
      } else if (!emailRegex) {
        setErrorEmail('Email must end with "@gmail.com"');
      } else {
        setErrorEmail('');
      }
    }

    if (password) {
      if (password.length < 6) {
        setErrorConfirmPassword('Password must be more than 6 characters');
      } else if (password !== confirmPassword) {
        setErrorConfirmPassword('Password and confirm password must be same');
      } else {
        setErrorConfirmPassword('');
      }
    }
  }, [password, confirmPassword, users, email, name, nickname]);

  const handleChangeDocument = e => {
    const document = e.target.files[0];
    if (document) {
      if (document?.type != 'application/pdf') {
        setErrorDocument('Type document file must be pdf!');
      } else if (document?.size > 1000000) {
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
        setErrorName("Name can't be empty");
      }

      if (nickname == '') {
        setErrorNickname("Nickname can't be empty");
      }

      if (email == '') {
        setErrorEmail("Email can't be empty");
      }

      if (password == '' || confirmPassword == '') {
        setErrorConfirmPassword("Password and Confirm can't be empty");
      }

      if (document == '') {
        setErrorDocument("Document can't be empty");
      }
      setSuccess(false);
      setMessage("Failed, Any form can't be empty");
    } else {
      if (
        errorConfirmPassword != '' ||
        errorEmail != '' ||
        errorName != '' ||
        errorDocument != '' ||
        errorNickname != ''
      ) {
        setSuccess(false);
        setMessage('Failed, please check your input');
      } else {
        const data = {
          name: name,
          nickname: nickname,
          email: email,
          password: password,
          roleId: 2,
          avatar: 'default-avatar.png',
        };

        const resUploadDocument = await handleUploadDocument();

        if (!resUploadDocument.success) {
          setSuccess(false);
          setMessage('Failed, please check your document input');
        } else {
          data.document = resUploadDocument.data;
          const result = await registerOrganization(data);
          if (!result.success) {
            setSuccess(false);
            setMessage('Failed, Server error, Please try again!');
          } else {
            setName('');
            setNickname('');
            setEmail('');
            setPassword('');
            setConfirmPassword('');
            setDocument('');
            setDocumentFile({});
            setSuccess(true);
            setMessage('Success, please check your email for verification !!');
            router.refresh();
          }
        }
      }
    }

    setIsLoading(false);
    return;
  };

  return (
    <div className="bg-white shadow-md border border-gray-200 rounded-lg p-4 sm:p-6 lg:p-8">
      {message != '' && (
        <div
          className={`rounded-md ${
            success ? 'bg-green-600' : 'bg-red-600'
          } py-2 px-3 text-sm text-white flex justify-between gap-x-3 items-center mb-2`}
        >
          <p className="text-wrap">{message}</p>{' '}
          <button
            className=" font-bold text-2xl"
            onClick={() => setMessage(false)}
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
            value={name}
            onChange={e => setName(e.target.value)}
          />
          {errorName && (
            <span className="text-red-500 text-sm italic">{errorName}</span>
          )}
        </div>
        <div>
          <label
            htmlFor="nickname"
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
            value={nickname}
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
            value={email}
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
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              id="password"
              className="bg-gray-50 border border-black text-black sm:text-sm rounded-lg focus:ring-black focus:border-black block w-full p-2.5 "
              placeholder="*******"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            {showPassword ? (
              <button
                id="togglePasswordFalse"
                type="button"
                className="absolute inset-y-0 right-0 px-3 flex items-center"
                onClick={() => setShowPassword(false)}
              >
                <svg
                  id="eyeIcon"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M2 12s3-8 10-8 10 8 10 8-3 8-10 8-10-8-10-8z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6"
                    transform="rotate(-90 12 12)"
                  />
                </svg>
              </button>
            ) : (
              <button
                id="togglePasswordTrue"
                type="button"
                className="absolute inset-y-0 right-0 px-3 flex items-center"
                onClick={() => setShowPassword(true)}
              >
                <svg
                  id="eyeIcon"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M2 12s3-8 10-8 10 8 10 8-3 8-10 8-10-8-10-8z"
                  />
                </svg>
              </button>
            )}
          </div>
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
          <div className="relative">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              name="confirm_password"
              id="confirm_password"
              className="bg-gray-50 border border-black text-black sm:text-sm rounded-lg focus:ring-black focus:border-black block w-full p-2.5 "
              placeholder="*******"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
            />
            {showConfirmPassword ? (
              <button
                id="toggleConfirmPasswordFalse"
                type="button"
                className="absolute inset-y-0 right-0 px-3 flex items-center"
                onClick={() => setShowConfirmPassword(false)}
              >
                <svg
                  id="eyeIcon"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M2 12s3-8 10-8 10 8 10 8-3 8-10 8-10-8-10-8z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6"
                    transform="rotate(-90 12 12)"
                  />
                </svg>
              </button>
            ) : (
              <button
                id="toggleConfirmPasswordTrue"
                type="button"
                className="absolute inset-y-0 right-0 px-3 flex items-center"
                onClick={() => setShowConfirmPassword(true)}
              >
                <svg
                  id="eyeIcon"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M2 12s3-8 10-8 10 8 10 8-3 8-10 8-10-8-10-8z"
                  />
                </svg>
              </button>
            )}
          </div>
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
          <span className="text-neutral-500 text-sm block">
            Upload file dengan format pdf, max size 1 MB
          </span>
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
      </form>
      <div className="text-sm font-medium text-gray-500 my-2">
        Create account as{' '}
        <Link
          href="/register/software_developer"
          className="text-blue-700 hover:underline "
        >
          Software Developer
        </Link>
      </div>

      <div className="text-sm font-medium text-gray-500 my-2">
        Do you have an account?{' '}
        <button
          onClick={() => signIn()}
          className="text-blue-700 hover:underline"
        >
          Signin
        </button>
      </div>
    </div>
  );
}
