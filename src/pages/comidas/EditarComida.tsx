import FormComida from "../../components/comidas/FormComida"
import { useState,useEffect } from "react"
import type { RegistrarPayload, PlatilloPayload } from "../../types/Platillo"
import { useNavigate, useParams } from "react-router-dom";
import { obtenerPlato, updatePlato } from "../../api/platillo.api";
import Swal from "sweetalert2";

export default function EditarComida(){
    const {id} = useParams();
    const navigate = useNavigate()
    const [plato,setPlato]  = useState<PlatilloPayload>();


    useEffect(() => {
        const fetchPlato = async () => {
            const data = await obtenerPlato(Number(id));
            setPlato(data)
        };
        fetchPlato();
    }, [id])

    const onSubmit = async (data:RegistrarPayload) => {
        try{
            await updatePlato(data,Number(id));
            await Swal.fire({
                title: "Actualizado",
                text: "El platillo se actualizó correctamente",
                icon: "success",
                timer: 1200,
                showConfirmButton: false,
            });
            navigate(-1);
        }catch (error){
            Swal.fire({
                title: "Error",
                text: "No se pudo actualizar el platillo",
                icon: "error",
            });
        }
        
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