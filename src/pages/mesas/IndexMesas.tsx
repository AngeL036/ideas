import { useEffect, useState } from "react";
import ContadorMesas from "../../components/mesas/ContadorMesas";
import Mesas from "../../components/mesas/Mesas";
import type { Mesa } from "../../types/Mesa";
import { obtenerMesas } from "../../api/mesa.api";
import { CrearMesa } from "../../api/mesa.api";
import Swal from "sweetalert2";
export default function IndexMesas() {
  const [mesas,setMesas] = useState<Mesa[]>([])
  const [loading,setLoading] = useState(true)
  const [mesaNueva, setMesaNueva ] = useState<Mesa | null>(null);
  {/*
  const mesas = [
    { id: 1, estado: "ocupada" },
    { id: 2, estado: "libre" },
    { id: 3, estado: "ocupada" },
    { id: 4, estado: "libre" },
    { id: 5, estado: "libre" },
  ];* */}

  useEffect(() => {
    cargarMesas();
  },[])

  const cargarMesas = async () => {
    try{
      const data = await obtenerMesas();
      setMesas(data)
    }catch(error){
      console.error("error al cargar las mesas", error);
    }finally{
      setLoading(false)
    }
  }
  const handleAgregarMesa = async () => {
    try{
      const nuevaMesa = await CrearMesa();
      setMesaNueva(nuevaMesa);
      cargarMesas(); // Refresca la lista de mesas  
    }catch(error){
      Swal.fire({
        icon: "error",
        title: "Error al agregar mesa",
        text: "Ocurrió un error al intentar agregar una nueva mesa. Por favor, intenta nuevamente.",
      });
    }
  }
  
 if (loading) {
    return (
      <div className="flex h-60 items-center justify-center">
        <p className="text-lg text-slate-500 animate-pulse">Cargando Mesas...</p>
      </div>
    );
  }
  const libres = mesas.filter((m) => m.estado === "libre").length;
  const ocupadas = mesas.filter((m) => m.estado === "ocupada").length;
  const totalMesas = mesas.length;

  const capacidadMaxima = 50;
  const porcentaje = Math.round((ocupadas / capacidadMaxima) * 100);

  

  return (
    <div className="space-y-6">
      <header className="rounded-2xl border border-slate-200 bg-white/80 p-6 shadow-sm backdrop-blur md:p-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div >
          <h1 className="text-3xl font-black tracking-tight text-slate-900">Gestion de Mesas</h1>
          <p className="mt-1 text-sm text-slate-600">Visualiza disponibilidad y carga operativa del salon.</p>
        </div>
      
        <button
        onClick={() => handleAgregarMesa()}
          className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700"
          >
            Agregar Mesa
        </button>
      </div>
      </header>

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        <ContadorMesas numero={totalMesas} estado="Total" />
        <ContadorMesas numero={libres} estado="Disponibles" />
        <ContadorMesas numero={ocupadas} estado="Ocupadas" />
        <ContadorMesas numero={porcentaje} estado="Uso (%)" />
      </section>

      <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-bold text-slate-900">Capacidad del restaurante</h2>
        <div className="flex justify-between text-sm text-slate-600">
          <span>{ocupadas} de {capacidadMaxima} personas</span>
          <span>{porcentaje}%</span>
        </div>
        <div className="h-3 w-full overflow-hidden rounded-full bg-slate-200">
          <div className="h-3 rounded-full bg-slate-900 transition-all duration-500" style={{ width: `${porcentaje}%` }} />
        </div>
      </section>

      {mesas.length === 0 ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">
          <p className="text-lg text-slate-500">No hay Mesas registrados.</p>
        </div>
      ): (
        <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {mesas.map((mesa) => (
          <Mesas key={mesa.numero} mesa={mesa} />
        ))}
      </section>
      )}
     
    </div>
  );
}
