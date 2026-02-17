import api from "./api";
import type { DetalleUser, LoginUserPayload, LoginUserResponse, RegisterUser } from "../types/User";


export const CreateUser = async (payload:RegisterUser): Promise<RegisterUser> => {
    const response = await api.post("/auth/",payload);
    return response.data
}

export const ObtenerUser = async (id:number): Promise<DetalleUser> => {
    const response = await api.get(`/auth/${id}`)
    return response.data
}

export const LoginUser = async (payload: LoginUserPayload): Promise<LoginUserResponse> => {
    try {
        const response = await api.post("/auth/login", payload);
        return response.data;
    } catch {
        const fallbackResponse = await api.post("/auth/", payload);
        return fallbackResponse.data;
    }
}
