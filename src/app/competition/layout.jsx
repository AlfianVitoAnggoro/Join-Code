export default function Layout({ children }) {
  return (
    <div className="relative min-h-screen py-3 laptop:mt-20">
      <div className="w-[1024px] mx-auto px-10">{children}</div>
    </div>
  );
}
