import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import InfoPedido from "../../components/pedidos/infoPedido";

import type { PedidoItem } from "../../types/Pedido"
import { ObtenerPedidos } from "../../api/pedido.api";


export default function IndexPedidos(){
    const [pedidos, setPedidos] =useState<PedidoItem[]>([]);
    const [loading,setLoading] = useState(true);
    useEffect(()=>{
        CargarPedidos()
    },[])
    const CargarPedidos = async () => {
        try{
            const data = await ObtenerPedidos();
            setPedidos(data)
            console.log(data)
        }catch(error) {
            console.error("error al cargar los pedidos",error)
        }finally{
            setLoading(false);
        }
        
    }


    return(
        <div className="p-6 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">Panel de Pedidos</h1>
                <Link 
                to="/pedido/nuevo"
                className="inline-flex items-center justify-center
                bg-green-600 hover:bg-green-700
                text-white font-semibold
                px-5 py-2.5 rounded-lg
                shadow transition"
                >
                    ➕ Nuevo Pedido
                </Link>
            </div>
            {/*Contenido */}
            {pedidos.length === 0 ? (
                <div className="bg-white rounded-xl shadow p-10 text-center">
                    <p className="text-gray-500 text-lg">No hay Pedidos registrados</p>
                </div>
            ) :(
                
                    <div className="grid gap-6
                                grid-cols-1
                                sm:grid-cols-2
                                lg:grid-cols-3">
                        {pedidos.map((pedido) => (
                        <InfoPedido 
                        key={pedido.id}
                        pedido={pedido} />
                         ))}
                </div>
                
            )}
        </div>
    )
}