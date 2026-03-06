import type { GiroConfig } from '../../types/giro.types'

const clinica: GiroConfig = {
  giro: 'clinica',
  nombre: 'Clínica / Servicios',
  tema: {
    primary: '#16a085',
    secondary: '#2980b9',
    accent: '#1abc9c',
  },
  modulos: ['dashboard', 'citas', 'expedientes', 'pacientes', 'pagos', 'reportes'],
  nav: [
    { label: 'Dashboard',   ruta: '/dashboard',   icon: 'LayoutDashboard' },
    { label: 'Citas',       ruta: '/citas',        icon: 'CalendarCheck'   },
    { label: 'Expedientes', ruta: '/expedientes',  icon: 'FolderHeart'     },
    { label: 'Pacientes',   ruta: '/pacientes',    icon: 'UserRound'       },
    { label: 'Pagos',       ruta: '/pagos',        icon: 'CreditCard'      },
    { label: 'Reportes',    ruta: '/reportes',     icon: 'BarChart2'       },
  ],
  dashboardWidgets: ['citas-hoy', 'pacientes-activos', 'ingresos-mes', 'proximas-citas'],
}

export default clinica