export interface RegistrarPayload {
    nombre:string,
    precio:number,
    descripcion:string,
    categoria_id: number;
    
}

export interface ResponsePayload {
    id:number,
    
}

export interface UpdatePayload {
    nombre:string,
    precio:number,
    descripcion:string,
     categoria_id: number;
    
}

export interface PlatilloPayload {
    id:number
    nombre:string,
    precio:number,
    descripcion:string,
    activo:boolean;
    categoria_id: number;
    imagen:string
    categoria? : {
        id:number
        nombre:string
    }
}
 

 
// NUEVO: tipo para categorías
export interface CategoriaPayload {
    id: number;
    nombre: string;
}