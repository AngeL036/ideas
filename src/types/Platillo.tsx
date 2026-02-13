export interface RegistrarPayload {
    nombre:string,
    precio:number,
    descripcion:string,
    cantidad:number
}

export interface ResponsePayload {
    id:number,
    cantidad:number,
}

export interface UpdatePayload {
    nombre:string,
    precio:number,
    descripcion:string,
    cantidad:number
}

export interface PlatilloPayload {
    id:number
    nombre:string,
    precio:number,
    descripcion:string,
    cantidad:number
    activo:boolean
}