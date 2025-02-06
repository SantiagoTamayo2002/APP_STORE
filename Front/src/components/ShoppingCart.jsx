import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import ArticleCard from './article_card'; // Asegúrate de que el import sea correcto

const ShoppingCart = () => {
    const [articulos, setArticulos] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchArticulos = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/pedido/articulos", {
                    credentials: 'include'  // Permite enviar cookies de sesión
                });

                const data = await response.json();

                console.log("Datos recibidos:", data);

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
            <Footer />
        </div>
    );
};

export default ShoppingCart;
