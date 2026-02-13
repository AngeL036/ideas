import { Form, Link } from "react-router-dom";
import FormComida from "../../components/comidas/FormComida";
export default function Index(){
    return(
        <div className="">
            <Link
                to="/comida/nueva"
                className="px-4 py-2 bg-green-600 text-white rounded"
            >
            Agregar Comida
            </Link>
            <Link
                to="/comida/ver"
                className="px-4 py-2 bg-green-600 text-white rounded"
            >
                Ver todas las comidas
            </Link>
        </div>
        
        
    )
}
