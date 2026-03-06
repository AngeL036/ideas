import { createContext,useContext, useMemo } from "react";
import type { ReactNode } from "react";
import type { GiroConfig } from "../../types/giro.types";

const GiroContext = createContext<GiroConfig | null>(null)

interface GiroProviderProps {
    config: GiroConfig
    children: ReactNode
}

export function GiroProvider({config, children}: GiroProviderProps){
    useMemo(() => {
        const root = document.documentElement
        root.style.setProperty('--color-primary', config.tema.primary)
        root.style.setProperty('--color-secondary', config.tema.secondary)
        root.style.setProperty('--color-accent', config.tema.accent)

    },[config.tema])

    return (
        <GiroContext.Provider value={config}>
            {children}
        </GiroContext.Provider>
    )
}

export function useGiro(): GiroConfig{
    const ctx = useContext(GiroContext)
    if(!ctx){
        throw new Error('useGiro debe usarse dentro de <GiroProvider>')
    }
    return ctx
}


export function useModulo(modulo:string): boolean {
    const {modulos} = useGiro()
    return modulos.includes(modulo)
}
export default GiroContext