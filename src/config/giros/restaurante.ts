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
    { label: 'Dashboard', ruta: '/', icon: 'LayoutDashboard' },
    { label: 'Mesas',     ruta: '/mesas',     icon: 'UtensilsCrossed' },
    { label: 'Pedidos',   ruta: '/pedidos',   icon: 'ClipboardList'   },
    { label: 'Menú',      ruta: '/comida',      icon: 'BookOpen'      },
    { label: 'Reportes',  ruta: '/reportes',  icon: 'BarChart2'       },
  ],
  dashboardWidgets: ['mesas-activas', 'pedidos-en-curso', 'ventas-hoy', 'tiempo-promedio'],
}
export default restaurante