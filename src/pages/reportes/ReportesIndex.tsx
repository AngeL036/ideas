import { useState, useMemo } from "react"
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts"
import { Download, FileText, TrendingUp, ShoppingBag, Users, CreditCard, ChevronDown, Calendar } from "lucide-react"

// ── Mock data ────────────────────────────────────────────────────────────────
const MONTHLY = [
  { mes: "Ene", ingresos: 42000, gastos: 18000, transacciones: 310 },
  { mes: "Feb", ingresos: 38500, gastos: 16200, transacciones: 280 },
  { mes: "Mar", ingresos: 51000, gastos: 21000, transacciones: 390 },
  { mes: "Abr", ingresos: 47800, gastos: 19500, transacciones: 355 },
  { mes: "May", ingresos: 63200, gastos: 24000, transacciones: 480 },
  { mes: "Jun", ingresos: 58900, gastos: 22800, transacciones: 430 },
]

const TOP_PRODUCTS = [
  { nombre: "Hamburguesa Clásica", ventas: 820, ingresos: 32800 },
  { nombre: "Pizza Margherita",    ventas: 640, ingresos: 28160 },
  { nombre: "Refresco 500ml",      ventas: 1200, ingresos: 14400 },
  { nombre: "Pasta Alfredo",       ventas: 510, ingresos: 22950 },
  { nombre: "Ensalada César",      ventas: 430, ingresos: 15480 },
]

const TRANSACTIONS = [
  { id: "#0091", fecha: "12 Jun 2025", cliente: "Mesa 4",     monto: 850, estado: "Pagado",    metodo: "Efectivo" },
  { id: "#0090", fecha: "12 Jun 2025", cliente: "Llevar",     monto: 420, estado: "Pagado",    metodo: "Tarjeta"  },
  { id: "#0089", fecha: "12 Jun 2025", cliente: "Mesa 7",     monto: 1230, estado: "Pagado",   metodo: "Tarjeta"  },
  { id: "#0088", fecha: "11 Jun 2025", cliente: "Delivery",   monto: 670, estado: "Cancelado", metodo: "App"      },
  { id: "#0087", fecha: "11 Jun 2025", cliente: "Mesa 2",     monto: 980, estado: "Pagado",    metodo: "Efectivo" },
  { id: "#0086", fecha: "11 Jun 2025", cliente: "Mesa 1",     monto: 350, estado: "Pendiente", metodo: "Tarjeta"  },
]

// ── Helpers ──────────────────────────────────────────────────────────────────
const fmt = (n: number) => `$${n.toLocaleString("es-MX")}`

const ESTADO_PILL: Record<string, string> = {
  Pagado:    "bg-emerald-100 text-emerald-700",
  Cancelado: "bg-red-100 text-red-600",
  Pendiente: "bg-amber-100 text-amber-700",
}

