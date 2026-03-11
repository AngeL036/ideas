import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { LoginUser, reenviarVerificacion } from "../../api/User.api";
import { obtenerMisNegocios } from "../../api/negocio.api";
import type { LoginUserPayload, LoginUserResponse } from "../../types/User";
import { useAuth } from "../../hooks/useAuth";
import { Eye, EyeOff, Loader2 } from "lucide-react";

const getAuthToken = (response: LoginUserResponse) =>
  response.token ?? response.access_token ?? response.access ?? response.jwt;

export default function Login() {
  const navigate = useNavigate();
  const {setToken} = useAuth();
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit, formState: { isSubmitting } } = useForm<LoginUserPayload>();

  const onSubmit = async (data: LoginUserPayload) => {
    if (loading) return;

    setLoading(true);

    try {
      setError(""); // Limpiar error anterior
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("refresh_token");
      const response = await LoginUser(data);
      const token = getAuthToken(response);

      if (!token) {
        throw new Error("No se recibio token");
      }

      localStorage.setItem("token", token);
      setToken(token)

      const storedUser = response.user ?? { email: response.email ?? data.email, role: "employee" };
      localStorage.setItem("user", JSON.stringify(storedUser));

      await Swal.fire({
        title: "Bienvenido",
        text: "Sesion iniciada correctamente",
        icon: "success",
        timer: 1200,
        showConfirmButton: false,
      });

      // check if user is owner
      const userRole = (storedUser as any)?.role?.toLowerCase?.();
      const isOwner = userRole === "owner";

      // if owner and has no businesses, redirect to create one
      if (isOwner) {
        try {
          const negocios = await obtenerMisNegocios();
          if (!negocios || negocios.length === 0) {
            navigate("/negocio/nuevo", { replace: true });
          } else {
            navigate("/", { replace: true });
          }
        } catch (err) {
          console.error("Error al obtener negocios", err);
          navigate("/", { replace: true });
        }
      } else {
        // non-owner users go directly to dashboard
        navigate("/", { replace: true });
      }
    } catch (error: any) {
      console.error("Error al iniciar sesion", error);

      let errorMessage = "Error al iniciar sesion";
      
      if(error.response){
        const status = error.response.status;
        const detail = error.response.data?.detail;
        const code = detail?.code;

        if(status === 403 && code === "EMAIL_NOT_VERIFIED"){
          errorMessage = detail?.message || "Debes verificar tu correo antes de iniciar sesión";
          Swal.fire({
            title:"Correo no verificado",
            text: errorMessage,
            icon: "warning",
            confirmButtonText: "Reenviar correo",
            showCancelButton: true
          }).then(async (result) => {
            if (result.isConfirmed){
              await reenviarVerificacion(data.email);
            }
          });
        } else if(status === 401) {
          errorMessage = "Credenciales invalidas";
        }else {
          errorMessage = detail || "Error del servidor";
        }
      }else {
        errorMessage = "Error del servidor";
      }
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  };

  return (
    // CAMBIADO: era un div centrado, ahora es split-screen
    <div className="min-h-screen w-full grid grid-cols-1 lg:grid-cols-2">

      {/* ── NUEVO: Panel izquierdo branding ── */}
      <div className="hidden lg:flex flex-col justify-between bg-slate-900 p-12 relative overflow-hidden">
        {/* Decoración de fondo */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-emerald-500/5 rounded-full translate-y-1/2 -translate-x-1/2" />

        {/* Logo */}
        <div className="flex items-center gap-2 z-10">
          <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
            <span className="text-white text-xs font-black">PS</span>
          </div>
          <span className="text-white font-semibold text-sm">POS Suite</span>
        </div>

        {/* Copy */}
        <div className="z-10">
          <p className="text-emerald-400 text-xs tracking-widest uppercase mb-4">Sistema de gestión</p>
          <h2 className="text-white text-4xl font-black leading-tight mb-4">
            Todo tu negocio,<br />en un solo lugar.
          </h2>
          <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
            Pedidos, mesas, reportes y más — diseñado para restaurantes, tiendas y clínicas.
          </p>
        </div>

        {/* Stats footer */}
        <div className="flex gap-8 z-10">
          {[["Pedidos", "en tiempo real"], ["Reportes", "diarios"], ["Multi-negocio", "un acceso"]].map(([t, s]) => (
            <div key={t}>
              <p className="text-white text-sm font-medium">{t}</p>
              <p className="text-slate-500 text-xs">{s}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Panel derecho — formulario ── */}
      {/* CAMBIADO: era max-w-xl centrado, ahora ocupa mitad de pantalla */}
      <div className="flex items-center justify-center p-6 sm:p-10 lg:p-12 bg-slate-50 min-h-screen lg:min-h-0">
        <div className="w-full max-w-sm">

          {/* CAMBIADO: heading más compacto y con subtítulo de color */}
          <div className="flex items-center gap-2 mb-8 lg:hidden">
            <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
              <span className="text-white text-xs font-black">PS</span>
            </div>
          <span className="text-slate-900 font-semibold text-sm">POS Suite</span>
        </div>
          <p className="text-emerald-600 text-xs tracking-widest uppercase mb-2">Bienvenido de vuelta</p>
          <h1 className="text-3xl font-black tracking-tight text-slate-900">Iniciar sesión</h1>
          <p className="mt-1 text-sm text-slate-500 mb-8">Accede para administrar tu operación.</p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

            <label className="block text-sm font-medium text-slate-700">
              Correo electrónico
              <input
                type="email"
                placeholder="correo@dominio.com"
                {...register("email", { required: true })}
                // CAMBIADO: bg-slate-50 → bg-white, ring en focus
                className="mt-1 h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-slate-900 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
              />
            </label>

            {/* NUEVO: wrapper para el ojo de mostrar/ocultar contraseña */}
            <label className="block text-sm font-medium text-slate-700">
              Contraseña
              <div className="relative mt-1">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  {...register("password", { required: true })}
                  className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 pr-10 text-slate-900 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
                />
                {/* NUEVO: botón ojo */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </label>

            {/* CAMBIADO: era solo texto rojo, ahora es un bloque con fondo */}
            {error && (
              <div className="rounded-xl bg-red-50 border border-red-100 px-4 py-3 text-sm text-red-600">
                {error}
              </div>
            )}

            {/* CAMBIADO: botón con spinner de lucide cuando loading */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-slate-900 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Loader2 size={15} className="animate-spin" />
                  Ingresando...
                </>
              ) : "Entrar"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-500">
            ¿No tienes cuenta?{" "}
            <Link to="/registro" className="font-semibold text-slate-900 underline-offset-2 hover:underline">
              Regístrate
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
