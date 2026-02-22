import api from "./api";
import type { Negocio, CreateNegocioPayload, UpdateNegocioPayload } from "../types/Negocio";

export const crearNegocio = async (data: CreateNegocioPayload): Promise<Negocio> => {
    const response = await api.post("/negocios/", data);
    return response.data;
};

export const obtenerNegocios = async (): Promise<Negocio[]> => {
    const response = await api.get("/negocios/");
    return response.data;
};

export const obtenerMisNegocios = async (): Promise<Negocio[]> => {
    const response = await api.get("/negocios/mis-negocios");
    return response.data;
};

export const obtenerNegocio = async (negocio_id: number): Promise<Negocio> => {
    const response = await api.get(`/negocios/${negocio_id}`);
    return response.data;
};

export const actualizarNegocio = async (negocio_id: number, data: UpdateNegocioPayload): Promise<Negocio> => {
    const response = await api.put(`/negocios/${negocio_id}`, data);
    return response.data;
};

export const desactivarNegocio = async (negocio_id: number): Promise<{ message: string }> => {
    const response = await api.delete(`/negocios/${negocio_id}`);
    return response.data;
};
