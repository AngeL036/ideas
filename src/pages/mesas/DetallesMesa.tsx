import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type {Mesa} from "../../types/Mesa"
import {ObtenerMesaId} from "../../api/mesa.api"
import { Link } from "react-router-dom";
import { ObtenerPedidosMesa } from "../../api/pedido.api";
import { DetalleOut } from "../../types/Pedido";
import ListaProductos from "../../components/mesas/ListaProductos";

export default function DetallesMesa() {
  const { id } = useParams();
  const [estado, setEstado] = useState("libre");
  const [personas, setPersonas] = useState<number | "">("");
  const [mesa, setMesa] = useState<Mesa>();
  const [detalles, setDetalles ] = useState<DetalleOut[]>([]);
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const carga = async () => {
      if(id){
        const data = await ObtenerMesaId(Number(id));
        setMesa(data);
        setEstado(data.estado);
        setPersonas(data.capacidad);
      }
    }
    carga();
  },[id])

  useEffect(() => {
    const pedidos = async () => {
      try{
        const data = await ObtenerPedidosMesa(Number(id));
        setDetalles(data);
      }finally {
        setLoading(false)
      }
    }
    pedidos();
  },[id])

  const colorEstado =
    estado === "libre"
      ? "bg-emerald-100 text-emerald-700"
      : estado === "ocupada"
      ? "bg-rose-100 text-rose-700"
      : "bg-amber-100 text-amber-700";

      const total = detalles.reduce((acc, d) => acc + d.cantidad * d.precio_unitario,0);
  return (
    <div className="space-y-6">
      <header className="rounded-2xl border border-slate-200 bg-white/80 p-6 shadow-sm backdrop-blur md:p-8">
        <h1 className="text-3xl font-black tracking-tight text-slate-900">Detalle de Mesa</h1>
        <p className="mt-1 text-sm text-slate-600">Administracion operativa de la mesa #{id}.</p>
      </header>

      <div className="flex flex-wrap gap-3">
        <button disabled={estado === "libre"} className="rounded-xl bg-rose-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-rose-700 disabled:cursor-not-allowed disabled:opacity-50">
          Cerrar cuenta
        </button>
          <Link
            to={`/pedido/nuevo/${mesa?.numero}`}
            className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700"
          >
            Nuevo pedido
          </Link>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <section className="space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-900">Mesa #{mesa?.numero}</h2>

          <div className="flex items-center gap-3">
            <span className="text-sm font-semibold text-slate-600">Estado actual:</span>
            <span className={`rounded-full px-3 py-1 text-sm font-semibold ${colorEstado}`}>{estado}</span>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-600">Numero de personas</label>
            <input
              type="number"
              value={personas}
              onChange={(e) => setPersonas(e.target.value === "" ? "" : Number(e.target.value))}
              placeholder="Ej: 4"
              className="mt-1 h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-slate-900 outline-none transition focus:border-slate-400 focus:bg-white"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-600">Cambiar estado</label>
            <select
              value={estado}
              onChange={(e) => setEstado(e.target.value)}
              className="mt-1 h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-slate-900 outline-none transition focus:border-slate-400 focus:bg-white"
            >
              <option value="libre">Libre</option>
              <option value="ocupada">Ocupada</option>
              <option value="reservado">Reservado</option>
            </select>
          </div>
        </section>

        <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2">
          <h2 className="border-b border-slate-200 pb-2 text-2xl font-bold text-slate-900">Productos pedidos</h2>
          {detalles.length === 0 ? (
            <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">
              <p className="text-lg text-slate-500">No hay pedidos</p>
            </div>
          ):(
            <div className="space-y-3">
              {detalles.map((d) => (
                <div
                  key={d.id}
                  className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 hover:bg-white transition"
                >
                  <div>
                    <p className="font-semibold text-slate-800">
                      {d.platillo.nombre}
                    </p>
                    <p className="text-sm text-slate-500">
                      {d.cantidad} x ${d.precio_unitario}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="font-bold text-slate-900">
                      ${(d.cantidad * d.precio_unitario).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
          <div className="flex items-center justify-between border-t border-slate-200 pt-4">
            <span className="text-lg font-bold text-slate-800">Total</span>
            <span className="text-lg font-black text-emerald-600">${total}</span>
          </div>
        </section>
      </div>
    </div>
  );
}
