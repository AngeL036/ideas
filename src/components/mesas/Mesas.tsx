import { Link } from "react-router-dom";
import type {MesasPayload,Mesa} from "../../types/Mesa"


interface Props{
    mesa: Mesa;
}


export default function Mesas({mesa}:Props){
    const isOcupada = mesa.estado === "ocupada";
    
    return(
        <Link to={`/mesa/editar/${mesa.numero}`}>
            <article
                className={`rounded-2xl border p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md
                ${isOcupada
                    ? "border-red-200 bg-red-50/40"
                    : "border-emerald-200 bg-emerald-50/40"
                }`}
            >
                <div className="mb-4 flex items-start justify-between">
                    <div>
                        <p className="text-xs font-medium uppercase tracking-wide text-gray-500">Mesa</p>
                        <h3 className="text-2xl font-bold text-gray-800">#{mesa.numero}</h3>
                    </div>
                    <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold capitalize
                        ${isOcupada
                            ? "bg-red-100 text-red-700 ring-1 ring-red-200"
                            : "bg-emerald-100 text-emerald-700 ring-1 ring-emerald-200"
                        }`}
                    >
                        {isOcupada ? "ocupada" : "libre"}
                    </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                    <span
                        className={`inline-block h-2.5 w-2.5 rounded-full ${isOcupada ? "bg-red-500" : "bg-emerald-500"}`}
                    />
                    <span className="text-gray-600">
                        {isOcupada ? "Mesa en uso" : "Disponible para nuevos clientes"}
                    </span>
                </div>
                
            </article>
        </Link>
    )
}
