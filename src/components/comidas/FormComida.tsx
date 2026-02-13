import { useForm } from "react-hook-form";
import type { RegistrarPayload } from "../../types/Platillo";


interface Props {
  defaultValues?: RegistrarPayload;
  onSubmit:(data:RegistrarPayload) => Promise<void>;
  title: string;
  buttonText:string;
}

export default function FormComida({
  defaultValues,
  onSubmit,
  title,
  buttonText
}: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegistrarPayload>({
    defaultValues
  });
  
  const submitForm = async (data:RegistrarPayload) => {
    await onSubmit(data);
    reset();
  }

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        🍽️ {title}
      </h2>

      <form onSubmit={handleSubmit(submitForm)} className="space-y-4">

        {/* Nombre */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Nombre
          </label>
          <input
            type="text"
            {...register("nombre", {
              required: "El nombre es obligatorio",
              minLength: {
                value: 3,
                message: "Mínimo 3 caracteres"
              }
            })}
            className="w-full mt-1 p-2 border rounded-lg focus:ring focus:ring-green-300"
          />
          {errors.nombre && (
            <span className="text-sm text-red-500">
              {errors.nombre.message}
            </span>
          )}
        </div>

        {/* Precio */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Precio
          </label>
          <input
            type="number"
            step="0.01"
            {...register("precio", {
              required: "El precio es obligatorio",
              min: {
                value: 1,
                message: "Debe ser mayor a 0"
              }
            })}
            className="w-full mt-1 p-2 border rounded-lg focus:ring focus:ring-green-300"
          />
          {errors.precio && (
            <span className="text-sm text-red-500">
              {errors.precio.message}
            </span>
          )}
        </div>

        {/* Descripción */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Descripción
          </label>
          <textarea
            rows={3}
            {...register("descripcion", {
              required: "La descripción es obligatoria"
            })}
            className="w-full mt-1 p-2 border rounded-lg focus:ring focus:ring-green-300"
          />
          {errors.descripcion && (
            <span className="text-sm text-red-500">
              {errors.descripcion.message}
            </span>
          )}
        </div>

        {/* Cantidad */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Cantidad
          </label>
          <input
            type="number"
            {...register("cantidad", {
              required: "La cantidad es obligatoria",
              min: {
                value: 1,
                message: "Debe ser al menos 1"
              }
            })}
            className="w-full mt-1 p-2 border rounded-lg focus:ring focus:ring-green-300"
          />
          {errors.cantidad && (
            <span className="text-sm text-red-500">
              {errors.cantidad.message}
            </span>
          )}
        </div>

        {/* Botón */}
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded-lg
                     hover:bg-green-700 transition"
        >
          {buttonText}
        </button>
      </form>
    </div>
  );
}
