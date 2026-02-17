export interface MesasPayload{
    id:number;
    estado:string;
}
export interface Mesa{
    numero: number
    capacidad:number
    estado:string
}

export interface createMesaPayload {
    capacidad: number
}