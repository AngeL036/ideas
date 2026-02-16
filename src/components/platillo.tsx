import type { PlatilloPayload } from "../types/Platillo";
import { Link } from "react-router-dom";

interface Props {
  plato: PlatilloPayload;
  onDelete: (id: number) => void;
  onToggleActivo: (id: number, activo: boolean) => void;
  loading: boolean;
}

export default function Platillo({ plato, onDelete, onToggleActivo, loading }: Props) {
  return (
    <article className="flex h-full flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div>
        <h2 className="text-lg font-bold text-slate-900">{plato.nombre}</h2>
        <p className="mt-1 line-clamp-3 text-sm text-slate-600">{plato.descripcion}</p>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <span className="text-2xl font-black text-emerald-600">${plato.precio}</span>
      </div>

      <div className="mt-4 flex items-center gap-2">
        <Link
          to={`/comida/editar/${plato.id}`}
          className="flex-1 rounded-xl bg-slate-900 py-2 text-center text-sm font-semibold text-white transition hover:bg-slate-700"
        >
          Editar
        </Link>

        <button
          onClick={() => onDelete(plato.id)}
          className="rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-sm font-semibold text-rose-600 transition hover:bg-rose-100"
        >
          Borrar
        </button>
      </div>

      <div className="mt-4 flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2">
        <span className="text-sm font-medium text-slate-600">Activo</span>
        <button
          disabled={loading}
          onClick={() => onToggleActivo(plato.id, !plato.activo)}
          className={`flex h-7 w-14 items-center rounded-full p-1 transition-all duration-300
          ${plato.activo ? "bg-emerald-500" : "bg-slate-300"}
          ${loading ? "cursor-not-allowed opacity-50" : ""}`}
        >
          <div className={`h-5 w-5 rounded-full bg-white shadow-md transition-all duration-300 ${plato.activo ? "translate-x-7" : ""}`} />
        </button>
      </div>
    </article>
  );
}
