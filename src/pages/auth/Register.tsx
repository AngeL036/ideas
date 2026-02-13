import {useForm} from 'react-hook-form'
import type { RegisterUser } from '../../types/User';
import { CreateUser } from '../../api/User.api';

export default  function Register(){
    const {register,handleSubmit} = useForm<RegisterUser>();
    const onSubmit = async (data:RegisterUser)=> {
        try{
            const response = await CreateUser(data)
            console.log(response)
        }catch(error){
            console.error("Error al registrar al usuario",error)
        }
    }

    return(
        <div className='max-w-xl mx-auto bg-white p-6 rounded-xl shadow'>
            <h1 className='text-2xl font-bold mb-6 text-gray-800'>Registro</h1>
            <form 
             onSubmit={handleSubmit(onSubmit)}
             className='space-y-4'>
                <input 
                    type="email"
                    placeholder="Correo"
                    {...register("email",{
                        required:true,

                    })}
                    className='w-full mt-1 p-2 border rounded-lg focus:ring focus:ring-green-300'
                />
                <input 
                    type="password"
                    placeholder="Contraseña"
                    {...register("password",{
                        required:true,
                    })}
                    className='w-full mt-1 p-2 borded rounded-lg focus:ring focus:ring-green-600'
                />
                <button 
                 className='w-full bg-green-600 text-white py-2 rounded-lg
                            hover:bg-green-700 transition'
                >Registrarse</button>
            </form>
        </div>
    )
}