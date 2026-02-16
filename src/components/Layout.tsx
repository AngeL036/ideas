import Sidebar from "./Sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      <Sidebar />

      <main className="ml-64 flex-1  bg-gray-100 min-h-screen p-6">
        {children}
      </main>
    </div>
  );
}
