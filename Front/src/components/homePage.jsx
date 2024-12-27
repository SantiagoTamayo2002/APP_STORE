import Navbar from './navbar';
import React, { useState, useEffect } from 'react';
import ArticleCard from './article_card';
import '../App.css';

const HomePage = () => {
    const [articles, setArticles] = useState([]); // Inicializamos el estado vacío

    useEffect(() => {
        fetch('http://localhost:5000/articles') // retorna una promesa
            .then(response => response.json())
            .then(data => {setArticles(data);})
            .catch(error => console.error(error));
    }, []); // El segundo argumento es un arreglo vacío para que solo se ejecute una vez

    // Función para dividir los artículos en partes iguales
    const divideArticles = (articles, parts) => {
        let result = [];
        for (let i = 0; i < parts; i++) {
            result.push(articles.filter((_, index) => index % parts === i));
        }
        return result;
    };

    const [column1, column2, column3, column4] = divideArticles(articles, 4);

    return (
        <div>
            <Navbar />
            <div className='bg-[#101828] flex justify-center'>
                <div className='flex w-full mt-24'>
                    <div className='flex-1 border-r-2 border-[#3399ff]'>
                        <div className='flex flex-col justify-center items-center'>
                            {column1.map((article, index) => (
                                <ArticleCard
                                    key={index}
                                    codigoArticulo={article[0]}
                                    descripcion={article[3]}
                                    marca={article[4]}
                                    modelo={article[5]}
                                    precio={article[2]}
                                    imgUrl={article[6]}
                                />
                            ))}
                        </div>
                    </div>
                    <div className='flex-1 border-x-[1px] border-[#3399ff]'>
                        <div className='flex flex-col justify-center items-center mt-36'>
                            {column2.map((article, index) => (
                                <ArticleCard
                                    key={index}
                                    codigoArticulo={article[0]}
                                    descripcion={article[3]}
                                    marca={article[4]}
                                    modelo={article[5]}
                                    precio={article[2]}
                                    imgUrl={article[6]}
                                />
                            ))}
                        </div>
                    </div>
                    <div className='flex-1 border-x-[1px] border-[#3399ff]'>
                        <div className='flex flex-col justify-center items-center'>
                            {column3.map((article, index) => (
                                <ArticleCard
                                    key={index}
                                    codigoArticulo={article[0]}
                                    descripcion={article[3]}
                                    marca={article[4]}
                                    modelo={article[5]}
                                    precio={article[2]}
                                    imgUrl={article[6]}
                                />
                            ))}
                        </div>
                    </div>
                    <div className='flex-1 border-l-[1px] border-[#3399ff]'>
                        <div className='flex flex-col justify-center items-center mt-36'>
                            {column4.map((article, index) => (
                                <ArticleCard
                                    key={index}
                                    codigoArticulo={article[0]}
                                    descripcion={article[3]}
                                    marca={article[4]}
                                    modelo={article[5]}
                                    precio={article[2]}
                                    imgUrl={article[6]}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
