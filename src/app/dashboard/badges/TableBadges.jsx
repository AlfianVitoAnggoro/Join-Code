'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Pagination from './Pagination';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { getBadge } from '@/lib/actions/badgeAction';

export default function TableBadges() {
  const searchParams = useSearchParams();
  const pageUrl = searchParams.get('page');
  const [badges, setBadges] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(Number(pageUrl) ? Number(pageUrl) : 1);
  const [totalData, setTotalData] = useState(0);
  const [realData, setRealData] = useState(badges);
  const [currentData, setCurrentData] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(10);
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [statusFetchData, setStatusFetchData] = useState(false);

  useEffect(() => {
    const getBadgesFunction = async () => {
      const res = await getBadge();
      if (res.success) {
        const data = res?.data; // Handle response data appropriately
        setBadges(data);
        setStatusFetchData(true);
      } else {
        setBadges([]);
        setStatusFetchData(false);
      }
      setIsLoading(false);
    };

    getBadgesFunction();
    // Fungsi ini akan dipanggil ketika komponen telah dipasang (mounted)
    // Di sinilah kita dapat menandai bahwa halaman telah berhasil dimuat
    setIsPageLoaded(true);
  }, []);

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
      <div className="px-3 py-5 flex flex-col tablet:flex-row tablet:justify-between items-start tablet:items-center justify-start gap-y-2 tablet:gap-y-0">
        <input
          type="text"
          name="search"
          id="search"
          className="bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block max-w-full p-2.5 "
          placeholder="Search"
          onChange={handleSearch}
          defaultValue={searchTerm}
        />
        {isPageLoaded && (
          <Link
            href={'/dashboard/badges/create'}
            scroll={false}
            className="bg-green-600 px-3 py-2 rounded text-white"
          >
            Create
          </Link>
        )}
      </div>
      <div className="px-3 overflow-auto w-full h-min-screen ">
        <table className="table-auto overflow-x-auto w-full">
          <thead className="bg-white text-black font-bold text-sm text-left uppercase tracking-wider border-b border-gray-200">
            <tr>
              <th className="py-3 text-center">NO</th>
              <th className="py-3">Image</th>
              <th className="py-3">Name</th>
              <th className="py-3">Min Point</th>
              <th className="py-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {isLoading && (
              <tr>
                <td
                  colSpan={5}
                  className="text-center text-neutral-500 italic py-2"
                >
                  Loading...
                </td>
              </tr>
            )}
            {!isLoading && !statusFetchData && (
              <tr>
                <td
                  colSpan={5}
                  className="text-center text-neutral-500 italic py-2"
                >
                  Failed load data
                </td>
              </tr>
            )}
            {!isLoading && statusFetchData && currentData?.length == 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="text-center text-neutral-500 italic py-2"
                >
                  Not any users at this time
                </td>
              </tr>
            ) : (
              currentData?.map((badge, index) => (
                <tr
                  className="odd:bg-neutral-100 even:bg-neutral-200 hover:bg-neutral-300 transition-colors duration-200 border-b border-gray-200"
                  key={index}
                >
                  <td className="py-2 text-center whitespace-nowrap">
                    {startIndex + index + 1}
                  </td>
                  <td className="py-2 whitespace-nowrap flex justify-center">
                    <Image
                      src={`https://atzxitftejquqppfauyh.supabase.co/storage/v1/object/public/badges/public/${badge.image}`}
                      alt="badge-images"
                      priority
                      className="w-auto h-auto object-cover"
                      width={80}
                      height={80}
                    />
                  </td>
                  <td className="py-2 whitespace-nowrap">{badge.name}</td>
                  <td className="py-2 whitespace-nowrap">
                    {badge.point || '0'}
                  </td>
                  <td className="py-2 whitespace-nowrap flex flex-col tablet:flex-row justify-center items-center gap-y-1 tablet:gap-x-1 tablet:gap-y-0">
                    {isPageLoaded && (
                      <Link
                        href={`/dashboard/badges/update/${badge.badgeId}`}
                        scroll={false}
                        className="px-1 py-2 rounded bg-blue-600 text-white text-xs tablet:text-sm"
                      >
                        Update
                      </Link>
                    )}
                    {isPageLoaded && (
                      <Link
                        href={`/dashboard/badges/delete/${badge.badgeId}`}
                        scroll={false}
                        className="px-1 py-2 rounded bg-red-600 text-white text-xs tablet:text-sm"
                      >
                        Delete
                      </Link>
                    )}
                  </td>
                </tr>
              ))
            )}
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
