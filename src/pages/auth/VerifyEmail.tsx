import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import api from "../../api/api";

export default function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get("token");

    if (!token) return;

    api.get(`/auth/verify-email?token=${token}`)
      .then(() => {
        Swal.fire("Cuenta verificada", "", "success");
        navigate("/restaurante/login");
      })
      .catch(() => {
        Swal.fire("Token inválido o expirado", "", "error");
        navigate("/restaurante/login");
      });

  }, []);

  return <p>Verificando cuenta...</p>;
}