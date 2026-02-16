import FormComida from "../../components/comidas/FormComida"
import { useState,useEffect } from "react"
import type { RegistrarPayload } from "../../types/Platillo"
import { useParams } from "react-router-dom";

export default function EditarComida(){
    const {id} = useParams();
    const [plato,setPlato]  = useState<RegistrarPayload>();


    useEffect(() => {
        setPlato({
            nombre:"chilaquieres",
            precio:99,
            descripcion:"chilaquiles rojos",
        });
    }, [])

    const onSubmit = async (data:RegistrarPayload) => {
         console.log("Editando ID:", id);
        console.log("Datos:", data);
    };

    if(!plato) return null;

    return(
        <FormComida
        title="Editar Comida"
        buttonText="Actualizar Comida"
        defaultValues={plato}
        onSubmit={onSubmit}
        ></FormComida>
    )
}