import FormComida from "../../components/comidas/FormComida"
import type { RegistrarPayload } from "../../types/Platillo";
import { registrarPlato } from "../../api/platillo.api";

export default function AgregarComida(){
    const onSubmit = async (data: RegistrarPayload) => {
    try {
        console.log("Datos enviados:", data);
        const register = await registrarPlato(data)
       
    }catch(error) {
        console.error("Error al registrar la comida",error)
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