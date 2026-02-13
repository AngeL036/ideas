import {useForm} from 'react-hook-form'
import { obtenerPlatos } from '../../api/platillo.api'
import { useEffect, useState } from 'react'
import type { PlatilloPayload } from '../../types/Platillo';
import PedidoCard from '../../components/pedidos/PedidoCard';
export default function PedidoNuevo(){

    const [comidas,setComidas] = useState<PlatilloPayload[]>([]);
    const [loading,setLoading] = useState(true);

    useEffect(() => {
        cargarComidas();
    },[])

    const cargarComidas = async () => {
        try{
            const data = await obtenerPlatos();
            setComidas(data);
        }catch (error){
            console.log("Error al cargar la comida",error);
        }finally{
            setLoading(false)
        }
    }

    if (loading) {
    return (
      <div className="flex justify-center items-center h-60">
        <p className="text-gray-500 animate-pulse text-lg">
          Cargando platillos...
        </p>
      </div>
    );
  }
    
    return(
        <div>
          <div>
            <h1>Pedido nuevo</h1>
          </div>
          {comidas.length === 0 ? (
             <div className="bg-white rounded-xl shadow p-10 text-center">
          <p className="text-gray-500 text-lg">
            No hay platillos registrados 🍽️
          </p>
        </div>
          ) : (
            <div className='grid gap-6
                            grid-cols-1
                            sm:grid-cols-2
                            lg:grid-cols-3'>
                {comidas.map((comida) => (
                    <PedidoCard
                    key={comida.id}
                    comida={comida}
                    />
                ))}
            </div>
          )}
        </div>
    )
}