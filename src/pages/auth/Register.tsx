import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";
import type { RegisterUser } from "../../types/User";
import { CreateUser } from "../../api/User.api";
import { useState } from "react";
import { Eye, EyeOff, Loader2 } from "lucide-react";

export default function Register() {
  const navigate = useNavigate();
   const [showPassword, setShowPassword] = useState(false); 
  const [loading, setLoading] = useState(false);  
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterUser>();

  const onSubmit = async (data: RegisterUser) => {
    setLoading(true)
    try {
      await CreateUser(data);
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
    } finally {
      setLoading(false);
    }
  };

  return (
    // CAMBIADO: mismo layout split-screen que Login
    <div className="min-h-screen w-full grid grid-cols-1 lg:grid-cols-2">

      {/* Panel izquierdo — idéntico al Login */}
      <div className="hidden lg:flex flex-col justify-between bg-slate-900 p-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-emerald-500/5 rounded-full translate-y-1/2 -translate-x-1/2" />

        <div className="flex items-center gap-2 z-10">
          <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
            <span className="text-white text-xs font-black">PS</span>
          </div>
          <span className="text-white font-semibold text-sm">POS Suite</span>
        </div>

        <div className="z-10">
          <p className="text-emerald-400 text-xs tracking-widest uppercase mb-4">Sistema de gestión</p>
          {/* CAMBIADO: copy específico para registro */}
          <h2 className="text-white text-4xl font-black leading-tight mb-4">
            Empieza hoy,<br />sin complicaciones.
          </h2>
          <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
            Crea tu cuenta y ten tu negocio operando en minutos.
          </p>
        </div>

        <div className="flex gap-8 z-10">
          {[["Pedidos", "en tiempo real"], ["Reportes", "diarios"], ["Multi-negocio", "un acceso"]].map(([t, s]) => (
            <div key={t}>
              <p className="text-white text-sm font-medium">{t}</p>
              <p className="text-slate-500 text-xs">{s}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Panel derecho — formulario */}
      <div className="flex items-center justify-center p-6 sm:p-10 lg:p-12 bg-slate-50 min-h-screen lg:min-h-0">
        <div className="w-full max-w-sm">

          {/* Logo solo en móvil */}
          <div className="flex items-center gap-2 mb-8 lg:hidden">
            <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
              <span className="text-white text-xs font-black">PS</span>
            </div>
            <span className="text-slate-900 font-semibold text-sm">POS Suite</span>
          </div>

          {/* CAMBIADO: mismo estilo de heading que Login */}
          <p className="text-emerald-600 text-xs tracking-widest uppercase mb-2">Crear cuenta</p>
          <h1 className="text-3xl font-black tracking-tight text-slate-900">Regístrate</h1>
          <p className="mt-1 text-sm text-slate-500 mb-8">Crea tu cuenta para administrar tu operación.</p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Correo electrónico
              </label>
              <input
                type="email"
                placeholder="correo@dominio.com"
                {...register("email", {
                  required: "El correo es obligatorio",
                  pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Correo inválido" }
                })}
                // CAMBIADO: mismo estilo de input que Login
                className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-slate-900 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
              />
              {errors.email && (
                // CAMBIADO: mismo estilo de error en bloque
                <p className="mt-1.5 text-xs text-red-500">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Contraseña
              </label>
              {/* NUEVO: wrapper con botón ojo */}
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  {...register("password", {
                    required: "La contraseña es obligatoria",
                    minLength: { value: 8, message: "Mínimo 8 caracteres" },
                    pattern: {
                      value: /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).+$/,
                      message: "Combina letras, números y caracteres especiales",
                    }
                  })}
                  className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 pr-10 text-slate-900 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1.5 text-xs text-red-500">{errors.password.message}</p>
              )}
            </div>

            {/* CAMBIADO: botón con spinner igual que Login */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-slate-900 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Loader2 size={15} className="animate-spin" />
                  Creando cuenta...
                </>
              ) : "Registrarse"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-500">
            ¿Ya tienes cuenta?{" "}
            <Link to="/login" className="font-semibold text-slate-900 underline-offset-2 hover:underline">
              Inicia sesión
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
}
