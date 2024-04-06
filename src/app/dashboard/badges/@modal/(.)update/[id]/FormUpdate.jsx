'use client';
import { useEffect, useState } from 'react';
import { updateBadge } from '@/lib/actions/badgeAction';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function FormUpdate({ badge }) {
  const [image, setImage] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [name, setName] = useState(badge?.name || '');
  const [point, setPoint] = useState(badge?.point || '');

  // Error Handling
  const [errorImageFile, setErrorImageFile] = useState('');
  const [errorName, setErrorName] = useState();

  // Load Handling
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState();
  const [message, setMessage] = useState('');

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

        if (resUploadImage.success) {
          // DELETE AVATAR BEFORE
          if (badge?.image) {
            formData.append('nowFile', badge?.image);
            const res = await fetch('/api/upload/badge', {
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

  const handleImageChange = e => {
    const file = e.target.files[0];
    if (
      file?.type != 'image/jpeg' &&
      file?.type != 'image/png' &&
      file?.type != 'image/webp' &&
      file?.type != 'image/svg'
    ) {
      setErrorImageFile('Type file avatar is not supported!');
    } else if (file?.size > 1000000) {
      setErrorImageFile('Size file avatar must be less than 1 MB!');
    } else {
      setErrorImageFile('');
      setImage(URL.createObjectURL(file));
      setImageFile(file);
    } // Simpan file yang diunggah ke dalam state avatarFile
  };

  useEffect(() => {
    if (name) {
      const regex = /^[a-zA-Z\s]+$/;
      const nameRegex = regex.test(name);
      if (!nameRegex) {
        setErrorName('Nama harus berupa huruf');
      } else if (name.length < 3) {
        setErrorName('Nama harus lebih dari 3 huruf');
      } else {
        setErrorName('');
      }
    }
  }, [name]);

  const router = useRouter();
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
        setMessage('Failed, File image cannot be updated');
        setIsLoading(false);
        return;
      } else {
        data.image = responseUploadImage.newFileName;
      }
    }

    const responseUUpdateBadge = await updateBadge(badge?.badgeId, data);
    if (!responseUUpdateBadge.success) {
      setSuccess(false);
      setMessage('Failed, Something went wrong');
      setIsLoading(false);
      return;
    }

    setSuccess(true);
    setMessage('Success, Badge has been updated');
    setIsLoading(false);
    router.push(`/dashboard/badges`);
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
          <Image
            src={image ? image : `/images/badges/${badge?.image}`}
            width={50}
            height={50}
            alt={badge?.name}
            priority
            className="rounded object-cover w-28 h-28"
          />
          <input
            type="file"
            name="image"
            id="image"
            className="bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            placeholder="Your Image"
            onChange={handleImageChange}
          />
          <span className="text-neutral-500 text-sm block">
            Upload file dengan format jpeg/svg/webp/png, max size 1 MB
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
            defaultValue={name}
            onChange={e => setName(e.target.value)}
          />
          {errorName && (
            <span className="text-red-500 text-sm italic">{errorName}</span>
          )}
        </div>
        <div>
          <label className="font-medium">Point</label>
          <input
            type="number"
            name="point"
            id="point"
            className="bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            placeholder="Point"
            defaultValue={point}
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
