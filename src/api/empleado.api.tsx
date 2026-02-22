import api from "./api";
import type { Empleado, CreateEmpleadoPayload, UpdateEmpleadoPayload, EmpleadoConUsuario } from "../types/Empleado";

export const crearEmpleado = async (data: CreateEmpleadoPayload): Promise<Empleado> => {
    const response = await api.post("/empleados/", data);
    return response.data;
};

export const obtenerEmpleados = async (negocio_id: number): Promise<Empleado[]> => {
    const response = await api.get(`/empleados/${negocio_id}`);
    return response.data;
};

export const obtenerEmpleado = async (empleado_id: number): Promise<EmpleadoConUsuario> => {
    const response = await api.get(`/empleados/detalle/${empleado_id}`);
    return response.data;
};

export const actualizarEmpleado = async (empleado_id: number, data: UpdateEmpleadoPayload): Promise<Empleado> => {
    const response = await api.put(`/empleados/${empleado_id}`, data);
    return response.data;
};

export const desactivarEmpleado = async (empleado_id: number): Promise<{ message: string }> => {
    const response = await api.delete(`/empleados/${empleado_id}`);
    return response.data;
};
