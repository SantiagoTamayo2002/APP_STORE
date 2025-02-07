import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { HiOutlineX } from "react-icons/hi";

function AddArticleForm() {
    const [newArticle, setNewArticle] = useState({
        codigo_articulo: '',
        precio: '',
        descripcion: '',
        marca: '',
        modelo: '',
        url_img: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewArticle({ ...newArticle, [name]: value });
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        fetch('http://localhost:5000/articles', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newArticle)
        })
        .then((response) => response.json())
        .then((data) => {
            if (data.message) {
                alert(data.message);
                setNewArticle({
                    codigo_articulo: '',
                    precio: '',
                    descripcion: '',
                    marca: '',
                    modelo: '',
                    url_img: ''
                });
            } else {
                alert(data.error);
            }
        })
        .catch((error) => {
            console.error('Error al agregar artículo:', error);
            alert('Error al agregar artículo');
        });
    };

    return (
        <div className=' text-white bg-[#101828] h-screen '>
            <div className='w-full p-1 border border-green-400 h-full flex items-center justify-center'>
                <div className='w-[1200px]'>
                    <div className='text-3xl'>
                        <Link to="/articles"> <HiOutlineX /> </Link>
                    </div>
                    <div className='w-full flex justify-center p-2 text-3xl font-semibold text-center  mb-5'>
                        <h2>Agregar Artículo</h2>
                    </div>
                    <div className='w-full flex flex-col-2 px-8 justify-center neumorphism-tarjeta rounded-lg items-center'>

                        <div className='w-[65%]'>
                            <form onSubmit={handleFormSubmit} className='py-5'>
                                <div className='flex'>
                                    <div className='w-[80%]'>
                                        <div className='flex items-center mb-8'>
                                            <p className='mr-5 w-[25%] text-end px-2'><strong>Precio</strong></p>
                                            <input
                                                type="text"
                                                name="precio"
                                                value={newArticle.precio}
                                                onChange={handleInputChange}
                                                placeholder="Precio"
                                                className='rounded-lg p-2 text-center border w-[50%] text-white bg-[#101828]'
                                            />
                                        </div>

                                        <div className='flex items-center mb-8'>
                                            <p className='mr-5 w-[25%] text-end px-2'><strong>Descripción</strong></p>
                                            <input
                                                type="text"
                                                name="descripcion"
                                                value={newArticle.descripcion}
                                                onChange={handleInputChange}
                                                placeholder="Descripción"
                                                className='rounded-lg p-2 text-center border w-[50%] text-white bg-[#101828]'
                                            />
                                        </div>

                                        <div className='flex items-center mb-8'>
                                            <p className='mr-5 w-[25%] text-end px-2'><strong>Marca</strong></p>
                                            <input
                                                type="text"
                                                name="marca"
                                                value={newArticle.marca}
                                                onChange={handleInputChange}
                                                placeholder="Marca"
                                                className='rounded-lg p-2 text-center border w-[50%] text-white bg-[#101828]'
                                            />
                                        </div>

                                        <div className='flex items-center mb-8'>
                                            <p className='mr-5 w-[25%] text-end px-2'><strong>Modelo</strong></p>
                                            <input
                                                type="text"
                                                name="modelo"
                                                value={newArticle.modelo}
                                                onChange={handleInputChange}
                                                placeholder="Modelo"
                                                className='rounded-lg p-2 text-center border w-[50%] text-white bg-[#101828]'
                                            />
                                        </div>

                                        <div className='flex items-center mb-8'>
                                            <p className='mr-5 w-[25%] text-end px-2'><strong>Imagen</strong></p>
                                            <input
                                                type="text"
                                                name="url_img"
                                                value={newArticle.url_img}
                                                onChange={handleInputChange}
                                                placeholder="URL de la imagen"
                                                className='rounded-lg p-2 text-center border w-[50%] text-white bg-[#101828]'
                                            />
                                        </div>
                                    </div>

                                    <div className='flex flex-col items-center py-8 text-white justify-center '>
                                        <div className=' w-full flex justify-center items-end mb-2'>
                                                <button type="submit" className='px-3 py-1 bg-[#3399ff] text-white rounded-lg font-semibold mb-3'>
                                                    Guardar Cambios
                                                </button>
                                        </div>
                                        <div className='w-full flex justify-center'>
                                            <div className=''>
                                                <button type="button" onClick={() => setNewArticle({
                                                    precio: '',
                                                    descripcion: '',
                                                    marca: '',
                                                    modelo: '',
                                                    url_img: ''
                                                })} className='px-3 py-1 rounded-lg' style={{ backgroundColor: 'red' }}>
                                                    Cancelar
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                  
            </div>
        </div>
    );
}

export default AddArticleForm;
