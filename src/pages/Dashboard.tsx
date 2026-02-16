import { Link } from "react-router-dom"

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      
      {/* Título */}
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Panel de Administración
      </h1>

      {/* Navegación */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

        <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition cursor-pointer">
          <h2 className="text-xl font-semibold mb-2">$1500</h2>
          <span className="text-gray-600 text-sm">Ventas del dia</span>
        </div>      
      </div>

      <section></section>
    </div>
  )
}
