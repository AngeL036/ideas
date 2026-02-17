import api from "./api"
import type { Mesa, createMesaPayload } from "../types/Mesa"



export const obtenerMesas = async(): Promise<Mesa[]> => {
    const response = await api.get("/mesas/");
    return response.data
}

export const CrearMesa = async(data:createMesaPayload)  => {
    const response = await api.post("/mesas/");
    return response.data
}