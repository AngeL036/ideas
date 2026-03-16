import { useForm } from "react-hook-form";
import type { CreateNegocioPayload } from "../../types/Negocio";
import { crearNegocio } from "../../api/negocio.api";
import { useNavigate } from "react-router-dom";

export default function FormNegocio(){
    const {register, handleSubmit, formState: {errors}} = useForm<CreateNegocioPayload>();
    const navigate = useNavigate();

    const onSubmit = async (data: CreateNegocioPayload) => {
        try {
            const response = await crearNegocio(data);
            navigate("/negocios");
        } catch (error) {
            console.error("Error al crear negocio", error);
        }
    }

    return(
        <div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-slate-700">Nombre del Negocio</label>
                <input
                    type="text"
                    placeholder="Ej: Restaurante El Sabor"
                    {...register("nombre", {
                        required: "El nombre del negocio es requerido"
                    })}
                    className="mt-1 h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-slate-900 outline-none transition focus:border-slate-400 focus:bg-white"
                />
                {errors.nombre && <span className="text-red-600 text-sm">{errors.nombre.message}</span>}
            </div>

            <div>
                <label className="block text-sm font-medium text-slate-700">Dirección (Opcional)</label>
                <input
                    type="text"
                    placeholder="Ej: Calle Principal 123"
                    {...register("direccion")}
                    className="mt-1 h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-slate-900 outline-none transition focus:border-slate-400 focus:bg-white"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-slate-700">Teléfono (Opcional)</label>
                <input
                    type="tel"
                    placeholder="Ej: 555-1234"
                    {...register("telefono")}
                    className="mt-1 h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-slate-900 outline-none transition focus:border-slate-400 focus:bg-white"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-slate-700">Tipo de negocio</label>
                <select {...register("giro",{
                    required: "Debes Seleccionar un tipo de negocio",
                    validate: (v) => v !== "" || "Debes seleccionar un tipo de negocio"
                })}
                className="mt- w-full rounded-lg border border-slate-300bg-white px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100">
                    <option value="">Seleccionar</option>
                    <option value="restaurante">Restaurante/cafeteria</option>
                </select>
                {errors.giro &&
              <p className="text-red-500 text-sm mt-1">
                {errors.giro.message}
              </p>}

            </div>

            <button
                type="submit"
                className="w-full rounded-xl bg-slate-900 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700"
            >
                Crear Negocio
            </button>
        </form>
    </div>
    )
}