import React, { useState, useEffect } from 'react';
import Navbar from './navbar';
import Footer from './Footer';
import '../App.css';

function Offers() {
    const [offers, setOffers] = useState([]);

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

    return (
        <div className="overflow-hidden font-sans bg-[#101828] text-white">
            <Navbar />
            <div className="bg-[#101828] flex justify-center py-10 min-h-screen mt-16">
                <div className="flex flex-wrap w-full px-6 justify-center gap-6">
                    {offers.map((offer) => (
                        <div key={offer.id_oferta} className="offer-card neumorphism-tarjeta p-6 mb-6 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5">
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
                                            <p className="text-sm text-gray-200">Descripción: {article.descripcion}</p>
                                            <p className="text-sm text-gray-400">Precio Original: <span className="line-through text-red-400">${article.precio_original}</span></p>
                                            <p className="text-sm text-green-400 font-semibold">Precio con Descuento: ${article.precio_oferta}</p>
                                            <p className="text-sm text-yellow-300">Descuento: {article.descuento_porcentaje}%</p>
                                            {article.url_img && (
                                                <img 
                                                    src={article.url_img} 
                                                    alt={article.descripcion} 
                                                    className="article-image mt-4 w-full h-48 object-cover rounded-lg shadow-md border border-gray-500" 
                                                />
                                            )}
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Offers;
