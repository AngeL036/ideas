import FormNegocio from "../../components/negocios/FormNegocio";

export default function AgregarNegocio() {
    return (
        <div className="mx-auto max-w-xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
            <h1 className="text-3xl font-black tracking-tight text-slate-900">Agregar Negocio</h1>
            <p className="mt-1 text-sm text-slate-600">Crea un nuevo negocio o establecimiento</p>
            <FormNegocio />
        </div>
    );
}
