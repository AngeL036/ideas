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
import VerificacionExitosa from '../pages/auth/VerificacionExitosa'
import VerificacionError from '../pages/auth/VerificacionError'
import InventarioIndex from '../pages/inventario/InventarioIndex'
import { GiroConfig } from '../config'
import ReportesIndex from '../pages/reportes/ReportesIndex'
import FormAddProduct from '../pages/inventario/FormAddProduct'
import IndexPunto from '../pages/puntoVenta/indexPunto'
import IndexClientes from '../pages/clientes/IndexClientes'
export default function AppRoutes({config}: {config?: GiroConfig}){
    return(
    <Routes>
        <Route element={<PublicLayout />}>
            <Route path='/login' element={<Login />} />
            <Route path='/registro' element={<Register />} />
            <Route path='/verificacion-exitosa' element={<VerificacionExitosa/>} />
            <Route path='/verificacion-error' element={<VerificacionError/>}/>
        </Route>

        <Route element={<PrivateLayout />}>
            {/* ── CAMBIO: Dashboard protegido — mesero rebota a /mesas, no al Dashboard ── */}
            <Route
                path="/"
                element={
                    <ProtectedRoute allowedRoles={['admin', 'owner']} fallbackPath="/mesas">
                        <Dashboard/>
                    </ProtectedRoute>
                }
            />

            {/* Comidas */}
            <Route path='/comida/nueva'     element={<ProtectedRoute allowedRoles={['admin', 'owner']}><AgregarComida/></ProtectedRoute>} />
            <Route path='/comida'           element={<ProtectedRoute allowedRoles={['admin', 'owner', 'mesero']}><ListaComida /></ProtectedRoute>} />
            <Route path='/comida/editar/:id'element={<ProtectedRoute allowedRoles={['admin', 'owner']}><EditarComida /></ProtectedRoute>} />

            {/* Pedidos */}
            <Route path='/pedidos'          element={<ProtectedRoute allowedRoles={['admin', 'owner', 'mesero']}><IndexPedidos /></ProtectedRoute>} />
            <Route path='/pedido/nuevo'     element={<ProtectedRoute allowedRoles={['admin', 'owner', 'mesero']}><PedidoNuevo /></ProtectedRoute>} />
            <Route path='/detalle/pedido/:id' element={<ProtectedRoute allowedRoles={['admin', 'owner', 'mesero']}><DetallePedido /></ProtectedRoute>} />
            <Route path='/pedido/nuevo/:id' element={<ProtectedRoute allowedRoles={['admin', 'owner', 'mesero']}><PedidoNuevoMesa /></ProtectedRoute>} />

            {/* Ventas */}
            <Route path='/ventas'           element={<ProtectedRoute allowedRoles={['admin', 'owner']}><IndexVenta/></ProtectedRoute>} />

            {/* Estadísticas */}
            <Route path='/estadisticas'     element={<ProtectedRoute allowedRoles={['admin', 'owner']}><IndexEstadisticas /></ProtectedRoute>} />

            {/* Carrito */}
            <Route path='/carrito'          element={<ProtectedRoute allowedRoles={['admin', 'owner', 'mesero']}><Carrito /></ProtectedRoute>}/>

            {/* Perfil */}
            <Route path='/perfil'           element={<ProtectedRoute allowedRoles={['admin', 'owner', 'mesero']}><PerfilIndex /></ProtectedRoute>} />

            {/* Mesas */}
            <Route path='/mesas'            element={<ProtectedRoute allowedRoles={['admin', 'owner', 'mesero']}><IndexMesas /></ProtectedRoute>}/>
            <Route path='/mesa/nuevo'       element={<ProtectedRoute allowedRoles={['admin', 'owner']}><AgregarMesa /></ProtectedRoute>} />
            <Route path='/mesa/editar/:id'  element={<ProtectedRoute allowedRoles={['admin', 'owner', 'mesero']}><DetallesMesa/></ProtectedRoute>} />

            {/* Empleados */}
            <Route path='/empleados'        element={<ProtectedRoute allowedRoles={['admin', 'owner']}><IndexEmpleados /></ProtectedRoute>} />
            {/* Clientes */}
            <Route path='/clientes'          element={<ProtectedRoute allowedRoles={['admin','owner']}><IndexClientes /></ProtectedRoute>}/>

            {/* Negocios */}
            <Route path='/negocios'         element={<ProtectedRoute allowedRoles={['owner']}><NegocioIndex /></ProtectedRoute>} />
            <Route path='/negocio/nuevo'    element={<ProtectedRoute allowedRoles={['owner']}><AgregarNegocio/></ProtectedRoute>} />
            <Route path='/negocio/:id/editar' element={<ProtectedRoute allowedRoles={['owner']}><EditarNegocio /></ProtectedRoute>} />

            {/* Inventario */}
            <Route path='/inventario'       element={<ProtectedRoute allowedRoles={['admin', 'owner']}><InventarioIndex /></ProtectedRoute>} />
            <Route path='/product/add'      element={<ProtectedRoute allowedRoles={['admin', 'owner']}><FormAddProduct /></ProtectedRoute>} />
            {/* Reportes */}
            <Route path='/reportes'         element={<ProtectedRoute allowedRoles={['admin', 'owner']}><ReportesIndex /></ProtectedRoute>}/>

            {/* Pagos */}
            <Route path='/pagos'            element={<ProtectedRoute allowedRoles={['admin', 'owner']}><IndexPagos /></ProtectedRoute>} />
            {/* pos */}
            <Route path='/pos'              element={<ProtectedRoute allowedRoles={['admin', 'owner', 'vendedor']}><IndexPunto /></ProtectedRoute>}/>
        </Route>
    </Routes>
    )
}