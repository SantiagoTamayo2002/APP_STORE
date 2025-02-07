import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './navbar';
import Footer from './Footer';
import ArticleCard from './article_card';

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

    return (
        <div>
            <Navbar />
            <div className="p-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {error ? (
                    <p className="text-red-500">{error}</p>
                ) : articulos.length > 0 ? (
                    articulos.map((articulo) => (
                        <ArticleCard
                            key={articulo.codigo_articulo}
                            codigoArticulo={articulo.codigo_articulo}
                            descripcion={articulo.descripcion}
                            marca={articulo.marca}
                            modelo={articulo.modelo}
                            precio={articulo.precio}
                            cantidad={articulo.cantidad}  
                            imgUrl={articulo.url_img}
                        />
                    ))
                ) : (
                    <p>No hay artículos en este pedido.</p>
                )}
            </div>
            <div className="flex justify-center my-5">
                <button 
                    onClick={handleGenerateInvoice} 
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Generar Factura
                </button>
            </div>
            <Footer />
        </div>
    );
};

export default ShoppingCart;
