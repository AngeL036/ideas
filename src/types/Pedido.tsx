export interface PedidoItem{
    id:number
    negocio_id:number
    mesa_id:number
    mesero_id:number
    total:number
    estado:string
    created_at:string
}
export interface pedido{
    id:number;
    precio:number;
    
}

export interface PedidoCreatePayload{
    items: PedidoCreateItem[];
    total: number;
    user_id:number
    mesa_numero?: number;
}
export interface PedidoMesa{
    items:PedidoCreateItem[];
    mesa_id:number;
} 

export interface PedidoCreateItem{
    platillo_id: number;
    cantidad: number;
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

export interface DetalleOut {
  id:number
  cantidad:number
  precio_unitario:number
  platillo:{
    id:number
    nombre:string
    precio:number
  }
}