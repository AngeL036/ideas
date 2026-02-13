import DatosGenerales from "./DatosGenerales"
import Direccion from "./Direccion"


export default function PerfilIndex(){
    return(
        <div className="min-h-screen bg-gray-100 py-10 px-4">
            <h1 className="text-2xl font-bold">Perfil</h1>
            <div className="space-y-4">
                <DatosGenerales />
                 <Direccion />
            </div>
            
           
        </div>
        
    )
}