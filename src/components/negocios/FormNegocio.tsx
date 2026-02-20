import { useForm } from "react-hook-form";
import type { Negocio } from "../../types/Negocio";

export default function FormNegocio(){
    const {register, handleSubmit} = useForm<Negocio>();
    return(
        <h1>Hola</h1>
    )
}