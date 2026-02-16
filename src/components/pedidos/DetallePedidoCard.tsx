import type { Detalle } from "../../types/Pedido";

interface Props {
  detalle: Detalle;
}

export default function DetallePedidoCard({ detalle }: Props) {
  return (
    <article className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md">
      <div className="flex items-center justify-between border-b border-slate-200 pb-3">
        <div>
          <p className="text-xs text-slate-500">Pedido</p>
          <span className="font-semibold text-slate-800">#{detalle.pedido_id}</span>
        </div>
        <span className="rounded-full bg-sky-100 px-3 py-1 text-sm font-semibold text-sky-700">Platillo #{detalle.platillo_id}</span>
      </div>

      <div className="grid grid-cols-2 gap-4 text-sm text-slate-700">
        <div className="flex flex-col">
          <span className="text-slate-500">Cantidad</span>
          <span className="font-medium">{detalle.cantidad}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-slate-500">Precio unitario</span>
          <span className="font-medium">${detalle.precio_unitario.toFixed(2)}</span>
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-slate-200 pt-3">
        <span className="text-sm text-slate-500">Subtotal</span>
        <span className="text-lg font-black text-emerald-600">${detalle.subtotal.toFixed(2)}</span>
      </div>
    </article>
  );
}
