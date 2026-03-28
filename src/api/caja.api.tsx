import api from './api'

export const getCajaActiva = async () => {
    const res = await api.get("/caja/cajaActiva")
    return res.data
}

export const abrirCaja = async (monto:number) => {
    const res = await api.post("/caja/abrirCaja", { monto_inicial: monto})
    return res.data
}
