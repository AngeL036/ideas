import { Link,useLocation, useNavigate } from "react-router-dom"

export default function Header(){
    return(
        <header className="flex items-center justify-between bg-slate-900 text-white px-6 py-4">
             <Link to="/" ><h1 className="text-xl font-bold">Logo</h1></Link>
            <nav className="space-x-4">
                 <Link to="/perfil" className="hover:underline">Perfil</Link>
                 <Link to="/carrito" className="hover:underline">Carrito</Link>
                 <Link to="/registro" className="hover:underline"> Registrarse</Link>
            </nav>
        </header>
    )
}