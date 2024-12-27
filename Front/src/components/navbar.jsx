
import React from "react";
import { Link } from "react-router-dom";
import '../App.css';
import { BsSearch } from "react-icons/bs";


const Navbar = () => {
    return (
        <div>
            <div className='bg-[#101828] text-white h-[100px] w-full justify-center flex navbar-gradient border-b-2 border-[#101828] drop-shadow-[0_0_6px_rgba(51,153,255,1)] fixed'>
                <div className="flex-1 ">

                </div>
                <div className="flex  w-[60%]">
                    <div className="flex justify-center items-center w-full">
                        <div className="w-[20%] h-full flex items-center justify-center">
                            <img className="h-[70%] mb-1" src="../src/assets/FranGGY_cut.png " alt="logotipo de la empresa" />
                        </div>
                        <div className=" w-[90%] flex items-center justify-center">
                            <ul className="flex items-center justify-between text-sm custom-font"> 
                                <li className="inline-block mx-10 hover-button neumorphism-box">
                                    <Link to="/">Inicio</Link>
                                </li>
                                <li className="inline-block mx-10 hover-button neumorphism-box">
                                    Categorías
                                </li>
                                <li className="inline-block mx-10 hover-button neumorphism-box">Contacto</li>
                                <li className="inline-block mx-10 text-xl"><BsSearch /></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="flex-1">

                </div>
            </div>
        </div>
    );
} 
export default Navbar;