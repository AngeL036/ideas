import { PagoResponse } from "../types/Pago";
import { ItemVenta, PagoPayload, VentaResponse } from "../types/Venta"
import api from "./api"


export const nuevaVenta = async (items: ItemVenta[]): Promise<VentaResponse> => {
    const {data} = await api.post<VentaResponse>("/ventas/",{items});
    return data
}

export const registrarPago = async(venta_id: number,payload: PagoPayload,): Promise<PagoResponse> => {
    const {data} = await api.post<PagoResponse>(`/ventas/${venta_id}/pago/`,payload);
    return data
}

export const enviarTicketCorreo = async(venta_id: number, email: string) : Promise<void> => {
    await api.post(`/ventas/${venta_id}/enviar-ticket/`, {email});

}

export const enviarTicketWhatsApp = async (
    venta_id: number,
    numero: string,
): Promise<void> => {
    await api.post(`/ventas/${venta_id}/ticket/whatsapp`, { numero })
}