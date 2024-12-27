import React from 'react';
import '../App.css'; // Asegúrate de importar el archivo de estilos
import { FaGithub, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export const initialPage = () => (
    <div>
        <div className='w-full h-[88vh] bg-[#101828] flex items-center justify-center navbar-gradient'>
            <div className='flex w-[1100px] h-[670px] rounded-lg'>
                <div className='flex flex-col items-center justify-center w-[70%] h-full '>
                    <div className='flex-1 items-center justify-center w-full text-white'>
                        <div className='h-full flex items-center justify-center'>
                            <p className='text-4xl font-bold'>Fran<strong className='text-[#3399ff]'>GGY</strong></p>
                        </div>
                    </div>
                    <div className='flex-1'>
                        <h1 className='text-white font-semibold text-4xl p-4 drop-shadow-[0_0_6px_rgba(51,153,255,1)]'>
                            Regístrate o inicia sesión en nuestro sitio para empezar a comprar desde cualquier parte del mundo.
                        </h1>
                    </div>
                    <div className='flex-1 w-full justify-center'>
                        <div className='flex justify-center mt-6'>
                            <div className='mx-8'>
                                <button className='neumorphism-buttom text-[#3399ff] font-bold p-3 px-8 rounded-lg bg-white'>
                                    <Link to="/welcome">Iniciar sesión</Link>
                                </button>
                            </div>
                            <div className='mx-8'>
                                <button className='neumorphism-buttom text-white p-3 px-9 rounded-lg bg-[#3399ff] font-bold'>
                                    Registrarse
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex items-start justify-center w-[50%]'>
                    <div className=' w-full items-center justify-center flex py-24'>
                        <div>
                            <img src="../src/assets/FranGGY.png" alt="" className='p-8 neumorphism-box navbar-gradient'/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className='bg-[#101828] text-white h-[12.1vh] justify-center flex border-t-2 border-white drop-shadow-[0_0_6px_rgba(51,153,255,1)]'>
            <div className='flex-1'>
                <div className='flex'>
                    <div className='flex items-center justify-center h-[12vh] ml-[10px] '>
                        <img className='h-[87%] rounded-full' src="../src/assets/logo_carrera.png" alt="imagen de la facultad de la energía de la universidad nacional de Loja" />
                    </div>
                    <div className='flex items-center justify-center w-[72%]'>
                        <p className='text-center border-r-2 border-white pr-6'>
                        Un producto de estudiantes en la carrera de computación. <strong>Universidad nacional de Loja</strong> 
                        </p>
                    </div>
                </div>
            </div>
            <div className='flex-1 '>
                <div className='w-full h-[100%] flex justify-center items-center '>
                    <div className='border-r-2 border-white w-full '>
                        <p className='text-center'>Todos los derechos reservados.
                            <br />
                            <strong> 2024 </strong>
                        </p>
                    </div>
                </div>
            </div>
            <div className='flex-1 '>
                <div className='flex w-full h-full items-center justify-center'>
                    <div className='h-full flex items-center px-4'>
                        <a href="https://github.com/SantiagoTamayo2002/APP_STORE" target="_blank" rel="noopener noreferre"> <FaGithub size={40} /> </a>
                    </div>
                    <div className='flex h-full items-center px-4'>
                        <a href="https://github.com" target="_blank" rel="noopener noreferre"> <FaLinkedin size={40} /> </a>
                    </div>
                    <div className='h-full flex items-center px-4'>
                        <a href="https://github.com" target="_blank" rel="noopener noreferre"> <FaInstagram size={40} /> </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export default initialPage;
