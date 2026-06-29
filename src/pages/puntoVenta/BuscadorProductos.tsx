import { useEffect, useState } from "react"
import { obtenerProductos } from "../../api/inventario.api"
import type { ProductoResponse } from "../../types/Producto"
import SkeletonFila from "../../components/productos/Skeleton"

interface Props {
    onAgregar: (producto: ProductoResponse) => void
}

export default function BuscadorProductos({ onAgregar }: Props) {
    const [productos, setProductos] = useState<ProductoResponse[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [busqueda, setBusqueda] = useState("")

    useEffect(() => {
        const cargarDatos = async () => {
            try {
                const data = await obtenerProductos()
                setProductos(data)
            } catch (error) {
                console.error(error)
                setError("No se pudieron cargar los productos.")
            } finally {
                setLoading(false)
            }
        }
        cargarDatos()
    }, [])

    const productosFiltrados = busqueda.trim() === ""
        ? []   // ✅ Sin búsqueda → lista vacía (no muestra nada)
        : productos.filter((p) => {
            const query = busqueda.toLowerCase()
            return (
                p.marca.toLowerCase().includes(query) ||
                p.categoria_id?.toString().includes(query) ||
                p.codigo?.toString().includes(query)
            )
        })

    return (
        <div className="bg-white rounded-xl shadow-sm p-4 space-y-4">
            <h2 className="font-semibold text-gray-700">Buscar producto</h2>

            {/* Input */}
            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden shadow-sm">
                <span className="px-3 text-gray-400">🔍</span>
                <input
                    type="text"
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                    placeholder="Buscar por nombre o categoría..."
                    className="flex-1 px-4 py-3 outline-none text-sm"
                    autoFocus
                />
                {busqueda && (
                    <button
                        onClick={() => setBusqueda("")}
                        className="px-3 py-3 text-gray-400 hover:text-gray-600 transition-colors"
                    >✕</button>
                )}
            </div>

            {/* Error */}
            {error && <p className="text-center text-red-400 py-4">{error}</p>}

            {/* Skeletons */}
            {loading && (
                <ul className="divide-y divide-gray-100">
                    {Array.from({ length: 5 }).map((_, i) => <SkeletonFila key={i} />)}
                </ul>
            )}

            {/* Indicación inicial — sin escribir nada */}
            {!loading && !error && busqueda.trim() === "" && (
                <p className="text-center text-gray-400 py-8 text-sm">
                    
                </p>
            )}

            {/* Sin resultados */}
            {!loading && !error && busqueda.trim() !== "" && productosFiltrados.length === 0 && (
                <p className="text-center text-gray-400 py-8 text-sm">
                    Sin resultados para "{busqueda}"
                </p>
            )}

            {/* Lista de resultados */}
            {!loading && !error && productosFiltrados.length > 0 && (
                <ul className="divide-y divide-gray-100">
                    {productosFiltrados.map((producto) => (
                        <li
                            key={producto.id}
                            onClick={() => onAgregar(producto)}  // ✅ Click agrega al carrito
                            className="flex items-center justify-between py-3 px-2 hover:bg-green-50 rounded cursor-pointer transition-colors"
                        >
                            <div>
                                <p className="font-medium text-gray-800">{producto.marca}</p>
                                <p className="text-xs text-gray-400">
                                    {producto.codigo} · Stock: {producto.cantidad_actual}
                                </p>
                            </div>
                            <div className="text-right">
                                <p className="text-sm font-semibold text-green-600">
                                    ${producto.precio_venta}
                                </p>
                                <p className="text-xs text-gray-400">+ agregar</p>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}