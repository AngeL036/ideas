import FormComida from "../../components/comidas/FormComida"
import type { RegistrarPayload } from "../../types/Platillo";
import { registrarPlato } from "../../api/platillo.api";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
export default function AgregarComida(){
    const navigate = useNavigate();

    const onSubmit = async (data: RegistrarPayload) => {
    try {
        const register = await registrarPlato(data)
        await Swal.fire({
            title: "Platillo creado",
            icon: "success",
            timer: 1500,
            showConfirmButton:false,
            timerProgressBar:true
        });
        navigate("/comida")
        
    }catch(error) {
        Swal.fire({
            icon:"error",
            title:"error",
            text: "No se pudo guardar el platillo"
        })
    }
    
  };
    return(
        <FormComida
        title="Registrar Comida"
        buttonText="Guardar Comida"
        onSubmit={onSubmit}
        ></FormComida>
    )
}