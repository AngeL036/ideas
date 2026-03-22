import api from './api'
import type { ProductoInitialCreate } from '../types/Inventario'

export const crearProductoInicial = async (payload:ProductoInitialCreate) => {
    const {data} = await api.post('/productos/inicial', payload)
    return data
}

export const obtenerProductos = async () => {
    const {data} = await api.get('/productos/')
    return data
}