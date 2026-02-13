import Platillo from "../../components/platillo";
import type { PlatilloPayload } from "../../types/Platillo";
import { obtenerPlatos,eliminarPlato } from "../../api/platillo.api";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";


export default function ListaComida() {
  const [platillos, setPlatillos] = useState<PlatilloPayload[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    cargarPlatillos();
  }, []);

  const cargarPlatillos = async () => {
    try {
      const data = await obtenerPlatos();
      setPlatillos(data);
    } catch (error) {
      console.error("Error al cargar platillos", error);
    } finally {
      setLoading(false);
    }
  };
  const handleToggleaActivo = (id:number, activo:boolean) => {
    setPlatillos(prev => 
      prev.map(plato => 
        plato.id === id ? {...plato, activo} : plato
      )
    );
    //llamar a la api
    // await actualizarActivo(id, activo)
  };

  const handleDelete = async (id: number) => {
    const result = await Swal.fire({
      title: "¿Eliminar comida?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (!result.isConfirmed) return;

    try {
      await eliminarPlato(id);
      setPlatillos((prev) =>
        prev.filter((plato) => plato.id !== id)
      );
      Swal.fire("Eliminado", "Platillo eliminado", "success");
    } catch {
      Swal.fire("Error", "No se pudo eliminar", "error");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-60">
        <p className="text-gray-500 animate-pulse text-lg">
          Cargando platillos...
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
          🍽️ Menú
        </h1>

        <Link
          to="/comida/nueva"
          className="inline-flex items-center justify-center
                     bg-green-600 hover:bg-green-700
                     text-white font-semibold
                     px-5 py-2.5 rounded-lg
                     shadow transition"
        >
          ➕ Agregar comida
        </Link>
      </div>

      {/* CONTENIDO */}
      {platillos.length === 0 ? (
        <div className="bg-white rounded-xl shadow p-10 text-center">
          <p className="text-gray-500 text-lg">
            No hay platillos registrados 🍽️
          </p>
        </div>
      ) : (
        <div className="grid gap-6
                        grid-cols-1
                        sm:grid-cols-2
                        lg:grid-cols-3">
          {platillos.map((plato) => (
            <Platillo
              key={plato.id}
              plato={plato}
              onDelete={handleDelete}
              onToggleActivo={handleToggleaActivo}
            />
          ))}
        </div>
      )}
    </div>
  );
}
