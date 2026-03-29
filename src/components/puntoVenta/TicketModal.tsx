import { useEffect, useRef, useState } from "react"

interface TicketModalProps {
    total: number
    onClose: () => void
}

type Medio = "correo" | "whatsapp" | "otro" | null

export default function TicketModal({ total, onClose }: TicketModalProps) {
    const [medioSeleccionado, setMedioSeleccionado] = useState<Medio>(null)
    const [valor, setValor] = useState("")
    const [enviando, setEnviando] = useState(false)
    const [enviado, setEnviado] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const inputRef = useRef<HTMLInputElement>(null)

    // Focus input when a medio is selected
    useEffect(() => {
        if (medioSeleccionado) {
            setTimeout(() => inputRef.current?.focus(), 80)
        }
    }, [medioSeleccionado])

    // Close on Escape
    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose()
        }
        window.addEventListener("keydown", handler)
        return () => window.removeEventListener("keydown", handler)
    }, [onClose])

    const placeholder: Record<NonNullable<Medio>, string> = {
        correo: "cliente@ejemplo.com",
        whatsapp: "+52 951 123 4567",
        otro: "Referencia, número, etc.",
    }

    const label: Record<NonNullable<Medio>, string> = {
        correo: "Correo electrónico",
        whatsapp: "Número de WhatsApp",
        otro: "Referencia",
    }

    const validate = (): boolean => {
        if (!medioSeleccionado) return false
        if (!valor.trim()) {
            setError("Este campo es obligatorio")
            return false
        }
        if (medioSeleccionado === "correo" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor)) {
            setError("Ingrese un correo válido")
            return false
        }
        return true
    }

    const handleEnviar = async () => {
        if (!validate()) return
        setEnviando(true)
        setError(null)
        // Aquí conectas tu API real de envío de ticket
        await new Promise(r => setTimeout(r, 1200))
        setEnviando(false)
        setEnviado(true)
        setTimeout(onClose, 1800)
    }

    return (
        /* Backdrop */
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
            onClick={e => { if (e.target === e.currentTarget) onClose() }}
        >
            <div className="relative w-full max-w-md rounded-2xl bg-white shadow-2xl overflow-hidden">

                {/* Header */}
                <div className="flex items-start justify-between border-b border-gray-100 px-6 pt-6 pb-5">
                    <div>
                        <div className="flex items-center gap-2 mb-0.5">
                            {/* Checkmark icon */}
                            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-green-100">
                                <svg className="h-3 w-3 text-green-600" viewBox="0 0 12 12" fill="none">
                                    <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </span>
                            <span className="text-xs font-medium uppercase tracking-widest text-green-600">
                                Venta registrada
                            </span>
                        </div>
                        <h2 className="text-xl font-semibold text-gray-900">Enviar ticket</h2>
                        <p className="mt-0.5 text-sm text-gray-500">
                            Total cobrado:{" "}
                            <span className="font-medium text-gray-800">
                                ${total.toFixed(2)}
                            </span>
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="ml-4 mt-0.5 rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
                    >
                        <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none">
                            <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                        </svg>
                    </button>
                </div>

                {/* Body */}
                <div className="px-6 py-5">
                    {enviado ? (
                        <div className="flex flex-col items-center py-4 gap-3 text-center">
                            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-green-50">
                                <svg className="h-6 w-6 text-green-500" viewBox="0 0 24 24" fill="none">
                                    <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </span>
                            <p className="text-sm font-medium text-gray-700">¡Ticket enviado correctamente!</p>
                        </div>
                    ) : (
                        <>
                            <p className="mb-4 text-sm text-gray-500">
                                Elige cómo quieres enviar el comprobante al cliente:
                            </p>

                            {/* Opciones */}
                            <div className="grid grid-cols-3 gap-2 mb-5">
                                {(["correo", "whatsapp", "otro"] as const).map(medio => (
                                    <button
                                        key={medio}
                                        onClick={() => {
                                            setMedioSeleccionado(medio)
                                            setValor("")
                                            setError(null)
                                        }}
                                        className={`
                                            flex flex-col items-center gap-2 rounded-xl border py-4 px-2 text-xs font-medium transition-all
                                            ${medioSeleccionado === medio
                                                ? "border-gray-900 bg-gray-900 text-white shadow-md"
                                                : "border-gray-200 bg-gray-50 text-gray-600 hover:border-gray-300 hover:bg-gray-100"
                                            }
                                        `}
                                    >
                                        {medio === "correo" && (
                                            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none">
                                                <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.6" />
                                                <path d="M3 8l9 6 9-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                                            </svg>
                                        )}
                                        {medio === "whatsapp" && (
                                            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none">
                                                <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.832-1.438A9.96 9.96 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
                                                <path d="M8.5 9.5c0-.276.224-.5.5-.5h.5c.276 0 .5.224.5.5v.5c0 .97.5 2 1.5 3s2.03 1.5 3 1.5h.5c.276 0 .5.224.5.5v.5c0 .276-.224.5-.5.5h-.5c-1.38 0-3.03-.82-4.25-2.04S8.5 11.38 8.5 10v-.5z" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                                            </svg>
                                        )}
                                        {medio === "otro" && (
                                            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none">
                                                <circle cx="5" cy="12" r="1.5" fill="currentColor" />
                                                <circle cx="12" cy="12" r="1.5" fill="currentColor" />
                                                <circle cx="19" cy="12" r="1.5" fill="currentColor" />
                                            </svg>
                                        )}
                                        <span className="capitalize">{medio === "otro" ? "Otro" : medio === "correo" ? "Correo" : "WhatsApp"}</span>
                                    </button>
                                ))}
                            </div>

                            {/* Input dinámico */}
                            {medioSeleccionado && (
                                <div className="mb-1">
                                    <label className="mb-1.5 block text-xs font-medium text-gray-600">
                                        {label[medioSeleccionado]}
                                    </label>
                                    <input
                                        ref={inputRef}
                                        type={medioSeleccionado === "correo" ? "email" : "text"}
                                        placeholder={placeholder[medioSeleccionado]}
                                        value={valor}
                                        onChange={e => { setValor(e.target.value); setError(null) }}
                                        onKeyDown={e => e.key === "Enter" && handleEnviar()}
                                        className={`
                                            w-full rounded-lg border px-3 py-2.5 text-sm outline-none transition-colors
                                            ${error
                                                ? "border-red-300 bg-red-50 focus:border-red-400"
                                                : "border-gray-200 bg-gray-50 focus:border-gray-400 focus:bg-white"
                                            }
                                        `}
                                    />
                                    {error && (
                                        <p className="mt-1.5 text-xs text-red-500">{error}</p>
                                    )}
                                </div>
                            )}
                        </>
                    )}
                </div>

                {/* Footer */}
                {!enviado && (
                    <div className="flex gap-2 border-t border-gray-100 px-6 py-4">
                        <button
                            onClick={onClose}
                            className="flex-1 rounded-lg border border-gray-200 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
                        >
                            Omitir
                        </button>
                        <button
                            onClick={handleEnviar}
                            disabled={!medioSeleccionado || enviando}
                            className="flex-1 rounded-lg bg-gray-900 py-2 text-sm font-medium text-white hover:bg-gray-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                        >
                            {enviando ? "Enviando..." : "Enviar ticket"}
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}