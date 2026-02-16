export interface RegistrarPayload {
    nombre:string,
    precio:number,
    descripcion:string,
    
}

export interface ResponsePayload {
    id:number,
    
}

export interface UpdatePayload {
    nombre:string,
    precio:number,
    descripcion:string,
    
}

export interface PlatilloPayload {
    id:number
    nombre:string,
    precio:number,
    descripcion:string,
    activo:boolean
}