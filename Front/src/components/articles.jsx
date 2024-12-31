import React, { useEffect, useState } from 'react';
import Button from './button';
const API = 'http://localhost:5000';


const Articles = () => {
    const [articles, setArticles] = useState([]); // Inicializamos el estado vacío

    useEffect(() => {
        fetch(`${API}/articles`) // retorna una promesa
            .then(response => response.json())
            .then(data => {setArticles(data);})
            .catch(error => console.error(error));
    }, []); // El segundo argumento es un arreglo vacío para que solo se ejecute una vez

    

    const editArticle = (id, precio, descripcion, marca, modelo, img_url) => {
        fetch(`${API}/articles/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {precio: precio, 
                 descripcion: descripcion, 
                 marca: marca, 
                 modelo: modelo, 
                 url_img: img_url}
            )
        })
        .then(response => {
            if (!response.ok) {
                console.log(response);
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => console.log("El id del artículo es", data))
        .catch(error => console.error('Fetch error:', error));
    }
    


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
                        <th>operaciones</th>
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
                            <td>
                                <Button text= 'Editar'  onClick={() => editArticle(article[0],article[2], 
                                     "ventilador con RGB", 
                                     article[4], 
                                     article[5], 
                                     article[6]
                                )} />
                                <Button text='Eliminar' onClick={() => editArticle(article[0])} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Articles;
