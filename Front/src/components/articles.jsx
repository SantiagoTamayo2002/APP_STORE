import React, { useEffect, useState } from 'react';
import Button from './button';
const API = 'http://localhost:5000';

const Articles = () => {

    const [articles, setArticles] = useState([]);
    const [articuloObtenido, setEditingArticle] = useState(null);
    const [formulario, setFormulario] = useState(false);

    ////////////////////////////////////////////////////////////////////////////////////

    useEffect(() => {
        fetch(`${API}/articles`)
            .then(response => response.json())
            .then(data => setArticles(data))
            .catch(error => console.error(error));
    }, [formulario]);

    ////////////////////////////////////////////////////////////////////////////////////

    const handleEditClick = (article) => {
        setEditingArticle({
            codigo_articulo: article[0] || '',
            precio: article[2] || '',
            descripcion: article[3] || '',
            marca: article[4] || '',
            modelo: article[5] || '',
            url_img: article[6] || ''
        });
    };
    

    ////////////////////////////////////////////////////////////////////////////////////

    const handleFormSubmit = (e) => {
        e.preventDefault();
        editArticle(articuloObtenido)
    };
    

    ////////////////////////////////////////////////////////////////////////////////////

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditingArticle((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };
    

    ////////////////////////////////////////////////////////////////////////////////////

    const editArticle = (article) => {
        fetch(`${API}/articles/${article.codigo_articulo}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(article)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            setArticles(articles.map(a => a.id === data.id ? data : a));
            setEditingArticle(null);
            setFormulario(!formulario);
        })
        .catch(error => console.error('Fetch error:', error));
    };

    ////////////////////////////////////////////////////////////////////////////////////

    return (
        <div className='bg-[#101828] h-full w-full '>
            <div className='bg-[#101828] h-full w-full text-white'>
                <h1>Artículos</h1>
                <table className='table-auto w-[90%] m-auto'>
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
                                    <Button text='Editar' onClick={() => handleEditClick(article)} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
                {articuloObtenido && (
                    <div className='p-4 mt-4 fixed bottom-[200px] text-white flex w-full h-96 items-center justify-center'>
                        <div className='w-full bg-[#3399ff] rounded-lg p-1'>
                            <div className='w-full flex justify-center p-2 text-lg'>
                                <h2>Editar Artículo</h2>
                            </div>
                            <div className='w-full flex flex-col-2 px-8 justify-center border border-red-500'>
                                <form onSubmit={handleFormSubmit} className='text-black w-[70%]'>
                                    <div className='flex'>
                                        <div className='w-[80%]'>

                                            <div className=' flex items-center mb-8 '>
                                                <p className='mr-5 w-[25%] text-end px-2'><strong>Precio</strong></p>
                                                <input
                                                    type="text"
                                                    name="precio"
                                                    value={articuloObtenido.precio}
                                                    onChange={handleInputChange}
                                                    placeholder="Precio"
                                                    className='rounded-lg p-2 text-center border w-[50%]'
                                                />
                                            </div>

                                            <div className='flex items-center mb-8'>
                                            <p className='mr-5 w-[25%] text-end px-2'><strong>Descripción</strong></p>
                                            <input
                                                    type="text"
                                                    name="descripcion"
                                                    value={articuloObtenido.descripcion}
                                                    onChange={handleInputChange}
                                                    placeholder="Descripción"
                                                    className='rounded-lg p-2 text-center border w-[50%]'
                                                />
                                            </div>

                                            <div className='flex items-center mb-8'>
                                                <p className='mr-5 w-[25%] text-end px-2'><strong>Marca</strong></p>
                                                <input
                                                    type="text"
                                                    name="Marca"
                                                    value={articuloObtenido.marca}
                                                    onChange={handleInputChange}
                                                    placeholder="Marca"
                                                    className='rounded-lg p-2 text-center border w-[50%]'
                                                />
                                            </div>

                                            <div className='flex items-center mb-8'>
                                                <p className='mr-5 w-[25%] text-end px-2'><strong>Modelo</strong></p>
                                                <input
                                                    type="text"
                                                    name="modelo"
                                                    value={articuloObtenido.modelo}
                                                    onChange={(e) => (e.target.value)}
                                                    placeholder="Modelo"
                                                    className='rounded-lg p-2 text-center border w-[50%]'
                                                />
                                            </div>

                                            <div className='flex items-center mb-8'>
                                                <p className='mr-5 w-[25%] text-end px-2'><strong>Imagen</strong></p>
                                                <input
                                                    type="text"
                                                    name="url_img"
                                                    value={articuloObtenido.url_img}
                                                    onChange={handleInputChange}
                                                    placeholder="URL de la imagen"
                                                    className='rounded-lg p-2 text-center border w-[50%]'
                                                />
                                            </div>
                                        </div>
                                        
                                        <div className='flex items-end py-8'>
                                            <Button text='Guardar Cambios' />
                                            <Button text='Cancelar' onClick={() => setEditingArticle(null)} />
                                        </div>
                                    </div>
                                </form>
                            </div>
                            
                        </div>
                    </div>
                )}

        </div>
    );
};

export default Articles;
