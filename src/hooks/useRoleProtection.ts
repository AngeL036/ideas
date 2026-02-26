import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export type UserRole = "owner" | "admin" | "mesero";

export interface AuthUser {
    id: number;
    email: string;
    role: UserRole;
    created_at: string;
}

export function useRoleProtection(allowedRoles?: UserRole[]) {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    let user: AuthUser | null = null;
    
    try {
        user = userData ? JSON.parse(userData) : null;
    } catch (e) {
        user = null;
    }

    useEffect(() => {
        // Si no hay token, redirigir a login
        if (!token) {
            navigate("/login", { replace: true });
            return;
        }

        // Si no hay usuario o rol, redirigir a login
        if (!user || !user.role) {
            navigate("/login", { replace: true });
            return;
        }

        // Si se especifican roles permitidos, validar
        if (allowedRoles && allowedRoles.length > 0) {
            if (!allowedRoles.includes(user.role)) {
                navigate("/", { replace: true });
                return;
            }
        }
    }, [token, user, allowedRoles, navigate]);

    return {
        isAuthenticated: !!token && !!user,
        user,
        token,
        hasRole: (role: UserRole | UserRole[]) => {
            if (!user) return false;
            if (Array.isArray(role)) {
                return role.includes(user.role);
            }
            return user.role === role;
        }
    };
}
