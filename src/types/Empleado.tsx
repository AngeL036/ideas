export interface Empleado {
    id: number;
    user_id: number;
    negocio_id: number;
    rol: string;
    activo: boolean;
    created_at: string;
}

export interface CreateEmpleadoPayload {
    user_id: number;
    negocio_id: number;
    rol: string;
}

export interface UpdateEmpleadoPayload {
    rol?: string;
    activo?: boolean;
}

export interface EmpleadoConUsuario extends Empleado {
    usuario?: {
        id: number;
        email: string;
    };
}
