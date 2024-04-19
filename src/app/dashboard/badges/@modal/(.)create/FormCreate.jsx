'use client';
import Image from 'next/image';
import { createBadge } from '@/lib/actions/badgeAction';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useEffect } from 'react';
export default function FormCreate() {
  const [image, setImage] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [name, setName] = useState('');
  const [point, setPoint] = useState('');
  const router = useRouter('');

  // Error Handling
  const [errorImageFile, setErrorImageFile] = useState('');
  const [errorName, setErrorName] = useState();

  // Load Handling
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState();
  const [message, setMessage] = useState('');

  const handleImageChange = e => {
    const file = e.target.files[0];
    if (file.type != 'image/jpeg') {
      setErrorImageFile('Type file avatar is not supported!');
    } else if (file.size > 1000000) {
      setErrorImageFile('Size file avatar must be less than 1 MB!');
    } else {
      setErrorImageFile('');
      setImage(URL.createObjectURL(file));
      setImageFile(file);
    } // Simpan file yang diunggah ke dalam state avatarFile
  };

  const handleUploadImage = async () => {
    if (imageFile) {
      const formData = new FormData();
      formData.append('file', imageFile); // Gunakan append untuk menambahkan file ke FormData

      try {
        const res = await fetch('/api/upload/badge', {
          method: 'POST',
          body: formData,
        });

        if (!res.ok) {
          throw new Error(await res.text());
        }

        const resUploadImage = await res.json(); // Ambil nama file dari respons JSON

        return { newFileName: resUploadImage.data, success: true };
      } catch (error) {
        return { success: false, message: error.message };
      }
    }
  };

  useEffect(() => {
    if (name) {
      const regex = /^[a-zA-Z\s]+$/;
      const nameRegex = regex.test(name);
      if (!nameRegex) {
        setErrorName('Name must be letters');
      } else if (name.length < 3) {
        setErrorName('Name must be more than 3 letters');
      } else {
        setErrorName('');
      }
    }
  }, [name]);

  const handleSubmit = async e => {
    e.preventDefault();
    setIsLoading(true);

    if (name == '' || point == '' || imageFile == '') {
      setSuccess(false);
      setMessage('Failed, Form cannot be empty');
      setIsLoading(false);
      return;
    }

    if (errorImageFile != '' || errorName != '') {
      setSuccess(false);
      setMessage('Failed, please check your input');
      setIsLoading(false);
      return;
    }

    const data = {
      name: name,
      point: Number(point),
    };

    if (imageFile) {
      const responseUploadImage = await handleUploadImage();
      if (!responseUploadImage.success) {
        setSuccess(false);
        setMessage('Failed, File image cannot be created');
        setIsLoading(false);
        return;
      } else {
        data.image = responseUploadImage.newFileName;
      }
    }

    const responseCreateBadge = await createBadge(data);
    if (!responseCreateBadge.success) {
      setSuccess(false);
      setMessage('Failed, Something went wrong');
      setIsLoading(false);
      return;
    }

    setSuccess(true);
    setMessage('Success, Badge was created');
    setIsLoading(false);
    router.push('/dashboard/badges');
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
      <form action="" className="space-y-3">
        <div className="space-y-2">
          <label className="font-medium">Image</label>
          {image && (
            <Image
              src={image}
              width={50}
              height={50}
              alt="join-code"
              priority
              className="rounded object-cover w-28 h-28"
            />
          )}
          <input
            type="file"
            name="image"
            id="image"
            className="bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            placeholder="Your Image"
            onChange={handleImageChange}
          />
          <span className="text-neutral-500 text-sm block">
            Format file must be jpg, max size 1 MB
          </span>
          {errorImageFile && (
            <span className="text-red-500 text-sm italic">
              {errorImageFile}
            </span>
          )}
        </div>
        <div>
          <label className="font-medium">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            className="bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            placeholder="Your Name"
            onChange={e => setName(e.target.value)}
          />
          {errorName && (
            <span className="text-red-500 text-sm italic">{errorName}</span>
          )}
        </div>
        <div>
          <label className="font-medium">Minimal Point</label>
          <input
            type="number"
            name="min_point"
            id="min_point"
            className="bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            placeholder="Minimal Point"
            onChange={e => setPoint(e.target.value)}
          />
        </div>
        <button
          disabled={isLoading}
          className="w-full bg-blue-500 text-white py-2 rounded"
          onClick={handleSubmit}
        >
          {isLoading ? 'Loading...' : 'Submit'}
        </button>
      </form>
    </div>
  );
}
