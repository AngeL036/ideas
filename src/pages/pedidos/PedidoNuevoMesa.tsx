import { obtenerPlatos, obtenerPlatosActivos } from "../../api/platillo.api";
import { useEffect, useState } from "react";
import type { PlatilloPayload } from "../../types/Platillo";
import PedidoCard from "../../components/pedidos/PedidoCard";
import { useNavigate, useParams } from "react-router-dom";
import { agregarPlato } from "../../api/pedido.api";
import type { PedidoMesa } from "../../types/Pedido";
import Swal from "sweetalert2";

interface CarritoItem {
  id: number;
  nombre: string;
  precio: number;
  cantidad: number;
}

export default function PedidoNuevoMesa(){
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const mesaNumero = id ? Number(id) : null;
  const [comidas, setComidas] = useState<PlatilloPayload[]>([]);
  const [carrito, setCarrito] = useState<CarritoItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [guardandoPedido, setGuardandoPedido] = useState(false);
  
  const carritoKey = mesaNumero !== null && !Number.isNaN(mesaNumero) ? `carrito_mesa_${mesaNumero}` : "carrito_mesa";

  useEffect(() => {
    cargarComidas();
  }, []);

  useEffect(() => {
    cargarCarrito();
  }, [carritoKey]);

  useEffect(() => {
    if (mesaNumero !== null && !Number.isNaN(mesaNumero)) {
      localStorage.setItem("mesa_numero", String(mesaNumero));
    }
  }, [mesaNumero]);

  const cargarComidas = async () => {
    try {
      const data = await obtenerPlatosActivos();
      setComidas(data);
    } catch (error) {
      console.error("Error al cargar la comida", error);
    } finally {
      setLoading(false);
    }
  };

  const cargarCarrito = () => {
    const data = JSON.parse(localStorage.getItem(carritoKey) || "[]");
    setCarrito(data);
  };

  const total = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

  const confirmarPedidoMesa = async () => {
    if (mesaNumero === null || Number.isNaN(mesaNumero)) {
      Swal.fire("Mesa invalida", "No se pudo identificar el numero de mesa.", "error");
      return;
    }

    if (carrito.length === 0) {
      Swal.fire("Sin productos", "Agrega al menos una comida antes de confirmar.", "info");
      return;
    }
    const data = localStorage.getItem("user")
    const user = data ? JSON.parse(data) : null
    const payload: PedidoMesa = {
      items: carrito.map((item) => ({
        platillo_id: item.id,
        cantidad: item.cantidad,
        nombre: item.nombre,
        precio: item.precio,
      })),
      mesa_id: mesaNumero,
    };
    console.log(payload)

    try {
      setGuardandoPedido(true);
      const response = await agregarPlato(payload);
      localStorage.removeItem(carritoKey);
      setCarrito([]);
      Swal.fire("Pedido creado", response.message ?? `Orden registrada para la mesa #${mesaNumero}.`, "success");
      navigate(`/mesa/editar/${mesaNumero}`);
    } catch (error) {
      console.error("Error al crear pedido de mesa", error);
      Swal.fire("Error", "No se pudo crear la orden de la mesa.", "error");
    } finally {
      setGuardandoPedido(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-60 items-center justify-center">
        <p className="text-lg text-slate-500 animate-pulse">Cargando platillos...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <header className="rounded-2xl border border-slate-200 bg-white/80 p-6 shadow-sm backdrop-blur md:p-8">
        <h1 className="text-3xl font-black tracking-tight text-slate-900">
          Mesa #{mesaNumero ?? "sin asignar"}
        </h1>
        <p className="mt-1 text-sm text-slate-600">Selecciona productos para armar una orden y enviarla al carrito.</p>
      </header>
      {comidas.length === 0 ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">
          <p className="text-lg text-slate-500">No hay platillos registrados.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {comidas.map((comida) => (
            <PedidoCard key={comida.id} comida={comida} onAdded={cargarCarrito} storageKey={carritoKey} />
          ))}
        </div>
      )}

      <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="border-b border-slate-200 pb-2 text-2xl font-bold text-slate-900">Lista del pedido</h2>
        {carrito.length === 0 ? (
          <p className="text-slate-500">Aun no agregas comidas al pedido.</p>
        ) : (
          <>
            {carrito.map((item) => (
              <div key={item.id} className="flex items-center justify-between rounded-xl bg-slate-50 p-3">
                <span className="font-medium text-slate-700">
                  {item.cantidad} x {item.nombre}
                </span>
                <span className="font-semibold text-slate-800">${item.precio * item.cantidad}</span>
              </div>
            ))}

            <div className="flex items-center justify-between border-t border-slate-200 pt-4">
              <span className="text-lg font-bold text-slate-800">Total</span>
              <span className="text-lg font-black text-emerald-600">${total}</span>
            </div>
          </>
        )}

        <div className="pt-2">
          <button
            disabled={carrito.length === 0 || guardandoPedido}
            onClick={confirmarPedidoMesa}
            className="w-full rounded-xl bg-slate-900 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-300"
          >
            {guardandoPedido ? "Creando orden..." : "Realizar pedido"}
          </button>
        </div>
      </section>
    </div>
  );
}
