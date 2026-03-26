import api from "./api"
export interface VentaPayload {
    items: {
        producto_id:number
        cantidad:number
    }[]
}

export const nuevaVenta = async (payload: VentaPayload) => {
    const res = await api.post("/ventas/",payload);
    return res.data
}