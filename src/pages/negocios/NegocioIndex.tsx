import { Link } from "react-router-dom"
export default function Negocio(){
    return( 
        <div className="space-y-8">
        <section className="rounded-2xl border border-slate-200 bg-white/80 p-6 shadow-sm backdrop-blur md:p-8">
            <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-slate-500"></p>
            <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-900 md:text-4xl">Negocio</h1>
            <p className="mt-2 max-w-2xl text-slate-600"></p>
            </div>
            <div>
                <Link
                    to="/negocio/nuevo"
                    className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700"
                    >
                    Agregar Mesa
                </Link>
            </div>
        </section>

      
    </div>
    )
}