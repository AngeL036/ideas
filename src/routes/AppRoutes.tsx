import { Route, Routes} from 'react-router-dom'
import Dashboard from '../pages/dashboard'
import IndexPedidos from '../pages/pedidos/IndexPedidos'
import AgregarComida from '../pages/comidas/AgregarComida'
import ListaComida from '../pages/comidas/listaComida'
import PublicLayaot from '../layaouts/PublicLayout'
import EditarComida from '../pages/comidas/EditarComida'
import IndexVenta from '../pages/ventas/IndexVenta'
import IndexEstadisticas from '../pages/estadisticas/IndexEstadisticas'
import PedidoNuevo from '../pages/pedidos/PedidoNuevo'
import Carrito from '../pages/carrito/Carrito'
import Register from '../pages/auth/Register'
import DetallePedido from '../pages/pedidos/DetallePedido'
import PerfilIndex from '../pages/perfil/PerfilIndex'

export default function AppRoutes(){
    return(
    <Routes>
        
        <Route element={<PublicLayaot />}>
            <Route path="/" element={<Dashboard/>}/>

                {/**  <Route path='/comidas' element={<Index />} />*/} 
                <Route path='/comida/nueva' element={<AgregarComida/>} />
                <Route path='/comida' element={<ListaComida />} />
                <Route path='/comida/editar/:id' element={<EditarComida />} />

                <Route path='/pedidos' element={<IndexPedidos />} />
                <Route path='/pedido/nuevo' element={<PedidoNuevo />} />
                <Route path='/detalle/pedido/:id' element={<DetallePedido /> } />

                <Route path='/ventas' element={< IndexVenta/>} />

                <Route path='/estadisticas' element={<IndexEstadisticas />} />

                <Route path='/carrito' element={<Carrito />}/>

                <Route path='/registro' element={<Register />} />

                <Route path='/perfil' element={<PerfilIndex />} />
            </Route>
        </Routes>
    
    )
}