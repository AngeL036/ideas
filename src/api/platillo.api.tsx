import api from "./api";
import type { ResponsePayload,RegistrarPayload,UpdatePayload, PlatilloPayload } from "../types/Platillo";
import axios from "axios";


export const registrarPlato = async(payload:RegistrarPayload): Promise<ResponsePayload> => {
    const response = await api.post("/platos/",payload);
    return response.data
}

export const obtenerPlatos = async(): Promise<PlatilloPayload[]> => {
    const response = await api.get("/platos/");
    return response.data
}

export const obtenerPlatosActivos = async(): Promise<PlatilloPayload[]> => {
    const response = await api.get("/platos/activos");
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

export const actualizarActivo = async(id:number, activo: boolean) => {
    const res = await api.patch(`/platos/${id}/activo`, { activo })
    return res.data
}

export const ObtenerDetallePlatillo = async(plato_id:number): Promise<PlatilloPayload> => {
    const response = await api.get(`/platos/${plato_id}/negocio`)
    return response.data
}