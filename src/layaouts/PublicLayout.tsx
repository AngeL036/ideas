import { Outlet } from "react-router-dom";
import Header from "../components/Hader";
import Sidebar from "../components/Sidebar";
export default function PublicLayout(){
    return(
        <div className="flex min-h-screen bg-gray-100">
           {/* <Header />* */}
            <Sidebar />
            <main className="flex-1 p-6">
                <Outlet />
            </main>
        </div>
    )
}