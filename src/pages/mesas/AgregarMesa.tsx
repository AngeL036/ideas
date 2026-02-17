import FormAgregarMesa from "../../components/mesas/FormAgregarMesa";

export default function AgregarMesa(){
    return(
        <div className="mx-auto max-w-xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
            <h1 className="text-3xl font-black tracking-tight text-slate-900">Agregar Mesa</h1>
            <p className="mt-1 text-sm text-slate-600"  >Crear una nueva mesa </p>
            <FormAgregarMesa />
        </div>
        
    )
}