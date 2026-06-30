import { useState } from "react";
import { X, Lock } from "lucide-react";

interface Props {
    open: boolean;
    loading?: boolean;
    onClose: () => void;
    onConfirm: (monto: number) => Promise<void>;
}

export default function CerrarCajaModal({
    open,
    loading = false,
    onClose,
    onConfirm,
}: Props) {

    const [monto, setMonto] = useState("");

    if (!open) return null;

    const handleSubmit = async () => {
        const value = parseFloat(monto);

        if (isNaN(value) || value < 0) {
            return;
        }

        await onConfirm(value);
        setMonto("");
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">

            <div className="w-full max-w-md rounded-2xl bg-white shadow-xl">

                {/* Header */}

                <div className="flex items-center justify-between border-b px-6 py-4">

                    <div className="flex items-center gap-3">

                        <div className="rounded-xl bg-red-100 p-2">
                            <Lock className="text-red-600" size={22} />
                        </div>

                        <div>

                            <h2 className="font-semibold text-slate-800">
                                Cerrar Caja
                            </h2>

                            <p className="text-sm text-slate-500">
                                Ingresa el efectivo contado.
                            </p>

                        </div>

                    </div>

                    <button
                        onClick={onClose}
                        className="rounded-lg p-2 hover:bg-slate-100"
                    >
                        <X size={20} />
                    </button>

                </div>

                {/* Body */}

                <div className="space-y-5 p-6">

                    <div>

                        <label className="mb-2 block text-sm font-medium text-slate-700">
                            Efectivo contado
                        </label>

                        <div className="flex overflow-hidden rounded-lg border">

                            <span className="bg-slate-100 px-4 py-3">
                                $
                            </span>

                            <input
                                autoFocus
                                type="number"
                                min="0"
                                step="0.01"
                                value={monto}
                                onChange={(e) => setMonto(e.target.value)}
                                className="w-full px-4 outline-none"
                                placeholder="0.00"
                            />

                        </div>

                    </div>

                </div>

                {/* Footer */}

                <div className="flex justify-end gap-3 border-t p-6">

                    <button
                        onClick={onClose}
                        className="rounded-lg border px-5 py-2 hover:bg-slate-100"
                    >
                        Cancelar
                    </button>

                    <button
                        disabled={loading}
                        onClick={handleSubmit}
                        className="rounded-lg bg-red-600 px-5 py-2 text-white hover:bg-red-700 disabled:opacity-50"
                    >
                        {loading ? "Cerrando..." : "Cerrar Caja"}
                    </button>

                </div>

            </div>

        </div>
    );
}