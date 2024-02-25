import SidebarDashboard from './sidebar';

export default function Layout({ children }) {
  return (
    <section className="flex">
      <SidebarDashboard />
      {children}
    </section>
  );
}
