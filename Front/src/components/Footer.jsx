import React from 'react';
import { FaGithub, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';

const Footer = () => ( 
<div className='bg-[#101828] text-white h-[15vh] flex justify-center border-t-2 border-white drop-shadow-[0_0_6px_rgba(51,153,255,1)] items-center'>
        <div className='flex-1'>
            <div className='flex'>
                <div className='flex items-center justify-center h-[12vh] ml-[10px]'>
                    <img 
                        className='h-[87%] rounded-full' 
                        src="../src/assets/logo_carrera.png" 
                        alt="Logo de la facultad de energía"
                    />
                </div>
                <div className='flex items-center justify-center w-[72%]'>
                    <p className='text-center border-r-2 border-white pr-6'>
                        Un producto de estudiantes en la carrera de computación. <strong>Universidad Nacional de Loja</strong> 
                    </p>
                </div>
            </div>
        </div>
        <div className='flex-1'>
            <div className='w-full h-[100%] flex justify-center items-center'>
                <div className='border-r-2 border-white w-full'>
                    <p className='text-center'>Todos los derechos reservados.
                        <br />
                        <strong>2024</strong>
                    </p>
                </div>
            </div>
        </div>
        <div className='flex-1'>
            <div className='flex w-full h-full items-center justify-center'>
                <div className='h-full flex items-center px-4'>
                    <a href="https://github.com/SantiagoTamayo2002/APP_STORE" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    aria-label="GitHub repository">
                        <FaGithub size={40} />
                    </a>
                </div>
                <div className='flex h-full items-center px-4'>
                    <a href="https://www.linkedin.com" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    aria-label="LinkedIn profile">
                        <FaLinkedin size={40} />
                    </a>
                </div>
                <div className='h-full flex items-center px-4'>
                    <a href="https://www.instagram.com" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    aria-label="Instagram profile">
                        <FaInstagram size={40} />
                    </a>
                </div>
            </div>
        </div>
</div>
);
export default Footer;