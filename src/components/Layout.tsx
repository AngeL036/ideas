import { useState } from "react";
import Sidebar from "./Sidebar";
import { Menu } from "lucide-react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Fondo decorativo */}
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,_rgba(16,185,129,0.14),_transparent_45%),radial-gradient(circle_at_20%_20%,_rgba(249,115,22,0.14),_transparent_35%)]" />

      {/* Sidebar */}
      <Sidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      {/* Topbar móvil */}
      <header className="lg:hidden flex items-center h-16 px-4 bg-white border-b shadow-sm">
        <button
          onClick={() => setMobileOpen(true)}
          className="p-2 rounded hover:bg-slate-100"
        >
          <Menu size={20} />
        </button>

        <span className="ml-4 font-semibold text-slate-700">
          MiSistema
        </span>
      </header>

      {/* Main */}
      <main
        className={`
          min-h-screen flex-1 p-6 md:p-8 transition-all duration-300
          ${collapsed ? "lg:ml-20" : "lg:ml-64"}
        `}
      >
        {children}
      </main>
    </div>
  );
}