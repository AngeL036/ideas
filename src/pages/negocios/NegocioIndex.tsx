import { Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react";
import type { Negocio } from "../../types/Negocio";
import { obtenerMisNegocios, desactivarNegocio } from "../../api/negocio.api";

export default function Negocio(){
    const [negocios, setNegocios] = useState<Negocio[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        cargarNegocios();
    }, []);

    const cargarNegocios = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                setError("Debes estar autenticado para ver tus negocios");
                setLoading(false);
                return;
            }

            const data = await obtenerMisNegocios();
            setNegocios(data);
            setError(null);
        } catch (error: any) {
            if (error.response?.status === 401) {
                setError("Sesión expirada. Por favor, inicia sesión nuevamente");
                localStorage.removeItem("token");
                localStorage.removeItem("user");
            } else {
                setError("Error al cargar negocios");
            }
            console.error("Error al cargar negocios", error);
        } finally {
            setLoading(false);
        }
    }

    const handleEliminar = async (negocio_id: number) => {
        if (!confirm("¿Desactivar este negocio?")) return;
        try {
            await desactivarNegocio(negocio_id);
            setNegocios(prev => prev.filter(n => n.id !== negocio_id));
        } catch (error) {
            console.error("Error al desactivar negocio", error);
        }
    }

    if (error && error.includes("autenticad")) {
        return (
            <div className="space-y-6">
                <section className="rounded-2xl border border-slate-200 bg-white/80 p-6 shadow-sm backdrop-blur md:p-8">
                    <div className="text-center">
                        <h1 className="text-3xl font-black tracking-tight text-slate-900 md:text-4xl">Acceso Requerido</h1>
                        <p className="mt-4 text-slate-600">{error}</p>
                        <button
                            onClick={() => navigate("/login")}
                            className="mt-6 inline-flex items-center justify-center rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700"
                        >
                            Ir a Login
                        </button>
                    </div>
                </section>
            </div>
        );
    }

    return( 
        <div className="space-y-6">
            <section className="rounded-2xl border border-slate-200 bg-white/80 p-6 shadow-sm backdrop-blur md:p-8">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-3xl font-black tracking-tight text-slate-900 md:text-4xl">Negocios</h1>
                        <p className="mt-1 text-sm text-slate-600">Administra todos tus negocios y establecimientos.</p>
                    </div>
                    <Link
                        to="/negocio/nuevo"
                        className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700"
                    >
                        Agregar Negocio
                    </Link>
                </div>
            </section>

            {error && !error.includes("autenticad") && (
                <div className="rounded-2xl border border-red-200 bg-red-50 p-4">
                    <p className="text-red-700">{error}</p>
                </div>
            )}

            {loading ? (
                <div className="flex h-40 items-center justify-center">
                    <p className="text-slate-500 animate-pulse">Cargando negocios...</p>
                </div>
            ) : negocios.length === 0 ? (
                <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">
                    <p className="text-lg text-slate-500">No tienes negocios registrados.</p>
                </div>
            ) : (
                <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {negocios.map(negocio => (
                        <div key={negocio.id} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition">
                            <div className="mb-4">
                                <h3 className="text-lg font-bold text-slate-900">{negocio.nombre}</h3>
                                {negocio.direccion && <p className="text-sm text-slate-600">{negocio.direccion}</p>}
                                {negocio.telefono && <p className="text-sm text-slate-600">{negocio.telefono}</p>}
                            </div>
                            <span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${negocio.activo ? "bg-emerald-100 text-emerald-700" : "bg-gray-100 text-gray-700"}`}>
                                {negocio.activo ? "Activo" : "Inactivo"}
                            </span>
                            <div className="mt-4 flex gap-2">
                                <button
                                    onClick={() => navigate(`/negocio/${negocio.id}/editar`)}
                                    className="flex-1 rounded-lg bg-slate-100 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-200"
                                >
                                    Editar
                                </button>
                                <button
                                    onClick={() => handleEliminar(negocio.id)}
                                    className="flex-1 rounded-lg bg-red-100 px-3 py-2 text-sm font-medium text-red-700 hover:bg-red-200"
                                >
                                    Desactivar
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}