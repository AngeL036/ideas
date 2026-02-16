

interface Props{
    numero:number;
    estado:string;
}

export default function ContadorMesas({numero,estado}:Props)
{
    return(
        <div className="flex flex-col bg-white rounded-xl items-center justify-center shadow-xl p-4">
            <span className="text-xl font-semibold">{numero}</span>
            <span>{estado}</span>
        </div>
    )
}