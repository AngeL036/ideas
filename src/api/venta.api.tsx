import api from "./api"


export const nuevaVenta = async () => {
    const res = await api.post("/ventas/");
    return res.data
}