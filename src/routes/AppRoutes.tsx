import { Route, Routes} from 'react-router-dom'
import Dashboard from '../pages/dashboard'
import IndexPedidos from '../pages/pedidos/IndexPedidos'
import AgregarComida from '../pages/comidas/AgregarComida'
import ListaComida from '../pages/comidas/listaComida'
import PublicLayout from '../layaouts/PublicLayout'
import PrivateLayout from '../layaouts/PrivateLayout'
import EditarComida from '../pages/comidas/EditarComida'
import IndexVenta from '../pages/ventas/IndexVenta'
import IndexEstadisticas from '../pages/estadisticas/IndexEstadisticas'
import PedidoNuevo from '../pages/pedidos/PedidoNuevo'
import Carrito from '../pages/carrito/Carrito'
import Login from '../pages/auth/Login'
import Register from '../pages/auth/Register'
import DetallePedido from '../pages/pedidos/DetallePedido'
import PerfilIndex from '../pages/perfil/PerfilIndex'
import IndexMesas from '../pages/mesas/IndexMesas'
import DetallesMesa from '../pages/mesas/DetallesMesa'
import AgregarMesa from '../pages/mesas/AgregarMesa'
import IndexEmpleados from '../pages/empleados/IndexEmpleados'
import PedidoNuevoMesa from '../pages/pedidos/PedidoNuevoMesa'
import NegocioIndex from '../pages/negocios/NegocioIndex'
import AgregarNegocio from '../pages/negocios/AgregarNegocio'
import EditarNegocio from '../pages/negocios/EditarNegocio'
import IndexPagos from '../pages/pagos/IndexPagos'
import { ProtectedRoute } from '../components/ProtectedRoute'
import TestRoleProtection from '../pages/TestRoleProtection'

export default function AppRoutes(){
    return(
    <Routes>
        <Route element={<PublicLayout />}>
            <Route path='/login' element={<Login />} />
            <Route path='/registro' element={<Register />} />
        </Route>

        <Route element={<PrivateLayout />}>
            <Route path="/" element={<Dashboard/>}/>
            
            {/* RUTA DE PRUEBA - ELIMINAR EN PRODUCCIÓN */}
            {/*<Route path='/test-roles' element={<TestRoleProtection />} />*/}

                {/**  <Route path='/comidas' element={<Index />} />*/} 
                {/* Comidas - Solo Admin y Owner */}
                <Route path='/comida/nueva' element={<ProtectedRoute allowedRoles={['admin', 'owner']}><AgregarComida/></ProtectedRoute>} />
                <Route path='/comida' element={<ProtectedRoute allowedRoles={['admin', 'owner', 'mesero']}><ListaComida /></ProtectedRoute>} />
                <Route path='/comida/editar/:id' element={<ProtectedRoute allowedRoles={['admin', 'owner']}><EditarComida /></ProtectedRoute>} />

                {/* Pedidos - Todos los roles */}
                <Route path='/pedidos' element={<ProtectedRoute allowedRoles={['admin', 'owner', 'mesero']}><IndexPedidos /></ProtectedRoute>} />
                <Route path='/pedido/nuevo' element={<ProtectedRoute allowedRoles={['admin', 'owner', 'mesero']}><PedidoNuevo /></ProtectedRoute>} />
                <Route path='/detalle/pedido/:id' element={<ProtectedRoute allowedRoles={['admin', 'owner', 'mesero']}><DetallePedido /> </ProtectedRoute>} />
                <Route path='/pedido/nuevo/:id' element={<ProtectedRoute allowedRoles={['admin', 'owner', 'mesero']}><PedidoNuevoMesa /></ProtectedRoute>} />

                {/* Ventas - Solo Admin y Owner */}
                <Route path='/ventas' element={<ProtectedRoute allowedRoles={['admin', 'owner']}><IndexVenta/></ProtectedRoute>} />

                {/* Estadísticas - Solo Admin y Owner */}
                <Route path='/estadisticas' element={<ProtectedRoute allowedRoles={['admin', 'owner']}><IndexEstadisticas /></ProtectedRoute>} />

                {/* Carrito - Todos los roles */}
                <Route path='/carrito' element={<ProtectedRoute allowedRoles={['admin', 'owner', 'mesero']}><Carrito /></ProtectedRoute>}/>

                {/* Perfil - Todos los roles */}
                <Route path='/perfil' element={<ProtectedRoute allowedRoles={['admin', 'owner', 'mesero']}><PerfilIndex /></ProtectedRoute>} />

                {/* Mesas - Todos los roles (con restricciones de funcionalidad por rol) */}
                <Route path='/mesas' element={<ProtectedRoute allowedRoles={['admin', 'owner', 'mesero']}><IndexMesas /></ProtectedRoute>}/>
                <Route path='/mesa/nuevo' element={<ProtectedRoute allowedRoles={['admin', 'owner']}><AgregarMesa /></ProtectedRoute>} />
                <Route path='/mesa/editar/:id' element={<ProtectedRoute allowedRoles={['admin', 'owner']}><DetallesMesa/></ProtectedRoute>} />

                {/* Empleados - Solo Admin y Owner */}
                <Route path='/empleados' element={<ProtectedRoute allowedRoles={['admin', 'owner']}><IndexEmpleados /> </ProtectedRoute>} />

                {/* Negocios - Solo Owner */}
                <Route path='/negocios' element={<ProtectedRoute allowedRoles={['owner']}><NegocioIndex /></ProtectedRoute>} />
                <Route path='/negocio/nuevo' element={<ProtectedRoute allowedRoles={['owner']}><AgregarNegocio/></ProtectedRoute>} />
                <Route path='/negocio/:id/editar' element={<ProtectedRoute allowedRoles={['owner']}><EditarNegocio /></ProtectedRoute>} />

                {/* Pagos - Solo Admin y Owner */}
                <Route path='/pagos' element={<ProtectedRoute allowedRoles={['admin', 'owner']}><IndexPagos /></ProtectedRoute>} />
            </Route>
        </Routes>
    
    )
}
