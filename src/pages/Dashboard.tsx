import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { obtenerMesasOcupadas } from "../api/estadisticas.api";
import type { MesasOcupadasResponse } from "../types/Estadisticas";



const access = [
  { label: "Gestionar menu", path: "/comida" },
  { label: "Ver pedidos", path: "/pedidos" },
  { label: "Control de mesas", path: "/mesas" },
  { label: "Carrito", path: "/carrito" },
];

export default function Dashboard() {
  const [datos, setDatos] = useState<MesasOcupadasResponse>();
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

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
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
      </section>
    </div>
  );
}
