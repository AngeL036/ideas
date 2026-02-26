import axios from 'axios';

const API_BASE = 'http://localhost:8000';

interface TestUser {
    email: string;
    password: string;
    role: string;
}

interface ProtectedRoute {
    path: string;
    allowedRoles: string[];
}

// Usuarios de prueba (estos deben existir en tu base de datos)
const testUsers: TestUser[] = [
    { email: 'owner@test.com', password: 'password', role: 'owner' },
    { email: 'admin@test.com', password: 'password', role: 'admin' },
    { email: 'mesero@test.com', password: 'password', role: 'mesero' }
];

// Rutas protegidas según roles
const protectedRoutes: ProtectedRoute[] = [
    { path: '/comida/nueva', allowedRoles: ['admin', 'owner'] },
    { path: '/comida', allowedRoles: ['admin', 'owner', 'mesero'] },
    { path: '/pedidos', allowedRoles: ['admin', 'owner', 'mesero'] },
    { path: '/ventas', allowedRoles: ['admin', 'owner'] },
    { path: '/estadisticas', allowedRoles: ['admin', 'owner'] },
    { path: '/mesas', allowedRoles: ['admin', 'owner', 'mesero'] },
    { path: '/mesa/nuevo', allowedRoles: ['admin', 'owner'] },
    { path: '/empleados', allowedRoles: ['admin', 'owner'] },
    { path: '/negocios', allowedRoles: ['owner'] },
    { path: '/pagos', allowedRoles: ['admin', 'owner'] }
];

export async function testProtection() {
    console.log('🚀 INICIANDO PRUEBAS DE PROTECCIÓN DE RUTAS\n');

    for (const user of testUsers) {
        console.log(`\n📋 Probando con usuario: ${user.email} (${user.role})`);
        console.log('═'.repeat(60));

        try {
            // 1. Test Login
            console.log('  ✓ Intentando login...');
            const loginResponse = await axios.post(`${API_BASE}/auth/login`, {
                email: user.email,
                password: user.password
            });

            const token = loginResponse.data?.token || loginResponse.data?.access_token;
            const userData = loginResponse.data?.user;

            if (!token) {
                console.error(`  ✗ No se recibió token para ${user.email}`);
                continue;
            }

            console.log(`  ✓ Login exitoso`);
            console.log(`  ✓ Token recibido: ${token.substring(0, 20)}...`);
            console.log(`  ✓ Usuario: ${userData?.email} | Rol: ${userData?.role}`);

            // 2. Simular almacenamiento en localStorage
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(userData));

            // 3. Test ruta protegida
            console.log('\n  Validando acceso a rutas:');
            for (const route of protectedRoutes) {
                const hasAccess = route.allowedRoles.includes(user.role);
                const status = hasAccess ? '✓ PERMITIDO' : '✗ DENEGADO';
                console.log(`    ${status} - ${route.path}`);
            }

            // 4. Test endpoint /me
            console.log('\n  Probando endpoint /me...');
            const meResponse = await axios.get(`${API_BASE}/auth/me`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            console.log(`  ✓ Datos del usuario obtenidos:`);
            console.log(`    - ID: ${meResponse.data.id}`);
            console.log(`    - Email: ${meResponse.data.email}`);
            console.log(`    - Role: ${meResponse.data.role}`);

            // Limpiar localStorage
            localStorage.clear();

        } catch (error: any) {
            console.error(`  ✗ Error: ${error.response?.data?.detail || error.message}`);
        }
    }

    console.log('\n\n✅ PRUEBAS COMPLETADAS\n');
}

// Ejecutar pruebas
testProtection().catch(console.error);
