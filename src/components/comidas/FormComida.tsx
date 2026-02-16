import { useForm } from "react-hook-form";
import type { RegistrarPayload } from "../../types/Platillo";

interface Props {
  defaultValues?: RegistrarPayload;
  onSubmit: (data: RegistrarPayload) => Promise<void>;
  title: string;
  buttonText: string;
}

export default function FormComida({ defaultValues, onSubmit, title, buttonText }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegistrarPayload>({
    defaultValues,
  });

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

        <button type="submit" className="w-full rounded-xl bg-slate-900 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700">
          {buttonText}
        </button>
      </form>
    </section>
  );
}
