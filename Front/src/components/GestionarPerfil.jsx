import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from './navbar';
import Footer from './Footer';

const GestionarPerfil = () => {
    const { dni } = useParams(); // Obtener el DNI de la URL
    const [usuario, setUsuario] = useState(null);
    const [direccion, setDireccion] = useState(null);
    const [tarjeta, setTarjeta] = useState(null);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const obtenerDatosPerfil = async () => {
            try {
                const response = await fetch(`http://localhost:5000/perfil/${dni}`);
                if (!response.ok) {
                    throw new Error("Error al obtener los datos del perfil");
                }
                const data = await response.json();
                setUsuario(data.usuario);
                setDireccion(data.direccion);
                setTarjeta(data.tarjeta);
            } catch (error) {
                setError(error.message);
            } finally {
                setCargando(false);
            }
        };

        obtenerDatosPerfil();
    }, [dni]);

    if (cargando) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-[#101828] text-white">
                <p>Cargando...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-[#101828] text-white">
                <p>Error: {error}</p>
            </div>
        );
    }

    return (
        <div className='overflow-hidden min-h-screen flex flex-col bg-[#101828]'>
            <Navbar />
            <div className='flex-1 flex justify-center pt-32 pb-8'>
                <div className='w-full max-w-4xl p-6'>
                    <h1 className="text-4xl font-bold mb-8 text-white text-center">Perfil de Usuario</h1>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-[#1A202C] p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                            <h2 className="text-2xl font-semibold mb-4 text-[#63B3ED]">Datos Personales</h2>
                            <div className="space-y-3">
                                <p><strong className="text-[#63B3ED]">Nombre:</strong> <span className="text-white">{usuario.nom_nombre}</span></p>
                                <p><strong className="text-[#63B3ED]">Apellido:</strong> <span className="text-white">{usuario.nom_apellido}</span></p>
                                <p><strong className="text-[#63B3ED]">DNI:</strong> <span className="text-white">{usuario.dni}</span></p>
                                <p><strong className="text-[#63B3ED]">Correo:</strong> <span className="text-white">{usuario.cuenta_correo}</span></p>
                                <p><strong className="text-[#63B3ED]">Rol:</strong> <span className="text-white">{usuario.rol}</span></p>
                            </div>
                        </div>

                        <div className="bg-[#1A202C] p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                            <h2 className="text-2xl font-semibold mb-4 text-[#63B3ED]">Dirección</h2>
                            <div className="space-y-3">
                                <p><strong className="text-[#63B3ED]">Calle Primaria:</strong> <span className="text-white">{direccion.calle_primaria}</span></p>
                                <p><strong className="text-[#63B3ED]">Calle Secundaria:</strong> <span className="text-white">{direccion.calle_segundaria || "N/A"}</span></p>
                                <p><strong className="text-[#63B3ED]">Referencia:</strong> <span className="text-white">{direccion.referencia}</span></p>
                                <p><strong className="text-[#63B3ED]">Ciudad:</strong> <span className="text-white">{direccion.ciudad}</span></p>
                                <p><strong className="text-[#63B3ED]">Número de Casa:</strong> <span className="text-white">{direccion.N_casa}</span></p>
                                <p><strong className="text-[#63B3ED]">Provincia:</strong> <span className="text-white">{direccion.provincia}</span></p>
                                <p><strong className="text-[#63B3ED]">Código Postal:</strong> <span className="text-white">{direccion.cod_postal}</span></p>
                                <p><strong className="text-[#63B3ED]">País:</strong> <span className="text-white">{direccion.pais}</span></p>
                            </div>
                        </div>

                        <div className="bg-[#1A202C] p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 col-span-1 md:col-span-2">
                            <h2 className="text-2xl font-semibold mb-4 text-[#63B3ED]">Tarjeta</h2>
                            <div className="space-y-3">
                                <p><strong className="text-[#63B3ED]">Número de Tarjeta:</strong> <span className="text-white">{tarjeta.N_tarjeta}</span></p>
                                <p><strong className="text-[#63B3ED]">Tipo:</strong> <span className="text-white">{tarjeta.tipo}</span></p>
                                <p><strong className="text-[#63B3ED]">CVC:</strong> <span className="text-white">{tarjeta.cvc}</span></p>
                                <p><strong className="text-[#63B3ED]">Fecha de Vencimiento:</strong> <span className="text-white">{tarjeta.fecha_venci}</span></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default GestionarPerfil;