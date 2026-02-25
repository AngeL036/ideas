import { Navigate, Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { useEffect, useState } from "react";
import { obtenerMisNegocios } from "../api/negocio.api";

export default function PrivateLayout() {
  const token = localStorage.getItem("token");

  const navigate = useNavigate();
  const [checking, setChecking] = useState(true);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  useEffect(() => {
    // only owners can create/have businesses
    // get user from localStorage to check role
    const userStr = localStorage.getItem("user");
    let userRole = "";
    
    try {
      const user = userStr ? JSON.parse(userStr) : null;
      userRole = user?.role?.toLowerCase() || "";
    } catch (err) {
      console.error("Error parsing user", err);
    }

    const isOwner = userRole === "owner";

    // if owner, verify they have at least one business
    if (isOwner) {
      async function checkNegocios() {
        try {
          const negocios = await obtenerMisNegocios();
          if (!negocios || negocios.length === 0) {
            navigate("/negocio/nuevo", { replace: true });
          }
        } catch (err) {
          console.error("Error checking negocios", err);
        } finally {
          setChecking(false);
        }
      }
      checkNegocios();
    } else {
      // non-owners can access the app normally, just no business management
      setChecking(false);
    }
  }, [navigate]);

  if (checking) {
    // optionally show nothing or a loader while we check
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,_rgba(16,185,129,0.14),_transparent_45%),radial-gradient(circle_at_20%_20%,_rgba(249,115,22,0.14),_transparent_35%)]" />
      <Sidebar />
      <main className="ml-64 min-h-screen p-6 md:p-8">
        <Outlet />
      </main>
    </div>
  );
}
