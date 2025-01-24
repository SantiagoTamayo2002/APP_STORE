import React from 'react';
import Navbar from './navbar';
import Footer from './Footer';
import '../App.css';

const ShoppingCart = () => {
    const cartItems = []; // Lista vacía para el template
    const loading = false; // No hay carga en el template
    const error = null; // No hay error en el template

    return (
        <div>
            <Navbar />
            <div className="shopping-cart" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '70vh' }}>
                <h2>Carrito de Compras</h2>
                {loading ? (
                    <p>Cargando...</p>
                ) : error ? (
                    <p>{error}</p>
                ) : cartItems.length === 0 ? (
                    <p style={{ textAlign: 'center', fontSize: '1.5rem' }}>No ha seleccionado artículos a comprar</p>
                ) : (
                    <ul>
                        {cartItems.map(item => (
                            <li key={item.codigo_articulo}>
                                <img src={item.url_img} alt={item.descripcion} />
                                <div>
                                    <h3>{item.marca} {item.modelo}</h3>
                                    <p>{item.descripcion}</p>
                                    <p>${item.precio}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default ShoppingCart;