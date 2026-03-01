import { useForm } from "react-hook-form"
import type { createMesaPayload } from "../../types/Mesa";
import { CrearMesa } from "../../api/mesa.api";
import { useNavigate } from "react-router-dom";

export default function FormAgregarMesa(){
    const {register, handleSubmit, formState: {errors}} = useForm();
    const navigate = useNavigate();

    const onSubmit = async () => {
        try {
              const response = await CrearMesa();
              console.log(response);
              navigate("/mesas");
            } catch (error) {
              console.error("Error al crear mesa", error);
            }
    }
    return(<h1>pendiente</h1>)
      
        {/*  asasd
        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
            <div>
                <label className="block text-sm font-medium text-slate-700">Negocio ID</label>
                <input 
                    type="number"
                    min="0"
                    placeholder="Ej: 1"
                    {...register("negocio_id", {
                        required:"Negocio ID es requerido"
                    })}
                    className="mt-1 h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-slate-900 outline-none transition focus:border-slate-400 focus:bg-white"
                />
                {errors.negocio_id && <span className="text-red-600 text-sm">{errors.negocio_id.message}</span>}
            </div>

            <div>
                <label className="block text-sm font-medium text-slate-700">Número de Mesa</label>
                <input 
                    type="number"
                    min="0"
                    placeholder="Ej: 1"
                    {...register("numero", {
                        required:"Número de mesa es requerido"
                    })}
                    className="mt-1 h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-slate-900 outline-none transition focus:border-slate-400 focus:bg-white"
                />
                {errors.numero && <span className="text-red-600 text-sm">{errors.numero.message}</span>}
            </div>

            <div>
                <label className="block text-sm font-medium text-slate-700">Capacidad</label>
                <input 
                    type="number"
                    min="0"
                    placeholder="Ej: 4"
                    {...register("capacidad", {
                        required:"Capacidad es requerida"
                    })}
                    className="mt-1 h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-slate-900 outline-none transition focus:border-slate-400 focus:bg-white"
                />
                {errors.capacidad && <span className="text-red-600 text-sm">{errors.capacidad.message}</span>}
            </div>

            <button
                className="w-full rounded-xl bg-slate-900 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700"
            >
                Agregar
            </button>
        </form>
        */}
        
    
}