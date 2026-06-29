import {
  X,
  Lock,
  ReceiptText,
  ArrowDownCircle,
  ArrowUpCircle,
  Printer,
  History,
  Settings,
  Wallet,
} from "lucide-react";

interface MenuPuntoVentaModalProps {
  open: boolean;
  onClose: () => void;
}

interface MenuOption {
  id: string;
  label: string;
  icon: React.ElementType;
  color: string;
}

const opciones: MenuOption[] = [
  {
    id: "abrir",
    label: "Abrir caja",
    icon: Wallet,
    color: "text-green-600",
  },
  {
    id: "cerrar",
    label: "Cerrar caja",
    icon: Lock,
    color: "text-red-600",
  },
  {
    id: "corte",
    label: "Corte de caja",
    icon: ReceiptText,
    color: "text-blue-600",
  },
  {
    id: "entrada",
    label: "Entrada de efectivo",
    icon: ArrowDownCircle,
    color: "text-emerald-600",
  },
  {
    id: "salida",
    label: "Salida de efectivo",
    icon: ArrowUpCircle,
    color: "text-orange-600",
  },
  {
    id: "ticket",
    label: "Reimprimir ticket",
    icon: Printer,
    color: "text-violet-600",
  },
  {
    id: "historial",
    label: "Historial",
    icon: History,
    color: "text-cyan-600",
  },
  {
    id: "configuracion",
    label: "Configuración",
    icon: Settings,
    color: "text-gray-600",
  },
];

export default function MenuPuntoVentaModal({
    open,
    onClose,
}: MenuPuntoVentaModalProps){
    if(!open) return null;
    return(
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
            <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl animate-in fade-in zoom-in-95 duration-200">
                {/*Header */}
                <div className="flex items-center justify-between border-b px-6 py-4">
                    <div>
                        <h2 className="text-lg font-bold text-slate-800" >
                            Opciones del Punto de Venta
                        </h2>
                        <p className="text-sm text-slate-500">
                            Selecciona una occion
                        </p>
                    </div>
                    <button
                    onClick={onClose}
                    className="rounded-lg p-2 hover:bg-slate-100 transition"
                    >
                        <X size={20}></X>
                    </button>
                </div>
                {/* Opciones */}
                <div className="grid grid-cols-2 gap-4 p-6">
                    {opciones.map((opcion) => {
                        const Icon = opcion.icon;
                        return(
                            <button
                                key={opcion.id}
                                className="flex flex-col items-center justify-center rounded-xl border border-slate-200 p-5 transition hover:border-blue-400 hover:bg-slate-50 hover:shadow-md"
                            >
                                <Icon className={`${opcion.color} mb-3`} size={34} />
                                <span className="text-sm font-medium text-slate-700 text-center">
                                    {opcion.label}
                                </span>
                            </button>
                        );
                    })}
                </div>
                {/*Footer */}
                <div className="border-t p-4">
                    <button
                    onClick={onClose}
                    className="w-full rounded-xl bg-slate-900 py-3 text-white transition hover:bg-slate-800"
                    >
                        cerrar
                    </button>
                </div>
            </div>
        </div>
    );
}