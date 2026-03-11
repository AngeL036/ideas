export interface MesasOcupadasResponse {
    mesas_ocupadas: number;
    pedidos_activos: number;
    ventas_totales: number;
    ticket_promedio: number;
}

export interface TransactionData {
    id:number;
    fecha: string;
    cliente:string;
    monto:number;
    estado:string;
    metodo:string;
}