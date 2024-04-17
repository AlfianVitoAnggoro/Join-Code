import Sidebar from './sidebar';
export default function Layout({ children }) {
  return (
    <>
      <div className="relative min-h-screen py-3 laptop:mt-20">
        <div className="max-w-[1024px] mx-auto px-10">
          <div className="grid grid-cols-9 gap-3">
            <Sidebar />
            {children}
          </div>
        </div>
      </div>
    </>
  );
}
