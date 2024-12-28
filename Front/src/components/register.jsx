import React from 'react';
import '../App.css'; 
import Footer from './Footer';

export const Register = () => (
    <div>
        <div className='w-full h-[88vh] bg-[#101828] flex items-center justify-center navbar-gradient'>
            <div className=' w-full items-center justify-center flex py-24'>
                <div>
                    <p className='text-4xl font-bold text-white'>Registrate </p>
                    <div className='p-8 neumorphism-box navbar-gradient'>
                        
                        <h2 className='text-white'>Hola estoy probando el cuadrito</h2>
                    </div>
                </div>
            </div>
        </div>
        <Footer />
    </div>
);

export default Register;
