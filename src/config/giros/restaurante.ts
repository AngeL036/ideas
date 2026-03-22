import type { GiroConfig } from "../../types/giro.types";

const restaurante: GiroConfig = {
    giro: 'restaurante',
    nombre: 'Restaurante',
    tema: {
        primary: '#c0392b',
        secondary: '#e67e22',
        accent: '#f1c40f'
    },
     modulos: ['dashboard', 'mesas', 'pedidos', 'cocina', 'menu', 'reportes'],
  nav: [
    { label: 'Dashboard', ruta: '/',          icon: 'LayoutDashboard', roles:['owner', 'admin']},
    { label: 'Mesas',     ruta: '/mesas',     icon: 'UtensilsCrossed', roles:['owner', 'admin', 'mesero'] },
    { label: 'Pedidos',   ruta: '/pedidos',   icon: 'ClipboardList',   roles:['owner', 'admin',] },
    { label: 'Menú',      ruta: '/comida',    icon: 'BookOpen',        roles:['owner', 'admin', 'mesero']      },
    { label: 'Empleados', ruta: '/empleados', icon: 'UserCog',         roles:['owner', 'admin']},
    { label: 'Inventario',  ruta: '/inventario',  icon: 'Package'         },

   
  ],
  dashboardWidgets: ['mesas-activas', 'pedidos-en-curso', 'ventas-hoy', 'tiempo-promedio'],
}
export default restaurante