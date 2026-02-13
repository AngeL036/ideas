import { Link } from "react-router-dom"
import type { PedidoItem } from "../../types/Pedido"

interface Props {
    pedido:PedidoItem
}

export default function InfoPedido({pedido}:Props){
    return(
        <Link to={`/detalle/pedido/${pedido.id}`}>
       
            <div className="bg-white rounded-xl shadow p-5 hover:shadow-lg transition flex flex-col justify-between ">
                <div className="flex justify-between items-center">
                    <h1 
                        className="font-semibold text-lg">
                            {pedido.usuario_id}
                    </h1>
                    <span
                        className="text-sm px-3 py-1 rounded-full bg-blue-100 text-blue-700"
                        >
                        {pedido.estado}
                    </span>
                </div>
                <div className="flex flex-col text-sm text-gray-700">
                    <span className="font-medium">Total: ${pedido.total}</span>
                    <span className="">{pedido.direccion_envio}</span>
                </div>
                <div className="text-xs text-gray-500">
                    <span>{new Date(pedido.create_at).toLocaleString("es-MX",{
                        dateStyle: "medium",
                        timeStyle:"short",
                    })}</span>
                    
                </div> 
            </div>
    
         </Link>

    )
}