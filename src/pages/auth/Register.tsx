import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import type { RegisterUser } from "../../types/User";
import { CreateUser } from "../../api/User.api";

export default function Register() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterUser>();

  const onSubmit = async (data: RegisterUser) => {
    try {
      const response = await CreateUser(data);
     
      await Swal.fire({
        title: "Registrado",
        text: "Cuenta creada con éxito. Por favor inicia sesión.",
        icon: "success",
        timer: 1200,
        showConfirmButton: false,
      });
      // after successful registration go to login
      navigate("/login", { replace: true });
    } catch (error) {
      
      Swal.fire("Error", "No se pudo registrar el usuario", "error");
    }
  };

  return (
    <div className="mx-auto max-w-xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
      <h1 className="text-3xl font-black tracking-tight text-slate-900">Registro</h1>
      <p className="mt-1 text-sm text-slate-600">Crea una cuenta para administrar pedidos y operaciones.</p>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
        <label className="block text-sm font-medium text-slate-700">
          Correo
          <input
            type="email"
            placeholder="correo@dominio.com"
            {...register("email", {
              required: "El correo es obligatorio",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Correo inválido"
              }
            })}
            className="mt-1 h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-slate-900 outline-none transition focus:border-slate-400 focus:bg-white"
          />
          {errors.email && <span className="block text-sm text-rose-500 mt-1">{errors.email.message}</span>}
        </label>

        <label className="block text-sm font-medium text-slate-700">
          Contrasena
          <input
            type="password"
            placeholder="********"
            {...register("password", {
              required: "La contraseña es obligatoria",
              minLength: {
                value: 8,
                message: "La contraseña debe tener al menos 8 caracteres",
              },
              pattern: {
                value: /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).+$/,
                message: "Debe combinar letras, números y caracteres especiales",
              }
            })}
            className="mt-1 h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-slate-900 outline-none transition focus:border-slate-400 focus:bg-white"
          />
          {errors.password && <span className="block text-sm text-rose-500 mt-1">{errors.password.message}</span>}
        </label>

        <button className="w-full rounded-xl bg-slate-900 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700">Registrarse</button>
      </form>
    </div>
  );
}
