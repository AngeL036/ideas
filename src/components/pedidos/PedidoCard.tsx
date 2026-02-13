import { useState } from "react";
import type { PlatilloPayload } from "../../types/Platillo";
import Swal from "sweetalert2";

interface Props {
  comida: PlatilloPayload;
  
}

export default function PedidoCard({comida}:Props){
    const [contador, setContador] = useState(1);

    const AgregarAlCarrito = () =>  {
        const carrito = JSON.parse(localStorage.getItem("carrito") || "[]");

        const existe = carrito.find((item: any) => item.id === comida.id)

        if(existe){
            existe.cantidad += contador;
        }else{
            carrito.push({
                id:comida.id,
                nombre: comida.nombre,
                precio: comida.precio,
                cantidad: contador,
            });
        }

        localStorage.setItem("carrito", JSON.stringify(carrito));
        Swal.fire({
            icon:"success",
            title: "Agregado",
            text:`${contador} ${comida.nombre}(s) añadidos al pedido`,
            timer:1500,
            showConfirmButton:false, 
        });
        
        setContador(1)

    }

    return(
        <div className="bg-white rounded-xl shadow p-5
                        hover:shadow-lg transition
                        flex flex-col justify-between"
        >
                            {/* Info */}
            <div>
                <h2 className="text-lg font-semibold text-gray-800">
                    {comida.nombre}
                </h2>
                <p className="text-sm text-gray-600 mt-1 line-clamp-3">
                    {comida.descripcion}
                </p>
            </div>

                                {/* Precio y stock */}
            <div className="mt-4 flex items-center justify-between">
                <span className="text-xl font-bold text-green-600">
                    ${comida.precio}
                </span>

                <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">
                    Stok:{comida.cantidad}
                </span>
            </div>

                                {/* Contador + Agregar */}
            <div className="mt-5 flex gap-3 items-center">

                                {/*Contador */}
                <div className="flex items-center gap-2 border rounded-lg px-3 py-1">
                    <button 
                        className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300"
                        onClick={() => setContador(Math.max(0, contador -1))}
                        >
                     -
                    </button>

                    <span className="w-6 text-center font-semibold">
                        {contador}
                    </span>

                    <button 
                        className="w-8 h-8 flex items-center justify-center
                                    rounded-full bg-gray-200 hover:bg-gray-300"
                        onClick={() => setContador(contador +1)}
                        >
                     +
                    </button>
                </div>
                            {/* Botón Agregar */}

                <button
                    disabled={contador === 0}
                    onClick={AgregarAlCarrito}
                    className="flex-1 bg-green-600 text-white
                                py-2 rounded-lg hover:bg-green-700 transition
                                disable:bg-gray-300 disable:cursor-not-allowed">
                Agregar
               </button>
            </div>
        </div>
    )
}
 