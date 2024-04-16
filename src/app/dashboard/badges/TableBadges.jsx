'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Pagination from './Pagination';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';

export default function TableBadges({ badges }) {
  const searchParams = useSearchParams();
  const pageUrl = searchParams.get('page');
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(Number(pageUrl) ? Number(pageUrl) : 1);
  const [totalData, setTotalData] = useState(0);
  const [realData, setRealData] = useState(badges);
  const [currentData, setCurrentData] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(10);

  const handleSearch = e => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    if (searchTerm == '') {
      setRealData(badges);
    } else {
      const filtered = badges.filter(badge => {
        return (
          badge.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          badge.point.toString().includes(searchTerm.toString())
        );
      });
      setRealData(filtered);
    }
  }, [searchTerm, badges]);

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
  }, [realData, endIndex, startIndex]);
  return (
    <>
      <div className="px-3 py-5 flex justify-between items-center">
        <input
          type="text"
          name="search"
          id="search"
          className="bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-96 p-2.5 "
          placeholder="Search"
          onChange={handleSearch}
          defaultValue={searchTerm}
        />
        <Link
          href={'/dashboard/badges/create'}
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
              <th className="py-3 text-center">Image</th>
              <th className="py-3 text-center">Name</th>
              <th className="py-3 text-center">Min Point</th>
              <th className="py-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentData?.map((badge, index) => (
              <tr
                className="odd:bg-neutral-100 even:bg-neutral-200 hover:bg-neutral-300 transition-colors duration-200 border-b border-gray-200"
                key={index}
              >
                <td className="py-2 text-center whitespace-nowrap">
                  {startIndex + index + 1}
                </td>
                <td className="py-2 whitespace-nowrap flex justify-center">
                  <Image
                    src={`/images/badges/${badge.image}`}
                    alt={`${badge.name}`}
                    priority
                    className="w-30 h-30 object-cover"
                    width={100}
                    height={100}
                  ></Image>
                </td>
                <td className="py-2 text-center whitespace-nowrap">
                  {badge.name}
                </td>
                <td className="py-2 text-center whitespace-nowrap">
                  {badge.point}
                </td>
                <td className="py-2 text-center whitespace-nowrap space-x-2">
                  <Link
                    href={`/dashboard/badges/update/${badge.badgeId}`}
                    className="px-1 py-2 rounded bg-blue-600 text-white w-16 text-sm"
                  >
                    Update
                  </Link>
                  <Link
                    href={`/dashboard/badges/delete/${badge.badgeId}`}
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
