'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Select from 'react-select';
import { useRouter } from 'next/navigation';
import { updateSoftwareDeveloper } from '@/lib/actions/softwareDeveloperAction';
export default function UpdateSoftwareDeveloper({ users, user, skills }) {
  const [avatar, setAvatar] = useState('');
  const [avatarFile, setAvatarFile] = useState(null);
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [isEmailVerified, setIsEmailVerified] = useState(
    user?.isEmailVerified || false,
  );
  const [gender, setGender] = useState(
    user?.softwareDevelopers?.gender || null,
  );
  const [address, setAddress] = useState(
    user?.softwareDevelopers?.address || '',
  );
  const [description, setDescription] = useState(
    user?.softwareDevelopers?.description || '',
  );
  const [softwareDeveloperSkills, setSoftwareDeveloperSkills] = useState(
    user?.softwareDevelopers?.skills || [],
  );
  const [statusCollaboration, setStatusCollaboration] = useState(
    user?.softwareDevelopers?.statusCollaboration,
  );
  const [portfolioLink, setPortfolioLink] = useState(
    user?.softwareDevelopers?.portfolioLink || '',
  );
  const [usernameGithub, setUsernameGithub] = useState(
    user?.softwareDevelopers?.usernameGithub || '',
  );
  const [usernameInstagram, setUsernameInstagram] = useState(
    user?.softwareDevelopers?.usernameInstagram || '',
  );
  const [usernameLinkedin, setUsernameLinkedin] = useState(
    user?.softwareDevelopers?.usernameLinkedin || '',
  );
  const options = skills.map(skill => {
    return { value: skill.skillId, label: skill.name };
  });
  const defaultValuesSkills = options.filter(option =>
    softwareDeveloperSkills.some(skill => skill.skillId === option.value),
  );

  // LOAD HANDLING
  const [isLoading, setIsLoading] = useState();
  const [isSuccess, setIsSuccess] = useState();
  const [message, setMessage] = useState('');

  // ERROR HANDLING
  const [errorName, setErrorName] = useState('');
  const [errorAvatar, setErrorAvatar] = useState('');
  const [errorEmail, setErrorEmail] = useState('');
  const [errorPortofolioLink, setErrorPortfolioLink] = useState('');

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
        setErrorEmail('Email alreadt exist');
      } else if (!emailRegex) {
        setErrorEmail('Email must be ended with "@gmail.com"');
      } else {
        setErrorEmail('');
      }
    }

    if (portfolioLink) {
      const regex = /^(https?:\/\/)/;
      const portfolioLinkRegex = regex.test(portfolioLink);
      if (!portfolioLinkRegex) {
        setErrorPortfolioLink(
          'Project link must be started with http:// or https://',
        );
      } else {
        setErrorPortfolioLink('');
      }
    }
  }, [name, email, users, portfolioLink, user.email]);

  const handleFileChange = e => {
    const file = e.target.files[0];
    if (file.type != 'image/jpeg') {
      setErrorAvatar('Type file avatar is not supported!');
    } else if (file.size > 1000000) {
      setErrorAvatar('Size file avatar must be less than 1 MB!');
    } else {
      setErrorAvatar('');
      setAvatar(URL.createObjectURL(file));
      setAvatarFile(file);
    }
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
        return { newFileName: resUploadImage.data, successUpload: true };
      } catch (error) {
        return { successUpload: false, message: error.message };
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
      errorPortofolioLink != ''
    ) {
      setIsSuccess(false);
      setMessage('Failed, please check your input');
      setIsLoading(false);
      return;
    }

    const data = {
      name: name,
      email: email,
      gender: gender,
      address: address,
      description: description,
      statusCollaboration: statusCollaboration,
      portfolioLink: portfolioLink,
      usernameGithub: usernameGithub,
      usernameLinkedin: usernameLinkedin,
      usernameInstagram: usernameInstagram,
      skills: softwareDeveloperSkills,
      isEmailVerified: isEmailVerified,
    };

    if (avatarFile) {
      const resUploadAvatar = await handleUploadAvatar();
      if (!resUploadAvatar.successUpload) {
        setIsSuccess(false);
        setMessage('Failed, please check your file image');
        setIsLoading(false);
        return;
      } else {
        data.avatar = resUploadAvatar.newFileName;
      }
    }

    const result = await updateSoftwareDeveloper(user?.userId, data);
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
      <form className="space-y-3">
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
            onChange={handleFileChange}
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
          <label className="font-medium">Gender</label>
          <select
            name="gender"
            id="gender"
            className="bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            defaultValue={gender}
            onChange={e => setGender(e.target.value)}
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
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
          <label className="font-medium">Description</label>
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
          <label className="font-medium">Skill Yang Diminati</label>
          <Select
            instanceId={'wsad123wqwe'}
            defaultValue={defaultValuesSkills}
            isMulti
            name="colors"
            options={options}
            className="basic-multi-select"
            classNamePrefix="select"
            onChange={selectedOptions =>
              setSoftwareDeveloperSkills(selectedOptions)
            }
          />
        </div>
        <div>
          <label className="font-medium">Status Collaboration</label>
          <select
            name="statusCollaboration"
            id="statusCollaboration"
            className="bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            defaultValue={statusCollaboration}
            onChange={e => setStatusCollaboration(e.target.value)}
          >
            <option value="false">Close</option>
            <option value="true">Open</option>
          </select>
        </div>
        <div>
          <label className="font-medium">Portfolio Link</label>
          <input
            type="text"
            name="portfolioLink"
            id="portfolioLink"
            className="bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            placeholder="Portofolio Link"
            defaultValue={portfolioLink}
            onChange={e => setPortfolioLink(e.target.value)}
          />
          {errorPortofolioLink && (
            <span className="text-red-500 text-sm italic">
              {errorPortofolioLink}
            </span>
          )}
        </div>
        <div>
          <label className="font-medium">Username Github</label>
          <input
            type="text"
            name="usernameGithub"
            id="usernameGithub"
            className="bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            placeholder="Portofolio Link"
            defaultValue={usernameGithub}
            onChange={e => setUsernameGithub(e.target.value)}
          />
        </div>
        <div>
          <label className="font-medium">Username Instagram</label>
          <input
            type="text"
            name="usernameInstagram"
            id="usernameInstagram"
            className="bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            placeholder="Instagram Link"
            defaultValue={usernameInstagram}
            onChange={e => setUsernameInstagram(e.target.value)}
          />
        </div>
        <div>
          <label className="font-medium">Username Linkedin</label>
          <input
            type="text"
            name="usernameLinkedin"
            id="usernameLinkedin"
            className="bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            placeholder="Linkedin Link"
            defaultValue={usernameLinkedin}
            onChange={e => setUsernameLinkedin(e.target.value)}
          />
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
