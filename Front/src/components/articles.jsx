import React, { useEffect, useState } from 'react';
import Button from './button';
import { ToastContainer, toast } from 'react-toastify';
const API = 'http://localhost:5000';

const ArticlesAdmin = () => {

    const [articles, setArticles] = useState([]);
    const [articuloObtenido, setEditingArticle] = useState(null);
    const [formulario, setFormulario] = useState(false);

    ////////////////////////////////////////////////////////////////////////////////////
    const notify = () => toast("Artículo eliminado con éxito");

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

    const setArticle = () => {

    }

    ////////////////////////////////////////////////////////////////////////////////////

    const deleteArticle = (id) => {
        console.log("articulo con id " + id)
        fetch(`${API}/articles/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: id })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })

    }

    ////////////////////////////////////////////////////////////////////////////////////

    return (
        <div className='bg-[#101828] h-full w-full '>
            <div className='bg-[#101828] h-full w-full text-white'>
                <h1>Artículos</h1>
                <div>
                    <Button text='Agregar Artículo' onClick={() => setEditingArticle({})}/>
                </div>
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
                                
                                <td className='truncate-text'>{article[3]}</td>
                            
                                <td>{article[4]}</td>
                                <td>{article[5]}</td>
                                <td>
                                    <img src={article[6]} alt="" className='h-[90px] w-[90px]'/>
                                </td>
                                <td className=''>
                                    <Button text='Editar'   onClick={() => handleEditClick(article)}/>
                                    <Button text='Eliminar' onClick={() => deleteArticle(article[0])} color="red"/>
                                    <ToastContainer />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
                {articuloObtenido && (
                    <div className='p-4 mt-4 fixed bottom-[200px] text-white flex w-full h-96 items-center justify-center'>
                        <div className='w-full p-1'>
                            <div className='w-full flex justify-center p-2 text-lg'>
                                <h2>Editar Artículo</h2>
                            </div>
                            <div className='w-full flex flex-col-2 px-8 justify-center'>
                                <div className='effect-glass w-[65%]'>
                                    <form onSubmit={handleFormSubmit} className='py-5'>
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
                                                        className='rounded-lg p-2 text-center border w-[50%] text-white bg-[#101828]'
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
                                                        className='rounded-lg p-2 text-center border w-[50%] text-white bg-[#101828]'
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
                                                        className='rounded-lg p-2 text-center border w-[50%] text-white bg-[#101828]'
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
                                                        className='rounded-lg p-2 text-center border w-[50%] text-white bg-[#101828]'
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
                                                        className='rounded-lg p-2 text-center border w-[50%] text-white bg-[#101828]'
                                                    />
                                                </div>
                                            </div>
                                            
                                            <div className='flex flex-col items-end py-8 text-white justify-center'>
                                                <div className=' h-[50%] w-full flex justify-center items-end mb-2'>
                                                    <div className=''>
                                                        <Button text='Guardar Cambios' color="#101828"/>
                                                    </div>
                                                </div>
                                                <div className=' h-[50%] w-full flex justify-start'>
                                                    <div className=''>
                                                        <Button text='Cancelar' onClick={() => setEditingArticle(null)} color="red" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>  
                        </div>
                    </div>
                )}

        </div>
    );
};

export default ArticlesAdmin;
