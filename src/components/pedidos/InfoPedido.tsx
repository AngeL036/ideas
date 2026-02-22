import { useNavigate } from "react-router-dom";
import type { PedidoItem } from "../../types/Pedido";
import { ActualizarEstadoPedido } from "../../api/pedido.api";
import { useState } from "react";

interface Props {
  pedido: PedidoItem;
  onStatusChange?: () => void;
}

const ESTADOS = [
  { valor: "abierto", label: "Abierto", color: "bg-blue-100 text-blue-700" },
  { valor: "pendiente", label: "Pendiente", color: "bg-yellow-100 text-yellow-700" },
  { valor: "en_preparacion", label: "En Preparación", color: "bg-purple-100 text-purple-700" },
  { valor: "listo", label: "Listo", color: "bg-green-100 text-green-700" },
  { valor: "servido", label: "Servido", color: "bg-emerald-100 text-emerald-700" },
  { valor: "cerrado", label: "Cerrado", color: "bg-gray-100 text-gray-700" },
  { valor: "cancelado", label: "Cancelado", color: "bg-red-100 text-red-700" }
];

export default function InfoPedido({ pedido, onStatusChange }: Props) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const estadoActual = ESTADOS.find(e => e.valor === pedido.estado);
  const estadosDisponibles = ESTADOS.filter(e => e.valor !== pedido.estado);

  const handleCambiarEstado = async (nuevoEstado: string) => {
    setLoading(true);
    setError(null);
    try {
      await ActualizarEstadoPedido(pedido.id, nuevoEstado);
      onStatusChange?.();
    } catch (err: any) {
      setError(err.response?.data?.detail || "Error al actualizar estado");
    } finally {
      setLoading(false);
    }
  }

  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-slate-900">Pedido #{pedido.id}</h2>
        {estadoActual && (
          <span className={`rounded-full px-3 py-1 text-xs font-semibold ${estadoActual.color}`}>
            {estadoActual.label}
          </span>
        )}
      </div>

      <div className="mt-4 space-y-1 text-sm text-slate-600">
        <p className="font-semibold text-emerald-600">Total: ${pedido.total}</p>
        <p>Mesero ID: {pedido.mesero_id || "N/A"}</p>
      </div>

      <p className="mt-3 text-xs text-slate-500">
        {new Date(pedido.created_at).toLocaleString("es-MX", {
          dateStyle: "medium",
          timeStyle: "short",
        })}
      </p>

      {error && (
        <div className="mt-3 rounded bg-red-50 p-2 text-xs text-red-600">
          {error}
        </div>
      )}

      <div className="mt-4 space-y-2">
        <button
          onClick={() => navigate(`/detalle/pedido/${pedido.id}`)}
          className="w-full rounded-lg bg-slate-100 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-200 transition"
        >
          Ver Detalles
        </button>

        <div className="relative group">
          <button
            disabled={loading}
            className="w-full rounded-lg bg-slate-900 px-3 py-2 text-sm font-medium text-white hover:bg-slate-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Actualizando..." : "Cambiar Estado"}
          </button>

          {/* Dropdown desplegable */}
          {estadosDisponibles.length > 0 && (
            <div className="absolute right-0 mt-2 w-48 rounded-lg border border-slate-200 bg-white shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              {estadosDisponibles.map(estado => (
                <button
                  key={estado.valor}
                  onClick={() => handleCambiarEstado(estado.valor)}
                  disabled={loading}
                  className={`w-full px-4 py-2 text-left text-sm hover:bg-slate-50 first:rounded-t-lg last:rounded-b-lg border-b border-slate-100 last:border-b-0 ${
                    loading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ${estado.color}`}>
                    {estado.label}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
