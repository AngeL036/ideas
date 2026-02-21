import { useEffect, useState } from "react"
import { Detalle } from "../../types/Pedido"
import type { PlatilloPayload } from "../../types/Platillo"
import { ObtenerDetallePlatillo } from "../../api/platillo.api"
interface Props{
    detalle:Detalle
}

export default function ListaProductos({detalle}:Props){
    const [platillos, setPlatillos] = useState<PlatilloPayload>();
    useEffect (() => {
        const cargaDetalles = async () => {
            const data = await ObtenerDetallePlatillo(Number(detalle.platillo_id))
            setPlatillos(data)
        }
        cargaDetalles() 
    },[])
    return(
        <div>
            <span className="font-medium text-slate-700">{platillos?.nombre}</span>
            <span className="font-semibold text-slate-800">${platillos?.precio}</span>
        </div>
    )
}