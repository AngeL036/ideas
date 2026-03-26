import type { ItemCarrito } from "./indexPunto" 

interface Props {
    carrito: ItemCarrito[]
    onCambiarCantidad: (id: number, cantidad: number) => void
    onLimpiar: () => void
    onCobrar: () => {}
}

export default function CarritoVenta({ carrito, onCambiarCantidad, onLimpiar, onCobrar }: Props) {
    const total = carrito.reduce(
        (acc, item) => acc + item.producto.precio_venta * item.cantidad, 0
    )

    return (
        <div className="bg-white rounded-xl shadow-sm p-4 h-full flex flex-col">
            <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-gray-700">Venta actual</h2>
                {carrito.length > 0 && (
                    <button
                        onClick={onLimpiar}
                        className="text-xs text-red-400 hover:text-red-600 transition-colors"
                    >
                        Limpiar
                    </button>
                )}
            </div>

            {/* Lista del carrito */}
            <div className="flex-1 overflow-y-auto space-y-2">
                {carrito.length === 0 ? (
                    <p className="text-center text-gray-400 py-16 text-sm">
                        Sin productos aún
                    </p>
                ) : (
                    carrito.map((item) => (
                        <div key={item.producto.id} className="flex items-center gap-3 py-2 border-b border-gray-100">
                            <div className="flex-1">
                                <p className="text-sm font-medium text-gray-800">{item.producto.marca}</p>
                                <p className="text-xs text-gray-400">${item.producto.precio_venta} c/u</p>
                            </div>

                            {/* Controles de cantidad */}
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => onCambiarCantidad(item.producto.id, item.cantidad - 1)}
                                    className="w-6 h-6 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 text-sm font-bold transition-colors"
                                >−</button>
                                <span className="w-6 text-center text-sm font-medium">{item.cantidad}</span>
                                <button
                                    onClick={() => onCambiarCantidad(item.producto.id, item.cantidad + 1)}
                                    className="w-6 h-6 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 text-sm font-bold transition-colors"
                                >+</button>
                            </div>

                            <span className="text-sm font-semibold text-gray-800 w-16 text-right">
                                ${(item.producto.precio_venta * item.cantidad).toFixed(2)}
                            </span>
                        </div>
                    ))
                )}
            </div>

            {/* Total y cobro */}
            {carrito.length > 0 && (
                <div className="mt-4 border-t border-gray-200 pt-4 space-y-3">
                    <div className="flex justify-between text-lg font-bold text-gray-800">
                        <span>Total</span>
                        <span>${total.toFixed(2)}</span>
                    </div>
                    <button
                    onClick={() => onCobrar}
                     className="w-full py-4 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-xl transition-colors text-lg">
                        Cobrar ${total.toFixed(2)}
                    </button>
                </div>
            )}
        </div>
    )
}