


export interface ItemVenta {
    producto_id: number
    cantidad: number
}
 
export interface VentaResponse {
    mensaje: string
    venta_id: number
    total: number
}
 
export interface PagoPayload {
    monto_pagado: number
    metodo?: "efectivo" | "tarjeta" | "transferencia"
}