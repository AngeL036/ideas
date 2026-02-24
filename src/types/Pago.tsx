export interface Pago {
    id: number;
    pedido_id: number;
    metodo: string;
    monto: number;
    fecha: string;
}

export interface PagoCreatePayload {
    metodo: string;
    monto: number;
}

export interface ResumenPago {
    pedido_id: number;
    total: number;
    pagado: number;
    faltante: number;
    estado: string; // "abierto" | "parcial" | "pagado"
}

export interface PedidoPago {
    metodo: string;
    mesa_id :number;
}