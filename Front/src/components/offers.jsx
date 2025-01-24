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

    return (
        <div className="overflow-hidden">
            <Navbar />
            <div className="bg-[#101828] flex justify-center">
                <div className="flex flex-wrap w-full mt-24 px-6 justify-center">
                    {offers.map((offer) => (
                        <div key={offer.id_oferta} className="offer-card neumorphism-tarjeta p-6 mb-6 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5">
                            <h2 className="offer-name text-xl font-semibold">{offer.nombre}</h2>
                            <p className="offer-type text-sm text-gray-500">Type: {offer.tipo}</p>
                            <p className="offer-value text-lg font-bold text-[#3399ff]">Descuento: {offer.valor} %</p>
                            <p className="offer-date text-sm text-gray-500">
                                Valid from: {offer.fecha_inicio} to {offer.fecha_fin}
                            </p>
                            <h3 className="offer-articles-title mt-4 text-lg font-semibold">Articles in this offer:</h3>
                            <ul className="offer-articles-list mt-2">
                                {offer.articulos?.map((article) => (
                                    <li key={article.codigo_articulo} className="offer-article mb-4">
                                        <div className="article-details">
                                            <p className="text-sm">Description: {article.descripcion}</p>
                                            <p className="text-sm">Original Price: ${article.precio_original}</p>
                                            <p className="text-sm">Discounted Price: ${article.precio_oferta}</p>
                                            <p className="text-sm">Discount: {article.descuento_porcentaje}%</p>
                                            {article.url_img && (
                                                <img 
                                                    src={article.url_img} 
                                                    alt={article.descripcion} 
                                                    className="article-image mt-4 w-full h-48 object-cover rounded-lg shadow-md" 
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
