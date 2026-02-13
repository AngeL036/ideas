import { useState,useEffect } from "react";
import Swal from "sweetalert2";
import type { PedidoCreatePayload } from "../../types/Pedido";
import { CrearPedido } from "../../api/pedido.api";

interface CarritoItem {
    id:number;
    nombre:string;
    precio:number;
    cantidad:number
}

export default function Carrito(){
    const [carrito, setCarrito] = useState<CarritoItem[]>([])
    const user_id = 1
    
    const confirmarPedido = async () => {
        
        try{
             console.log(CrearPedido)
                const payload:PedidoCreatePayload = {
            items: carrito.map((item:CarritoItem) => ({
                platillo_id: item.id,
                nombre: item.nombre,
                precio:item.precio,
                cantidad:item.cantidad,
            })),
            total,
            user_id,
        };
         const response = await CrearPedido(payload)
         console.log(response.message)
        }catch(error) {
        console.error("Error al hacer el pedido",error)
    }
    
       
    }

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("carrito") || "[]");
        setCarrito(data);
    },[])

    const actualizarCarrito = (items:CarritoItem[]) => {
        setCarrito(items);
        localStorage.setItem("carrito",JSON.stringify(items))
    };
     
    const incrementar = (id:number) => {
        const nuevo = carrito.map(item => 
            item.id === id 
            ? {...item,cantidad: item.cantidad + 1}
            : item
        );
        actualizarCarrito(nuevo)
    };

    const decrementar = (id:number) => {
        const nuevo = carrito.map(item => item.id === id
            ? {...item, cantidad:item.cantidad - 1}
            : item
        )
        .filter(item => item.cantidad > 0);

        actualizarCarrito(nuevo)
    };

    const EliminarItem = (id:number) => {
        Swal.fire({
            title:"¿Eliminar comida?",
            icon:"warning",
            showCancelButton:true,
            confirmButtonText: "Si, Eliminar",

        }).then(res  => {
            if(res.isConfirmed) {
                actualizarCarrito(carrito.filter(item => item.id !== id))
            }
        });
    };

    const vaciarCarrito = () => {
        Swal.fire({
            title: "Vaciar carrito",
            text:"Se eliminaran todos los productos",
            icon:"warning",
            showCancelButton:true,
            confirmButtonText: "Vaciar",
        }).then(res => {
            if(res.isConfirmed){
                actualizarCarrito([])
            }
        });
    };
    const total = carrito.reduce(
        (acc, item) => acc + item.precio * item.cantidad,
        0
    );

    if(carrito.length === 0) {
        return(
            <div className="p-10 text-center text-gray-500">
                🛒 Tu carrito está vacío
            </div>
        )
    }

    return(
        <div className="max-w-3xl mx-auto p-6 space-y-6">
            <h1 className="text-2xl font-bold">Carrito</h1>
            {/*Lista */}
            <div className="space-y-4">
                {carrito.map(item => (
                    <div
                        key={item.id}
                        className="bg-white rounded-xl shadow p-4 flex justify-between items-center"
                    >
                            <div>
                                <h2 className="font-semibold">{item.nombre}</h2>
                                <p className="text-sm text-gray-500">
                                    ${item.precio} c/u
                                </p>
                            </div>

                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => decrementar(item.id)}
                                    className="w-8 h-8 rounded-full bg-gray-200"
                                >
                                    -
                                </button>

                                <span className="font-semibold">{item.cantidad}</span>
                                
                                <button
                                    onClick={() => incrementar(item.id)}
                                    className="w-8 h-8 rounded-full bg-gray-200"
                                 >
                                    +
                                </button>

                                <button
                                    onClick={() => EliminarItem(item.id)}
                                    className="text-red-500 text-sm hover:underline"
                                >
                                    Eliminar
                                </button>
                            </div>
                        </div>
                ))}
            </div>
             {/* Total */}
             <div className="bg-white rounded-xl shadow p-4 flex justify-between items-center">
                <span className="text-lg font-bold text-gray-600">Total</span>
                <span className="text-xl font-bold text-green-600">
                    ${total}
                </span>
             </div>

               {/* Acciones */}
               <div className="flex gap-3">
                <button
                    onClick={vaciarCarrito}
                    className="flex-1 bg-red-500 text-white py-2 rounded-xl hover:bg-red-600"
                >
                    Vaciar carrito
                </button>
                <button 
                onClick={confirmarPedido}
                    className="flex-1 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600"
                >
                    Confirmar pedido
                </button>
               </div>
        </div>
    )
}