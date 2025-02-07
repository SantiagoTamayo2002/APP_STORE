import React, { useState, useEffect, useRef } from 'react';
import '../App.css';
import { IoIosArrowDropright } from "react-icons/io";
import { FaCartPlus } from 'react-icons/fa';


const ArticleCard = ({ codigoArticulo, descripcion, marca, modelo, precio, imgUrl, dni_Usuario }) => {
    const [isDetailVisible, setIsDetailVisible] = useState(false);
    const detailRef = useRef(null);
    const [cantidad, setCantidad] = useState(1);
    
    //////////////////////////////////////////////////////////////////////////////////7

    const handleDetailToggle = () => {
        setIsDetailVisible(!isDetailVisible);
    };

    //////////////////////////////////////////////////////////////////////////////////7

    const handleClickOutside = (event) => {
        if (detailRef.current && !detailRef.current.contains(event.target)) {
            setIsDetailVisible(false);
        }
    };

    //////////////////////////////////////////////////////////////////////////////////7

    useEffect(() => {
        if (isDetailVisible) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isDetailVisible]);

    //////////////////////////////////////////////////////////////////////////////////7


    const handleAddToCart = () => {
        const payload = {
            codigo_articulo: codigoArticulo,
            cantidad: cantidad,
        };

        fetch("http://localhost:5000/add_to_cart", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify(payload),
        })
        .then((response) => response.json())
        .then((data) => {
            if (data.message) {
                alert(data.message);
            } else {
                console.error(data.error);
            }
        })
        .catch((error) => console.error("Error al agregar al carrito:", error));
    };

    //////////////////////////////////////////////////////////////////////////////////7

    return (
        <>
            <div className={`w-[300px] h-[440px] neumorphism-tarjeta mt-14 flex flex-col transition-transform duration-1000 ${isDetailVisible ? 'transform scale-0 opacity-0' : 'hover:scale-105 hover:opacity-100'} hover-button`}>
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
                            <div className='flex items-center w-full h-[50px] px-2'>
                                <p className='font-semibold text-white text-lg border-b-2'>{marca} <strong className='text-[#3399ff]'>{modelo}</strong></p>
                            </div>
                            <div className='w-full h-[100px] p-2'>
                                <p className='text-white text-sm custom-font line-clamp-3'>
                                    {descripcion}
                                </p>
                            </div>
                            <div className='flex items-center justify-between w-full h-[35px] text-white'>
                                <div className='h-full flex items-center justify-center px-2'>
                                    <p className='text-lg'><strong className='text-[#3399ff]'>Precio:</strong> ${precio}</p>
                                </div>
                                <div
                                    className='h-full flex items-end justify-center text-5xl text-[#3399ff] cursor-pointer'
                                    onClick={handleDetailToggle}
                                >
                                    <IoIosArrowDropright className='transition duration-300 hover:text-white' />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {isDetailVisible && (
                <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-filter backdrop-blur-lg transition-opacity duration-100'>
                    <div ref={detailRef} className='w-[70%] h-[500px] neumorphism-tarjeta p-4 transition-transform duration-100 transform scale-100'>
                        <div className='flex flex-col h-full'>
                            <div className='flex justify-end'>
                                <button
                                    className='text-2xl text-[#3399ff]'
                                    onClick={handleDetailToggle}
                                >
                                    &times;
                                </button>
                            </div>
                            <div className='flex items-center h-full '>
                                <div className='flex  w-[40%] h-full '>
                                    <div className='flex w-full h-full justify-center items-center'>
                                        <img className='w-[90%] h-[75%] rounded-lg' src={imgUrl} alt={`${marca} ${modelo}`} />
                                    </div>
                                </div>
                                <div className='flex w-[60%] h-full items-center'>
                                    <div className='w-full '>
                                        <div className=' h-[60px]  px-2'>
                                            <p className='font-semibold text-white text-3xl border-b-2 inline'>{marca} <strong className='text-[#3399ff]'>{modelo}</strong></p>
                                        </div>
                                        <div className='w-full h-[270px]  p-2'>
                                            <p className='text-white text-base custom-font mb-3'>
                                                {descripcion}
                                            </p>
                                        </div>
                                        <div className='w-full mt-4 h-[50px] flex justify-between items-center p-2  px-3'>
                                            <div className=''>
                                                <p className='text-2xl text-white'><strong className='text-[#3399ff]'>Precio:</strong> <strong>${precio}</strong> </p>
                                            </div>
                                            <div className='flex items-center  px-1'>
                                                <div className="flex ">
                                                    <select
                                                        className="px-3 py-1 bg-gray-600 text-white rounded-lg mr-2"
                                                        value={cantidad}
                                                        onChange={(e) => setCantidad(parseInt(e.target.value))}
                                                    >
                                                        {[...Array(10).keys()].map((num) => (
                                                            <option key={num + 1} value={num + 1}>
                                                                {num + 1}
                                                            </option>
                                                        ))}
                                                    </select>
                                                    <button
                                                        className="text-xl px-3 py-1 flex gap-2 items-center text-white bg-[#3399ff] rounded-lg font-semibold"
                                                        onClick={handleAddToCart}
                                                    >
                                                        Confirmar <FaCartPlus />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default ArticleCard;
