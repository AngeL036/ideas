import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useRoleProtection, UserRole } from "../hooks/useRoleProtection";

interface ProtectedRouteProps {
    children: ReactNode;
    allowedRoles?: UserRole[];
    fallbackPath?: string;
}

export function ProtectedRoute({
    children,
    allowedRoles,
    fallbackPath = "/"
}: ProtectedRouteProps) {
    const { isAuthenticated, user, hasRole } = useRoleProtection(allowedRoles);

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    if (allowedRoles && allowedRoles.length > 0 && !hasRole(allowedRoles)) {
        return <Navigate to={fallbackPath} replace />;
    }

    return children;
}
