import { Dispatch, SetStateAction } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Utensils,
  ClipboardList,
  Store,
  Users,
  BarChart3,
  CreditCard,
  Package,
  User,
  Menu,
  X,
  LogOut,
} from "lucide-react";

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: Dispatch<SetStateAction<boolean>>;
  mobileOpen: boolean;
  setMobileOpen: Dispatch<SetStateAction<boolean>>;
}

export default function Sidebar({
  collapsed,
  setCollapsed,
  mobileOpen,
  setMobileOpen,
}: SidebarProps) {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("refresh_token");
    navigate("/login", { replace: true });
  }

  return (
    <>
      {/* Overlay móvil */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm lg:hidden"
        />
      )}

      <aside
        className={`
          fixed top-4 left-4 z-50 h-[calc(100vh-2rem)]
          bg-white/80 backdrop-blur-xl
          border border-slate-200
          shadow-xl
          rounded-3xl
          transition-all duration-300
          ${collapsed ? "w-20" : "w-64"}
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 h-16">
          {!collapsed && (
            <span className="text-lg font-bold bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">
              MiSistema
            </span>
          )}

          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden lg:flex p-2 rounded-xl hover:bg-slate-100 transition"
          >
            <Menu size={18} />
          </button>

          <button
            onClick={() => setMobileOpen(false)}
            className="lg:hidden p-2 rounded-xl hover:bg-slate-100"
          >
            <X size={18} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="px-3 pb-6 space-y-1 text-sm">
          <SidebarLink to="/" icon={<LayoutDashboard size={18} />} label="Dashboard" collapsed={collapsed} />
          <SidebarLink to="/comida" icon={<Utensils size={18} />} label="Comida" collapsed={collapsed} />
          <SidebarLink to="/pedidos" icon={<ClipboardList size={18} />} label="Pedidos" collapsed={collapsed} />
          <SidebarLink to="/mesas" icon={<Store size={18} />} label="Mesas" collapsed={collapsed} />
          <SidebarLink to="/empleados" icon={<Users size={18} />} label="Empleados" collapsed={collapsed} />
          <SidebarLink to="/ventas" icon={<CreditCard size={18} />} label="Ventas" collapsed={collapsed} />
          <SidebarLink to="/estadisticas" icon={<BarChart3 size={18} />} label="Estadísticas" collapsed={collapsed} />
          <SidebarLink to="/inventario" icon={<Package size={18} />} label="Inventario" collapsed={collapsed} />
          <SidebarLink to="/pagos" icon={<CreditCard size={18} />} label="Pagos" collapsed={collapsed} />
          <SidebarLink to="/negocios" icon={<Store size={18} />} label="Negocios" collapsed={collapsed} />
          <SidebarLink to="/perfil" icon={<User size={18} />} label="Perfil" collapsed={collapsed} />
        </nav>
        <div className="absolute bottom-4 left-0 right-0 px-3">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-2xl text-red-500 hover:bg-red-50 transition-all duration-200"
            >
              <LogOut size={18}/>
              {!collapsed && <span className="font-medium">Cerrar sesion</span>}
          </button>
        </div>
      </aside>
    </>
  );
}

interface SidebarLinkProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  collapsed: boolean;
}

function SidebarLink({ to, icon, label, collapsed }: SidebarLinkProps) {
  return (
    <NavLink
      to={to}
      end
      className={({ isActive }) =>
        `
        flex items-center gap-3 px-3 py-2.5 rounded-2xl
        transition-all duration-200
        ${
          isActive
            ? "bg-emerald-100 text-emerald-700 shadow-sm"
            : "text-slate-600 hover:bg-slate-100"
        }
      `
      }
    >
      {icon}
      {!collapsed && <span className="font-medium">{label}</span>}
    </NavLink>
  );
}