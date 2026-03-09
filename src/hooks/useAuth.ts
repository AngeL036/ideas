import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api"

export function useAuth() {
    const [loading, setLoading] = useState(true) 
    const [negocio, setNegocio] = useState<{giro:string} | null>(null)
    const navigate = useNavigate();

    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    useEffect(() => {
        if (!token) {
            setLoading(false);
            navigate("/login", { replace: true });
            return;
        }
        api.get("auth/me")
        .then((res) => {
            console.log('Respuesta /auth/me:', res.data)
            setNegocio({giro: res.data.giro ?? 'restaurante'})
        })
        .catch((err) => {
            if (err.response?.status === 401){
                localStorage.removeItem("token")
                localStorage.removeItem("user")
                navigate("/login", { replace: true })
            }else {
                console.warn("Error en /auth/me, usando fallback:", err)
                setNegocio({ giro: 'restaurante' })
            }
            
        })
        .finally(() => setLoading(false))
    }, [token])

    return {
        isAuthenticated: !!token,
        user: user ? JSON.parse(user) : null,
        token,
        negocio,
        loading,
    };
}
