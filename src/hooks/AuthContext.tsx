// ============================================================
// ARCHIVO NUEVO: src/hooks/AuthContext.tsx
// ============================================================

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

interface AuthContextType {
    isAuthenticated: boolean;
    user: any;
    token: string | null;
    negocio: { giro: string } | null;
    loading: boolean;
    login: (token: string, user?: any) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [token, setToken] = useState<string | null>(() => localStorage.getItem("token"));
    const [negocio, setNegocio] = useState<{ giro: string } | null>(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const login = useCallback((newToken: string, user?: any) => {
        localStorage.setItem("token", newToken);
        if (user) localStorage.setItem("user", JSON.stringify(user));
        setToken(newToken); // ← esto notifica a todos los componentes al mismo tiempo
    }, []);

    const logout = useCallback(() => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setToken(null);
        setNegocio(null);
        navigate("/login", { replace: true });
    }, [navigate]);

    useEffect(() => {
        if (!token) {
            setLoading(false);
            navigate("/login", { replace: true });
            return;
        }

        let cancelled = false;

        api.get("auth/me")
            .then((res) => {
                if (!cancelled) {
                    setNegocio({ giro: res.data.giro ?? "restaurante" });
                }
            })
            .catch((err) => {
                if (!cancelled) {
                    if (err.response?.status === 401) {
                        logout();
                    } else {
                        setNegocio({ giro: "restaurante" });
                    }
                }
            })
            .finally(() => {
                if (!cancelled) setLoading(false);
            });

        return () => {
            cancelled = true;
        };
    }, [token]);

    const user = localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user")!)
        : null;

    return (
        <AuthContext.Provider value={{ isAuthenticated: !!token, user, token, negocio, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth debe usarse dentro de <AuthProvider>");
    return ctx;
}