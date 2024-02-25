'use client';
import Image from 'next/image';
import Link from 'next/link';
export default function CompetitionsDashboardPages() {
  return (
    <div className="flex-1 bg-mainColor">
      <div className="px-3 py-5 flex justify-between items-center">
        <input
          type="text"
          name="search"
          id="search"
          className="bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-96 p-2.5 "
          placeholder="Search"
        />
        <Link
          href={'/dashboard/competitions/create'}
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
              <th className="py-3 text-center">Point</th>
              <th className="py-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr className="odd:bg-neutral-100 even:bg-neutral-200 hover:bg-neutral-300 transition-colors duration-200 border-b border-gray-200">
              <td className="py-2 text-center whitespace-nowrap">1</td>
              <td className="py-2 text-center whitespace-nowrap">
                Alfian Vito Anggoro
              </td>
              <td className="py-2 text-center whitespace-nowrap">
                atokemen12@gmail.com
              </td>
              <td className="py-2 text-center whitespace-nowrap">1000</td>
              <td className="py-2 text-center whitespace-nowrap space-x-2">
                <Link
                  href={'/dashboard/competitions/detail/1'}
                  className="px-1 py-2 rounded bg-yellow-600 text-white w-16 text-sm"
                >
                  Detail
                </Link>
                <Link
                  href={'/dashboard/competitions/update/1'}
                  className="px-1 py-2 rounded bg-blue-600 text-white w-16 text-sm"
                >
                  Update
                </Link>
                <Link
                  href={'/dashboard/competitions/delete/1'}
                  className="px-1 py-2 rounded bg-red-600 text-white w-16 text-sm"
                >
                  Delete
                </Link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="mx-3 px-3 flex items-center justify-between border-t border-gray-200 bg-white py-3">
        <div className="flex flex-1 justify-between sm:hidden">
          <Link
            href="#"
            className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Previous
          </Link>
          <Link
            href="#"
            className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Next
          </Link>
        </div>
        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              Showing
              <span className="font-medium"> 1 </span>
              to
              <span className="font-medium"> 10 </span>
              of
              <span className="font-medium"> 97 </span>
              results
            </p>
          </div>
          <div>
            <nav
              className="isolate inline-flex -space-x-px rounded-md shadow-sm"
              aria-label="Pagination"
            >
              <Link
                href={'/'}
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
              <Link
                href={'/'}
                aria-current="page"
                className="relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                1
              </Link>
              <Link
                href={'/'}
                className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              >
                2
              </Link>
              <Link
                href={'/'}
                className="relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex"
              >
                3
              </Link>
              <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0">
                ...
              </span>
              <Link
                href={'/'}
                className="relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex"
              >
                8
              </Link>
              <Link
                href={'/'}
                className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              >
                9
              </Link>
              <Link
                href={'/'}
                className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              >
                10
              </Link>
              <Link
                href={'/'}
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
    </div>
  );
}
