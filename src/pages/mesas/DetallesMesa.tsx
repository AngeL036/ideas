import { useState } from "react";
import { useParams } from "react-router-dom"

export default function DetallesMesa(){
    const {id} = useParams();
    const [estado,setEstado] = useState("libre");
    const colorEstado =
    estado === "libre"
      ? "bg-green-100 text-green-700"
      : estado === "ocupado"
      ? "bg-red-100 text-red-700"
      : "bg-yellow-100 text-yellow-700";


    return(
        <div className="p-6 space-y-8">
            {/* Título */}
            <div>
                <h1 className="text-4xl font-bold text-gray-800">
                    Detalles mesa
                </h1>
                <p className="text-gray-500">Administracion de la mesa #{id}</p>
            </div>
            {/*Acciones */}
            <div className="flex gap-4">
                <button
                    disabled={estado=== "libre"} 
                    className="bg-red-600 text-white px-4 py-2 rounded-lg shadow hover:bg-red-700">
                    Cerrar cuenta
                </button>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700">
                    Nuevo pedido
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                 {/* Card principal */}
            <div className="bg-white p-6 rounded-xl shadow space-y-6 max-w-md">
                <h2 className="text-2xl font-semibold">
                    Mesa {id}
                </h2>
                {/* Estado actual */}
                <div className="flex items-center gap-3">
                    <span className="font-semibold">Estado actual:</span>
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${colorEstado}`}>
                        {estado}
                    </span>
                </div>
                 {/* Personas */}
                 <div>
                    <label className="block text-sm font-medium text-gray-600">
                        Numero de Personas
                    </label>
                    <input 
                        type="number"
                        placeholder="Ej: 4"
                        className="mt-1 w-full border rounded-lg p-2" />
                 </div>
                  {/* Selector de estado */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-600">
                        Cambiar estado
                    </label>
                    <select 
                        value={estado}
                        onChange={(e) => setEstado(e.target.value)}
                        className="mt-1 w-full border rounded-lg p-2"
                        >
                            <option value="libre">Libre</option>
                            <option value="ocupado">Ocupado</option>
                            <option value="reservado">Reservado</option>
                        </select>
                  </div>
            </div>
            {/* Columna derecha (Pedidos) */}

            <div className="bg-white p-6 rounded-xl shadow space-y-4 lg:col-span-2">
                <h2 className="text-2xl font-semibold border-b pb-2">
                    Productos pedidos
                </h2>
                {/*Lista */}
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium">
                        2 x Hamburguesa
                    </span>
                    <span className="font-semobold text-gray-700">
                        $240
                    </span>
                </div>
                 {/* Total */}
                 <div className="flex justify-between items-center pt-4 border-t">
                    <span className="text-lg font-bold">
                        Total
                    </span>
                    <span className="text-lg font-bold text-green-600"> 
                        $280
                    </span>
                 </div>
            </div>
            </div>
        </div>
    );
}