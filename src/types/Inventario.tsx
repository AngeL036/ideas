import type { Producto } from "./Producto";
export interface InventarioCreate {
    cantidad: number;
    motivo:string;
}
export interface Precios{
    precio_compra: number;
    precio_venta: number;
}
export interface ProductoInitialCreate{
    producto:Producto;
    precios: Precios;
    inventario:InventarioCreate

}