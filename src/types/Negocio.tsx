export interface Negocio {
    id: number;
    owner_id: number;
    nombre: string;
    direccion: string | null;
    telefono: string | null;
    activo: boolean;
    created_at: string;
}

export interface CreateNegocioPayload {
    nombre: string;
    direccion?: string;
    telefono?: string;
}

export interface UpdateNegocioPayload {
    nombre?: string;
    direccion?: string;
    telefono?: string;
}