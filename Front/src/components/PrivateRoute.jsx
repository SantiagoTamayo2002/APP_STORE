import React, { useContext } from 'react';
import { AuthContext } from './AuthContext'; 
import { useNavigate } from 'react-router-dom'; 

const PrivateRoute = ({ children }) => {
    const { isAuthenticated } = useContext(AuthContext); // Obtener el estado de autenticación
    const navigate = useNavigate(); // Hook para navegar entre rutas

    if (!isAuthenticated) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900">
                <div className="p-8 max-w-md bg-gray-800 rounded-lg shadow-lg">
                    <h2 className="text-3xl font-bold text-white text-center mb-6">
                        Acceso Restringido
                    </h2>
                    <p className="text-gray-300 text-lg text-center mb-8">
                        Por favor, inicia sesión o regístrate para continuar.
                    </p>
                    <div className="flex flex-col gap-4">
                        <button
                            onClick={() => navigate('/login')}
                            className="w-full py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors"
                        >
                            Iniciar Sesión
                        </button>
                        <button
                            onClick={() => navigate('/register')}
                            className="w-full py-3 rounded-lg bg-green-500 text-white font-semibold hover:bg-green-600 transition-colors"
                        >
                            Registrarse
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return children; // Renderiza el contenido protegido si está autenticado
};

export default PrivateRoute;
