import type { ProductoResponse } from "../../types/Producto"

interface Props {
    producto:ProductoResponse
}
export default function TablaProductos({producto}: Props){
    return(
        <tr className="hover:bg-gray-50 transition">
            <td className="px-4 py-3 font-medium text-gray-800">
                {producto.marca}
            </td>
            <td className="px-4 py-3 text-gray-600">{producto.categoria_id}</td>
            <td className="px-4 py-3 text-gray-600">{producto.unidad}</td>
            <td className="px-4 py-3">
                <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-700">
                    {producto.cantidad_actual}
                </span>
            </td>
            <td className="px-4 py-3">${producto.precio_compra}</td>
            <td className="px-4 py-3">${producto.precio_venta}</td>
            <td className="px-4 py-3 text-green-600 font-semibold">
                ${producto.precio_venta - producto.precio_compra}
            </td>
            <td className="px-4 py-3 font-semibold">
                ${producto.cantidad_actual * producto.precio_compra}
            </td>
            <td className="px-4 py-3 font-semibold">
                {producto.estado_stock}
            </td>
        </tr>
    )
}