import { BrowserRouter, Route, Routes} from 'react-router-dom'
import './App.css'
import AppRoutes from './routes/AppRoutes'

function App() {
  

  return (
   <BrowserRouter basename='/sistema'>
      <AppRoutes />
   </BrowserRouter>
  )
}

export default App
