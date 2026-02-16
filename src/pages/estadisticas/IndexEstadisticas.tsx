export default function IndexEstadisticas() {
  return (
    <div className="space-y-6">
      <header className="rounded-2xl border border-slate-200 bg-white/80 p-6 shadow-sm backdrop-blur md:p-8">
        <h1 className="text-3xl font-black tracking-tight text-slate-900">Estadisticas</h1>
        <p className="mt-2 text-slate-600">Indicadores de rendimiento para cocina, mesas y ordenes.</p>
      </header>

      <section className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900">Comportamiento semanal</h2>
          <p className="mt-2 text-sm text-slate-500">Aun no hay suficientes datos para mostrar tendencias.</p>
        </article>
        <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900">Comparativo de categorias</h2>
          <p className="mt-2 text-sm text-slate-500">Esta vista quedo lista visualmente para conectar graficas.</p>
        </article>
      </section>
    </div>
  );
}
