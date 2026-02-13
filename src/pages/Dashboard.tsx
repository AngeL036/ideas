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

        <Link
          to="/pedidos"
          className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition cursor-pointer"
        >
          <h2 className="text-xl font-semibold mb-2">📦 Pedidos</h2>
          <p className="text-gray-600 text-sm">
            Ver y gestionar pedidos en tiempo real
          </p>
        </Link>

        <Link
          to="/comida"
          className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition cursor-pointer"
        >
          <h2 className="text-xl font-semibold mb-2">🍽️ Comidas</h2>
          <p className="text-gray-600 text-sm">
            Administrar platillos y precios
          </p>
        </Link>

        <Link
          to="/ventas"
          className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition cursor-pointer"
        >
          <h2 className="text-xl font-semibold mb-2">💰 Ventas</h2>
          <p className="text-gray-600 text-sm">
            Reportes diarios y mensuales
          </p>
        </Link>

        <Link
          to="/estadisticas"
          className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition cursor-pointer"
        >
          <h2 className="text-xl font-semibold mb-2">📊 Estadísticas</h2>
          <p className="text-gray-600 text-sm">
            Análisis de rendimiento
          </p>
        </Link>

      </div>
    </div>
  )
}
