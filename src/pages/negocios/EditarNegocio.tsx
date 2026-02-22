import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import FormNegocio from "../../components/negocios/FormNegocio";
import type { Negocio, UpdateNegocioPayload } from "../../types/Negocio";
import { obtenerNegocio, actualizarNegocio } from "../../api/negocio.api";
import { useForm } from "react-hook-form";

export default function EditarNegocio() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [negocio, setNegocio] = useState<Negocio | null>(null);
    const [loading, setLoading] = useState(true);
    const { register, handleSubmit, formState: { errors } } = useForm<UpdateNegocioPayload>();

    useEffect(() => {
        if (!id) return;

        const cargarNegocio = async () => {
            try {
                const data = await obtenerNegocio(Number(id));
                setNegocio(data);
            } catch (error) {
                console.error("Error al cargar negocio", error);
            } finally {
                setLoading(false);
            }
        }

        cargarNegocio();
    }, [id]);

    const onSubmit = async (data: UpdateNegocioPayload) => {
        if (!id) return;
        try {
            await actualizarNegocio(Number(id), data);
            navigate("/negocios");
        } catch (error) {
            console.error("Error al actualizar negocio", error);
        }
    }

    if (loading) {
        return (
            <div className="flex h-64 items-center justify-center">
                <p className="text-slate-500 animate-pulse">Cargando negocio...</p>
            </div>
        );
    }

    if (!negocio) {
        return (
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm text-center">
                <p className="text-slate-500">Negocio no encontrado</p>
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
            <h1 className="text-3xl font-black tracking-tight text-slate-900">Editar Negocio</h1>
            <p className="mt-1 text-sm text-slate-600">Actualiza la información del negocio: {negocio.nombre}</p>
            
            <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
                <div>
                    <label className="block text-sm font-medium text-slate-700">Nombre del Negocio</label>
                    <input
                        type="text"
                        placeholder={negocio.nombre}
                        {...register("nombre")}
                        className="mt-1 h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-slate-900 outline-none transition focus:border-slate-400 focus:bg-white"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700">Dirección</label>
                    <input
                        type="text"
                        placeholder={negocio.direccion || "Dirección"}
                        {...register("direccion")}
                        className="mt-1 h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-slate-900 outline-none transition focus:border-slate-400 focus:bg-white"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700">Teléfono</label>
                    <input
                        type="tel"
                        placeholder={negocio.telefono || "Teléfono"}
                        {...register("telefono")}
                        className="mt-1 h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-slate-900 outline-none transition focus:border-slate-400 focus:bg-white"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full rounded-xl bg-slate-900 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700"
                >
                    Guardar Cambios
                </button>
            </form>
        </div>
    );
}
