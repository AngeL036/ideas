import type { GiroConfig } from '../../types/giro.types'

const tienda: GiroConfig = {
  giro: 'tienda',
  nombre: 'Tienda / Retail',
  tema: {
    primary: '#2980b9',
    secondary: '#27ae60',
    accent: '#8e44ad',
  },
  modulos: ['dashboard', 'pos', 'inventario', 'clientes', 'compras', 'reportes'],
  nav: [
    { label: 'Dashboard',   ruta: '/',  icon: 'LayoutDashboard' },
    { label: 'Punto Venta', ruta: '/pos',         icon: 'ShoppingCart'    },
    { label: 'Inventario',  ruta: '/inventario',  icon: 'Package'         },
    { label: 'Clientes',    ruta: '/clientes',    icon: 'Users'           },
    { label: 'Compras',     ruta: '/compras',     icon: 'ShoppingBag'     },
    { label: 'Reportes',    ruta: '/reportes',    icon: 'BarChart2'       },
  ],
  dashboardWidgets: ['ventas-hoy', 'productos-bajo-stock', 'clientes-nuevos', 'top-productos'],
}

export default tienda