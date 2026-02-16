export default function IndexVenta() {
  return (
    <div className="space-y-6">
      <header className="rounded-2xl border border-slate-200 bg-white/80 p-6 shadow-sm backdrop-blur md:p-8">
        <h1 className="text-3xl font-black tracking-tight text-slate-900">Ventas</h1>
        <p className="mt-2 text-slate-600">Resumen comercial y corte diario del restaurante.</p>
      </header>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Ingreso del dia</p>
          <p className="mt-2 text-3xl font-black text-emerald-600">$0.00</p>
        </article>
        <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Pedidos cerrados</p>
          <p className="mt-2 text-3xl font-black text-sky-600">0</p>
        </article>
        <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Ticket promedio</p>
          <p className="mt-2 text-3xl font-black text-amber-600">$0.00</p>
        </article>
      </section>
    </div>
  );
}
