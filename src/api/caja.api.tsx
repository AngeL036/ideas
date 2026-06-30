import api from './api'
import type { CerrarCajaPayload } from '../types/Caja'

export const getCajaActiva = async () => {
    const res = await api.get("/caja/cajaActiva")
    return res.data
}

export const abrirCaja = async (monto:number) => {
    const res = await api.post("/caja/abrirCaja", { monto_inicial: monto})
    return res.data
}

export const cerrarCaja = async (data: CerrarCajaPayload) => {
    const res = await api.post("/caja/cerrarCaja", data);
    return res.data;
};