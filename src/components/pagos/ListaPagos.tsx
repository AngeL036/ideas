import { useEffect, useState } from "react";
import { obtenerPagosPedido, obtenerResumenPedido } from "../../api/pago.api";
import type { Pago, ResumenPago } from "../../types/Pago";

interface Props {
    pedido_id: number;
}

export default function ListaPagos({ pedido_id }: Props) {
    const [pagos, setPagos] = useState<Pago[]>([]);
    const [resumen, setResumen] = useState<ResumenPago | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        cargarPagos();
    }, [pedido_id]);

    const cargarPagos = async () => {
        try {
            const [pagosData, resumenData] = await Promise.all([
                obtenerPagosPedido(pedido_id),
                obtenerResumenPedido(pedido_id)
            ]);
            setPagos(pagosData);
            setResumen(resumenData);
        } catch (error) {
            console.error("Error al cargar pagos", error);
        } finally {
            setLoading(false);
        }
    }

    if (loading) {
        return <div className="text-slate-500 animate-pulse">Cargando pagos...</div>;
    }

    return (
        <div className="space-y-4">
            {resumen && (
                <div className="rounded-lg border border-slate-200 bg-white p-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p className="text-xs text-slate-500">Total</p>
                            <p className="text-xl font-bold text-slate-900">${resumen.total.toFixed(2)}</p>
                        </div>
                        <div>
                            <p className="text-xs text-slate-500">Pagado</p>
                            <p className="text-xl font-bold text-emerald-600">${resumen.pagado.toFixed(2)}</p>
                        </div>
                        <div>
                            <p className="text-xs text-slate-500">Faltante</p>
                            <p className="text-xl font-bold text-red-600">${resumen.faltante.toFixed(2)}</p>
                        </div>
                        <div>
                            <p className="text-xs text-slate-500">Estado</p>
                            <span className={`inline-block rounded-full px-2 py-1 text-xs font-semibold capitalize ${
                                resumen.estado === "pagado" ? "bg-emerald-100 text-emerald-700" :
                                resumen.estado === "parcial" ? "bg-yellow-100 text-yellow-700" :
                                "bg-red-100 text-red-700"
                            }`}>
                                {resumen.estado}
                            </span>
                        </div>
                    </div>
                </div>
            )}

            {pagos.length === 0 ? (
                <p className="text-slate-500">No hay pagos registrados</p>
            ) : (
                <div className="space-y-2">
                    {pagos.map(pago => (
                        <div key={pago.id} className="flex items-center justify-between rounded-lg border border-slate-200 bg-white p-4">
                            <div>
                                <p className="font-medium text-slate-800">Pago #{pago.id}</p>
                                <p className="text-sm text-slate-600">{pago.metodo} - {new Date(pago.fecha).toLocaleDateString()}</p>
                            </div>
                            <p className="font-bold text-emerald-600">${pago.monto.toFixed(2)}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
