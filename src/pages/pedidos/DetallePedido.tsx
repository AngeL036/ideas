import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { Detalle, PedidoItem } from "../../types/Pedido";
import { ObtenerDetalleId, ObtenerPedidoId } from "../../api/pedido.api";
import DetallePedidoCard from "../../components/pedidos/DetallePedidoCard";
import type { DetalleUser } from "../../types/User";
import { ObtenerUser } from "../../api/User.api";

export default function DetallePedido() {
  const { id } = useParams();
  const [pedido, setPedido] = useState<PedidoItem | null>(null);
  const [detalles, setDetalles] = useState<Detalle[]>([]);
  const [user, setUser] = useState<DetalleUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const pedidoId = Number(id);
    if (isNaN(pedidoId)) return;

    const cargarTodo = async () => {
      try {
        const pedidoData = await ObtenerPedidoId(pedidoId);
        setPedido(pedidoData);

        const [detallesData, userData] = await Promise.all([
          ObtenerDetalleId(pedidoId),
          ObtenerUser(pedidoData.mesero_id),
        ]);

        setDetalles(detallesData);
        setUser(userData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    cargarTodo();
  }, [id]);

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <span className="text-slate-500 animate-pulse">Cargando pedido...</span>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      <div className="space-y-4 lg:col-span-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h1 className="text-2xl font-black tracking-tight text-slate-900">Pedido #{pedido?.id}</h1>
          <p className="mt-1 text-sm text-slate-500">
            Estado actual: <span className="font-semibold text-sky-700">{pedido?.estado}</span>
          </p>
        </div>

        {detalles.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-6 text-slate-500 shadow-sm">
            No hay detalles para este pedido.
          </div>
        ) : (
          detalles.map((detalle) => <DetallePedidoCard key={detalle.id} detalle={detalle} />)
        )}
      </div>

      <aside className="h-fit space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div>
          <h2 className="text-xs font-semibold uppercase tracking-wide text-slate-500">Cliente</h2>
          <p className="mt-1 font-medium text-slate-800">{user?.email}</p>
        </div>

        <div>
          <h2 className="text-xs font-semibold uppercase tracking-wide text-slate-500">Estado del pedido</h2>
          <span className="mt-2 inline-block rounded-full bg-sky-100 px-3 py-1 text-sm font-semibold text-sky-700">{pedido?.estado}</span>
        </div>

        <div className="border-t border-slate-200 pt-4">
          <h2 className="text-xs font-semibold uppercase tracking-wide text-slate-500">Total a pagar</h2>
          <p className="mt-2 text-3xl font-black text-emerald-600">${pedido?.total.toFixed(2)}</p>
        </div>
      </aside>
    </div>
  );
}
