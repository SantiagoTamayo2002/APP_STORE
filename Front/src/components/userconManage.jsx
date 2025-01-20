
import React,  { useState } from "react";
import { FaCircleUser } from "react-icons/fa6";
import { useAuth } from './AuthContext';
import { Link } from "react-router-dom";


const UserconManage = () => {

    const [mostrardiv, setDiv] = useState(false);
    const { logout } = useAuth();
    const [usuario, setUsuario] = useState(() => {
            // Cargar usuario desde localStorage al iniciar
            const storedUser = localStorage.getItem('usuario');
            return storedUser ? JSON.parse(storedUser) : null;
        });

    const handleLogout = () => {
        setUsuario(null);
        localStorage.removeItem('usuario');
        logout(); // Limpiar el estado global de autenticación
        navigate('/'); // Redirigir al inicio
        };


    const toggleDiv = () => {
        setDiv(!mostrardiv);
    }


    return (
        <div className="rounded-full  neumorphism-circle  flex text-5xl text-[#c4c6c9]  drop-shadow-[0_0_6px_rgba(51,153,255,1)]border-[#3399ff] cursor-pointer"
            onClick={toggleDiv}>
            <FaCircleUser />
            {mostrardiv && 
            (<div className="absolute "> 
                <div className= {`text-[#3399ff] font-semibold text-lg p-2 relative top-20 right-32 w-[180px] ${mostrardiv ? 'animate-slideIn' : 'animate-slideOut'} effect-glass`}>
                    <p className="my-2 p-1 hover-button-custom">Gestionar perfil</p>
                    <p className="my-2 p-1 hover-button-custom">Historial de pedidos</p>
                    <p className="my-2 p-1 hover-button-custom">
                        <Link to="/articles">Panel de administración</Link>
                    </p>
                    {usuario && (
                    <p onClick={handleLogout} className="my-2 p-1 hover-button-custom">
                        Cerrar sesión
                    </p>
                    )}
                   
                </div>
            </div> )}
        </div>
    );
}
export default UserconManage;