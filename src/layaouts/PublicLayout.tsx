import { Navigate, Outlet } from "react-router-dom";

export default function PublicLayout(){
    const token = localStorage.getItem("token");

    if (token) {
        return <Navigate to="/" replace />;
    }

    return(
        <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4 py-8">
            <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,_rgba(16,185,129,0.14),_transparent_45%),radial-gradient(circle_at_20%_20%,_rgba(249,115,22,0.14),_transparent_35%)]" />
            <main className="w-full max-w-xl">
                <Outlet />
            </main>
        </div>
    )
}