// ── Component ────────────────────────────────────────────────────────────────
export default function Reportes() {
  const [periodo, setPeriodo] = useState("Este mes")
  const [tipoReporte, setTipoReporte] = useState("Ventas")

  const kpis = useMemo(() => {
    const total    = MONTHLY.reduce((s, m) => s + m.ingresos, 0)
    const gastos   = MONTHLY.reduce((s, m) => s + m.gastos, 0)
    const txns     = MONTHLY.reduce((s, m) => s + m.transacciones, 0)
    const ticket   = Math.round(total / txns)
    return { total, gastos, txns, ticket }
  }, [])

  return (
    <div className="space-y-6 font-sans">

      {/* ── HEADER ── */}
      <header className="rounded-2xl border border-slate-200 bg-white/80 p-6 shadow-sm backdrop-blur md:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-black tracking-tight text-slate-900">Reportes</h1>
            <p className="mt-1 text-sm text-slate-500">Generador de reportes · datos en tiempo real</p>
          </div>

          {/* Controles */}
          <div className="flex flex-wrap gap-2">
            {/* Selector tipo */}
            <div className="relative">
              <select
                value={tipoReporte}
                onChange={e => setTipoReporte(e.target.value)}
                className="appearance-none rounded-xl border border-slate-200 bg-white py-2 pl-4 pr-8 text-sm font-medium text-slate-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-300"
              >
                {["Ventas","Inventario","Clientes","Gastos"].map(o => (
                  <option key={o}>{o}</option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-2 top-2.5 h-4 w-4 text-slate-400" />
            </div>

            {/* Selector período */}
            <div className="relative">
              <select
                value={periodo}
                onChange={e => setPeriodo(e.target.value)}
                className="appearance-none rounded-xl border border-slate-200 bg-white py-2 pl-4 pr-8 text-sm font-medium text-slate-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-300"
              >
                {["Hoy","Esta semana","Este mes","Últimos 6 meses","Este año"].map(o => (
                  <option key={o}>{o}</option>
                ))}
              </select>
              <Calendar className="pointer-events-none absolute right-2 top-2.5 h-4 w-4 text-slate-400" />
            </div>

            {/* Exportar */}
            <button className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50">
              <Download className="h-4 w-4" /> Excel
            </button>
            <button className="flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-700">
              <FileText className="h-4 w-4" /> PDF
            </button>
          </div>
        </div>
      </header>

      {/* ── KPI CARDS ── */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {[
          { label: "Ingresos totales",  value: fmt(kpis.total),   sub: "+8.4% vs mes ant.", icon: TrendingUp,  color: "text-emerald-600", bg: "bg-emerald-50" },
          { label: "Transacciones",     value: kpis.txns,          sub: "+12% vs mes ant.", icon: ShoppingBag, color: "text-blue-600",    bg: "bg-blue-50"    },
          { label: "Ticket promedio",   value: fmt(kpis.ticket),   sub: "Por venta",        icon: CreditCard,  color: "text-violet-600",  bg: "bg-violet-50"  },
          { label: "Gastos",            value: fmt(kpis.gastos),   sub: "Costo operativo",  icon: Users,       color: "text-rose-600",    bg: "bg-rose-50"    },
        ].map(({ label, value, sub, icon: Icon, color, bg }) => (
          <div key={label} className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
            <div className={`mb-3 inline-flex rounded-xl p-2 ${bg}`}>
              <Icon className={`h-5 w-5 ${color}`} />
            </div>
            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">{label}</p>
            <p className="mt-1 text-2xl font-black text-slate-900">{value}</p>
            <p className="mt-0.5 text-xs text-slate-400">{sub}</p>
          </div>
        ))}
      </div>

      {/* ── GRÁFICAS ── */}
      <div className="grid gap-6 lg:grid-cols-5">

        {/* Área: ingresos vs gastos */}
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm lg:col-span-3">
          <h2 className="mb-4 text-sm font-bold text-slate-700">Ingresos vs Gastos · últimos 6 meses</h2>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={MONTHLY} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="gIngresos" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#0ea5e9" stopOpacity={0.15}/>
                  <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="gGastos" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#f43f5e" stopOpacity={0.12}/>
                  <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="mes" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} tickFormatter={v => `$${v/1000}k`} />
              <Tooltip formatter={(v) => fmt(Number(v))} contentStyle={{ borderRadius: 12, border: "1px solid #e2e8f0", fontSize: 12 }} />
              
              <Area type="monotone" dataKey="ingresos" name="Ingresos" stroke="#0ea5e9" strokeWidth={2.5} fill="url(#gIngresos)" dot={false} />
              <Area type="monotone" dataKey="gastos"   name="Gastos"   stroke="#f43f5e" strokeWidth={2}   fill="url(#gGastos)"   dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Bar: top productos */}
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm lg:col-span-2">
          <h2 className="mb-4 text-sm font-bold text-slate-700">Top productos · unidades vendidas</h2>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={TOP_PRODUCTS} layout="vertical" margin={{ top: 0, right: 8, left: 4, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 10, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <YAxis dataKey="nombre" type="category" tick={{ fontSize: 10, fill: "#64748b" }} axisLine={false} tickLine={false} width={110} />
              <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #e2e8f0", fontSize: 12 }} />
              <Bar dataKey="ventas" name="Unidades" fill="#818cf8" radius={[0, 6, 6, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ── TABLA ── */}
      <div className="rounded-2xl border border-slate-100 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
          <h2 className="text-sm font-bold text-slate-700">Transacciones recientes</h2>
          <span className="rounded-full bg-slate-100 px-3 py-0.5 text-xs font-semibold text-slate-500">
            {TRANSACTIONS.length} registros
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-50 text-left text-xs font-semibold uppercase tracking-wide text-slate-400">
                {["ID","Fecha","Cliente","Método","Monto","Estado"].map(h => (
                  <th key={h} className="px-6 py-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {TRANSACTIONS.map((t, i) => (
                <tr key={t.id} className={`border-b border-slate-50 transition hover:bg-slate-50/60 ${i % 2 === 0 ? "" : "bg-slate-50/30"}`}>
                  <td className="px-6 py-3 font-mono text-xs font-semibold text-slate-500">{t.id}</td>
                  <td className="px-6 py-3 text-slate-600">{t.fecha}</td>
                  <td className="px-6 py-3 font-medium text-slate-800">{t.cliente}</td>
                  <td className="px-6 py-3 text-slate-500">{t.metodo}</td>
                  <td className="px-6 py-3 font-bold text-slate-900">{fmt(t.monto)}</td>
                  <td className="px-6 py-3">
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${ESTADO_PILL[t.estado]}`}>
                      {t.estado}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  )
}