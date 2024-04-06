'use client';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { createUser } from '@/lib/actions/userAction/';
import { getUsers } from '@/lib/actions/userAction/';

export default function FormCreate({ roles }) {
  const [users, setUsers] = useState();
  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('');

  // Error Handling
  const [errorName, setErrorName] = useState('');
  const [errorNickname, setErrorNickname] = useState('');
  const [errorEmail, setErrorEmail] = useState('');
  const [errorConfirmPassword, setErrorConfirmPassword] = useState('');
  const [errorRole, setErrorRole] = useState('');

  // Load Handling
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState();
  const [message, setMessage] = useState('');

  const getUsersData = async () => {
    try {
      const result = await getUsers();
      if (result.success) {
        setUsers(result.data);
      } else {
        setUsers([]);
      }
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
        setErrorConfirmPassword('Password must be at least 6 characters long');
      } else if (password !== confirmPassword) {
        setErrorConfirmPassword('Password and Confirm Password  do not match');
      } else {
        setErrorConfirmPassword('');
      }
    }

    if (email) {
      const userMatch = users.find(user => user.email === email);
      const regex = /@gmail\.com$/; // Ekspresi reguler untuk memeriksa apakah email berakhiran dengan "@gmail.com"
      const emailRegex = regex.test(email);
      if (userMatch) {
        setErrorEmail('Email already exists');
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
        setErrorNickname('Nickname must be between 5 - 10 characters');
      } else if (nicknameMatch) {
        setErrorNickname('Nickname already exist');
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
        setErrorName('Name must be at least 5 characters long');
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
      role == '' ||
      nickname == ''
    ) {
      if (name == '') {
        setErrorName('Name is required');
      }

      if (nickname == '') {
        setErrorNickname('Nickname is required');
      }

      if (email == '') {
        setErrorEmail('Email is required');
      }

      if (password == '' || confirmPassword == '') {
        setErrorConfirmPassword('Password and Confirm password is required');
      }

      if (role == '') {
        setErrorRole('Role is required');
      }
      setSuccess(false);
      setMessage('Failed, Form cannot be empty');
      setIsLoading(false);
      return;
    }

    if (
      errorConfirmPassword != '' ||
      errorEmail != '' ||
      errorName != '' ||
      errorNickname != '' ||
      errorRole != ''
    ) {
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
      roleId: Number(role),
      avatar: 'default-avatar.png',
    };
    const { success } = await createUser(data);

    if (success) {
      setSuccess(true);
      setMessage('Success, User has been created');
    } else {
      setSuccess(false);
      setMessage('Failed, Something went wrong');
      setIsLoading(false);
      return;
    }

    setName('');
    setNickname('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setRole('');
    setIsLoading(false);
    router.push('/dashboard/users');
    router.refresh();
  };

  return (
    <div className="p-3 overflow-y-auto max-h-[80vh] min-h-[fit] w-[70vw]">
      {message !== '' && (
        <div
          className={`rounded-md ${
            success ? 'bg-green-600' : 'bg-red-600'
          } py-2 px-3 text-sm text-white flex justify-between gap-x-3 items-center mb-2`}
        >
          <p className="text-wrap">{message}</p>{' '}
          <button className=" font-bold text-xl" onClick={() => setMessage('')}>
            X
          </button>
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className="font-medium">Name User</label>
          <input
            type="text"
            name="name"
            id="name"
            className="bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            placeholder="Name User"
            onChange={e => setName(e.target.value)}
          />
          {errorName && (
            <span className="text-red-500 text-sm italic">{errorName}</span>
          )}
        </div>
        <div>
          <label className="font-medium">Nickname User</label>
          <input
            type="text"
            name="nickname"
            id="nickname"
            className="bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            placeholder="Nickname User"
            onChange={e => setNickname(e.target.value)}
          />
          {errorNickname && (
            <span className="text-red-500 text-sm italic">{errorNickname}</span>
          )}
        </div>
        <div>
          <label className="font-medium">Email</label>
          <input
            type="text"
            name="email"
            id="email"
            className="bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            placeholder="Email User"
            onChange={e => setEmail(e.target.value)}
          />
          {errorEmail && (
            <span className="text-red-500 text-sm italic">{errorEmail}</span>
          )}
        </div>
        <div>
          <label className="font-medium">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            className="bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            placeholder="Password User"
            onChange={e => setPassword(e.target.value)}
          />
          {errorConfirmPassword && (
            <span className="text-red-500 text-sm italic">
              {errorConfirmPassword}
            </span>
          )}
        </div>
        <div>
          <label className="font-medium">Confirm Password</label>
          <input
            type="password"
            name="confirm_password"
            id="confirm_password"
            className="bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            placeholder="Confirm Password User"
            onChange={e => setConfirmPassword(e.target.value)}
          />
          {errorConfirmPassword && (
            <span className="text-red-500 text-sm italic">
              {errorConfirmPassword}
            </span>
          )}
        </div>
        <div>
          <label className="font-medium">Role</label>
          <select
            name="role"
            id="role"
            className="bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            onChange={e => setRole(e.target.value)}
          >
            <option value="">Select the role</option>
            {roles.map((role, index) => (
              <option value={`${role.roleId}`} key={index + 1}>
                {role.name}
              </option>
            ))}
          </select>
          {errorRole && (
            <span className="text-red-500 text-sm italic">{errorRole}</span>
          )}
        </div>
        <button
          disabled={isLoading}
          className="w-full bg-blue-500 text-white py-2 rounded"
        >
          {isLoading ? 'Loading...' : 'Submit'}
        </button>
      </form>
    </div>
  );
}
