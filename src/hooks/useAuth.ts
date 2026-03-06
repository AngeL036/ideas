import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
        axios.get("http://localhost:8000/auth/me", {
            headers: {Authorization: `Bearer ${token}`}
        })
        .then((res) => {
            setNegocio({giro: res.data.giro ?? 'restaurante'})
        })
        .catch(() => {
            localStorage.removeItem("token")
            localStorage.removeItem("user")
            navigate("/login", { replace: true })
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
