import type { Detalle } from "../../types/Pedido"

interface Props {
    detalle:Detalle
}

export default function DetallePedidoCard({detalle}:Props) {
    return(
        <div className="bg-white  rounded-2xl shadow-mb p-6 hover:shadow-lg transition space-y-4" >
            <div className="flex justify-between items-center border-b pb-3">
                <div>
                    <p className="text-xs text-gray-500">Pedido</p>
                    <span className="font-semibold text-gray-800">#{detalle.pedido_id}</span>
                </div>
                <span className="text-sm px-3 py-1 rounded-full bg-indigo-100  text-indigo-700 font-medium">
                    Platillo #{detalle.platillo_id}
                </span>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
                <div className="flex flex-col">
                    <span className="text-gray-500">Cantidad</span>
                    <span className="font-medium">{detalle.cantidad}</span>
                </div>
                <div className="flex flex-col">
                    <span className="text-gray-500">Precio unitario</span>
                    <span className="font-medium">
                        ${detalle.precio_unitario.toFixed(2)}
                    </span>
                </div>
            </div>
            <div className="flex justify-between items-center pt-3 border-t">
                <span className="text-gray-500 text-sm">Subtotal</span>
                <span className="text-lg font-bold text-green-600">
                    ${detalle.subtotal.toFixed(2)}
                </span>
            </div>
        </div>
    )
}