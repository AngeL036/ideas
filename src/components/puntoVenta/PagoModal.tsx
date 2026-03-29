import { useEffect, useRef, useState } from "react"

interface PagoModalProps {
    total: number
    onConfirmar: (montoPagado: number) => void
    onCancelar: () => void
    loading?: boolean
}

const BILLETES = [10, 20, 50, 100, 200, 500]

export default function PagoModal({ total, onConfirmar, onCancelar, loading }: PagoModalProps) {
    const [montoPagado, setMontoPagado] = useState<string>("")
    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        inputRef.current?.focus()
    }, [])

    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.key === "Escape" && !loading) onCancelar()
        }
        window.addEventListener("keydown", handler)
        return () => window.removeEventListener("keydown", handler)
    }, [onCancelar, loading])

    const monto = parseFloat(montoPagado) || 0
    const cambio = monto - total
    const suficiente = monto >= total

    const handleBillete = (valor: number) => {
        // Suma el billete al monto actual
        const actual = parseFloat(montoPagado) || 0
        setMontoPagado((actual + valor).toString())
    }

    const handleLimpiar = () => setMontoPagado("")

    const handleConfirmar = () => {
        if (!suficiente || loading) return
        onConfirmar(monto)
    }

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
            onClick={e => { if (e.target === e.currentTarget && !loading) onCancelar() }}
        >
            <div className="relative w-full max-w-sm rounded-2xl bg-white shadow-2xl overflow-hidden">

                {/* Header */}
                <div className="bg-gray-900 px-6 py-5 text-white">
                    <p className="text-xs font-medium uppercase tracking-widest text-gray-400 mb-1">
                        Total a cobrar
                    </p>
                    <p className="text-4xl font-bold tracking-tight">
                        ${total.toFixed(2)}
                    </p>
                </div>

                {/* Body */}
                <div className="px-6 py-5 space-y-5">

                    {/* Billetes rápidos */}
                    <div>
                        <p className="mb-2 text-xs font-medium text-gray-500 uppercase tracking-wide">
                            Billetes rápidos
                        </p>
                        <div className="grid grid-cols-3 gap-2">
                            {BILLETES.map(b => (
                                <button
                                    key={b}
                                    onClick={() => handleBillete(b)}
                                    disabled={loading}
                                    className="rounded-lg border border-gray-200 bg-gray-50 py-2 text-sm font-semibold text-gray-700 hover:border-gray-400 hover:bg-gray-100 active:scale-95 transition-all disabled:opacity-40"
                                >
                                    ${b}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Input monto recibido */}
                    <div>
                        <label className="mb-1.5 block text-xs font-medium text-gray-500 uppercase tracking-wide">
                            Efectivo recibido
                        </label>
                        <div className="flex overflow-hidden rounded-xl border-2 border-gray-200 focus-within:border-gray-900 transition-colors">
                            <span className="flex items-center bg-gray-50 px-3 text-lg font-medium text-gray-400 border-r border-gray-200">
                                $
                            </span>
                            <input
                                ref={inputRef}
                                type="number"
                                min="0"
                                step="0.01"
                                placeholder="0.00"
                                value={montoPagado}
                                disabled={loading}
                                onChange={e => setMontoPagado(e.target.value)}
                                onKeyDown={e => e.key === "Enter" && handleConfirmar()}
                                className="flex-1 bg-white px-3 py-3 text-xl font-semibold text-gray-900 outline-none disabled:opacity-50"
                            />
                            {montoPagado && (
                                <button
                                    onClick={handleLimpiar}
                                    disabled={loading}
                                    className="px-3 text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none">
                                        <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                                    </svg>
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Cambio */}
                    <div className={`rounded-xl px-4 py-4 transition-colors ${
                        monto === 0
                            ? "bg-gray-50 border border-gray-100"
                            : suficiente
                                ? "bg-green-50 border border-green-200"
                                : "bg-red-50 border border-red-200"
                    }`}>
                        <div className="flex items-center justify-between">
                            <span className={`text-sm font-medium ${
                                monto === 0 ? "text-gray-400"
                                : suficiente ? "text-green-700" : "text-red-600"
                            }`}>
                                {monto === 0 ? "Cambio" : suficiente ? "Cambio a entregar" : "Falta"}
                            </span>
                            <span className={`text-2xl font-bold ${
                                monto === 0 ? "text-gray-300"
                                : suficiente ? "text-green-700" : "text-red-600"
                            }`}>
                                {monto === 0
                                    ? "$0.00"
                                    : suficiente
                                        ? `$${cambio.toFixed(2)}`
                                        : `$${Math.abs(cambio).toFixed(2)}`
                                }
                            </span>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="flex gap-2 border-t border-gray-100 px-6 py-4">
                    <button
                        onClick={onCancelar}
                        disabled={loading}
                        className="flex-1 rounded-xl border border-gray-200 py-3 text-sm font-medium text-gray-600 hover:bg-gray-50 disabled:opacity-40 transition-colors"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={handleConfirmar}
                        disabled={!suficiente || loading}
                        className="flex-1 rounded-xl bg-gray-900 py-3 text-sm font-semibold text-white hover:bg-gray-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    >
                        {loading ? "Registrando..." : "Confirmar cobro"}
                    </button>
                </div>
            </div>
        </div>
    )
}