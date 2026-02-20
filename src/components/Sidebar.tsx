import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaHome, FaUtensils, FaClipboardList, FaChair, FaSignOutAlt, FaUser, FaStore } from "react-icons/fa";


export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  let user: { email?: string } = {};
  try {
    user = JSON.parse(localStorage.getItem("user") || "{}");
  } catch {
    user = {};
  }
  const userLabel = user.email || "Usuario";

  const menu = [
    { name: "Dashboard", path: "/", icon: <FaHome /> },
    { name: "Menu", path: "/comida", icon: <FaUtensils /> },
    { name: "Ordenes", path: "/pedidos", icon: <FaClipboardList /> },
    { name: "Mesas", path: "/mesas", icon: <FaChair /> },
    { name: "Empleados", path: "/empleados", icon: <FaUser />},
    { name: "Negocios", path: "/negocios", icon:<FaStore />},
  ];
  const cerrarSesion = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login", { replace: true });
  };

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 border-r border-slate-200/70 bg-white/90 text-slate-900 backdrop-blur">
      <div className="flex h-full flex-col">
        <div className="px-6 py-6">
          <h1 className="text-xl font-black tracking-tight text-slate-900">RestaurantOS</h1>
          <p className="mt-1 text-xs font-medium text-slate-500">Panel de control</p>
        </div>

        <nav className="flex-1 space-y-2 px-3">
          {menu.map((item) => {
            const active = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-all
                ${
                  active
                    ? "bg-slate-900 text-white shadow-sm"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                <span className="text-base">{item.icon}</span>
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="m-3 rounded-xl border border-slate-200 bg-slate-50 p-4">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Usuario</p>
          <p className="mt-1 truncate text-sm font-semibold text-slate-800">{userLabel}</p>
          <button
            onClick={cerrarSesion}
            className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-sm font-semibold text-rose-700 transition hover:bg-rose-100 hover:text-rose-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-300"
          >
            <FaSignOutAlt className="text-sm" />
            <span>Cerrar sesion</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
