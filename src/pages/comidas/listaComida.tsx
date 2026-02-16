import Platillo from "../../components/platillo";
import type { PlatilloPayload } from "../../types/Platillo";
import { obtenerPlatos, eliminarPlato, actualizarActivo } from "../../api/platillo.api";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

export default function ListaComida() {
  const [platillos, setPlatillos] = useState<PlatilloPayload[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingToggle, setLoadingToggle] = useState<number | null>(null);

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

  const handleToggleaActivo = async (id: number, activo: boolean) => {
    setPlatillos((prev) => prev.map((plato) => (plato.id === id ? { ...plato, activo } : plato)));
    setLoadingToggle(id);

    try {
      await actualizarActivo(id, activo);
    } catch (error) {
      setPlatillos((prev) => prev.map((p) => (p.id === id ? { ...p, activo: !activo } : p)));
      Swal.fire("Error", "No se pudo actualizar", "error");
    } finally {
      setLoadingToggle(null);
    }
  };

  const handleDelete = async (id: number) => {
    const result = await Swal.fire({
      title: "Eliminar comida?",
      text: "Esta accion no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      confirmButtonText: "Si, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (!result.isConfirmed) return;

    try {
      await eliminarPlato(id);
      setPlatillos((prev) => prev.filter((plato) => plato.id !== id));
      Swal.fire("Eliminado", "Platillo eliminado", "success");
    } catch {
      Swal.fire("Error", "No se pudo eliminar", "error");
    }
  };

  if (loading) {
    return (
      <div className="flex h-60 items-center justify-center">
        <p className="text-lg text-slate-500 animate-pulse">Cargando platillos...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <header className="rounded-2xl border border-slate-200 bg-white/80 p-6 shadow-sm backdrop-blur md:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-black tracking-tight text-slate-900">Menu</h1>
            <p className="mt-1 text-sm text-slate-600">Administra disponibilidad, precio y descripcion de platillos.</p>
          </div>
          <Link
            to="/comida/nueva"
            className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700"
          >
            Agregar comida
          </Link>
        </div>
      </header>

      {platillos.length === 0 ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">
          <p className="text-lg text-slate-500">No hay platillos registrados.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {platillos.map((plato) => (
            <Platillo
              key={plato.id}
              plato={plato}
              onDelete={handleDelete}
              onToggleActivo={handleToggleaActivo}
              loading={loadingToggle === plato.id}
            />
          ))}
        </div>
      )}
    </div>
  );
}
