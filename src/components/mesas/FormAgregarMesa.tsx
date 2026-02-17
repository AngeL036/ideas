import { useForm } from "react-hook-form"
import type { createMesaPayload } from "../../types/Mesa";
import { CrearMesa } from "../../api/mesa.api";
export default function FormAgregarMesa(){
    const {register, handleSubmit} = useForm<createMesaPayload>();

    const onSubmit = async (data:createMesaPayload) => {
        try {
              const response = await CrearMesa(data);
              console.log(response);
            } catch (error) {
              console.error("Error al registrar al usuario", error);
            }
    }
    return(
        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
            <label className="block text-sm font-medium text-slate-700">Capacidad</label>
            <input 
                type="number"
                placeholder="Ej: 4"
                {...register("capacidad", {
                    required:true
                })}
                className="mt-1 h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-slate-900 outline-none transition focus:border-slate-400 focus:bg-white"
                />
                <button
                 className="w-full rounded-xl bg-slate-900 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700"
                 >
                    Agregar
                </button>
        </form>
    )
}