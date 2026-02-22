import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import InfoPedido from "../../components/pedidos/InfoPedido";
import type { PedidoItem } from "../../types/Pedido";
import { ObtenerPedidos } from "../../api/pedido.api";

export default function IndexPedidos() {
  const [pedidos, setPedidos] = useState<PedidoItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    CargarPedidos();
  }, [refresh]);

  const CargarPedidos = async () => {
    try {
      const data = await ObtenerPedidos();
      setPedidos(data);
    } catch (error) {
      console.error("error al cargar los pedidos", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = () => {
    setRefresh(prev => prev + 1);
  }

  if (loading) {
    return (
      <div className="flex h-60 items-center justify-center">
        <p className="text-lg text-slate-500 animate-pulse">Cargando pedidos...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <header className="rounded-2xl border border-slate-200 bg-white/80 p-6 shadow-sm backdrop-blur md:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-black tracking-tight text-slate-900">Panel de Pedidos</h1>
            <p className="mt-1 text-sm text-slate-600">Seguimiento en tiempo real de ordenes del restaurante.</p>
          </div>
          <Link
            to="/pedido/nuevo"
            className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700"
          >
            Nuevo pedido
          </Link>
        </div>
      </header>

      {pedidos.length === 0 ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">
          <p className="text-lg text-slate-500">No hay pedidos registrados.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {pedidos.map((pedido) => (
            <InfoPedido 
              key={pedido.id} 
              pedido={pedido} 
              onStatusChange={handleStatusChange}
            />
          ))}
        </div>
      )}
    </div>
  );
}
