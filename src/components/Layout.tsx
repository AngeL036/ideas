import Sidebar from "./Sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-100">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,_rgba(16,185,129,0.14),_transparent_45%),radial-gradient(circle_at_20%_20%,_rgba(249,115,22,0.14),_transparent_35%)]" />
      <Sidebar />

      <main className="ml-64 min-h-screen flex-1 p-6 md:p-8">
        {children}
      </main>
    </div>
  );
}
