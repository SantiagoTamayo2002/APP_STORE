import React, { createContext, useContext, useState, useEffect } from 'react';

// Crear contexto
export const AuthContext = createContext(); 

// Proveedor de autenticación
export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        // Revisar si hay un token en localStorage al cargar la aplicación
        const token = localStorage.getItem('authToken');
        setIsAuthenticated(!!token);
    }, []);

    const login = () => {
        // Simula el inicio de sesión
        localStorage.setItem('authToken', 'some-token'); // Guarda un token simulado
        setIsAuthenticated(true);
    };

    const logout = () => {
        localStorage.removeItem('authToken');
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook para usar el contexto de autenticación
export const useAuth = () => {
    return useContext(AuthContext);
};
