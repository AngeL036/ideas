import { useNavigate } from "react-router-dom";
import { ShieldX } from "lucide-react";

interface SinPermisoProps {
  mensaje?: string;
}

export default function SinPermiso({ mensaje = "No tienes permiso para acceder a esta sección." }: SinPermisoProps) {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="max-w-sm w-full rounded-2xl border border-rose-100 bg-white p-8 shadow-sm text-center space-y-4">
        <div className="flex justify-center">
          <div className="rounded-full bg-rose-50 p-4">
            <ShieldX size={32} className="text-rose-500" />
          </div>
        </div>
        <h2 className="text-xl font-black text-slate-900">Acceso restringido</h2>
        <p className="text-sm text-slate-500">{mensaje}</p>
        <button
          onClick={() => navigate(-1)}
          className="w-full rounded-xl bg-slate-900 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700"
        >
          Regresar
        </button>
      </div>
    </div>
  );
}