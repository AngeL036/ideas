export type GiroId = 'restaurante' | 'tienda' | 'clinica'

export interface NavItem {
    label: string
    ruta: string
    icon: string
    badge?: string
}

export interface Tema {
    primary: string
    secondary: string
    accent: string
    logo?: string
}

export interface GiroConfig {
    giro: GiroId
    nombre: string
    tema: Tema
    modulos: string[]
    nav: NavItem[]
    dashboardWidgets?: string[]
}