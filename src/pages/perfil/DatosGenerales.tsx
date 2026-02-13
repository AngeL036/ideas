export default function DatosGenerales(){
    return(
        <div className="max-w-xl mx-auto rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold text-slate-900">Datos generales</h2>
            <form action="" className="grid gap-4">
                <label className="grid gap-2 text-sm font-medium text-slate-700">
                    Nombre
                    <input
                        type="text"
                        placeholder="Nombre"
                        className="h-11 rounded-lg border border-slate-200 bg-slate-50 px-3 text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-slate-400 focus:bg-white"
                    />
                </label>
                <label className="grid gap-2 text-sm font-medium text-slate-700">
                    Apellido Paterno
                    <input
                        type="text"
                        placeholder="Apellido paterno"
                        className="h-11 rounded-lg border border-slate-200 bg-slate-50 px-3 text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-slate-400 focus:bg-white"
                    />
                </label>
                <label className="grid gap-2 text-sm font-medium text-slate-700">
                    Apellido Materno
                    <input
                        type="text"
                        placeholder="Apellido materno"
                        className="h-11 rounded-lg border border-slate-200 bg-slate-50 px-3 text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-slate-400 focus:bg-white"
                    />
                </label>
                <label className="grid gap-2 text-sm font-medium text-slate-700">
                    Celular
                    <input
                        type="text"
                        placeholder="Ej. 5551234567"
                        className="h-11 rounded-lg border border-slate-200 bg-slate-50 px-3 text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-slate-400 focus:bg-white"
                    />
                </label>

            </form>
            
        </div>
    )
}
