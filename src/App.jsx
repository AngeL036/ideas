import { BrowserRouter, Navigate, Route, Routes} from 'react-router-dom'
import './App.css'
import AppRoutes from './routes/AppRoutes'

import { useAuth } from "./hooks/AuthContext"
import { GiroProvider } from './config/giros/GiroContext' 
import { getGiroConfig } from './config'

function App() {
  const {negocio, loading} = useAuth()

  if (loading) return null

  if (!negocio) {
    return <AppRoutes />
  }
  const giroConfig = getGiroConfig(negocio?.giro ?? 'restaurante')
 {/* descomenta esto solo para producción, si vas a desplegar la app bajo /restaurante, establece el basename en BrowserRouter
    <BrowserRouter basename='/restaurante/'>
    */}
  return (
    <GiroProvider config={giroConfig} >
      <AppRoutes config={giroConfig} />
    </GiroProvider>
  )
}

export default App
