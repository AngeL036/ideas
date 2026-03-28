import api from './api'

export const getCajaActiva = async () => {
    const res = await api.get("/cajaActiva/")
    return res.data
}

export const abrirCaja = async (monto:number) => {
    const res = await api.post("/abrirCaja/", monto)
    return res.data
}