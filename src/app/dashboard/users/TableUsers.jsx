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
  const [isPageLoaded, setPageLoaded] = useState(false);

  useEffect(() => {
    // Fungsi ini akan dipanggil ketika komponen telah dipasang (mounted)
    // Di sinilah kita dapat menandai bahwa halaman telah berhasil dimuat
    setPageLoaded(true);
  }, []);

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
  }, [searchTerm, pageUrl]);

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
  }, [startIndex, endIndex, realData]);

  useEffect(() => {
    const realDataSlice = realData.slice(startIndex, endIndex);
    setCurrentData(realDataSlice);
  }, [realData, startIndex, endIndex]);

  return (
    <>
      <div className="px-3 py-5 flex flex-col tablet:flex-row tablet:justify-between items-start tablet:items-center justify-start gap-y-2 tablet:gap-y-0">
        <input
          type="text"
          name="search"
          id="search"
          className="bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block max-w-full p-2.5 "
          placeholder="Search"
          defaultValue={searchTerm}
          onChange={handleSearch}
        />
        {isPageLoaded && (
          <Link
            href={'/dashboard/users/create'}
            scroll={false}
            className="bg-green-600 px-3 py-2 rounded text-white"
          >
            Create
          </Link>
        )}
      </div>
      <div className="px-3 overflow-auto w-full h-min-screen ">
        <table className="table-auto w-full overflow-x-auto">
          <thead className="bg-white text-black font-bold text-sm text-left uppercase tracking-wider border-b border-gray-200">
            <tr>
              <th className="py-3 text-center">NO</th>
              <th className="py-3">Nama</th>
              <th className="py-3">Email</th>
              <th className="py-3">Role</th>
              <th className="py-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentData?.map((user, index) => (
              <tr
                className="odd:bg-neutral-100 even:bg-neutral-200 hover:bg-neutral-300 transition-colors duration-200 border-b border-gray-200"
                key={index}
              >
                <td className="py-2 whitespace-nowrap text-center">
                  {startIndex + index + 1}
                </td>
                <td className="py-2 whitespace-nowrap text-wrap">
                  {user.name}
                </td>
                <td className="py-2 whitespace-nowrap text-wrap">
                  {user.email}
                </td>
                <td className="py-2 whitespace-nowrap text-wrap">
                  {user.role.name}
                </td>
                <td className="py-2 whitespace-nowrap flex flex-col tablet:flex-row justify-center items-center gap-y-1 tablet:gap-x-1 tablet:gap-y-0">
                  <Link
                    href={`/dashboard/users/detail/${user.nickname}`}
                    className="px-1 py-2 rounded bg-yellow-600 text-white text-xs tablet:text-sm"
                  >
                    Detail
                  </Link>
                  <Link
                    href={`/dashboard/users/update/${user.nickname}`}
                    className="px-1 py-2 rounded bg-blue-600 text-white text-xs tablet:text-sm"
                  >
                    Update
                  </Link>
                  {isPageLoaded && (
                    <Link
                      href={`/dashboard/users/delete/${user.nickname}`}
                      scroll={false}
                      className="px-1 py-2 rounded bg-red-600 text-white text-xs tablet:text-sm"
                    >
                      Delete
                    </Link>
                  )}
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
