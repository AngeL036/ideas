import type { PlatilloPayload } from "../types/Platillo";
import { Link } from "react-router-dom";
import Switch from "./ui/Switch";

interface Props {
  plato: PlatilloPayload;
  onDelete: (id: number) => void;
  onToggleActivo: (id:number, activo:boolean) => void;
}

export default function Platillo({ plato, onDelete, onToggleActivo }: Props) {
  return (
    <div
      className="bg-white rounded-xl shadow p-5
                 hover:shadow-lg transition
                 flex flex-col justify-between"
    >
      <div>
        <h2 className="text-lg font-semibold text-gray-800">
          {plato.nombre}
        </h2>

        <p className="text-sm text-gray-600 mt-1 line-clamp-3">
          {plato.descripcion}
        </p>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <span className="text-xl font-bold text-green-600">
          ${plato.precio}
        </span>

        <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">
          Stock: {plato.cantidad}
        </span>
      </div>

      {/* BOTONES */}
      <div className="mt-4 flex gap-2">
        <Link
          to={`/comida/editar/${plato.id}`}
          className="flex-1 text-center
                     bg-blue-600 text-white
                     py-2 rounded-lg
                     hover:bg-blue-700 transition"
        >
          ✏️ Editar
        </Link>
        {/*
        <button
          onClick={() => onDelete(plato.id)}
          className="flex-1
                     bg-red-600 text-white
                     py-2 rounded-lg
                     hover:bg-red-700 transition"
        >
          🗑️ Eliminar
        </button>
        * */}
       <div className="mt-3 flex items-center justify-between">
        <span className="text-sm">Activo</span>
        <Switch 
          activo={plato.activo}
          onChange={(value) => onToggleActivo(plato.id,value)}
        />
       </div>
      </div>
    </div>
  );
}
