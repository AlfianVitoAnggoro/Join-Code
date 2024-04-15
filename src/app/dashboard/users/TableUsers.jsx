'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Pagination from './Pagination';
import { useSearchParams } from 'next/navigation';

export default function TableUsers({ users }) {
  const searchParams = useSearchParams();
  const pageUrl = searchParams.get('page');
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(Number(pageUrl) ? Number(pageUrl) : 1);
  const [totalData, setTotalData] = useState(0);
  const [realData, setRealData] = useState(users);
  const [currentData, setCurrentData] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(10);

  const handleSearch = e => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    if (searchTerm == '') {
      setRealData(users);
    } else {
      const filtered = users.filter(user => {
        return (
          user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.role.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
      });
      setRealData(filtered);
    }
  }, [searchTerm, users]);

  useEffect(() => {
    if (searchTerm !== '') {
      setPage(1);
    } else {
      setPage(pageUrl ? Number(pageUrl) : 1);
    }
  }, [searchTerm]);

  useEffect(() => {
    setTotalData(realData.length);
  }, [realData]);

  useEffect(() => {
    setPage(1);
  }, [totalData]);

  useEffect(() => {
    setPage(Number(pageUrl) ? Number(pageUrl) : 1);
  }, [pageUrl]);

  useEffect(() => {
    const itemsPerPage = 10;
    const startIndexCount = (page - 1) * itemsPerPage;
    const endIndexCount = startIndexCount + itemsPerPage;
    setStartIndex(startIndexCount);
    setEndIndex(endIndexCount);
  }, [page]);

  useEffect(() => {
    const realDataSlice = realData.slice(startIndex, endIndex);
    setCurrentData(realDataSlice);
  }, [startIndex, endIndex]);

  useEffect(() => {
    const realDataSlice = realData.slice(startIndex, endIndex);
    setCurrentData(realDataSlice);
  }, [realData]);

  return (
    <>
      <div className="px-3 py-5 flex justify-between items-center">
        <input
          type="text"
          name="search"
          id="search"
          className="bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-96 p-2.5 "
          placeholder="Search"
          defaultValue={searchTerm}
          onChange={handleSearch}
        />
        <Link
          href={'/dashboard/users/create'}
          scroll={false}
          className="bg-green-600 px-3 py-2 rounded text-white"
        >
          Create
        </Link>
      </div>
      <div className="px-3 overflow-auto w-full h-min-screen ">
        <table className="table-auto min-w-full">
          <thead className="bg-white text-black font-bold text-sm text-left uppercase tracking-wider border-b border-gray-200">
            <tr>
              <th className="py-3 text-center">NO</th>
              <th className="py-3 text-center">Nama</th>
              <th className="py-3 text-center">Email</th>
              <th className="py-3 text-center">Role</th>
              <th className="py-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentData?.map((user, index) => (
              <tr
                className="odd:bg-neutral-100 even:bg-neutral-200 hover:bg-neutral-300 transition-colors duration-200 border-b border-gray-200"
                key={index}
              >
                <td className="py-2 text-center whitespace-nowrap">
                  {startIndex + index + 1}
                </td>
                <td className="py-2 text-center whitespace-nowrap">
                  {user.name}
                </td>
                <td className="py-2 text-center whitespace-nowrap">
                  {user.email}
                </td>
                <td className="py-2 text-center whitespace-nowrap">
                  {user.role.name}
                </td>
                <td className="py-2 text-center whitespace-nowrap space-x-2">
                  <Link
                    href={`/dashboard/users/detail/${user.nickname}`}
                    className="px-1 py-2 rounded bg-yellow-600 text-white w-16 text-sm"
                  >
                    Detail
                  </Link>
                  <Link
                    href={`/dashboard/users/update/${user.nickname}`}
                    className="px-1 py-2 rounded bg-blue-600 text-white w-16 text-sm"
                  >
                    Update
                  </Link>
                  <Link
                    href={`/dashboard/users/delete/${user.nickname}`}
                    scroll={false}
                    className="px-1 py-2 rounded bg-red-600 text-white w-16 text-sm"
                  >
                    Delete
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination
        totalData={totalData}
        currentPagePathname={page}
        startIndex={startIndex}
        endIndex={endIndex}
      />
    </>
  );
}
