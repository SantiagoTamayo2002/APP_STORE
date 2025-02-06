    import React from "react";
    import { IoIosArrowDropright } from "react-icons/io";
    import { FaCartPlus } from "react-icons/fa";

    const ArticleCard = ({ codigoArticulo, descripcion, marca, modelo, precio, imgUrl, dni_Usuario }) => {
        
        const handleAddToCart = () => {
            const payload = {
                codigo_articulo: codigoArticulo,
                dni_usuario: dni_Usuario 
            };

            fetch("http://localhost:5000/add_to_cart", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            })
            .then((response) => response.json())
            .then((data) => {
                if (data.message) {
                    alert(data.message);
                } else {
                    console.error(data.error);
                }
            })
            .catch((error) => console.error("Error al agregar al carrito:", error));
        };

        return (
            <div className="w-[300px] h-[440px] neumorphism-tarjeta mt-14 flex flex-col transition duration-300 hover:scale-105 hover-button">
                <div className="flex-1">
                    <div className="flex w-full h-full justify-center items-center">
                        <div className="w-[80%] h-[85%] rounded-lg">
                            <img
                                className="w-full h-full object-cover rounded-lg"
                                src={imgUrl}
                                alt={`${descripcion}`}
                            />
                        </div>
                    </div>
                </div>
                <div className="w-full flex flex-col gap-3 items-center p-3">
                    <div className="w-full flex flex-col gap-2">
                        <div className="w-full flex justify-between">
                            <span className="font-bold text-sm">{marca}</span>
                            <span className="text-xs">{modelo}</span>
                        </div>
                        <div className="text-xs">{descripcion}</div>
                    </div>
                    <div className="w-full flex justify-between items-center">
                        <span className="font-bold text-xs">$ {precio}</span>
                        <button className="text-2xl neumorphism-button p-2">
                            <IoIosArrowDropright />
                        </button>
                    </div>
                    <button 
                        className="neumorphism-button px-3 py-1 flex gap-2 items-center mt-2"
                        onClick={handleAddToCart}
                    >
                        Agregar <FaCartPlus />
                    </button>
                </div>
            </div>
        );
    };

    export default ArticleCard;