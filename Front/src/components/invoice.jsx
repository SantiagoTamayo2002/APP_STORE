import React from 'react';
import { useLocation } from 'react-router-dom';

const Invoice = () => {
    const location = useLocation();
    const { invoice } = location.state || {};

    if (!invoice) {
        return <div className="p-5 text-center text-red-500">No hay datos de factura disponibles.</div>;
    }

    return (
        <div className="p-5">
            <h2 className="text-2xl font-bold mb-4">Detalles de la Factura</h2>
            <table className="w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border p-2">Artículo</th>
                        <th className="border p-2">Marca</th>
                        <th className="border p-2">Modelo</th>
                        <th className="border p-2">Cantidad</th>
                        <th className="border p-2">Precio Unitario</th>
                        <th className="border p-2">Subtotal</th>
                    </tr>
                </thead>
                <tbody>
                    {invoice.invoice_details.map((item, index) => (
                        <tr key={index} className="border">
                            <td className="border p-2">{item.articulo.descripcion}</td>
                            <td className="border p-2">{item.articulo.marca}</td>
                            <td className="border p-2">{item.articulo.modelo}</td>
                            <td className="border p-2">{item.cantidad}</td>
                            <td className="border p-2">${item.articulo.precio}</td>
                            <td className="border p-2">${item.subtotal}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <h3 className="text-xl font-bold mt-4">Total a Pagar: ${invoice.total_amount}</h3>
        </div>
    );
};

export default Invoice;
