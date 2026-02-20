import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import type { PedidoCreatePayload } from "../../types/Pedido";
import { CrearPedido } from "../../api/pedido.api";

interface CarritoItem {
  id: number;
  nombre: string;
  precio: number;
  cantidad: number;
  
}

export default function Carrito() {
  const [carrito, setCarrito] = useState<CarritoItem[]>([]);
  const user_id = 1;

  const confirmarPedido = async () => {
    try {
      const payload: PedidoCreatePayload = {
        items: carrito.map((item: CarritoItem) => ({
          platillo_id: item.id,
          nombre: item.nombre,
          precio: item.precio,
          cantidad: item.cantidad,
        })),
        total,
        user_id,
      };

      const response = await CrearPedido(payload);
      console.log(response.message);
    } catch (error) {
      console.error("Error al hacer el pedido", error);
    }
  };

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("carrito") || "[]");
    setCarrito(data);
  }, []);

  const actualizarCarrito = (items: CarritoItem[]) => {
    setCarrito(items);
    localStorage.setItem("carrito", JSON.stringify(items));
  };

  const incrementar = (id: number) => {
    const nuevo = carrito.map((item) => (item.id === id ? { ...item, cantidad: item.cantidad + 1 } : item));
    actualizarCarrito(nuevo);
  };

  const decrementar = (id: number) => {
    const nuevo = carrito
      .map((item) => (item.id === id ? { ...item, cantidad: item.cantidad - 1 } : item))
      .filter((item) => item.cantidad > 0);

    actualizarCarrito(nuevo);
  };

  const eliminarItem = (id: number) => {
    Swal.fire({
      title: "Eliminar comida?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Si, eliminar",
    }).then((res) => {
      if (res.isConfirmed) {
        actualizarCarrito(carrito.filter((item) => item.id !== id));
      }
    });
  };

  const vaciarCarrito = () => {
    Swal.fire({
      title: "Vaciar carrito",
      text: "Se eliminaran todos los productos",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Vaciar",
    }).then((res) => {
      if (res.isConfirmed) {
        actualizarCarrito([]);
      }
    });
  };

  const total = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

  if (carrito.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">
        <p className="text-slate-500">Tu carrito esta vacio.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <header className="rounded-2xl border border-slate-200 bg-white/80 p-6 shadow-sm backdrop-blur md:p-8">
        <h1 className="text-3xl font-black tracking-tight text-slate-900">Carrito</h1>
        <p className="mt-1 text-sm text-slate-600">Revisa cantidades y confirma el pedido antes de enviarlo.</p>
      </header>

      <div className="space-y-4">
        {carrito.map((item) => (
          <div key={item.id} className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div>
              <h2 className="font-semibold text-slate-800">{item.nombre}</h2>
              <p className="text-sm text-slate-500">${item.precio} c/u</p>
            </div>

            <div className="flex items-center gap-3">
              <button onClick={() => decrementar(item.id)} className="h-8 w-8 rounded-full bg-slate-200 text-slate-700 transition hover:bg-slate-300">
                -
              </button>

              <span className="font-semibold text-slate-800">{item.cantidad}</span>

              <button onClick={() => incrementar(item.id)} className="h-8 w-8 rounded-full bg-slate-200 text-slate-700 transition hover:bg-slate-300">
                +
              </button>

              <button onClick={() => eliminarItem(item.id)} className="text-sm font-semibold text-rose-600 transition hover:text-rose-700">
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <span className="text-lg font-bold text-slate-700">Total</span>
        <span className="text-2xl font-black text-emerald-600">${total}</span>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <button onClick={vaciarCarrito} className="flex-1 rounded-xl bg-rose-600 py-2.5 text-sm font-semibold text-white transition hover:bg-rose-700">
          Vaciar carrito
        </button>
        <button onClick={confirmarPedido} className="flex-1 rounded-xl bg-slate-900 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700">
          Confirmar pedido
        </button>
      </div>
    </div>
  );
}
