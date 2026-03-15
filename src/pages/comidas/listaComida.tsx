import Platillo from "../../components/platillo";
import type { PlatilloPayload, CategoriaPayload } from "../../types/Platillo";
import { obtenerPlatos, eliminarPlato, actualizarActivo } from "../../api/platillo.api";
import { getCategorias } from "../../api/categoria.api"; 
import { useEffect, useState, useMemo } from "react";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { useRoleProtection } from "../../hooks/useRoleProtection";
import { LayoutGrid, Plus } from "lucide-react";

const TODAS = 0; // id especial para "Todas"

export default function ListaComida() {
  const [platillos, setPlatillos]     = useState<PlatilloPayload[]>([]);
  const [categorias, setCategorias]   = useState<CategoriaPayload[]>([]);
  const [categoriaActiva, setCategoriaActiva] = useState<number>(TODAS);
  const [loading, setLoading]         = useState(true);
  const [loadingToggle, setLoadingToggle] = useState<number | null>(null);

  const { hasRole } = useRoleProtection();
  const puedeEditar = hasRole(["owner", "admin"]);

  // ── Carga inicial ────────────────────────────────────────────────────────
  useEffect(() => {
    const cargar = async () => {
      try {
        const [platos, cats] = await Promise.all([obtenerPlatos(), getCategorias()]);
        setPlatillos(platos);
        setCategorias(cats);
      } catch (error) {
        console.error("Error al cargar menú", error);
      } finally {
        setLoading(false);
      }
    };
    cargar();
  }, []);

  // ── Platillos filtrados por categoría seleccionada ───────────────────────
  const platillosFiltrados = useMemo(() =>
    categoriaActiva === TODAS
      ? platillos
      : platillos.filter((p) => p.categoria_id === categoriaActiva),
    [platillos, categoriaActiva]
  );

  // ── Conteo por categoría para las pills ─────────────────────────────────
  const conteo = useMemo(() => {
    const map: Record<number, number> = {};
    platillos.forEach((p) => {
      map[p.categoria_id] = (map[p.categoria_id] ?? 0) + 1;
    });
    return map;
  }, [platillos]);

  const handleToggleActivo = async (id: number, activo: boolean) => {
    setPlatillos((prev) => prev.map((p) => (p.id === id ? { ...p, activo } : p)));
    setLoadingToggle(id);
    try {
      await actualizarActivo(id, activo);
    } catch {
      setPlatillos((prev) => prev.map((p) => (p.id === id ? { ...p, activo: !activo } : p)));
      Swal.fire("Error", "No se pudo actualizar", "error");
    } finally {
      setLoadingToggle(null);
    }
  };

  const handleDelete = async (id: number) => {
    const result = await Swal.fire({
      title: "¿Eliminar platillo?",
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
      setPlatillos((prev) => prev.filter((p) => p.id !== id));
      Swal.fire("Eliminado", "Platillo eliminado", "success");
    } catch {
      Swal.fire("Error", "No se pudo eliminar", "error");
    }
  };

  // ── Loading state ────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="flex h-60 items-center justify-center">
        <p className="animate-pulse text-lg text-slate-400">Cargando menú...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* ── Header ── */}
      <header className="rounded-2xl border border-slate-200 bg-white/80 p-6 shadow-sm backdrop-blur md:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50">
              <LayoutGrid size={18} className="text-emerald-600" />
            </div>
            <div>
              <h1 className="text-2xl font-black tracking-tight text-slate-900">Menú</h1>
              <p className="text-xs text-slate-500">
                {platillos.length} platillo{platillos.length !== 1 ? "s" : ""} en {categorias.length} categoría{categorias.length !== 1 ? "s" : ""}
              </p>
            </div>
          </div>

          {/* Botón Agregar — solo owner/admin */}
          {puedeEditar && (
            <Link
              to="/comida/nueva"
              className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700"
            >
              <Plus size={15} />
              Agregar platillo
            </Link>
          )}
        </div>

        {/* ── Pills de categorías ── */}
        {categorias.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-2">
            {/* Pill "Todas" */}
            <button
              key="todas"
              onClick={() => setCategoriaActiva(TODAS)}
              className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-all
                ${categoriaActiva === TODAS
                  ? "bg-slate-900 text-white shadow-sm"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
            >
              Todas
              <span className={`ml-1.5 text-xs ${categoriaActiva === TODAS ? "opacity-60" : "opacity-50"}`}>
                {platillos.length}
              </span>
            </button>

            {/* Pill por categoría */}
            {categorias.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setCategoriaActiva(cat.id)}
                className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-all
                  ${categoriaActiva === cat.id
                    ? "bg-emerald-500 text-white shadow-sm"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
              >
                {cat.nombre}
                {conteo[cat.id] !== undefined && (
                  <span className={`ml-1.5 text-xs ${categoriaActiva === cat.id ? "opacity-70" : "opacity-50"}`}>
                    {conteo[cat.id]}
                  </span>
                )}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* ── Grid de platillos ── */}
      {platillosFiltrados.length === 0 ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center shadow-sm">
          <p className="text-slate-400">No hay platillos en esta categoría.</p>
        </div>
      ) : (

        // Si es "Todas" → agrupar por categoría con subtítulo
        categoriaActiva === TODAS ? (
          <div className="space-y-8">
            {categorias
              .filter((cat) => conteo[cat.id] > 0)
              .map((cat) => (
                <section key={cat.id}>
                  {/* Subtítulo de sección */}
                  <div className="mb-3 flex items-center gap-3">
                    <h2 className="text-sm font-bold uppercase tracking-widest text-slate-400">
                      {cat.nombre}
                    </h2>
                    <div className="h-px flex-1 bg-slate-100" />
                    <span className="text-xs font-semibold text-slate-300">{conteo[cat.id]}</span>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {platillos
                      .filter((p) => p.categoria_id === cat.id)
                      .map((plato) => (
                        <Platillo
                          key={plato.id}
                          plato={plato}
                          onDelete={handleDelete}
                          onToggleActivo={handleToggleActivo}
                          loading={loadingToggle === plato.id}
                        />
                      ))}
                  </div>
                </section>
              ))}
          </div>
        ) : (
          // Si hay categoría seleccionada → solo el grid sin agrupar
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {platillosFiltrados.map((plato) => (
              <Platillo
                key={plato.id}
                plato={plato}
                onDelete={handleDelete}
                onToggleActivo={handleToggleActivo}
                loading={loadingToggle === plato.id}
              />
            ))}
          </div>
        )
      )}
    </div>
  );
}