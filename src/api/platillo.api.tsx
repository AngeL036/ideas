import api from "./api";
import type { ResponsePayload,RegistrarPayload,UpdatePayload, PlatilloPayload } from "../types/Platillo";


export const registrarPlato = async(payload:RegistrarPayload): Promise<ResponsePayload> => {
    const response = await api.post("/platos/",payload);
    return response.data
}

export const obtenerPlatos = async(): Promise<PlatilloPayload[]> => {
    const response = await api.get("/platos/");
    return response.data
}

export const obtenerPlato = async(id:number):Promise<ResponsePayload> => {
    const response = await api.get(`/platos/${id}`)
    return response.data
}

export const updatePlato = async(payload:UpdatePayload, id:number):Promise<ResponsePayload> => {
    const response = await api.put(`/platos/${id}`,payload)
    return response.data
}
export const eliminarPlato = async(id:number):Promise<ResponsePayload> => {
    const response = await api.delete(`/platos/${id}`)
    return response.data
}