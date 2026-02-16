export default function Direccion() {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-lg font-bold text-slate-900">Direccion</h2>
      <form className="grid gap-4">
        <label className="grid gap-2 text-sm font-medium text-slate-700">
          Calle
          <input
            type="text"
            placeholder="Calle"
            className="h-11 rounded-xl border border-slate-200 bg-slate-50 px-3 text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-slate-400 focus:bg-white"
          />
        </label>
        <label className="grid gap-2 text-sm font-medium text-slate-700">
          Numero ext.
          <input
            type="number"
            placeholder="Numero exterior"
            className="h-11 rounded-xl border border-slate-200 bg-slate-50 px-3 text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-slate-400 focus:bg-white"
          />
        </label>
        <label className="grid gap-2 text-sm font-medium text-slate-700">
          Numero interior
          <input
            type="number"
            placeholder="Numero interior"
            className="h-11 rounded-xl border border-slate-200 bg-slate-50 px-3 text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-slate-400 focus:bg-white"
          />
        </label>
        <label className="grid gap-2 text-sm font-medium text-slate-700">
          Colonia
          <input
            type="text"
            placeholder="Colonia"
            className="h-11 rounded-xl border border-slate-200 bg-slate-50 px-3 text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-slate-400 focus:bg-white"
          />
        </label>
        <label className="grid gap-2 text-sm font-medium text-slate-700">
          Codigo postal
          <input
            type="number"
            placeholder="CP"
            className="h-11 rounded-xl border border-slate-200 bg-slate-50 px-3 text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-slate-400 focus:bg-white"
          />
        </label>
      </form>
    </section>
  );
}
