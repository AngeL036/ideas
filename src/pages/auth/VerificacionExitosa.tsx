import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


export default function VerificacionExitosa() {
  const navigate = useNavigate()
  useEffect(() => {
    setTimeout(() => {
      navigate("login")
    }, 300)
  },[])
  return (
    <div className="text-center mt-20">
      <h1 className="text-2xl font-bold text-green-600">
        Cuenta verificada correctamente 🎉
      </h1>
      <p className="mt-4">
        Redirigiendo al login...
      </p>
    </div>
  );
}