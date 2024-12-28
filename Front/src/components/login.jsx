import '../App.css';
import Footer from './Footer';
import React, { useState } from 'react';

export const Login = () => {

    const [correo, setCorreo] = useState('');
    const [contraseña, setContraseña] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = { correo, contraseña };

        try {
            const response = await fetch('http://localhost:5000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',  // Enviando como JSON
                },
                body: JSON.stringify(data),  // Convertir los datos a JSON
            });

            const result = await response.json();
            console.log(result.message);  // Procesar la respuesta

        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <div className='w-full h-[88vh] bg-[#101828] flex items-center justify-center navbar-gradient'>
                <div className='w-full items-center justify-center flex flex-col py-24'>
                    <p className='text-white text-2xl font-bold mb-8'>
                        APP<strong className='text-[#3399ff]'>STORE</strong>
                    </p>

                    <div className="w-full flex items-center justify-center navbar-gradient">
                        <div className="max-w-lg w-full p-8 neumorphism-box navbar-gradient rounded-lg shadow-xl">
                            <p className="text-4xl font-bold text-transparent bg-gradient-to-r from-blue-200 to-blue-500 bg-clip-text text-center mb-6 
                                shadow-lg hover:shadow-2xl transition duration-300">
                                Inicia Sesión
                            </p>
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
                            <form onSubmit={handleSubmit}>
                                <button
                                    type="submit"
                                    className="w-full p-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    Continuar
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
};

export default Login;
