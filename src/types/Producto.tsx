export interface Producto {
    marca:string;
    unidad:string;
    codigo?: string | null;
    categoria_id?: number | null;
    stock_minimo?: number;
    activo?: boolean;
}

export interface ProductoResponse {
    id: number;
    categoria_id:number;
    codigo:string;
    marca:string;
    unidad:string;
    cantidad_actual:number;
    stock_minimo: number;
    precio_compra: number;
    precio_venta:number;
    activo: boolean;
    estado_stock: number;
    created_at: number;
}