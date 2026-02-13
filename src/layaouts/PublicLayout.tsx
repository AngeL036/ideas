import { Outlet } from "react-router-dom";
import Header from "../components/Hader";
export default function PublicLayaot(){
    return(
        <div className="min-h-screen bg-gray-100">
            <Header />

            <main className="max-w-7xl mx-auto p-6">
                <Outlet />
            </main>
        </div>
    )
}