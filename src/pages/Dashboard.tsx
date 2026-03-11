import { useEffect, useState } from "react";
import { obtenerMesasOcupadas, obtenerTransactions } from "../api/estadisticas.api";
import type { MesasOcupadasResponse, TransactionData } from "../types/Estadisticas";



{/*
const access = [
  { label: "Gestionar menu", path: "/comida" },
  { label: "Ver pedidos", path: "/pedidos" },
  { label: "Control de mesas", path: "/mesas" },
 
];*/}
const fmt = (n: number) => `$${n.toLocaleString("es-MX")}`
const ESTADO_PILL: Record<string, string> = {
  Pagado:    "bg-emerald-100 text-emerald-700",
  Cancelado: "bg-red-100 text-red-600",
  Pendiente: "bg-amber-100 text-amber-700",
}
export default function Dashboard() {
  const [datos, setDatos] = useState<MesasOcupadasResponse>();
  const [transactions, setTransactions] = useState<TransactionData[]>([]);
  useEffect(() => {
    try {
      const fetchMesasOcupadas = async () => {
        const data = await obtenerMesasOcupadas();
        setDatos(data);
      }
      fetchMesasOcupadas();
    }catch (error) {
      console.error("Error al obtener mesas ocupadas:", error);
    }
  }, []);
  useEffect(() => {
    try{
      const fetchTransactions = async () => {
        const datos = await obtenerTransactions();
        setTransactions(datos)
      }
      fetchTransactions();
    }catch (error) {
      console.error("Error al cargar datos de ventas:", error)
    }
  },[])

  const stats = [
  { title: "Ventas del dia", value: datos?.ventas_totales.toString() || "$0", tone: "text-emerald-600" },
  { title: "Pedidos activos", value: datos?.pedidos_activos.toString() || "0", tone: "text-sky-600" },
  { title: "Mesas ocupadas", value: datos?.mesas_ocupadas.toString() || "0", tone: "text-rose-600" },
  { title: "Ticket promedio", value: datos?.ticket_promedio.toString() || "$0", tone: "text-amber-600" },
];
  return (
    <div className="space-y-8">
      <section className="rounded-2xl border border-slate-200 bg-white/80 p-6 shadow-sm backdrop-blur md:p-8">
        <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">Resumen</p>
        <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-900 md:text-4xl">Panel de Administracion</h1>
        <p className="mt-2 max-w-2xl text-slate-600">Monitorea la operacion diaria del restaurante con accesos rapidos y metricas clave.</p>
      </section>

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => (
          <article key={item.title} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-slate-500">{item.title}</p>
            <p className={`mt-3 text-3xl font-black ${item.tone}`}>{item.value}</p>
          </article>
        ))}
      </section>

     {/* <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-bold text-slate-900">Accesos rapidos</h2>
        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {access.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:-translate-y-0.5 hover:bg-slate-100"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </section>*/}
          {/* ── TABLA ── */}
      <div className="rounded-2xl border border-slate-100 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
          <h2 className="text-sm font-bold text-slate-700">Transacciones recientes</h2>
          <span className="rounded-full bg-slate-100 px-3 py-0.5 text-xs font-semibold text-slate-500">
            {transactions.length} registros
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
              {transactions.map((t, i) => (
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
  );
}
