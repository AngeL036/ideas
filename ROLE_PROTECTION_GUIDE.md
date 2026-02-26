# Sistema de Protección de Rutas por Roles

## Configuración de Roles

Los roles disponibles son:
- **owner**: Propietario del negocio - acceso completo
- **admin**: Administrador - gestión de empleados, comidas, pagos, ventas
- **mesero**: Mesero - gestión de pedidos y mesas

## Permisos por Ruta

### Comidas
- `GET /comida` - admin, owner, mesero (ver lista)
- `POST /comida/nueva` - admin, owner (crear)
- `PATCH /comida/editar/:id` - admin, owner (editar)

### Pedidos
- `GET /pedidos` - admin, owner, mesero (ver todos)
- `POST /pedido/nuevo` - admin, owner, mesero (crear)
- `GET /detalle/pedido/:id` - admin, owner, mesero (ver detalle)
- `POST /pedido/nuevo/:id` - admin, owner, mesero (crear para mesa)

### Ventas
- `GET /ventas` - admin, owner (solo admin y owner)

### Estadísticas
- `GET /estadisticas` - admin, owner (solo admin y owner)

### Carrito
- `GET /carrito` - admin, owner, mesero (todos)

### Perfil
- `GET /perfil` - admin, owner, mesero (todos)

### Mesas
- `GET /mesas` - admin, owner, mesero (ver todas)
- `POST /mesa/nuevo` - admin, owner (crear)
- `PATCH /mesa/editar/:id` - admin, owner (editar)

### Empleados
- `GET /empleados` - admin, owner (solo admin y owner)

### Negocios
- `GET /negocios` - owner (solo owner)
- `POST /negocio/nuevo` - owner (solo owner)
- `PATCH /negocio/:id/editar` - owner (solo owner)

### Pagos
- `GET /pagos` - admin, owner (solo admin y owner)

## Uso en Componentes

### Hook useRoleProtection

```tsx
import { useRoleProtection } from '@/hooks/useRoleProtection';

function MiComponente() {
    const { user, hasRole } = useRoleProtection();

    return (
        <div>
            {hasRole('owner') && <OwnerContent />}
            {hasRole(['admin', 'owner']) && <AdminContent />}
            {hasRole('mesero') && <MeseroContent />}
        </div>
    );
}
```

### Componente ProtectedRoute

```tsx
<Route path='/ruta-protegida' element={
    <ProtectedRoute allowedRoles={['owner', 'admin']}>
        <MiComponente />
    </ProtectedRoute>
} />
```

## Verificación de Datos de Usuario

El usuario autenticado se guarda en localStorage con el siguiente formato:

```json
{
    "id": 1,
    "email": "user@example.com",
    "role": "owner",
    "created_at": "2024-01-01T00:00:00Z"
}
```

## Manejo de Errores

Si un usuario sin permisos intenta acceder a una ruta protegida:
- La aplicación lo redirige al dashboard (`/`)
- Si no está autenticado, lo redirige a `/login`

## Ejemplo de Integración en Componente

```tsx
import { useRoleProtection } from '@/hooks/useRoleProtection';

export default function IndexEmpleados() {
    const { hasRole, user } = useRoleProtection();

    if (!hasRole(['owner', 'admin'])) {
        return <div>No tienes permisos para acceder a esta página</div>;
    }

    return (
        <div>
            <h1>Gestión de Empleados</h1>
            {/* Contenido */}
        </div>
    );
}
```
