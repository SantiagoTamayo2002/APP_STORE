import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import ArticleCard from './articles';

const ShoppingCart = () => {
    const [articulos, setArticulos] = useState([]);
    const [error, setError] = useState(null);
    const codigoPedido = 3; // Código del pedido

    useEffect(() => {
        const fetchArticulos = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/pedido/${codigoPedido}/articulos`);
                const data = await response.json();

                console.log(data); // Verifica qué datos recibes

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
    }, [codigoPedido]);

    return (
        <div>
            <Navbar />
            <div className="p-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {error ? (
                    <p className="text-red-500">{error}</p>
                ) : articulos.length > 0 ? (
                    articulos.map((articulo, index) => (
                        <ArticleCard
                            key={articulo.codigo_articulo || index}  // Usar 'index' como respaldo
                            codigoArticulo={articulo.codigo_articulo}
                            descripcion={articulo.descripcion}
                            marca={articulo.marca}
                            modelo={articulo.modelo}
                            precio={articulo.precio}
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