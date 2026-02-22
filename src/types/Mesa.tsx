export interface MesasPayload{
    id:number;
    estado:string;
}

export interface Mesa{
    id: number;
    numero: number;
    capacidad: number;
    estado: string;
    created_at: string;
}

export interface createMesaPayload {
    negocio_id: number;
    numero: number;
    capacidad: number;
}

export interface UpdateMesaPayload {
    numero?: number;
    capacidad?: number;
}