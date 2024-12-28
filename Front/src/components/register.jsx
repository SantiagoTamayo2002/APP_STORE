import React, { useState } from 'react';
import '../App.css';
import Footer from './Footer';

export const Register = () => {
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [correo, setCorreo] = useState('');
    const [dni, setDNI] = useState('');
    const [contraseña, setContraseña] = useState('');
    const [contraseña2, setContraseña2] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = { nombre, apellido, dni, correo, contraseña, contraseña2 };

        try {
            const response = await fetch('http://localhost:5000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',  // Enviando como JSON
                },
                body: JSON.stringify(data),  // Convertir los datos a JSON
            });

            const result = await response.json();
            console.log(result.message);  // Procesar la respuesta

            setNombre('');
            setApellido('');
            setCorreo('');
            setDNI('');
            setContraseña('');
            setContraseña2('');

        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <div className='w-full bg-[#101828] flex items-center justify-center navbar-gradient'>
                 <div className='w-full items-center justify-center flex flex-col pt-5'>
                    <p className='text-white text-2xl font-bold mb-20'>
                        APP<strong className='text-[#3399ff]'>STORE</strong>
                    </p>

                    <div>
                        <p className='text-4xl font-bold text-transparent bg-gradient-to-r from-blue-200 to-blue-500 bg-clip-text text-center mb-6 
                            shadow-lg hover:shadow-2xl transition duration-300'>
                            Regístrate
                        </p>

                        <div className='p-8 neumorphism-box navbar-gradient rounded-lg shadow-xl mb-20'>
                            <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div>
                                    <h2 className='text-white text-2xl font-semibold mb-4'>Nombre</h2>
                                    <input
                                        type="text"
                                        name="nombre"
                                        id="nombre"
                                        value={nombre}
                                        onChange={(e) => setNombre(e.target.value)}
                                        placeholder="Ingresa tu nombre"
                                        className="w-full p-3 mb-4 rounded-lg bg-[#1A202C] text-white border border-[#2D3748] focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                <div>
                                    <h2 className='text-white text-2xl font-semibold mb-4'>Apellido</h2>
                                    <input
                                        type="text"
                                        name="apellido"
                                        id="apellido"
                                        value={apellido}
                                        onChange={(e) => setApellido(e.target.value)}
                                        placeholder="Ingresa tu apellido"
                                        className="w-full p-3 mb-4 rounded-lg bg-[#1A202C] text-white border border-[#2D3748] focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                <div>
                                    <h2 className='text-white text-2xl font-semibold mb-4'>DNI</h2>
                                    <input
                                        type="text"
                                        name="dni"
                                        id="dni"
                                        value={dni}
                                        onChange={(e) => setDNI(e.target.value)}
                                        placeholder="Ingresa tu dni"
                                        className="w-full p-3 mb-4 rounded-lg bg-[#1A202C] text-white border border-[#2D3748] focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                <div>
                                    <h2 className='text-white text-2xl font-semibold mb-4'>Correo electrónico</h2>
                                    <input
                                        type="text"
                                        name="correo"
                                        id="correo"
                                        value={correo}
                                        onChange={(e) => setCorreo(e.target.value)}
                                        placeholder="Ingresa tu correo electrónico"
                                        className="w-full p-3 mb-4 rounded-lg bg-[#1A202C] text-white border border-[#2D3748] focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                <div>
                                    <h2 className='text-white text-2xl font-semibold mb-4'>Contraseña</h2>
                                    <input
                                        type="password"
                                        name="contraseña"
                                        id="contraseña"
                                        value={contraseña}
                                        onChange={(e) => setContraseña(e.target.value)}
                                        placeholder="Ingresa tu contraseña"
                                        className="w-full p-3 mb-4 rounded-lg bg-[#1A202C] text-white border border-[#2D3748] focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                <div>
                                    <h2 className='text-white text-2xl font-semibold mb-4'>Vuelve a escribir la contraseña</h2>
                                    <input
                                        type="password"
                                        name="contraseña2"
                                        id="contraseña2"
                                        value={contraseña2}
                                        onChange={(e) => setContraseña2(e.target.value)}
                                        placeholder="Repite tu contraseña"
                                        className="w-full p-3 mb-6 rounded-lg bg-[#1A202C] text-white border border-[#2D3748] focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                <div className="col-span-2">
                                    <button
                                        type="submit"
                                        className="w-full p-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        Continuar
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                </div>
            </div>
            <Footer />
        </div>
    )
};

export default Register;
