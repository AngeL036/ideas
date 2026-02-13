import api from "./api";
import type { PedidoCreatePayload,PedidoResponse,PedidoItem,Detalle} from "../types/Pedido";

export const CrearPedido = async(data:PedidoCreatePayload): Promise<PedidoResponse> => {
    const response = await api.post("/pedidos/", data);
    return response.data
}

export const ObtenerPedidos = async(): Promise<PedidoItem[]> => {
    const response = await api.get("/pedidos/");
    return response.data
}
export const ObtenerPedidoId = async (id:number) => {
    const res = await api.get(`/pedidos/${id}/info`)
    return res.data
}

export const ObtenerDetalleId = async(id:number): Promise<Detalle[]> => {
    const response = await api.get(`/pedidos/${id}`)
    return response.data
}
