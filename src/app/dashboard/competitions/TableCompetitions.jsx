'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Pagination from './Pagination';
import { useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { getCompetition } from '@/lib/actions/competitionAction/index.js';

export default function TableCompetitions() {
  const { data: session, status } = useSession();
  const [competitionsData, setCompetitionsData] = useState([]);
  const [competitions, setCompetitions] = useState([]);
  const searchParams = useSearchParams();
  const pageUrl = searchParams.get('page');
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(Number(pageUrl) ? Number(pageUrl) : 1);
  const [totalData, setTotalData] = useState(0);
  const [realData, setRealData] = useState(competitions);
  const [currentData, setCurrentData] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(10);
  const [isPageLoaded, setIsPageLoaded] = useState(false);

  useEffect(() => {
    const getCompetitionsFunction = async () => {
      const res = await getCompetition();
      if (res.success) {
        const data = res?.data || []; // Handle response data appropriately
        setCompetitionsData(data);
      } else {
        setCompetitionsData([]);
      }
    };

    getCompetitionsFunction();
    // Fungsi ini akan dipanggil ketika komponen telah dipasang (mounted)
    // Di sinilah kita dapat menandai bahwa halaman telah berhasil dimuat
    setIsPageLoaded(true);
  }, []);

  useEffect(() => {
    const checkOrganization = () => {
      if (session && status === 'authenticated') {
        if (session?.user?.role === 'Organization') {
          const filterCompetition = competitionsData.filter(
            competition =>
              competition?.organization?.user?.userId === session?.user?.userId,
          );
          setCompetitions(filterCompetition);
        } else {
          setCompetitions(competitionsData);
        }
      }
    };
    checkOrganization();
  }, [session, status, competitionsData]);

  const handleSearch = e => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    if (searchTerm == '') {
      setRealData(competitions);
    } else {
      const filtered = competitions.filter(competition => {
        return (
          competition.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          competition.organization.user.name
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
        );
      });
      setRealData(filtered);
    }
  }, [searchTerm, competitions]);

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
          className="bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block max-w-full p-2.5"
          placeholder="Search"
          defaultValue={searchTerm}
          onChange={handleSearch}
        />
        {isPageLoaded && (
          <Link
            href={'/dashboard/competitions/create'}
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
              <th className="py-3">NO</th>
              <th className="py-3">Name</th>
              <th className="py-3">Organization</th>
              <th className="py-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentData?.length == 0 && (
              <tr>
                <td
                  colSpan={4}
                  className="text-center text-neutral-500 italic py-2"
                >
                  Not any competitions at this time
                </td>
              </tr>
            )}
            {currentData?.map((competition, index) => (
              <tr
                className="odd:bg-neutral-100 even:bg-neutral-200 hover:bg-neutral-300 transition-colors duration-200 border-b border-gray-200"
                key={index}
              >
                <td className="py-2 whitespace-nowrap">
                  {startIndex + index + 1}
                </td>
                <td className="py-2 whitespace-nowrap text-wrap">
                  {competition.name}
                </td>
                <td className="py-2 whitespace-nowrap text-wrap">
                  {competition.organization.user.name}
                </td>
                <td className="py-2 whitespace-nowrap flex flex-col tablet:flex-row justify-center items-center gap-y-1 tablet:gap-x-1 tablet:gap-y-0">
                  <Link
                    href={`/dashboard/competitions/detail/${competition.competitionId}`}
                    className="px-1 py-2 rounded bg-yellow-600 text-white text-xs tablet:text-sm"
                  >
                    Detail
                  </Link>
                  <Link
                    href={`/dashboard/competitions/update/${competition.competitionId}`}
                    className="px-1 py-2 rounded bg-blue-600 text-white text-xs tablet:text-sm"
                  >
                    Update
                  </Link>
                  {isPageLoaded && (
                    <Link
                      href={`/dashboard/competitions/delete/${competition.competitionId}`}
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
