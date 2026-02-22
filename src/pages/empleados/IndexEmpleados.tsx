import { useState } from "react";
import FormEmpleado from "../../components/empleados/FormEmpleado";

export default function IndexEmpleados(){
    const [showForm, setShowForm] = useState(false);

    return(
        <div className="space-y-6">
            <header className="rounded-2xl border border-slate-200 bg-white/80 p-6 shadow-sm backdrop-blur md:p-8">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-3xl font-black tracking-tight text-slate-900">Gestión de Empleados</h1>
                        <p className="mt-1 text-sm text-slate-600">Administra el equipo de trabajo en tus negocios.</p>
                    </div>
                    <button
                        onClick={() => setShowForm(!showForm)}
                        className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700"
                    >
                        {showForm ? "Cancelar" : "Agregar Empleado"}
                    </button>
                </div>
            </header>

            {showForm && (
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                    <h2 className="mb-4 text-xl font-bold text-slate-900">Crear Nuevo Empleado</h2>
                    <FormEmpleado />
                </div>
            )}

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="text-lg font-bold text-slate-900">Lista de Empleados</h2>
                <p className="mt-1 text-sm text-slate-600">Aquí aparecerá la lista de empleados (funcionalidad en desarrollo).</p>
            </div>
        </div>
    )
}