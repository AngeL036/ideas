import {  Plus } from "lucide-react"
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { ProductoResponse } from "../../types/Producto";
import { obtenerProductos } from "../../api/inventario.api";
import TablaProductos from "../../components/productos/tablaProductos";
export default function(){
    const [prodcutos, setProductos] = useState<ProductoResponse[]>([]);
    const [loading, setLoading] = useState(true)
    useEffect( () => {
        const cargarProductos  = async () => {
            try{
                const  data =  await obtenerProductos();
                setProductos(data)
            }catch(error) {
                console.error("Error al cargar los productos", error)
            }finally{
                setLoading(false)
            }
        }
        cargarProductos()
    },[])

    if (loading) {
        return (
        <div className="flex h-60 items-center justify-center">
            <p className="animate-pulse text-lg text-slate-400">Cargando productos...</p>
        </div>
        );
    }

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
                                <th className="px-4 py-3">Marca del producto</th>
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
                            {
                                prodcutos.map((producto) => (
                                    <TablaProductos 
                                        key={producto.id}
                                        producto={producto}
                                    />
                                ))
                            }
                        </tbody>
                </table>
                </div>
                
            </div>

        </div>
    )
}