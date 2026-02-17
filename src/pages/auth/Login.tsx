import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { LoginUser } from "../../api/User.api";
import type { LoginUserPayload, LoginUserResponse } from "../../types/User";

const getAuthToken = (response: LoginUserResponse) =>
  response.token ?? response.access_token ?? response.access ?? response.jwt;

export default function Login() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { isSubmitting } } = useForm<LoginUserPayload>();

  const onSubmit = async (data: LoginUserPayload) => {
    try {
      const response = await LoginUser(data);
      const token = getAuthToken(response);

      if (!token) {
        throw new Error("No se recibio token");
      }

      localStorage.setItem("token", token);

      const storedUser = response.user ?? { email: response.email ?? data.email };
      localStorage.setItem("user", JSON.stringify(storedUser));

      await Swal.fire({
        title: "Bienvenido",
        text: "Sesion iniciada correctamente",
        icon: "success",
        timer: 1200,
        showConfirmButton: false,
      });

      navigate("/", { replace: true });
    } catch (error) {
      console.error("Error al iniciar sesion", error);
      Swal.fire("Error", "Credenciales invalidas o servidor no disponible", "error");
    }
  };

  return (
    <div className="mx-auto max-w-xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
      <h1 className="text-3xl font-black tracking-tight text-slate-900">Iniciar sesion</h1>
      <p className="mt-1 text-sm text-slate-600">Accede para administrar pedidos y operaciones.</p>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
        <label className="block text-sm font-medium text-slate-700">
          Correo
          <input
            type="email"
            placeholder="correo@dominio.com"
            {...register("email", { required: true })}
            className="mt-1 h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-slate-900 outline-none transition focus:border-slate-400 focus:bg-white"
          />
        </label>

        <label className="block text-sm font-medium text-slate-700">
          Contrasena
          <input
            type="password"
            placeholder="********"
            {...register("password", { required: true })}
            className="mt-1 h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-slate-900 outline-none transition focus:border-slate-400 focus:bg-white"
          />
        </label>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-xl bg-slate-900 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "Ingresando..." : "Entrar"}
        </button>
      </form>

      <p className="mt-4 text-center text-sm text-slate-600">
        No tienes cuenta?{" "}
        <Link to="/registro" className="font-semibold text-slate-900 underline-offset-2 hover:underline">
          Registrate
        </Link>
      </p>
    </div>
  );
}
