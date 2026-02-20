import { Link } from "react-router-dom";
import type { PedidoItem } from "../../types/Pedido";

interface Props {
  pedido: PedidoItem;
}

export default function InfoPedido({ pedido }: Props) {
  return (
    <Link to={`/detalle/pedido/${pedido.id}`}>
      <article className="flex h-full flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900">Pedido #{pedido.id}</h2>
          <span className="rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold text-sky-700">{pedido.estado}</span>
        </div>

        <div className="mt-4 space-y-1 text-sm text-slate-600">
          <p className="font-semibold text-emerald-600">Total: ${pedido.total}</p>
          <p>{pedido.mesero_id}</p>
        </div>

        <p className="mt-4 text-xs text-slate-500">
          {new Date(pedido.created_at).toLocaleString("es-MX", {
            dateStyle: "medium",
            timeStyle: "short",
          })}
        </p>
      </article>
    </Link>
  );
}
