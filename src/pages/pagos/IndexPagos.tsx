import { useState } from "react";
import FormPago from "../../components/pagos/FormPago";
import ListaPagos from "../../components/pagos/ListaPagos";

export default function IndexPagos() {
    const [pedido_id, setPedido_id] = useState<number | null>(null);
    const [_refreshKey, setRefreshKey] = useState(0);

    const handleRegistrarPago = () => {
        setRefreshKey(prev => prev + 1);
    }

    return (
        <div className="space-y-6">
            <header className="rounded-2xl border border-slate-200 bg-white/80 p-6 shadow-sm backdrop-blur md:p-8">
                <div>
                    <h1 className="text-3xl font-black tracking-tight text-slate-900">Gestión de Pagos</h1>
                    <p className="mt-1 text-sm text-slate-600">Registro y seguimiento de pagos de pedidos.</p>
                </div>
            </header>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                    <h2 className="mb-4 text-lg font-bold text-slate-900">Buscar Pedido</h2>
                    <div className="flex gap-2">
                        <input
                            type="number"
                            placeholder="ID del pedido"
                            onChange={(e) => setPedido_id(e.target.value ? Number(e.target.value) : null)}
                            className="flex-1 h-11 rounded-xl border border-slate-200 bg-slate-50 px-3 text-slate-900 outline-none transition focus:border-slate-400 focus:bg-white"
                        />
                        <button className="px-4 py-2.5 rounded-xl bg-slate-900 text-white font-semibold hover:bg-slate-700 transition">
                            Buscar
                        </button>
                    </div>
                </div>

                {pedido_id && (
                    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                        <h2 className="mb-4 text-lg font-bold text-slate-900">Registrar Pago</h2>
                        <FormPago pedido_id={pedido_id} onSuccess={handleRegistrarPago} />
                    </div>
                )}
            </div>

            {pedido_id && (
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                    <h2 className="mb-4 text-lg font-bold text-slate-900">Historial de Pagos - Pedido #{pedido_id}</h2>
                    <ListaPagos key={_refreshKey} pedido_id={pedido_id} />
                </div>
            )}
        </div>
    );
}
