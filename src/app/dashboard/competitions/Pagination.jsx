import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Pagination({
  totalData,
  currentPagePathname,
  startIndex,
  endIndex,
}) {
  const [currentPage, setCurrentPage] = useState(
    currentPagePathname ? Number(currentPagePathname) : 1,
  );
  const [totalPages, setTotalPages] = useState();

  useEffect(() => {
    const getTotalPages = () => {
      if (totalData > 0) {
        const totalPages = Math.ceil(totalData / 10);
        return totalPages;
      }
    };
    setTotalPages(getTotalPages);
  }, [totalData]);

  useEffect(() => {
    setCurrentPage(Number(currentPagePathname));
  }, [currentPagePathname]);

  return (
    <div className="mx-3 px-3 flex items-center justify-between border-t border-gray-200 bg-white py-3">
      <div className="flex flex-1 justify-between sm:hidden">
        <Link
          href={`/dashboard/users?page=${
            currentPage > 1 ? currentPage - 1 : 1
          }`}
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Previous
        </Link>
        <Link
          href={`/dashboard/users?page=${
            currentPage < totalPages ? currentPage + 1 : totalPages
          }`}
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Next
        </Link>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing
            <span className="font-medium">
              {' '}
              {totalData == 0 ? 0 : startIndex + 1}{' '}
            </span>
            to
            <span className="font-medium">
              {' '}
              {totalData < endIndex ? totalData : endIndex}{' '}
            </span>
            of
            <span className="font-medium"> {totalData} </span>
            results
          </p>
        </div>
        <div>
          <nav
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            <Link
              href={`/dashboard/users?page=${
                currentPage > 1 ? currentPage - 1 : 1
              }`}
              className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Previous</span>
              <svg
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
            {Array.from({ length: totalPages }, (_, i) => (
              <Link
                key={i + 1}
                href={`/dashboard/users?page=${i + 1}`}
                aria-current="page"
                className={`relative z-10 inline-flex items-center ${
                  i + 1 == currentPage && 'bg-indigo-600  text-white'
                } px-4 py-2 text-sm font-semibold focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
              >
                {i + 1}
              </Link>
            ))}

            <Link
              href={`/dashboard/users?page=${
                currentPage < totalPages ? currentPage + 1 : totalPages
              }`}
              className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Next</span>
              <svg
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
                ariaidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
}
