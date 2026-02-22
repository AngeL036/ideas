import { useEffect, useState } from "react";
import type { Empleado } from "../../types/Empleado";
import { obtenerEmpleados, desactivarEmpleado } from "../../api/empleado.api";

interface Props {
    negocio_id: number;
}

export default function ListaEmpleados({ negocio_id }: Props) {
    const [empleados, setEmpleados] = useState<Empleado[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        cargarEmpleados();
    }, [negocio_id]);

    const cargarEmpleados = async () => {
        try {
            const data = await obtenerEmpleados(negocio_id);
            setEmpleados(data);
        } catch (error) {
            console.error("Error al cargar empleados", error);
        } finally {
            setLoading(false);
        }
    }

    const handleEliminar = async (empleado_id: number) => {
        if (!confirm("¿Desactivar este empleado?")) return;
        try {
            await desactivarEmpleado(empleado_id);
            setEmpleados(prev => prev.filter(e => e.id !== empleado_id));
        } catch (error) {
            console.error("Error al desactivar empleado", error);
        }
    }

    if (loading) {
        return <div className="text-slate-500 animate-pulse">Cargando empleados...</div>;
    }

    if (empleados.length === 0) {
        return <div className="text-slate-500">No hay empleados registrados</div>;
    }

    return (
        <div className="space-y-2">
            {empleados.map(empleado => (
                <div key={empleado.id} className="flex items-center justify-between rounded-lg border border-slate-200 bg-white p-4">
                    <div>
                        <p className="font-medium text-slate-800">Empleado #{ empleado.id}</p>
                        <p className="text-sm text-slate-600">Rol: {empleado.rol}</p>
                    </div>
                    <button
                        onClick={() => handleEliminar(empleado.id)}
                        className="rounded bg-red-100 px-3 py-1 text-sm font-medium text-red-700 hover:bg-red-200"
                    >
                        Desactivar
                    </button>
                </div>
            ))}
        </div>
    );
}
