export interface RegisterUser {
    email:string,
    password:string
}

export interface LoginUserPayload {
    email: string;
    password: string;
}

export interface LoginUserResponse {
    token?: string;
    access_token?: string;
    access?: string;
    jwt?: string;
    user?: DetalleUser;
    email?: string;
}

export interface DetalleUser {
    id:number;
    email:string;
    role?: string;
    created_at:string;
     // 'owner', 'employee', etc.
}
