export default function Direccion() {
    return(
        <div className="max-w-xl mx-auto rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold text-slate-900">Dirección</h2>
            <form className="grid gap-4">
                <label className="grid gap-2 text-sm font-medium text-slate-700">
                    Calle
                    <input
                        type="text"
                        placeholder="Calle"
                        className="h-11 rounded-lg border border-slate-200 bg-slate-50 px-3 text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-slate-400 focus:bg-white"
                    />
                </label>
                <label className="grid gap-2 text-sm font-medium text-slate-700">
                    Número Ext.
                    <input
                        type="number"
                        placeholder="Número exterior"
                        className="h-11 rounded-lg border border-slate-200 bg-slate-50 px-3 text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-slate-400 focus:bg-white"
                    />
                </label>
                <label className="grid gap-2 text-sm font-medium text-slate-700">
                    Número Interior
                    <input
                        type="number"
                        placeholder="Número interior"
                        className="h-11 rounded-lg border border-slate-200 bg-slate-50 px-3 text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-slate-400 focus:bg-white"
                    />
                </label>
                <label className="grid gap-2 text-sm font-medium text-slate-700">
                    Colonia
                    <input
                        type="text"
                        placeholder="Colonia"
                        className="h-11 rounded-lg border border-slate-200 bg-slate-50 px-3 text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-slate-400 focus:bg-white"
                    />
                </label>
                <label className="grid gap-2 text-sm font-medium text-slate-700">
                    Código Postal
                    <input
                        type="number"
                        placeholder="CP"
                        className="h-11 rounded-lg border border-slate-200 bg-slate-50 px-3 text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-slate-400 focus:bg-white"
                    />
                </label>
                
            </form>
        </div>
    )
}
