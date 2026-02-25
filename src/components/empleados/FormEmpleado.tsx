import { useForm } from "react-hook-form";
import type { CreateEmpleadoPayload, EmpleadoCreadoResponse } from "../../types/Empleado";
import { crearEmpleado } from "../../api/empleado.api";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function FormEmpleado() {
    const { register, handleSubmit, formState: { errors } } = useForm<CreateEmpleadoPayload>();
    const [openModal, setOpenModal] = useState(false)
    const navigate = useNavigate();
    const [empleado, setEmpleado] = useState<EmpleadoCreadoResponse | null>(null);

    const onSubmit = async (data: CreateEmpleadoPayload) => {
        try {
            const response = await crearEmpleado(data);
            setEmpleado(response);
            

            // Si el backend devuelve una contraseña temporal, mostrarla al administrador
            if ((response as any).temp_password) {
                const pwd = (response as any).temp_password;
                alert(`Empleado creado. Contraseña temporal: ${pwd}\nIndícale que cambie su contraseña en su primer ingreso.`);
            }
            setOpenModal(true);
            navigate("/empleados");
        } catch (error) {
            console.error("Error al crear empleado", error);
        }
    }

    return (
        <div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-slate-700">Nombre</label>
                <input
                    type="text"
                    placeholder="Ej: Juan"
                    {...register("nombre", {
                        required: "El nombre es requerido"
                    })}
                    className="mt-1 h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-slate-900 outline-none transition focus:border-slate-400 focus:bg-white"
                />
                {errors.nombre && <span className="text-red-600 text-sm">{errors.nombre.message}</span>}
            </div>
             <div>
                <label className="block text-sm font-medium text-slate-700">Apellido</label>
                <input
                    type="text"
                    placeholder="Ej: Pérez"
                    {...register("apellido", {
                        required: "El apellido es requerido"
                    })}
                    className="mt-1 h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-slate-900 outline-none transition focus:border-slate-400 focus:bg-white"
                />
                {errors.apellido && <span className="text-red-600 text-sm">{errors.apellido.message}</span>}
            </div>

            <div>
                <label className="block text-sm font-medium text-slate-700">Edad</label>
                <input
                    type="number"
                    placeholder="Ej: 30"
                    {...register("edad", {
                        required: "La edad es requerida",
                        valueAsNumber: true,
                        min: { value: 16, message: "Edad mínima 16" }
                    })}
                    className="mt-1 h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-slate-900 outline-none transition focus:border-slate-400 focus:bg-white"
                />
                {errors.edad && <span className="text-red-600 text-sm">{(errors.edad as any).message}</span>}
            </div>
            <div>
                <label className="block text-sm font-medium text-slate-700">Email</label>
                <input
                    type="email"
                    placeholder="Ej: juan.perez@example.com"
                    {...register("email", {
                        required: "El email es requerido",
                        pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "Email inválido"
                        }
                    })}
                    className="mt-1 h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-slate-900 outline-none transition focus:border-slate-400 focus:bg-white"
                />
                {errors.email && <span className="text-red-600 text-sm">{errors.email.message}</span>}
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
        {openModal && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white rounded-lg p-6">
                    <h2 className="text-xl font-bold mb-4">Empleado creado</h2>
                    <p>El empleado ha sido creado exitosamente.</p>
                    <h2 className="font-bold">Clave temporal: {empleado?.temporal_password}</h2>
                    <button
                        onClick={() => setOpenModal(false)}
                        className="mt-4 rounded-xl bg-slate-900 py-2.5 px-4 text-sm font-semibold text-white transition hover:bg-slate-700"
                    >
                        Cerrar
                    </button>
                </div>
                </div>
                )
        }
        </div>
    )
}
