import DatosGenerales from "./DatosGenerales";
import Direccion from "./Direccion";

export default function PerfilIndex() {
  return (
    <div className="space-y-6">
      <header className="rounded-2xl border border-slate-200 bg-white/80 p-6 shadow-sm backdrop-blur md:p-8">
        <h1 className="text-3xl font-black tracking-tight text-slate-900">Perfil</h1>
        <p className="mt-1 text-sm text-slate-600">Actualiza tu informacion personal y direccion de contacto.</p>
      </header>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <DatosGenerales />
        <Direccion />
      </div>
    </div>
  );
}
