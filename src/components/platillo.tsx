import type { PlatilloPayload } from "../types/Platillo";
import { Link } from "react-router-dom";
import { useRoleProtection } from "../hooks/useRoleProtection";
import { Pencil, Trash2 } from "lucide-react";

interface Props {
  plato: PlatilloPayload;
  onDelete: (id: number) => void;
  onToggleActivo: (id: number, activo: boolean) => void;
  loading: boolean;
}

export default function Platillo({ plato, onDelete, onToggleActivo, loading }: Props) {
  const { hasRole } = useRoleProtection();
  const puedeEditar = hasRole(["owner", "admin"]);

  return (
    <article
      className={`
        group relative flex flex-col justify-between
        rounded-2xl border bg-white p-5 shadow-sm
        transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md
        ${plato.activo ? "border-slate-200" : "border-slate-100 opacity-60"}
      `}
    >
      {/* Badge inactivo */}
      {!plato.activo && (
        <span className="absolute top-3 right-3 rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-slate-400">
          Inactivo
        </span>
      )}

      {/* Nombre y descripción */}
      <div className="space-y-1 pr-10">
        <h2 className="text-base font-bold leading-tight text-slate-900">{plato.nombre}</h2>
        <p className="line-clamp-2 text-xs text-slate-500">{plato.descripcion}</p>
      </div>

      {/* Precio */}
      <div className="mt-4">
        <span className="text-2xl font-black tracking-tight text-emerald-600">
          ${Number(plato.precio).toFixed(2)}
        </span>
      </div>

      {/* Footer: toggle + acciones */}
      <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3">

        {/* Toggle activo */}
        <div className="flex items-center gap-2">
          <button
            disabled={loading || !puedeEditar}
            onClick={() => puedeEditar && onToggleActivo(plato.id, !plato.activo)}
            className={`
              relative flex h-6 w-11 items-center rounded-full p-0.5 transition-all duration-300
              ${plato.activo ? "bg-emerald-500" : "bg-slate-200"}
              ${loading || !puedeEditar ? "cursor-not-allowed opacity-50" : "cursor-pointer"}
            `}
          >
            <div className={`h-5 w-5 rounded-full bg-white shadow transition-all duration-300 ${plato.activo ? "translate-x-5" : "translate-x-0"}`} />
          </button>
          <span className="text-xs text-slate-400">{plato.activo ? "Activo" : "Pausado"}</span>
        </div>

        {/* Acciones solo para owner/admin */}
        {puedeEditar && (
          <div className="flex items-center gap-1">
            <Link
              to={`/comida/editar/${plato.id}`}
              className="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-100 text-slate-500 transition hover:bg-slate-900 hover:text-white"
              title="Editar"
            >
              <Pencil size={13} />
            </Link>
            <button
              onClick={() => onDelete(plato.id)}
              className="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-100 text-slate-500 transition hover:bg-rose-500 hover:text-white"
              title="Eliminar"
            >
              <Trash2 size={13} />
            </button>
          </div>
        )}
      </div>
    </article>
  );
}