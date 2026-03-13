import { useForm } from "react-hook-form";
import { CategoriaPayload, type RegistrarPayload } from "../../types/Platillo";
import { crearCategoria, getCategoria } from "../../api/categoria.api";
import { useEffect, useState } from "react";


interface Props {
  defaultValues?: RegistrarPayload;
  onSubmit: (data: RegistrarPayload) => Promise<void>;
  title: string;
  buttonText: string;
}

export default function FormComida({ defaultValues, onSubmit, title, buttonText }: Props) {
  const [categorias,setCategorias] = useState<CategoriaPayload[]>([]);
  const [loadingCategorias, setLoadingCategorias] = useState(true);
  const [mostrarNueva, setMostrarNueva] = useState(false);
  const [nombreNueva, setNombreNueva] = useState("");
  const [guardandoCategoria, setGuardandoCategoria] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<RegistrarPayload>({
    defaultValues,
  });

  useEffect(() => {
    getCategoria()
      .then(setCategorias)
      .finally(() => setLoadingCategorias(false));
  }, []);

  useEffect(() => {
    if (categorias.length > 0 && defaultValues?.categoria_id) {
      setValue("categoria_id", defaultValues.categoria_id);
    }
  }, [categorias]);
  
  const handleCrearCategoria = async () => {
    if (!nombreNueva.trim()) return;
    setGuardandoCategoria(true);
    try{
      const nueva = await crearCategoria(nombreNueva.trim());
      setCategorias((prev) => [...prev, nueva]);
      setValue("categoria_id", nueva.id);
      setNombreNueva("");
      setMostrarNueva(false);
    }catch(error) {
      console.error("error: ",error)
    }finally{
      setGuardandoCategoria(false);
    }
  }

  const submitForm = async (data: RegistrarPayload) => {
    await onSubmit(data);
    reset();
  };

  return (
    <section className="mx-auto max-w-xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
      <h2 className="text-3xl font-black tracking-tight text-slate-900">{title}</h2>
      <p className="mt-1 text-sm text-slate-600">Completa la informacion del platillo para guardarlo en el menu.</p>

      <form onSubmit={handleSubmit(submitForm)} className="mt-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700">Nombre</label>
          <input
            type="text"
            {...register("nombre", {
              required: "El nombre es obligatorio",
              minLength: {
                value: 3,
                message: "Minimo 3 caracteres",
              },
            })}
            className="mt-1 h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-slate-900 outline-none transition focus:border-slate-400 focus:bg-white"
          />
          {errors.nombre && <span className="text-sm text-rose-500">{errors.nombre.message}</span>}
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700">Precio</label>
          <input
            type="number"
            step="0.01"
            min="0"
            {...register("precio", {
              required: "El precio es obligatorio",
              min: {
                value: 1,
                message: "Debe ser mayor a 0",
              },
            })}
            className="mt-1 h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-slate-900 outline-none transition focus:border-slate-400 focus:bg-white"
          />
          {errors.precio && <span className="text-sm text-rose-500">{errors.precio.message}</span>}
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700">Descripcion</label>
          <textarea
            rows={3}
            {...register("descripcion", {
              required: "La descripcion es obligatoria",
            })}
            className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-slate-900 outline-none transition focus:border-slate-400 focus:bg-white"
          />
          {errors.descripcion && <span className="text-sm text-rose-500">{errors.descripcion.message}</span>}
        </div>
        <div>
          <div className="flex items-center justify-between mb-1"> 
            <label className="block text-sm font-medium text-slate-700">Categoria</label>
            {!mostrarNueva && (
              <button
                type="button"
                onClick={() => setMostrarNueva(true)}
                className="text-xs font-medium text-emerald-600 hover:text-emerald-700 transition"  
              >
                + Nueva Categoria
              </button>
            )}
          </div>
          {/* */}
          {mostrarNueva && (
            <div className="flex gap-2 mb-2">
              <input 
                type="text"
                placeholder="Nombre de la categoria"
                value={nombreNueva}
                onChange={(e) => setNombreNueva(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleCrearCategoria())}
                autoFocus
                className="h-9 flex-1 rounded-xl border border-emerald-300 bg-emerald-50 px-3 text-sm text-slate-900 outline-none focus:border-emerald-400"
              />
              <button
                type="button"
                onClick={handleCrearCategoria}
                disabled={guardandoCategoria || !nombreNueva.trim()}
                className="h-9 rounded-xl bg-emerald-600 px-3 text-xs font-semibold text-white transition hover:bg-emerald-700 disabled:opacity-50"
              >
                {guardandoCategoria ? "..." : "Guardar"}
              </button>
              <button
                type="button"
                onClick={() => {setMostrarNueva(false); setNombreNueva("");}}
                className="h-9 rounded-xl border border-slate-200 px-3 text-xs text-slate-500 transition hover:bg-slate-50"
              >
                Cancelar
              </button>
            </div>
          )}
          <select
            {...register("categoria_id", { 
              required: "La categoria es obligatoria",
              valueAsNumber: true,
            })}
            disabled={loadingCategorias}
            className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-slate-900 outline-none transition focus:border-slate-400 focus:bg-white disabled:opacity-50"
          >
            <option value="">
              {loadingCategorias ? "Cargando categorias..." : "Selecciona una categoria"}
            </option>
            {categorias.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.nombre}
              </option>
            ))}
          </select>
            {errors.categoria_id && <span className="text-sm text-rose-500">{errors.categoria_id.message}</span>}
        </div>

        <button type="submit" className="w-full rounded-xl bg-slate-900 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700">
          {buttonText}
        </button>
      </form>
    </section>
  );
}
