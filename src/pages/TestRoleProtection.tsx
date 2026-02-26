import { useState } from 'react';
import axios from 'axios';
import { useRoleProtection } from '../hooks/useRoleProtection';

interface TestResult {
    test: string;
    status: 'success' | 'error' | 'pending';
    message: string;
}

const testUsers = [
    { email: 'owner@example.com', password: 'password123', role: 'owner' },
    { email: 'admin@example.com', password: 'password123', role: 'admin' },
    { email: 'mesero@example.com', password: 'password123', role: 'mesero' }
];

const protectedRoutes = [
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

export default function TestRoleProtection() {
    const [results, setResults] = useState<TestResult[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedUser, setSelectedUser] = useState(testUsers[0]);
    const { user: currentUser } = useRoleProtection();

    const runTests = async () => {
        setIsLoading(true);
        const newResults: TestResult[] = [];

        try {
            // Test 1: Login
            newResults.push({
                test: `Login - ${selectedUser.email}`,
                status: 'pending',
                message: 'Intentando login...'
            });
            setResults([...newResults]);

            const loginResponse = await axios.post('http://localhost:8000/auth/login', {
                email: selectedUser.email,
                password: selectedUser.password
            });

            const token = loginResponse.data?.token || loginResponse.data?.access_token;
            const userData = loginResponse.data?.user;

            newResults[0] = {
                test: `Login - ${selectedUser.email}`,
                status: 'success',
                message: `Token & User obtenido. Rol: ${userData?.role}`
            };
            setResults([...newResults]);

            if (!token) throw new Error('No token received');

            // Test 2: Validar endpoint /me
            const meResponse = await axios.get('http://localhost:8000/auth/me', {
                headers: { Authorization: `Bearer ${token}` }
            });

            newResults.push({
                test: 'Endpoint /me',
                status: 'success',
                message: `ID: ${meResponse.data.id}, Email: ${meResponse.data.email}, Role: ${meResponse.data.role}`
            });
            setResults([...newResults]);

            // Test 3: Validar roles en localStorage
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(userData));

            const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
            newResults.push({
                test: 'localStorage Storage',
                status: 'success',
                message: `Usuario guardado: ${storedUser.email}, Rol: ${storedUser.role}`
            });
            setResults([...newResults]);

            // Test 4: Validar rutas protegidas
            for (const route of protectedRoutes) {
                const hasAccess = route.allowedRoles.includes(userData?.role);
                newResults.push({
                    test: `Acceso a ${route.path}`,
                    status: hasAccess ? 'success' : 'error',
                    message: hasAccess ? 'PERMITIDO' : 'DENEGADO'
                });
            }
            setResults([...newResults]);

            // Limpiar
            localStorage.clear();

        } catch (error: any) {
            newResults.push({
                test: 'Error General',
                status: 'error',
                message: error.response?.data?.detail || error.message
            });
            setResults([...newResults]);
        }

        setIsLoading(false);
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white p-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold mb-8">🔐 Test de Protección de Rutas</h1>

                <div className="bg-gray-800 rounded-lg p-6 mb-8">
                    <h2 className="text-2xl font-semibold mb-4">Usuario Actual</h2>
                    {currentUser ? (
                        <div className="grid grid-cols-3 gap-4">
                            <div>
                                <p className="text-gray-400">Email</p>
                                <p className="font-mono text-green-400">{currentUser.email}</p>
                            </div>
                            <div>
                                <p className="text-gray-400">Rol</p>
                                <p className="font-mono text-blue-400 uppercase">{currentUser.role}</p>
                            </div>
                            <div>
                                <p className="text-gray-400">ID</p>
                                <p className="font-mono text-purple-400">{currentUser.id}</p>
                            </div>
                        </div>
                    ) : (
                        <p className="text-gray-400">No autenticado</p>
                    )}
                </div>

                <div className="bg-gray-800 rounded-lg p-6 mb-8">
                    <h2 className="text-2xl font-semibold mb-4">Opciones de Prueba</h2>
                    <div className="flex gap-4 items-center mb-6">
                        <label className="text-lg">
                            Selecciona usuario para pruebas:
                        </label>
                        <select
                            value={JSON.stringify(selectedUser)}
                            onChange={(e) => setSelectedUser(JSON.parse(e.target.value))}
                            className="bg-gray-700 text-white px-4 py-2 rounded"
                        >
                            {testUsers.map((user) => (
                                <option key={user.email} value={JSON.stringify(user)}>
                                    {user.email} ({user.role})
                                </option>
                            ))}
                        </select>
                    </div>

                    <button
                        onClick={runTests}
                        disabled={isLoading}
                        className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg transition"
                    >
                        {isLoading ? 'Ejecutando pruebas...' : '▶️ Ejecutar Pruebas'}
                    </button>
                </div>

                <div className="bg-gray-800 rounded-lg p-6">
                    <h2 className="text-2xl font-semibold mb-4">Resultados</h2>
                    {results.length === 0 ? (
                        <p className="text-gray-400">Haz clic en "Ejecutar Pruebas" para comenzar</p>
                    ) : (
                        <div className="space-y-3">
                            {results.map((result, idx) => (
                                <div
                                    key={idx}
                                    className={`p-4 rounded-lg border-l-4 ${
                                        result.status === 'success'
                                            ? 'bg-green-900 border-green-500'
                                            : result.status === 'error'
                                            ? 'bg-red-900 border-red-500'
                                            : 'bg-yellow-900 border-yellow-500'
                                    }`}
                                >
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <p className="font-semibold">{result.test}</p>
                                            <p className="text-sm mt-1">{result.message}</p>
                                        </div>
                                        <span className="text-2xl">
                                            {result.status === 'success'
                                                ? '✅'
                                                : result.status === 'error'
                                                ? '❌'
                                                : '⏳'}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="bg-gray-800 rounded-lg p-6 mt-8">
                    <h2 className="text-2xl font-semibold mb-4">Resumen de Rutas Protegidas</h2>
                    <div className="grid grid-cols-2 gap-4">
                        {protectedRoutes.map((route) => (
                            <div
                                key={route.path}
                                className="bg-gray-700 p-4 rounded border border-gray-600"
                            >
                                <p className="font-mono text-sm text-blue-400">{route.path}</p>
                                <p className="text-sm mt-2">
                                    {route.allowedRoles.map((role) => (
                                        <span
                                            key={role}
                                            className={`inline-block mr-2 px-2 py-1 rounded text-xs ${
                                                role === 'owner'
                                                    ? 'bg-purple-600'
                                                    : role === 'admin'
                                                    ? 'bg-blue-600'
                                                    : 'bg-green-600'
                                            }`}
                                        >
                                            {role.toUpperCase()}
                                        </span>
                                    ))}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
