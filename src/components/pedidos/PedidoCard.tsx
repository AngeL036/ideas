import { useState } from "react";
import type { PlatilloPayload } from "../../types/Platillo";
import Swal from "sweetalert2";

interface Props {
  comida: PlatilloPayload;
  onAgregar: (platillo_id: number, nombre: string, precio:number, cantidad:number) => void;
}

export default function PedidoCard({ comida, onAgregar }: Props) {
  const [contador, setContador] = useState(1);

  const handleAgregar = () => {
    onAgregar(comida.id, comida.nombre, comida.precio, contador)
    setContador(1);
    Swal.fire({
      icon:"success",
      title:"Agregando al carrito",
      text: `${contador} ${comida.nombre}(s) listos para enviar`,
      timer: 1200,
      showConfirmButton: false,
    });
  };

  return (
    <article className="flex h-full flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div>
        <h2 className="text-lg font-bold text-slate-900">{comida.nombre}</h2>
        <p className="mt-1 line-clamp-3 text-sm text-slate-600">{comida.descripcion}</p>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <span className="text-2xl font-black text-emerald-600">${comida.precio}</span>
      </div>

      <div className="mt-5 flex items-center gap-3">
        <div className="flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-1">
          <button
            className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-200 text-slate-700 transition hover:bg-slate-300"
            onClick={() => setContador(Math.max(0, contador - 1))}
          >
            -
          </button>

          <span className="w-6 text-center font-semibold text-slate-800">{contador}</span>

          <button
            className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-200 text-slate-700 transition hover:bg-slate-300"
            onClick={() => setContador(contador + 1)}
          >
            +
          </button>
        </div>

        <button
          disabled={contador === 0}
          onClick={handleAgregar}
          className="flex-1 rounded-xl bg-slate-900 py-2 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-300"
        >
          Agregar
        </button>
      </div>
    </article>
  );
}
