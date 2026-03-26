import { useState } from "react"
import type { ProductoResponse } from "../../types/Producto"
import BuscadorProductos from "./BuscadorProductos"
import CarritoVenta from "./CarritoVenta"
import {nuevaVenta} from "../../api/venta.api"

export interface ItemCarrito {
    producto: ProductoResponse
    cantidad: number
}

export default function PuntoVenta() {
    const [carrito, setCarrito] = useState<ItemCarrito[]>([])
    const [loading, setLoading] = useState(false)
    const [errorMsg, setErrorMsg] = useState<string | null > (null)
    const handleSubmit = async () => {
        if (carrito.length === 0 || loading) return
        setLoading(true)
        setErrorMsg(null)
        try{
            await nuevaVenta({
                items: carrito.map(i => ({
                    producto_id: i.producto.id,
                    cantidad: i.cantidad,
                })),
            })
            limpiarCarrito()
        }catch (error) {
            setErrorMsg("Error al registrar la venta. Intenta de nuevo")
            console.error(error)
        }finally {
            setLoading(false)
        }
    }

    const agregarAlCarrito = (producto: ProductoResponse) => {
        setCarrito(prev => {
            const existe = prev.find(i => i.producto.id === producto.id)
            if (existe) {
                //Si ya está, solo sube la cantidad
                return prev.map(i =>
                    i.producto.id === producto.id
                        ? { ...i, cantidad: i.cantidad + 1 }
                        : i
                )
            }
            return [...prev, { producto, cantidad: 1 }]
        })
    }

    const cambiarCantidad = (id: number, cantidad: number) => {
        if (cantidad <= 0) {
            setCarrito(prev => prev.filter(i => i.producto.id !== id))
        } else {
            setCarrito(prev =>
                prev.map(i => i.producto.id === id ? { ...i, cantidad } : i)
            )
        }
    }

    const limpiarCarrito = () => setCarrito([])

    return (
        <div className="flex h-screen gap-4 p-4 bg-gray-50">
            {/* Panel izquierdo — búsqueda */}
            <div className="flex-1 overflow-y-auto">
                <BuscadorProductos onAgregar={agregarAlCarrito} />
            </div>

            {/* Panel derecho — carrito */}
            <div className="w-96 flex-shrink-0">
                {errorMsg && (
                    <div className="mb-2 rounded bg-red-100 px-3 py-2 text-sm text-red-700">
                        {errorMsg}
                    </div>
                )}
                <CarritoVenta
                    carrito={carrito}
                    onCambiarCantidad={cambiarCantidad}
                    onLimpiar={limpiarCarrito}
                    onCobrar={handleSubmit}
                    loading={loading}
                />
            </div>
        </div>
    )
}