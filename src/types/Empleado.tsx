export interface Empleado {
    id: number;
    user_id: number;
    negocio_id: number;
    rol: string;
    activo: boolean;
    created_at: string;
}

export interface CreateEmpleadoPayload {
    nombre: string;
    apellido: string;
    edad: number;
    email: string;
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

export interface EmpleadoCreadoResponse {
    message: string;
    empleado: Empleado;
    temporal_password: string;
}
