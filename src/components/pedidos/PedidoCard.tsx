import { useState } from "react";
import type { PlatilloPayload } from "../../types/Platillo";
import { Plus, ImageOff, Group } from "lucide-react";

interface Props {
  comida: PlatilloPayload;
  onAgregar: (platillo_id: number, nombre: string, precio:number, cantidad:number) => void;
}

export default function PedidoCard({ comida, onAgregar }: Props) {
  
  const handleAgregar = () => {
    onAgregar(comida.id, comida.nombre, comida.precio, 1)
  };

  return (
    <div 
      className="group rounded-2xl border bg-white shadow-sm hover:shadow-mb transition cursor-pointer overflow-hidden active:scalate-95"
      onClick={handleAgregar}>
      <div 
        className="h-32 bg-slate-100 flex items-center justify-center">
        {comida.imagen ? (
          <img 
          src={comida.imagen}
          alt={comida.nombre}
          className="w-full h-full object-cover"
          />
        ): (
          <div className="flex flex-col items-center text-slate-400">
            <ImageOff  className="w-8 h-8"/>
            <span className="text-sm">
              {comida.nombre.charAt(0)}
            </span>
          </div>
        )}
      </div>
      {/******/}
      <div className="p-3 space-y-2">
        <h3 className="font-semibold text-slate-800 line-clamp-1">
          {comida.nombre}
        </h3>
        <div className="flex items-center justify-between">
          <span className="font-bold text-emerald-600">
            ${comida.precio}
          </span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleAgregar();
            }}
            className="bg-emerald-600 text-white p-1.5 rounded-lg hover:bg-emerald-700 transition"
          >
            <Plus size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}
