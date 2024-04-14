'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { registerSoftwareDeveloper } from '@/lib/actions/authAction';
import { getUsers } from '../../../../lib/actions/userAction';
import { signIn } from 'next-auth/react';
export default function Form() {
  const [users, setUsers] = useState();
  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorConfirmPassword, setErrorConfirmPassword] = useState();
  const [errorEmail, setErrorEmail] = useState();
  const [errorName, setErrorName] = useState();
  const [errorNickname, setErrorNickname] = useState('');
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
    if (password) {
      if (password.length < 6) {
        setErrorConfirmPassword('Password must be at least 6 characters');
      } else if (password !== confirmPassword) {
        setErrorConfirmPassword(
          'Password and Confirm Password must be the same',
        );
      } else {
        setErrorConfirmPassword('');
      }
    }

    if (email) {
      const userMatch = users.find(user => user.email === email);
      const regex = /@gmail\.com$/; // Ekspresi reguler untuk memeriksa apakah email berakhiran dengan "@gmail.com"
      const emailRegex = regex.test(email);
      if (userMatch) {
        setErrorEmail('Email already used');
      } else if (!emailRegex) {
        setErrorEmail('Email must be ended with "@gmail.com"');
      } else {
        setErrorEmail('');
      }
    }

    if (nickname) {
      const regex = /^[a-zA-Z]+$/;
      const nicnameRegex = regex.test(nickname);
      const nicknameMatch = users.find(user => user.nickname === nickname);
      if (!nicnameRegex) {
        setErrorNickname('Nickname must be letters and without spaces');
      } else if (nickname.length < 5 || nickname.length > 10) {
        setErrorNickname('Nickname must be between 5 and 10 characters');
      } else if (nicknameMatch) {
        setErrorNickname('Nickname already used');
      } else {
        setErrorNickname('');
      }
    }

    if (name) {
      const regex = /^[a-zA-Z\s]+$/;
      const nameRegex = regex.test(name);
      if (!nameRegex) {
        setErrorName('Name must be letters');
      } else if (name.length < 5) {
        setErrorName('Nmae must be more than 5 characters');
      } else {
        setErrorName('');
      }
    }
  }, [password, confirmPassword, users, email, name, nickname]);

  const router = useRouter();

  const handleSubmit = async e => {
    e.preventDefault();
    setIsLoading(true);
    if (
      name == '' ||
      email == '' ||
      password == '' ||
      confirmPassword == '' ||
      nickname == ''
    ) {
      if (name == '') {
        setErrorName('Name must be filled');
      }

      if (nickname == '') {
        setErrorName('Nickname must be filled');
      }

      if (email == '') {
        setErrorEmail('Email must be filled');
      }

      if (password == '' || confirmPassword == '') {
        setErrorConfirmPassword('Password and Confirm Password must be filled');
      }
      setPopUp(true);
      setSuccess(false);
      setMessage('Failed, Form cannot be empty');
      setIsLoading(false);
      return;
    }

    if (
      errorConfirmPassword != '' ||
      errorEmail != '' ||
      errorName != '' ||
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
    };

    const result = await registerSoftwareDeveloper(data);

    if (!result.success) {
      setPopUp(true);
      setSuccess(false);
      setMessage('Failed, Account has not been created');
      setIsLoading(false);
      return;
    }

    setName('');
    setNickname('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setPopUp(true);
    setSuccess(true);
    setMessage('Success, Please check your email for verification !!');
    setIsLoading(false);
    router.refresh();
  };
  return (
    <div className="bg-white shadow-md border border-gray-200 rounded-lg p-4 sm:p-6 lg:p-8 ">
      {popUp && !success && (
        <div className="rounded-md bg-red-600 py-2 px-3 text-sm text-white flex justify-between gap-x-3 items-center mb-2">
          <p className="text-wrap">{message}</p>{' '}
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
          <p className="text-wrap">{message}</p>{' '}
          <button
            className=" font-bold text-2xl"
            onClick={() => setPopUp(false)}
          >
            X
          </button>
        </div>
      )}

      <form className="space-y-3">
        <h3 className="text-xl font-medium text-dark">
          Sign up as Software Developer
        </h3>
        <div>
          <label
            htmlFor="name"
            className="text-sm font-medium text-black block mb-2"
          >
            Your Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            className="bg-gray-50 border border-black text-black sm:text-sm rounded-lg focus:ring-black focus:border-black block w-full p-2.5 "
            placeholder="Your Name"
            value={name}
            onChange={e => setName(e.target.value)}
            required
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
            Your Nickname
          </label>
          <input
            type="text"
            name="nickname"
            id="nickname"
            className="bg-gray-50 border border-black text-black sm:text-sm rounded-lg focus:ring-black focus:border-black block w-full p-2.5 "
            placeholder="Your Nickname"
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
            Your Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="bg-gray-50 border border-black text-black sm:text-sm rounded-lg focus:ring-black focus:border-black block w-full p-2.5 "
            placeholder="name@email.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
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
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
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
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            required
          />
          {errorConfirmPassword && (
            <span className="text-red-500 text-sm italic">
              {errorConfirmPassword}
            </span>
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
          href="/register/organization"
          className="text-blue-700 hover:underline"
        >
          Organization
        </Link>
      </div>
      <div className="text-sm font-medium text-gray-500 my-2">
        Do you have an account?{' '}
        <button
          onClick={() => signIn()}
          className="text-blue-700 hover:underline "
        >
          Signin
        </button>
      </div>
    </div>
  );
}
