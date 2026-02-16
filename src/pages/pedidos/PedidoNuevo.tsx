import { obtenerPlatos } from "../../api/platillo.api";
import { useEffect, useState } from "react";
import type { PlatilloPayload } from "../../types/Platillo";
import PedidoCard from "../../components/pedidos/PedidoCard";

export default function PedidoNuevo() {
  const [comidas, setComidas] = useState<PlatilloPayload[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    cargarComidas();
  }, []);

  const cargarComidas = async () => {
    try {
      const data = await obtenerPlatos();
      setComidas(data);
    } catch (error) {
      console.log("Error al cargar la comida", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-60 items-center justify-center">
        <p className="text-lg text-slate-500 animate-pulse">Cargando platillos...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <header className="rounded-2xl border border-slate-200 bg-white/80 p-6 shadow-sm backdrop-blur md:p-8">
        <h1 className="text-3xl font-black tracking-tight text-slate-900">Nuevo pedido</h1>
        <p className="mt-1 text-sm text-slate-600">Selecciona productos para armar una orden y enviarla al carrito.</p>
      </header>

      {comidas.length === 0 ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">
          <p className="text-lg text-slate-500">No hay platillos registrados.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {comidas.map((comida) => (
            <PedidoCard key={comida.id} comida={comida} />
          ))}
        </div>
      )}
    </div>
  );
}
