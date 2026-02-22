import api from "./api";
import type { Pago, PagoCreatePayload, ResumenPago } from "../types/Pago";

export const registrarPago = async (pedido_id: number, data: PagoCreatePayload): Promise<{ message: string }> => {
    const response = await api.post(`/pagos/pedido/${pedido_id}/pagar`, data);
    return response.data;
};

export const obtenerPagosPedido = async (pedido_id: number): Promise<Pago[]> => {
    const response = await api.get(`/pagos/pedido/${pedido_id}/listado`);
    return response.data;
};

export const obtenerPago = async (pago_id: number): Promise<Pago> => {
    const response = await api.get(`/pagos/id/${pago_id}`);
    return response.data;
};

export const obtenerResumenPedido = async (pedido_id: number): Promise<ResumenPago> => {
    const response = await api.get(`/pagos/pedido/${pedido_id}/resumen`);
    return response.data;
};
