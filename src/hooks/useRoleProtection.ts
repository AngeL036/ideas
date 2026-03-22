import { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";

export type UserRole = "owner" | "admin" | "mesero" | "vendedor";

export interface AuthUser {
    id: number;
    email: string;
    role: UserRole;
    created_at: string;
}

export function useRoleProtection(allowedRoles?: UserRole[]) {
    const navigate = useNavigate();
    const token    = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    // ── CAMBIO 1: memoizar user para que no sea un objeto nuevo en cada render ──
    const user = useMemo<AuthUser | null>(() => {
        try {
            return userData ? JSON.parse(userData) : null;
        } catch {
            return null;
        }
    }, [userData]);

    // ── CAMBIO 2: convertir allowedRoles a string estable para la dependencia ──
    const allowedKey = allowedRoles?.join(",") ?? "";

    useEffect(() => {
        if (!token) {
            navigate("/login", { replace: true });
            return;
        }

        if (!user || !user.role) {
            navigate("/login", { replace: true });
            return;
        }

        if (allowedKey) {
            const roles = allowedKey.split(",") as UserRole[];
            if (!roles.includes(user.role)) {
                navigate("/", { replace: true });
            }
        }
    // allowedKey es un string primitivo → referencia estable, no causa loop
    }, [token, user, allowedKey, navigate]);

    return {
        isAuthenticated: !!token && !!user,
        user,
        token,
        hasRole: (role: UserRole | UserRole[]) => {
            if (!user) return false;
            if (Array.isArray(role)) return role.includes(user.role);
            return user.role === role;
        }
    };
}