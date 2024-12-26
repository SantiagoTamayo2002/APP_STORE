import React, { useEffect, useState } from 'react';
const API = 'http://localhost:5000';

const Articles = () => {
    const [articles, setArticles] = useState([]); // Inicializamos el estado vacío

    useEffect(() => {
        fetch(`${API}/articles`) // retorna una promesa
            .then(response => response.json())
            .then(data => {
                setArticles(data);
            })
            .catch(error => console.error(error));
    }, []); // El segundo argumento es un arreglo vacío para que solo se ejecute una vez

    return (
        <div className='bg-black h-full w-full text-white'>
            <h1>Artículos</h1>
            <table className='table-auto w-full'>
                <thead>
                    <tr>
                        <th>codigo</th>
                        <th>Precio</th>
                        <th>Descripción</th>
                        <th>Marca</th>
                        <th>Modelo</th>
                        <th>Imagen</th>
                    </tr>
                </thead>
                <tbody>
                    {articles.map((article, index) => (
                        <tr key={index} className='text-center border border-white'>
                            <td>{article[0]}</td>
                            <td>{article[2]}</td>
                            <td>{article[3]}</td>
                            <td>{article[4]}</td>
                            <td>{article[5]}</td>
                            <td>
                                <img src={article[6]} alt="" className='h-[90px] w-[90px]'/>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Articles;
