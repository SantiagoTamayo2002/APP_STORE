import '../App.css';
import Footer from './Footer';
import { useAuth } from './AuthContext';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
    const [correo, setCorreo] = useState('');
    const [contraseña, setContraseña] = useState('');
    const [mensaje, setMensaje] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();
    const [usuario, setUsuario] = useState(() => {
        // Cargar usuario desde localStorage al iniciar
        const storedUser = localStorage.getItem('usuario');
        return storedUser ? JSON.parse(storedUser) : null;
    });

    useEffect(() => {
        // Redirigir automáticamente si ya hay un usuario autenticado
        if (usuario) {
            navigate('/welcome');
        }
    }, [usuario, navigate]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = { correo, contraseña };

        console.log('Datos enviados al servidor:', data); // Depuro papu

        try {
            const response = await fetch('http://localhost:5000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            console.log('Respuesta completa del servidor:', response);

            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`);
            }

            const result = await response.json();
            console.log('Cuerpo de la respuesta:', result);

            if (result.success) {
                console.log('Inicio de sesión exitoso');
                setUsuario(result.user); // Actualizar estado local
                localStorage.setItem('usuario', JSON.stringify(result.user)); // Guardar en localStorage
                login(); // Actualizar estado de autenticación global
                navigate('/welcome'); // Redirigir al usuario
            } else {
                console.error('Error de autenticación:', result.message);
                setMensaje(result.message || 'Credenciales incorrectas');
            }
        } catch (error) {
            console.error('Error durante la conexión:', error);
            setMensaje('Hubo un problema con el inicio de sesión. Inténtalo nuevamente.');
        }
    };

    const handleLogout = () => {
        setUsuario(null);
        localStorage.removeItem('usuario');
        setMensaje('Sesión cerrada');
        login(); // Esto también debe poder borrar el estado global de autenticación, aunque aún no se si lo utilizaré xd
        navigate('/'); 
    };
    

    return (
        <div>
            <div className='w-full h-[88vh] bg-[#101828] flex items-center justify-center navbar-gradient'>
                <div className='w-full items-center justify-center flex flex-col py-24'>
                    <p className='text-white text-2xl font-bold mb-8'>
                        APP<strong className='text-[#3399ff]'>STORE</strong>
                    </p>

                    {!usuario ? (
                        <div className="w-full flex items-center justify-center navbar-gradient">
                            <div className="max-w-lg w-full p-8 neumorphism-box navbar-gradient rounded-lg shadow-xl">
                                <p className="text-4xl font-bold text-transparent bg-gradient-to-r from-blue-200 to-blue-500 bg-clip-text text-center mb-6 
                                    shadow-lg hover:shadow-2xl transition duration-300">
                                    Inicia Sesión
                                </p>
                                {mensaje && <p className="text-red-500 mb-4">{mensaje}</p>}
                                <form onSubmit={handleSubmit}>
                                    <h2 className="text-white text-2xl font-semibold mb-4">Correo electrónico</h2>
                                    <input
                                        type="text"
                                        name="correo"
                                        id="correo"
                                        placeholder="Ingresa tu correo"
                                        className="w-full p-3 mb-4 rounded-lg bg-[#1A202C] text-white border border-[#2D3748] focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        value={correo}
                                        onChange={(e) => setCorreo(e.target.value)}
                                    />
                                    <h2 className="text-white text-2xl font-semibold mb-4">Contraseña</h2>
                                    <input
                                        type="password"
                                        name="contraseña"
                                        id="contraseña"
                                        placeholder="Ingresa tu contraseña"
                                        className="w-full p-3 mb-4 rounded-lg bg-[#1A202C] text-white border border-[#2D3748] focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        value={contraseña}
                                        onChange={(e) => setContraseña(e.target.value)}
                                    />
                                    <button
                                        type="submit"
                                        className="w-full p-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        Continuar
                                    </button>
                                    <p className="text-white mt-4 text-center">
                                        ¿No tienes una cuenta?  
                                        <span
                                            className="text-blue-400 hover:underline ml-1 cursor-pointer"
                                            onClick={() => navigate("/register")}
                                        >
                                            Regístrate
                                        </span>
                                    </p>
                                </form>
                            </div>
                        </div>
                    ) : (
                        <div className="w-full flex items-center justify-center navbar-gradient">
                            <div className="max-w-lg w-full p-8 neumorphism-box navbar-gradient rounded-lg shadow-xl text-center">
                                <h2 className="text-white text-2xl font-bold">Bienvenido, {usuario.nombre}</h2>
                                <p className="text-white mb-6">Correo: {usuario.correo}</p>
                                <button
                                    onClick={handleLogout}
                                    className="w-full p-3 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                                >
                                    Cerrar sesión
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Login;

