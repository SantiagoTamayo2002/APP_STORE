import React, { useState, useEffect, useRef } from 'react';
import Navbar from './navbar';
import Footer from './Footer';
import '../App.css';
import { FaCartPlus } from "react-icons/fa";
import { IoIosArrowDropright } from "react-icons/io";

function Offers() {
    const [offers, setOffers] = useState([]);
    const [isDetailVisible, setIsDetailVisible] = useState(false);
    const [selectedArticle, setSelectedArticle] = useState(null); // Mantener el artículo seleccionado para mostrar los detalles
    const detailRef = useRef(null);

    useEffect(() => {
        fetch('http://localhost:5000/get_offers') // Ruta para obtener las ofertas
            .then(response => response.json())
            .then(data => setOffers(data))
            .catch(error => console.error('Error fetching offers:', error));
    }, []);

    const formatDate = (dateString) => {
        const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('es-ES', options);
    };

    const handleAddToCart = (codigoArticulo, cantidad) => {
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

    const handleDetailToggle = (article) => {
        setSelectedArticle(article);
        setIsDetailVisible(!isDetailVisible);
    };

    const handleClickOutside = (event) => {
        if (detailRef.current && !detailRef.current.contains(event.target)) {
            setIsDetailVisible(false);
        }
    };

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

    return (
        <div className="overflow-hidden font-sans bg-[#101828] text-white">
            <Navbar />
            <div className="bg-[#101828] flex justify-center py-10 min-h-screen mt-16">
                <div className="flex flex-nowrap overflow-x-auto w-full px-6 gap-6">
                    {offers.map((offer) => (
                        <div key={offer.id_oferta} className="offer-card neumorphism-tarjeta p-6 min-w-[300px] flex-grow">
                            <h2 className="offer-name text-xl font-semibold text-[#3399ff]">{offer.nombre}</h2>
                            <p className="offer-type text-sm text-gray-500"> {offer.tipo}</p>
                            <p className="offer-value text-lg font-bold text-[#3399ff]">Descuento: {offer.valor} %</p>
                            <p className="offer-date text-sm text-gray-500">
                                Válido desde: {formatDate(offer.fecha_inicio)} hasta {formatDate(offer.fecha_fin)}
                            </p>
                            <h3 className="offer-articles-title mt-4 text-lg font-semibold text-[#3399ff]">Artículos en esta oferta:</h3>
                            <ul className="offer-articles-list mt-2">
                                {offer.articulos?.map((article) => (
                                    <li key={article.codigo_articulo} className="offer-article mb-4 bg-gray-600 p-4 rounded-lg shadow-md transition-all hover:z-50">
                                        <div className="article-details">
                                            <p className="text-sm text-gray-200">{article.marca} {article.modelo}</p>
                                            <p className="text-sm text-gray-400">Precio Original: <span className="line-through text-red-400">${article.precio_original}</span></p>
                                            <p className="text-sm text-green-400 font-semibold">Precio con Descuento: ${article.precio_oferta}</p>
                                            <p className="text-sm text-yellow-300">Descuento: {article.descuento_porcentaje}%</p>
                                            {article.url_img && (
                                                <img 
                                                    src={article.url_img} 
                                                    alt={article.modelo} 
                                                    className="article-image mt-4 w-full h-48 object-cover rounded-lg shadow-md border border-gray-500" 
                                                />
                                            )}
                                        </div>
                                        <div className="flex gap-2 items-center mt-2">
                                        
                                            
                                            <div
                                                className='h-full flex items-end justify-center px-4 py-1 text-2xl text-[#3399ff] cursor-pointer'
                                                onClick={() => handleDetailToggle(article)}
                                            >
                                                <IoIosArrowDropright className='transition duration-300 hover:text-white' />
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
            {isDetailVisible && selectedArticle && (
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
                            <div className='flex items-center h-full'>
                                <div className='flex w-[40%] h-full'>
                                    <img 
                                        className='w-[90%] h-[75%] rounded-lg' 
                                        src={selectedArticle.url_img} 
                                        alt={selectedArticle.descripcion} 
                                    />
                                </div>
                                <div className='flex w-[60%] h-full items-center'>
                                    <div className='w-full'>
                                        <div className='h-[60px] px-2'>
                                            <p className='font-semibold text-white text-3xl border-b-2 inline'>
                                                {selectedArticle.marca} <strong className='text-[#3399ff]'>{selectedArticle.modelo}</strong>
                                            </p>
                                        </div>
                                        <div className='w-full h-[270px] p-2'>
                                            <p className='text-white text-base custom-font mb-3'>
                                                {selectedArticle.descripcion}
                                            </p>
                                        </div>
                                        <div className='w-full mt-4 h-[50px] flex justify-between items-center p-2  px-3'>
                                            <p className='text-2xl text-white'>
                                                <strong className='text-[#3399ff]'>Precio:</strong> <strong>${selectedArticle.precio_oferta}</strong>
                                            </p>
                                            <div className='flex items-center px-1'>
                                                <select
                                                    className="px-3 py-1 bg-gray-600 text-white rounded-lg mr-2"
                                                    value={selectedArticle.cantidad}
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
                                                    onClick={() => handleAddToCart(selectedArticle.codigo_articulo, selectedArticle.cantidad || 1)}
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
            )}
            <Footer />
        </div>
    );
}

export default Offers;
