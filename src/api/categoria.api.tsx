import api from "./api";
import type { CategoriaPayload } from "../types/Platillo";

export const getCategorias = async (): Promise<CategoriaPayload[]> => {
    const res = await api.get("/categorias/");
    return res.data
}

// alias — el form importa getCategoria sin s
export const getCategoria = getCategorias;

export const crearCategoria = async (nombre: string): Promise<CategoriaPayload> => {
    const res = await api.post("/categorias/", { nombre });
    return res.data;
};