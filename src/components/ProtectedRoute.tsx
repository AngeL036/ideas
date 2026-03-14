import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useRoleProtection, UserRole } from "../hooks/useRoleProtection";
import SinPermiso from "./SinPermiso";

interface ProtectedRouteProps {
    children: ReactNode;
    allowedRoles?: UserRole[];
    fallbackPath?: string;
    mensaje?: string;
}

export function ProtectedRoute({
    children,
    allowedRoles,
    fallbackPath = "/",
    mensaje,
}: ProtectedRouteProps) {
    const { isAuthenticated, user, hasRole } = useRoleProtection(allowedRoles);

    if (!isAuthenticated) {
        return <Navigate to={fallbackPath} replace />;
    }

    if (allowedRoles && allowedRoles.length > 0 && !hasRole(allowedRoles)) {
        return <SinPermiso mensaje={mensaje} />;
    }

    return children;
}
