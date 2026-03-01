import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type {Mesa} from "../../types/Mesa"
import {eliminarMesa, ObtenerMesaId} from "../../api/mesa.api"
import { Link } from "react-router-dom";
import { ObtenerPedidosMesa } from "../../api/pedido.api";
import { DetalleOut } from "../../types/Pedido";
import { CerrarCuenta } from "../../api/pago.api";
import Swal from "sweetalert2";

export default function DetallesMesa() {
  const { id } = useParams();
  const [estado, setEstado] = useState("libre");
  const [personas, setPersonas] = useState<number | "">("");
  const [mesa, setMesa] = useState<Mesa>();
  const [detalles, setDetalles ] = useState<DetalleOut[]>([]);
  const [loading, setLoading] = useState<boolean>(true)
  const [cerrando, setCerrando] = useState<boolean>(false);
  const [openPago, setOpenPago] = useState(false)
  const [metodo, setMetodo] = useState<string>("efectivo")
  const [recibido, setRecibido] = useState<number | "">("")
  const navigate = useNavigate();

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

  const confirmarPago = async () => {
    if(!id || cerrando)  return;
    if( Number(recibido) < total ){
      Swal.fire({
        title: "Error",
        text: "El monto recibido es menor al total a pagar.",
        icon: "error",
        confirmButtonText: "Aceptar"
      });
      return;
    }
    setCerrando(true);

    try{
       await CerrarCuenta({
        metodo:metodo,
        mesa_id: Number(id),
        monto: Number(recibido)
       })
       await Swal.fire("Pago realizado","","success");
       navigate("/mesas");
    }catch(e){
      Swal.fire({
        title: "Error",
        text: "Hubo un error al cerrar la cuenta. Por favor, intenta nuevamente.",
        icon: "error",
        confirmButtonText: "Aceptar"
      });
    }finally {
      setCerrando(false);
    }
  }

  const handleEliminar = async () => {
    if(!id) return;
    const confirm = await Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción no se puede deshacer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar"
    });
    
    if(confirm.isConfirmed){
      try{
        await eliminarMesa(Number(id));
        Swal.fire("Mesa eliminada","","success");
        navigate("/mesas");
      }
      catch(e){
        Swal.fire({
          title: "Error",
          text: "Hubo un error al eliminar la mesa. Por favor, intenta nuevamente.",
          icon: "error",
          confirmButtonText: "Aceptar"
        });
      }
    }
  }
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
        <button 
          disabled={estado === "libre" || cerrando}
          onClick={() => setOpenPago(true)} 
          className="rounded-xl bg-rose-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-rose-700 disabled:cursor-not-allowed disabled:opacity-50">
          Cerrar cuenta
        </button>
          <Link
            to={`/pedido/nuevo/${mesa?.numero}`}
            className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700"
          >
            Nuevo pedido
          </Link>
          <button 
          onClick={() => handleEliminar()}
            className="rounded-xl bg-red-100 px-4 py-2 text-sm font-semibold text-red-700 ring-1 ring-red-200 hover:bg-red-200 transition">
            Eliminar
          </button>
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
              min="0"
              value={personas}
              onChange={(e) => setPersonas(e.target.value === "" ? "" : Number(e.target.value))}
              placeholder="Ej: 4"
              className="mt-1 h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-slate-900 outline-none transition focus:border-slate-400 focus:bg-white"
            />
          </div>
          {/*
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
          * */}
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
      {openPago && (
      <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-[420px] space-y-4">

        <h2 className="text-xl font-bold">Pago</h2>

        <p className="font-semibold">Total: ${total}</p>

        <select
          value={metodo}
          onChange={(e)=>setMetodo(e.target.value)}
          className="w-full border rounded p-2"
        >
          <option value="efectivo">Efectivo</option>
          <option value="tarjeta">Tarjeta</option>
        </select>

        <input
          type="number"
          min="0"
          value={recibido}
          onChange={(e)=>setRecibido(Number(e.target.value))}
          placeholder="Monto recibido"
          className="w-full border rounded p-2"
        />

        <p className="font-bold">
          Cambio: ${Math.max(Number(recibido) - total, 0)}
        </p>

        <div className="flex gap-2">
          <button
            className="flex-1 border rounded p-2"
            onClick={()=>setOpenPago(false)}
          >
            Cancelar
          </button>

          <button
            className="flex-1 bg-emerald-600 text-white rounded p-2"
            onClick={confirmarPago}
          >
            Confirmar pago
          </button>
        </div>

      </div>
    </div>
      )}
    </div>
  );
}
