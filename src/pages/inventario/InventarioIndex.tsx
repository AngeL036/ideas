import {  Plus } from "lucide-react"
import { Link } from "react-router-dom";
export default function(){
    return (
        <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-800">Inventario</h1>
                <Link
                    to="/product/add"
                    className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700"
                >
                    <Plus  size={18}/>
                    Producto
                    
                </Link>

            </div>
            <div className="bg-white rounded-2xl shadow border border-gray-100 overflow-hidden">
                <div className="p-4 border-b">
                    <h2 className="text-lg font-semibold text-gray-700">Productos</h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full text-sm text-left">
                        <thead className="bg-gray-50 text-gray-600 uppercase text-xs tracking-wider">
                            <tr>
                                <th className="px-4 py-3">Nombre del producto</th>
                                <th className="px-4 py-3">Categoria</th>
                                <th className="px-4 py-3">Unidad</th>
                                <th className="px-4 py-3">Cantidad</th>
                                <th className="px-4 py-3">Precio Compra</th>
                                <th className="px-4 py-3">Precio Venta</th>
                                <th className="px-4 py-3">Ganancia por Unida</th>
                                <th className="px-4 py-3">Valor en Inventario</th>
                                <th className="px-4 py-3">Estado de Stokck</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {/* Ejemplo */}
                            <tr className="hover:bg-gray-50 transition">
                                <td className="px-4 py-3 font-medium text-gray-800">
                                    Coca-Cola 600ml
                                </td>
                                <td className="px-4 py-3 text-gray-600">Bebidas</td>
                                <td className="px-4 py-3 text-gray-600">Pieza</td>
                                <td className="px-4 py-3">
                                    <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-700">
                                        120
                                    </span>
                                </td>
                                <td className="px-4 py-3">$10</td>
                                <td className="px-4 py-3">$15</td>
                                <td className="px-4 py-3 text-green-600 font-semibold">
                                    $5
                                </td>
                                <td className="px-4 py-3 font-semibold">
                                    $1800
                                </td>
                            </tr>
                        </tbody>
                </table>
                </div>
                
            </div>

        </div>
    )
}