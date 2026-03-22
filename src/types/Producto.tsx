export interface Producto {
    nombre:string;
    unidad:string;
    codigo?: string | null;
    categoria_id?: number | null;
    stock_minimo?: number;
    activo?: boolean;
}