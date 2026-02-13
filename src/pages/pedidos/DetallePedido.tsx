import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import type { Detalle, PedidoItem } from "../../types/Pedido"
import { ObtenerDetalleId, ObtenerPedidoId } from "../../api/pedido.api"
import DetallePedidoCard from "../../components/pedidos/DetallePedidoCard"
import { DetalleUser } from "../../types/User"
import { ObtenerUser } from "../../api/User.api"

export default function DetallePedido() {
  const { id } = useParams()
  const [pedido, setPedido] = useState<PedidoItem | null>(null)
  const [detalles, setDetalles] = useState<Detalle[]>([])
  const [user, setUser] = useState<DetalleUser | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id) return

    const pedidoId = Number(id)
    if (isNaN(pedidoId)) return

    const cargarTodo = async () => {
      try {
        const pedido = await ObtenerPedidoId(pedidoId)
        setPedido(pedido)

        const [detalles, user] = await Promise.all([
          ObtenerDetalleId(pedidoId),
          ObtenerUser(pedido.usuario_id),
        ])

        setDetalles(detalles)
        setUser(user)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    cargarTodo()
  }, [id])

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <span className="text-gray-500 animate-pulse">
          Cargando pedido...
        </span>
      </div>
    )

  return (
    <div className="max-w-7xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
      
      {/* 🧾 Detalles del pedido */}
      <div className="lg:col-span-2 space-y-4">
        <div className="bg-white rounded-2xl shadow p-6">
          <h1 className="text-2xl font-bold text-gray-800">
            Pedido #{pedido?.id}
          </h1>
          <p className="text-sm text-gray-500">
            Estado actual:{" "}
            <span className="font-medium text-indigo-600">
              {pedido?.estado}
            </span>
          </p>
        </div>

        {detalles.length === 0 ? (
          <div className="bg-white p-6 rounded-xl shadow text-gray-500">
            No hay detalles para este pedido
          </div>
        ) : (
          detalles.map(detalle => (
            <DetallePedidoCard
              key={detalle.id}
              detalle={detalle}
            />
          ))
        )}
      </div>

      {/* 👤 Sidebar */}
      <div className="bg-white rounded-2xl shadow p-6 space-y-6 h-fit">
        
        {/* Cliente */}
        <div>
          <h2 className="text-sm font-semibold text-gray-500 uppercase">
            Cliente
          </h2>
          <p className="mt-1 font-medium text-gray-800">
            {user?.email}
          </p>
        </div>

        {/* Estado */}
        <div>
          <h2 className="text-sm font-semibold text-gray-500 uppercase">
            Estado del pedido
          </h2>
          <span className="inline-block mt-2 px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-700">
            {pedido?.estado}
          </span>
        </div>

        {/* Total */}
        <div className="border-t pt-4">
          <h2 className="text-sm font-semibold text-gray-500 uppercase">
            Total a pagar
          </h2>
          <p className="mt-2 text-2xl font-bold text-green-600">
            ${pedido?.total.toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  )
}
