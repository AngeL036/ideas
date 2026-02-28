import api from "./api";
import type { MesasOcupadasResponse } from "../types/Estadisticas";

export const obtenerMesasOcupadas = async (): Promise<MesasOcupadasResponse> => {
    const response = await api.get("ventas/obtener-datos");
    return response.data;
}