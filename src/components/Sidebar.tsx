import { Link, useLocation } from "react-router-dom";
import { FaHome, FaUtensils, FaClipboardList, FaChair } from "react-icons/fa";

export default function Sidebar() {
  const location = useLocation();

  const menu = [
    { name: "Dashboard", path: "/", icon: <FaHome /> },
    { name: "Menú", path: "/comida", icon: <FaUtensils /> },
    { name: "Órdenes", path: "/pedidos", icon: <FaClipboardList /> },
    { name: "Mesas", path: "/mesas", icon: <FaChair /> },
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-slate-900 text-white flex flex-col shadow-lg">
      
      {/* Logo */}
      <div className="px-6 py-5 border-b border-slate-800">
        <h1 className="text-xl font-bold text-orange-500">RestaurantOS</h1>
        <p className="text-xs text-slate-400">Panel Admin</p>
      </div>

      {/* Menu */}
      <nav className="flex-1 px-3 py-6 space-y-2">
        {menu.map((item) => {
          const active = location.pathname === item.path;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all
                ${active 
                  ? "bg-orange-500 text-white shadow-md" 
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`}
            >
              <span className="text-lg">{item.icon}</span>
              <span className="font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Usuario abajo */}
      <div className="p-4 border-t border-slate-800">
        <p className="text-sm text-slate-400">Bienvenido</p>
        <p className="font-semibold">Angel</p>
      </div>
    </aside>
  );
}
