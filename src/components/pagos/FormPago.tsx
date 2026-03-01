import { useForm } from "react-hook-form";
import type { PagoCreatePayload } from "../../types/Pago";
import { registrarPago } from "../../api/pago.api";

interface Props {
    pedido_id: number;
    onSuccess?: () => void;
}

export default function FormPago({ pedido_id, onSuccess }: Props) {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<PagoCreatePayload>();

    const onSubmit = async (data: PagoCreatePayload) => {
        try {
            await registrarPago(pedido_id, data);
            reset();
            onSuccess?.();
        } catch (error) {
            console.error("Error al registrar pago", error);
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-slate-700">Método de Pago</label>
                <select
                    {...register("metodo", {
                        required: "El método de pago es requerido"
                    })}
                    className="mt-1 h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-slate-900 outline-none transition focus:border-slate-400 focus:bg-white"
                >
                    <option value="">Selecciona un método</option>
                    <option value="efectivo">Efectivo</option>
                    <option value="tarjeta">Tarjeta</option>
                    <option value="transferencia">Transferencia</option>
                    <option value="cheque">Cheque</option>
                </select>
                {errors.metodo && <span className="text-red-600 text-sm">{errors.metodo.message}</span>}
            </div>

            <div>
                <label className="block text-sm font-medium text-slate-700">Monto</label>
                <input
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder="0.00"
                    {...register("monto", {
                        required: "El monto es requerido",
                        min: { value: 0.01, message: "El monto debe ser mayor a 0" }
                    })}
                    className="mt-1 h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-slate-900 outline-none transition focus:border-slate-400 focus:bg-white"
                />
                {errors.monto && <span className="text-red-600 text-sm">{errors.monto.message}</span>}
            </div>

            <button
                type="submit"
                className="w-full rounded-xl bg-slate-900 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700"
            >
                Registrar Pago
            </button>
        </form>
    )
}
