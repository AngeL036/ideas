import ContadorMesas from "../../components/mesas/ContadorMesas";
import Mesas from "../../components/mesas/Mesas"

export default function IndexMesas(){
     const mesas = [
    { id: 1, estado: "ocupada" },
    { id: 2, estado: "libre" },
    { id: 3, estado: "ocupada" },
    { id: 4, estado: "libre" },
    { id: 5, estado: "libre"},
  ];

  const libre = mesas.filter(m => m.estado === "libre").length;
  const ocupadas = mesas.filter(m => m.estado === "ocupada").length;
  
  const capacidadMaxima = 50;
  const porcentaje = Math.round((ocupadas / capacidadMaxima) * 100)
    return(
        <div className="p-6 space-y-8">
            {/* Título */}
            <div >
                <h1 className="text-3xl font-bold text-gray-800 ">
                    Gestion de Mesas
                </h1>
                <p className="text-gray-500 text-sm">
                    Administra el estado actual del restaurante    
                </p>  
            </div>
            {/* Contadores */}
            <section className="grid grid-cols-4 gap-4 p-4">
                <ContadorMesas 
                    numero={4}
                    estado={"Disponible"}
                />
                <ContadorMesas 
                    numero={2}
                    estado={"Ocupada"}
                />
                <ContadorMesas 
                    numero={5}
                    estado={"Reservada"}
                />
                <ContadorMesas 
                    numero={1}
                    estado={"Limpieza"}
                />
            </section>
            {/* Capacidad */}
            <section className=" bg-white p-6 rounded-xl shadow space-y-4"> 
                <h2 className="text-lg font-semibold">
                    Capacidad del Restaurante
                </h2>
                <div className="flex justify-between text-sm text-gray-600">
                        <span>{ocupadas} de {capacidadMaxima} personas</span>
                        <span>{porcentaje}%</span>
                    </div>
                    {/* Barra de progreso */}
                    <div className="w-full bg-gray-200 rounded-full h-4">
                        <div
                            className="bg-blue-600 h-4 rounded-full transition-all duration-500"
                            style={{width: `${porcentaje}%`}}
                            >
                        </div>
                    </div>
                
            </section>
            {/* Grid de mesas */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ">
                {mesas.map((mesa) => (
                    <Mesas
                    key={mesa.id}
                    mesa={mesa}
                    />
                ))}
           </div>
        </div>
    )
}