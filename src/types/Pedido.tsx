export interface PedidoItem{
    id:number;
    usuario_id:number;
    direccion_envio:string;
    total:number;
    estado:string;
    create_at:string;
}
export interface pedido{
    id:number;
    precio:number;
    
}

export interface PedidoCreatePayload{
    items: PedidoItem[];
    total: number;
    user_id:number
} 

export interface PedidoResponse{
    message:string;
    pedido_id:number;
    total:number;
}

export interface Detalle{
    id:number;
    pedido_id:number;
    platillo_id:number;
    cantidad:number;
    precio_unitario:number;
    subtotal:number;
}

export interface DetallePedido{
    detalle_items:Detalle[];
    
}