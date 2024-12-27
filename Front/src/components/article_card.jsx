import React from 'react';
import '../App.css';
import { IoIosArrowDropright } from "react-icons/io";

const ArticleCard = ({ codigoArticulo, descripcion, marca, modelo, precio, imgUrl }) => {
    return (
        <div className='w-[300px] h-[440px] neumorphism-tarjeta mt-14 flex flex-col transition duration-300 hover:scale-105'>
            <div className='flex-1'>
                <div className='flex w-full h-full justify-center items-center'>
                    <div className='w-[80%] h-[85%] rounded-lg'>
                        <img className='w-full h-full rounded-lg' src={imgUrl} alt={`${marca} ${modelo}`} />
                    </div>
                </div>
            </div>
            <div className='flex-1'>
                <div className='flex w-full h-full justify-center items-center'>
                    <div className='flex flex-col w-[90%] h-[90%]'>
                        <div className='flex items-center w-full h-[50px]  px-2'>
                            <p className='font-semibold text-white text-lg border-b-2'>{marca} <strong className='text-[#3399ff]'>{modelo}</strong></p>
                        </div>
                        <div className='w-full h-[100px] p-2'>
                            <p className='text-white text-sm custom-font'>
                                {descripcion}
                            </p>
                        </div>
                        <div className='flex items-center justify-between w-full h-[35px] text-white'>
                            <div className='h-full flex items-center justify-center px-2'>
                                <p className='text-lg'><strong className='text-[#3399ff]'>Precio:</strong> ${precio}</p>
                            </div>
                            <div className='h-full flex items-end justify-center text-5xl text-[#3399ff]'>
                                <IoIosArrowDropright className='transition duration-300 hover:text-white' />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ArticleCard;
