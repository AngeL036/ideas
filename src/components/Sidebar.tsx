import { Dispatch, SetStateAction } from "react";
import { NavLink, useNavigate} from "react-router-dom";
import { Menu,X,LogOut } from "lucide-react";
import * as Icons from "lucide-react"
import { useGiro } from "../config/giros/GiroContext";


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
  const {nav,nombre, tema} = useGiro();
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
        {/* Header: nombre del negocio + botones colapsar/cerrar */}
        <div className="flex items-center justify-between px-4 h-16">
          {!collapsed && (
            <span 
              className="text-lg font-bold bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent"
              style={{
                backgroundImage: `linear-gradient(to rigth, ${tema.primary}, ${tema.secondary})`  
              }}
              >
              {nombre}
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

        {/* Nav generado dinámicamente desde el config del giro */}
        <nav className="px-3 pb-6 space-y-1 text-sm">
          {nav.map((item) => {
            const IconComponent = (
              Icons as unknown as Record<string, React.ComponentType<{ size?: number}>>
            )[item.icon];
            return(
              <NavLink
                key={item.ruta}
                to={item.ruta}
                end
                className={({ isActive}) =>`
                flex items-center gap-3 px-3 py-2.5 rounded-2xl
                transition-all duration-200
                  ${
                    isActive
                    ? "bg-emerald-100 text-emerald-700 shadow-sm"
                    :"text-slate-600 hover:bg-slate-100"
                  }
                `}
                >
                  {IconComponent && <IconComponent size={18}/>}
                  {!collapsed && <span className="font-medium">{item.label}</span>} 
                  {!collapsed && item.badge && (
                    <span 
                      className="ml-auto text-xs bg-red-100 text-red-600 px-2 py-2.5 rounded-full"
                      >
                      {item.badge}
                    </span>
                  )}
              </NavLink>
            );
          })}
        </nav>
        {/* Botón de logout fijo abajo */}
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