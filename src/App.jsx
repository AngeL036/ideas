import { BrowserRouter, Route, Routes} from 'react-router-dom'
import './App.css'
import AppRoutes from './routes/AppRoutes'

function App() {
  
 {/* descomenta esto solo para producción, si vas a desplegar la app bajo /restaurante, establece el basename en BrowserRouter
    <BrowserRouter basename='/restaurante/'>
    */}
  return (
    <BrowserRouter basename='/restaurante/'>
      <AppRoutes />
    </BrowserRouter>
  )
}

export default App
