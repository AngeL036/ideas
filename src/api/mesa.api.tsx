import api from "./api"
import type { Mesa, createMesaPayload, UpdateMesaPayload } from "../types/Mesa"



export const obtenerMesas = async(): Promise<Mesa[]> => {
    const response = await api.get("/mesas/");
    return response.data
}

export const CrearMesa = async(): Promise<Mesa> => {
    const response = await api.post("/mesas/");
    return response.data
}

export const ObtenerMesaId = async(id:number): Promise<Mesa>=> {
    const response = await api.get(`/mesas/${id}`)
    return response.data
}

export const actualizarMesa = async(id: number, data: UpdateMesaPayload): Promise<Mesa> => {
    const response = await api.put(`/mesas/${id}`, data);
    return response.data
}

export const eliminarMesa = async(id: number): Promise<{ message: string }> => {
    const response = await api.delete(`/mesas/${id}`);
    return response.data
} 