import { obtenerPlatosActivos } from "../../api/platillo.api";
import { useEffect, useState } from "react";
import type { PlatilloPayload } from "../../types/Platillo";
import PedidoCard from "../../components/pedidos/PedidoCard";
import { useNavigate, useParams } from "react-router-dom";
import { agregarPlato, ObtenerPedidosMesa } from "../../api/pedido.api";
import type { DetalleOut } from "../../types/Pedido";
import Swal from "sweetalert2";

interface CarritoItem {
  platillo_id: number;
  nombre: string;
  precio: number;
  cantidad: number;
}

export default function PedidoNuevoMesa() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const mesaNumero = id ? Number(id) : null;

  const [comidas, setComidas] = useState<PlatilloPayload[]>([]);
  const [detalles, setDetalles] = useState<DetalleOut[]>([]);        // ✅ confirmados en backend
  const [carrito, setCarrito] = useState<CarritoItem[]>([]);         // ✅ pendientes de enviar
  const [loading, setLoading] = useState(true);
  const [guardandoPedido, setGuardandoPedido] = useState(false);

  const [categoriaActiva , setCategoriaActiva] = useState("Todas");
  const [busqueda, setBusqueda] = useState("");

  // Cargar platillos disponibles
  useEffect(() => {
    const fetchComidas = async () => {
      try {
        const data = await obtenerPlatosActivos();
        setComidas(data);
      } catch (error) {
        console.error("Error al cargar platillos:", error);
      }
    };
    fetchComidas();
  }, []);

  // Cargar pedido activo de la mesa
  useEffect(() => {
    const fetchPedido = async () => {
      try {
        const data = await ObtenerPedidosMesa(Number(id));
        setDetalles(data);
      } catch (error) {
        console.error("Error al obtener pedido:", error);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchPedido();
  }, [id]);
  //
  const categorias = [
    "Todas",
    ...new Set(comidas.map((c) => c.categoria?.nombre || "Otros"))
  ];
  const comidasFiltradas = comidas.filter((c) => {

    const coincideCategoria = 
      categoriaActiva === "Todas" || 
      (c.categoria?.nombre || "Otros") === categoriaActiva;

      const coincideBusqueda = 
        c.nombre.toLocaleLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").includes(busqueda.toLocaleLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""));
      return coincideBusqueda && coincideCategoria;
  });

  // Acumula items en el carrito local (sin backend todavía)
  const handleAgregar = (platillo_id: number, nombre: string, precio: number, cantidad: number) => {
    setCarrito((prev) => {
      const existe = prev.find((item) => item.platillo_id === platillo_id);
      if (existe) {
        return prev.map((item) =>
          item.platillo_id === platillo_id
            ? { ...item, cantidad: item.cantidad + cantidad }
            : item
        );
      }
      return [...prev, { platillo_id, nombre, precio, cantidad }];
    });
  };

  // Quitar un item del carrito
  const handleQuitarDelCarrito = (platillo_id: number) => {
    setCarrito((prev) => prev.filter((item) => item.platillo_id !== platillo_id));
  };

  // Envía el carrito al backend
  const handleRealizarPedido = async () => {
    if (carrito.length === 0) return;
    setGuardandoPedido(true);
    try {
      await agregarPlato({
        mesa_id: Number(id),
        items: carrito.map((item) => ({
          platillo_id: item.platillo_id,
          cantidad: item.cantidad,
        })),
      });

      // Refresca detalles confirmados y limpia carrito
      const data = await ObtenerPedidosMesa(Number(id));
      setDetalles(data);
      setCarrito([]);

      Swal.fire({
        icon: "success",
        title: "¡Pedido enviado!",
        text: "Los platillos fueron agregados al pedido.",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      Swal.fire({ icon: "error", title: "Error", text: "No se pudo enviar el pedido" });
    } finally {
      setGuardandoPedido(false);
    }
  };

  const totalDetalles = detalles.reduce((acc, item) => acc + item.platillo.precio * item.cantidad, 0);
  const totalCarrito = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

  if (loading) {
    return (
      <div className="flex h-60 items-center justify-center">
        <p className="text-lg text-slate-500 animate-pulse">Cargando platillos...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* Header */}
      <header className="rounded-2xl border border-slate-200 bg-white/80 p-6 shadow-sm backdrop-blur md:p-8">
        <h1 className="text-3xl font-black tracking-tight text-slate-900">
          Mesa #{mesaNumero ?? "sin asignar"}
        </h1>
        <p className="mt-1 text-sm text-slate-600">
          Selecciona productos para armar una orden y enviarla.
        </p>
      </header>
      <input 
        placeholder="Buscar platillo..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        className="w-full rounded-xl border p-3"
      />
      <div className="flex gap-2 overflow-x-auto">
        {categorias.map((cat) => (
          <button
          key={cat}
          onClick={() => setCategoriaActiva(cat)}
          className={`px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap 
            ${categoriaActiva === cat
              ? "bg-emerald-600 text-white"
              : "bg-slate-100 hover:bg-slate-200"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid de platillos */}
      {comidas.length === 0 ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">
          <p className="text-lg text-slate-500">No hay platillos registrados.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {comidasFiltradas.map((comida) => (
            <PedidoCard key={comida.id} comida={comida} onAgregar={handleAgregar} />
          ))}
        </div>
      )}

      {/* ✅ Carrito pendiente — aún no enviado al backend */}
      {carrito.length > 0 && (
        <section className="space-y-4 rounded-2xl border border-amber-200 bg-amber-50 p-6 shadow-sm">
          <h2 className="border-b border-amber-200 pb-2 text-2xl font-bold text-amber-800">
            🛒 Por enviar
          </h2>
          {carrito.map((item) => (
            <div key={item.platillo_id} className="flex items-center justify-between rounded-xl bg-white p-3 shadow-sm">
              <span className="font-medium text-slate-700">
                {item.cantidad} x {item.nombre}
              </span>
              <div className="flex items-center gap-3">
                <span className="font-semibold text-slate-800">${item.precio * item.cantidad}</span>
                <button
                  onClick={() => handleQuitarDelCarrito(item.platillo_id)}
                  className="text-xs text-red-400 hover:text-red-600 transition"
                >
                  ✕ quitar
                </button>
              </div>
            </div>
          ))}

          <div className="flex items-center justify-between border-t border-amber-200 pt-3">
            <span className="font-bold text-amber-800">Subtotal</span>
            <span className="font-black text-amber-700">${totalCarrito}</span>
          </div>

          <button
            disabled={guardandoPedido}
            onClick={handleRealizarPedido}
            className="w-full rounded-xl bg-amber-500 py-2.5 text-sm font-semibold text-white transition hover:bg-amber-600 disabled:cursor-not-allowed disabled:bg-amber-300"
          >
            {guardandoPedido ? "Enviando..." : "Confirmar y enviar pedido"}
          </button>
        </section>
      )}

      {/* ✅ Detalles confirmados — ya están en el backend */}
      <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="border-b border-slate-200 pb-2 text-2xl font-bold text-slate-900">
          📋 Pedido confirmado
        </h2>

        {detalles.length === 0 ? (
          <p className="text-slate-500">Aún no hay items confirmados en este pedido.</p>
        ) : (
          <>
            {detalles.map((item) => (
              <div key={item.id} className="flex items-center justify-between rounded-xl bg-slate-50 p-3">
                <span className="font-medium text-slate-700">
                  {item.cantidad} x {item.platillo.nombre}
                </span>
                <span className="font-semibold text-slate-800">
                  ${item.platillo.precio * item.cantidad}
                </span>
              </div>
            ))}

            <div className="flex items-center justify-between border-t border-slate-200 pt-4">
              <span className="text-lg font-bold text-slate-800">Total</span>
              <span className="text-lg font-black text-emerald-600">${totalDetalles}</span>
            </div>
          </>
        )}
      </section>

    </div>
  );
}
