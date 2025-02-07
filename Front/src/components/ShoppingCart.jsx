import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './navbar';
import Footer from './Footer';
import ArticleCard from './article_card';
import Slider from 'react-slick';
import { FaPencilAlt } from 'react-icons/fa';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const ShoppingCart = () => {
    const [articulos, setArticulos] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchArticulos = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/pedido/articulos", {
                    credentials: 'include'
                });

                const data = await response.json();

                if (response.ok) {
                    setArticulos(data);
                } else {
                    setError(data.error || "Error desconocido al obtener los artículos.");
                }
            } catch (error) {
                setError("Error al conectar con el servidor.");
            }
        };

        fetchArticulos();
    }, []);

    const handleGenerateInvoice = async () => {
        try {
            const response = await fetch("http://localhost:5000/generate_invoice", {
                method: "POST",
                credentials: 'include'
            });

            const data = await response.json();

            if (data.success) {
                navigate('/invoice', { state: { invoice: data } });
            } else {
                alert(data.message || "Error al generar la factura.");
            }
        } catch (error) {
            console.error("Error al generar la factura:", error);
            alert("Error al conectar con el servidor.");
        }
    };

    const handleDeleteItem = (codigoArticulo) => {
        setArticulos(articulos.filter(articulo => articulo.codigo_articulo !== codigoArticulo));
    };

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
    };

    return (
        <div className="bg-[#101828] text-white min-h-screen flex flex-col justify-between">
            <Navbar/>
            <div className='flex justify-center mt-24'>
                <div className="w-3/4">
                    {error ? (
                        <p className="text-red-500">{error}</p>
                    ) : articulos.length > 0 ? (
                        <Slider {...settings}>
                            {articulos.map((articulo) => (
                                <div key={articulo.codigo_articulo} className="relative">
                                    <button 
                                        className="absolute top-0 left-0 bg-gray-800 p-1 rounded-full text-white"
                                        onClick={() => handleDeleteItem(articulo.codigo_articulo)}
                                    >
                                        <FaPencilAlt />
                                    </button>
                                    <ArticleCard
                                        codigoArticulo={articulo.codigo_articulo}
                                        descripcion={articulo.descripcion}
                                        marca={articulo.marca}
                                        modelo={articulo.modelo}
                                        precio={articulo.precio}
                                        cantidad={articulo.cantidad}  
                                        imgUrl={articulo.url_img}
                                    />
                                </div>
                            ))}
                        </Slider>
                    ) : (
                        <p>No hay artículos en este pedido</p>
                    )}
                </div>
            </div>
            <div className="flex justify-center my-5">
                <button 
                    onClick={handleGenerateInvoice} 
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Generar Factura
                </button>
            </div>
        </div>
    );
};

export default ShoppingCart;
