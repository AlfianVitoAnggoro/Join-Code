export default function Layout({ children, modal }) {
  return (
    <div className="w-full bg-mainColor">
      <div className="w-full border-b-2 border-neutral-300 bg-white py-5 px-3">
        <h1 className="text-2xl font-semibold">Badges</h1>
      </div>
      {children}
      {modal}
    </div>
  );
}
