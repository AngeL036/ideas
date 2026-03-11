import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api"

export function useAuth() {
    const [loading, setLoading] = useState(true) 
    const [negocio, setNegocio] = useState<{giro:string} | null>(null)
    const [token, setToken] = useState(() => localStorage.getItem("token"))
    const navigate = useNavigate();
    const navigateRef = useRef(navigate);

    

    useEffect(() => {
        if (!token) {
            setLoading(false);
            navigate("/login", { replace: true});
            return;
        }
        let cancelled = false;
        api.get("auth/me")
        .then((res) => {
            setNegocio({ giro : res.data.giro ?? 'restaurante'})
        })
        .catch((err) => {
            if(err.response?.status === 401){
                 localStorage.removeItem("token")
                setToken(null) // ← limpiar estado también
                window.location.href = "/login";
            }else {
                setNegocio({ giro: 'restaurante' })
            }
        })
        .finally(() => {
            if (!cancelled) setLoading(false);
        });
        return () => {cancelled = true};
    }, [token])


    return {
        isAuthenticated: !!token,
        user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")!) : null,
        token,
        negocio,
        loading,
        setToken,
    };
}
