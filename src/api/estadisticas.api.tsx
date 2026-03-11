import api from "./api";
import type { MesasOcupadasResponse } from "../types/Estadisticas";
import type { TransactionData } from "../types/Estadisticas";

export const obtenerMesasOcupadas = async (): Promise<MesasOcupadasResponse> => {
    const response = await api.get("ventas/obtener-datos");
    return response.data;
}

export const obtenerTransactions = async (): Promise<TransactionData[]> => {
    const response = await api.get("reportes/transaction");
    return response.data
}