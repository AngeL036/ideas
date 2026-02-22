import { useForm } from "react-hook-form";
import type { CreateEmpleadoPayload } from "../../types/Empleado";
import { crearEmpleado } from "../../api/empleado.api";
import { useNavigate } from "react-router-dom";

export default function FormEmpleado() {
    const { register, handleSubmit, formState: { errors } } = useForm<CreateEmpleadoPayload>();
    const navigate = useNavigate();

    const onSubmit = async (data: CreateEmpleadoPayload) => {
        try {
            const response = await crearEmpleado(data);
            console.log(response);
            navigate("/empleados");
        } catch (error) {
            console.error("Error al crear empleado", error);
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-slate-700">ID de Usuario</label>
                <input
                    type="number"
                    placeholder="Ej: 1"
                    {...register("user_id", {
                        required: "El ID del usuario es requerido"
                    })}
                    className="mt-1 h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-slate-900 outline-none transition focus:border-slate-400 focus:bg-white"
                />
                {errors.user_id && <span className="text-red-600 text-sm">{errors.user_id.message}</span>}
            </div>

            <div>
                <label className="block text-sm font-medium text-slate-700">ID de Negocio</label>
                <input
                    type="number"
                    placeholder="Ej: 1"
                    {...register("negocio_id", {
                        required: "El ID del negocio es requerido"
                    })}
                    className="mt-1 h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-slate-900 outline-none transition focus:border-slate-400 focus:bg-white"
                />
                {errors.negocio_id && <span className="text-red-600 text-sm">{errors.negocio_id.message}</span>}
            </div>

            <div>
                <label className="block text-sm font-medium text-slate-700">Rol</label>
                <select
                    {...register("rol", {
                        required: "El rol es requerido"
                    })}
                    className="mt-1 h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-slate-900 outline-none transition focus:border-slate-400 focus:bg-white"
                >
                    <option value="">Selecciona un rol</option>
                    <option value="mesero">Mesero</option>
                    <option value="cocinero">Cocinero</option>
                    <option value="administrador">Administrador</option>
                </select>
                {errors.rol && <span className="text-red-600 text-sm">{errors.rol.message}</span>}
            </div>

            <button
                type="submit"
                className="w-full rounded-xl bg-slate-900 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700"
            >
                Crear Empleado
            </button>
        </form>
    )
}
