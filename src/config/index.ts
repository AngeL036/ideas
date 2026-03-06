import restaurante from './giros/restaurante'
import tienda      from './giros/tienda'
import clinica     from './giros/clinica'
import type { GiroConfig, GiroId } from '../types/giro.types'

const GIROS: Record<GiroId, GiroConfig> = { restaurante, tienda, clinica }

export function getGiroConfig(giro: GiroId): GiroConfig {
  return GIROS[giro] ?? GIROS.restaurante
}

export { GIROS }
export type { GiroConfig, GiroId }