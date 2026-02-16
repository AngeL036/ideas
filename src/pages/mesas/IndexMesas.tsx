import ContadorMesas from "../../components/mesas/ContadorMesas";
import Mesas from "../../components/mesas/Mesas";

export default function IndexMesas() {
  const mesas = [
    { id: 1, estado: "ocupada" },
    { id: 2, estado: "libre" },
    { id: 3, estado: "ocupada" },
    { id: 4, estado: "libre" },
    { id: 5, estado: "libre" },
  ];

  const libres = mesas.filter((m) => m.estado === "libre").length;
  const ocupadas = mesas.filter((m) => m.estado === "ocupada").length;
  const totalMesas = mesas.length;

  const capacidadMaxima = 50;
  const porcentaje = Math.round((ocupadas / capacidadMaxima) * 100);

  return (
    <div className="space-y-6">
      <header className="rounded-2xl border border-slate-200 bg-white/80 p-6 shadow-sm backdrop-blur md:p-8">
        <h1 className="text-3xl font-black tracking-tight text-slate-900">Gestion de Mesas</h1>
        <p className="mt-1 text-sm text-slate-600">Visualiza disponibilidad y carga operativa del salon.</p>
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

      <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {mesas.map((mesa) => (
          <Mesas key={mesa.id} mesa={mesa} />
        ))}
      </section>
    </div>
  );
}
