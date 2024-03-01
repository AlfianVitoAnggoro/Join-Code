'use client';
import { usePathname } from 'next/navigation';

export default function Header() {
  const disableLayout = ['/competition/browse'];
  disableLayout.push(...['/competition/browse.*']);
  const regexRoutes = disableLayout.map(route => new RegExp(`^${route}$`));
  const shouldDisableLayout = pathname => {
    return regexRoutes.some(regex => regex.test(pathname));
  };
  const pathname = usePathname();
  return (
    <div className="bg-white rounded py-5 px-3">
      <h1 className="text-3xl font-bold m-3">Competition</h1>
      <div
        className={`ml-3 mt-3 ${
          shouldDisableLayout(pathname) && 'laptop:flex hidden'
        }`}
      >
        <input
          type="text"
          name="search"
          id="search"
          className="bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-96 p-2.5 "
          placeholder="Search"
        />
      </div>
    </div>
  );
}
