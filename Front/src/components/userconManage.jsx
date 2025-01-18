import React, { useState, useEffect } from "react";
import { FaCircleUser } from "react-icons/fa6";
import { useAuth } from "./AuthContext";
import { Link, useNavigate } from "react-router-dom";

const UserconManage = () => {
    const [mostrardiv, setDiv] = useState(false);
    const { logout } = useAuth();
    const navigate = useNavigate();
    const [usuario, setUsuario] = useState(() => {
        const storedUser = localStorage.getItem("usuario");
        return storedUser ? JSON.parse(storedUser) : null;
    });

    const handleLogout = () => {
        setUsuario(null);
        localStorage.removeItem("usuario");
        logout();
        navigate("/");
    };

    const toggleDiv = (event) => {
        event.stopPropagation();
        setDiv(!mostrardiv);
    };

    useEffect(() => {
        const handleClickOutside = () => {
            if (mostrardiv) {
                setDiv(false);
            }
        };

        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [mostrardiv]);

    return (
        <div className="relative">
            {/* Botón */}
            <div
                className="rounded-full flex text-5xl text-[#c4c6c9] drop-shadow-[0_0_6px_rgba(51,153,255,1)] border-[#3399ff] cursor-pointer"
                onClick={toggleDiv}
            >
                <FaCircleUser />
            </div>

            {/* Menú emergente */}
            {mostrardiv && (
                <div
                    className="absolute top-12 right-0 bg-white shadow-lg rounded-md w-48 z-10 border p-3"
                    onClick={(event) => event.stopPropagation()}
                >
                    <p className="my-2 p-1 text-gray-800 hover:text-blue-500 cursor-pointer">
                        Gestionar perfil
                    </p>
                    <p className="my-2 p-1 text-gray-800 hover:text-blue-500 cursor-pointer">
                        Historial de pedidos
                    </p>

                    {usuario && (
                        <p
                            onClick={handleLogout}
                            className="my-2 p-1 text-gray-800 hover:text-blue-500 cursor-pointer"
                        >
                            Cerrar sesión
                        </p>
                    )}
                </div>
            )}
        </div>
    );
};

export default UserconManage;
