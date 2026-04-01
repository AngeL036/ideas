import { useEffect, useState } from "react"
import type { ProductoResponse } from "../../types/Producto"
import BuscadorProductos from "./BuscadorProductos"
import CarritoVenta from "./CarritoVenta"
import {nuevaVenta, registrarPago} from "../../api/venta.api"
import { abrirCaja, getCajaActiva } from "../../api/caja.api"
import TicketModal from "../../components/puntoVenta/TicketModal"
import PagoModal from "../../components/puntoVenta/PagoModal"
import Swal from "sweetalert2"

export interface ItemCarrito {
    producto: ProductoResponse
    cantidad: number
}

export default function PuntoVenta() {
    const [carrito, setCarrito] = useState<ItemCarrito[]>([])
    const [loading, setLoading] = useState(false)
    const [cajaAbierta, setCajaAbierta] = useState<boolean | null>(null)
    const [montoInicial, setMontoInicial] = useState<string>("")
    const [cajaLoading, setCajaLoading] = useState(false)
    const [cajaError, setCajaError] = useState<string | null>(null)

    const [pagoModal, setPagoModal] = useState(false)

    const [ticketModal, setTicketModal] = useState<{visible: boolean; total: number; ventaId: number}>({
        visible: false,
        ventaId: 0,
        total:0
    })

    const totalCarrito = carrito.reduce(
                (acc, i) => acc + i.producto.precio_venta * i.cantidad,
                0
            )

    useEffect(() => {
        getCajaActiva()
            .then(caja => setCajaAbierta(!!caja))
            .catch(() => setCajaAbierta(false))
    },[])

    const handleAbrirCaja = async () => {
        const monto = parseFloat(montoInicial)
        if(isNaN(monto) || monto < 0){
            setCajaError("Ingrese un monto inicial válido")
            return
        }
        setCajaLoading(true)
        setCajaError(null)
        try{
            await abrirCaja(monto)
            setCajaAbierta(true)
        }catch {
            setCajaError("No se pudo abrir la caja. Intenta de nuevo.")
        } finally {
            setCajaLoading(false)
        }
    }

    const handleCobrar = () => {
        if(carrito.length === 0 ) return 
        setPagoModal(true)
    }

    const handleConfirmarPago = async (montoPago: number) => {
        setLoading(true)
        try{
            const { venta_id, total } = await nuevaVenta(
                carrito.map(i => ({producto_id: i.producto.id, cantidad: i.cantidad}))
            )

            await registrarPago(venta_id, {monto_pagado: montoPago, metodo: "efectivo"})

            
            limpiarCarrito()
            setPagoModal(false)
            setTicketModal({ visible: true, ventaId: venta_id, total })
        }catch (error) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Error al registrar la venta. Intenta de nuevo."
            })
            setPagoModal(false)
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

    if(!cajaAbierta === null){
        return (
            <div className="flex h-screen items-center justify-center text-gray-400">
                Cargando...
            </div>
        )
    }
    if(!cajaAbierta){
        return (
            <div className="flex h-screen items-center justify-center bg-gray-50">
                <div className="w-full max-w-sm rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
                    <h2 className="mb-1 text-lg font-medium text-gray-900">
                        No hay caja abierta
                    </h2>
                    <p className="mb-6 text-sm text-gray-500">
                        Ingrese el monto inicial en efectivo para comenzar a vender
                    </p>
                    <label className="mb-1 block text-sm text-gray-600">
                        Monto inicial
                    </label>
                    <div className="mb-4 flex overflow-hidden rounded-lg border border-gray-200">
                        <span className="flex items-center border-r border-gray-200 bg-gray-50 px-3 text-sm text-gray-500">
                            $
                        </span>
                        <input 
                            type="number"
                            min="0"
                            placeholder="0.00"
                            value={montoInicial}
                            onChange={ e => setMontoInicial(e.target.value)}
                            onKeyDown={e => e.key === "Enter" && handleAbrirCaja()}
                            className="flex-1 bg-transparent px-3 py-2 text-sm outline-none" 
                        />
                    </div>
                    {cajaError && (
                        <p className="mb-3 text-sm text-red-600">{cajaError}</p>
                    )}
                    <button
                           onClick={handleAbrirCaja}
                        disabled={cajaLoading}
                        className="w-full rounded-lg bg-gray-900 py-2 text-sm font-medium text-white hover:bg-gray-700 disable:opacity-50"
                    >
                        {cajaAbierta ? "Abriendo..." : "Abrir caja"}
                    </button>
                </div>
            </div>
        )
    }

    return (
        <>  
        <div className="flex h-screen gap-4 p-4 bg-gray-50">
            {/* Panel izquierdo — búsqueda */}
            <div className="flex-1 overflow-y-auto">
                <BuscadorProductos onAgregar={agregarAlCarrito} />
            </div>

            {/* Panel derecho — carrito */}
            <div className="w-96 flex-shrink-0">
                
                <CarritoVenta
                    carrito={carrito}
                    onCambiarCantidad={cambiarCantidad}
                    onLimpiar={limpiarCarrito}
                    onCobrar={handleCobrar}
                    loading={loading}
                />
            </div>
        </div>
        {pagoModal && (
            <PagoModal 
                total={totalCarrito}
                loading={loading}
                onConfirmar={handleConfirmarPago}
                onCancelar={() => setPagoModal(false)}
            />
        )}
        {ticketModal.visible && (
            <TicketModal
             ventaId={ticketModal.ventaId}
             total={ticketModal.total}
             onClose={() => setTicketModal({visible: false, ventaId:0, total:0})}
             />
        )}
    </>
    )
}