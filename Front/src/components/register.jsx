import { useState } from 'react';
import '../App.css';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1); // Paso actual del formulario
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [correo, setCorreo] = useState('');
    const [dni, setDNI] = useState('');
    const [contraseña, setContraseña] = useState('');
    const [contraseña2, setContraseña2] = useState('');
    const [callePrimaria, setCallePrimaria] = useState('');
    const [calleSegundaria, setCalleSegundaria] = useState('');
    const [referencia, setReferencia] = useState('');
    const [ciudad, setCiudad] = useState('');
    const [nCasa, setNCasa] = useState('');
    const [provincia, setProvincia] = useState('');
    const [codPostal, setCodPostal] = useState('');
    const [pais, setPais] = useState('');
    const [nTarjeta, setNTarjeta] = useState('');
    const [tipoTarjeta, setTipoTarjeta] = useState('');
    const [cvc, setCvc] = useState('');
    const [fechaVenci, setFechaVenci] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (step === 1) {
            // Validar contraseñas
            if (contraseña !== contraseña2) {
                alert("Las contraseñas no coinciden");
                return;
            }
            setStep(2); // Ir al siguiente paso (dirección)
        } else if (step === 2) {
            setStep(3); // Ir al siguiente paso (tarjeta)
        } else if (step === 3) {
            // Enviar todos los datos al backend
            const data = {
                nombre,
                apellido,
                dni,
                correo,
                contraseña,
                contraseña2,
                callePrimaria,
                calleSegundaria,
                referencia,
                ciudad,
                nCasa,
                provincia,
                codPostal,
                pais,
                nTarjeta,
                tipoTarjeta,
                cvc,
                fechaVenci,
            };

            try {
                const response = await fetch('http://localhost:5000/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                });

                const result = await response.json();
                console.log(result.message);

                // Limpiar el formulario
                setNombre('');
                setApellido('');
                setCorreo('');
                setDNI('');
                setContraseña('');
                setContraseña2('');
                setCallePrimaria('');
                setCalleSegundaria('');
                setReferencia('');
                setCiudad('');
                setNCasa('');
                setProvincia('');
                setCodPostal('');
                setPais('');
                setNTarjeta('');
                setTipoTarjeta('');
                setCvc('');
                setFechaVenci('');

                // Redirigir al login
                navigate('/login');
            } catch (error) {
                console.error('Error:', error);
            }
        }
    };

    return (
        <div>
            <div className='w-full bg-[#101828] flex items-center justify-center navbar-gradient'>
                <div className='w-full items-center justify-center flex flex-col pt-5'>
                    <p className='text-white text-2xl font-bold mb-20'>
                        APP<strong className='text-[#3399ff]'>STORE</strong>
                    </p>

                    <div>
                        <p className='text-4xl font-bold text-transparent bg-gradient-to-r from-blue-200 to-blue-500 bg-clip-text text-center mb-6 
                            shadow-lg hover:shadow-2xl transition duration-300'>
                            Regístrate
                        </p>

                        <div className='p-8 neumorphism-box navbar-gradient rounded-lg shadow-xl mb-20'>
                            <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                {step === 1 && (
                                    <>
                                        <div>
                                            <h2 className='text-white text-2xl font-semibold mb-4'>Nombre</h2>
                                            <input
                                                type="text"
                                                name="nombre"
                                                id="nombre"
                                                value={nombre}
                                                onChange={(e) => setNombre(e.target.value)}
                                                placeholder="Ingresa tu nombre"
                                                className="w-full p-3 mb-4 rounded-lg bg-[#1A202C] text-white border border-[#2D3748] focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                required
                                            />
                                        </div>

                                        <div>
                                            <h2 className='text-white text-2xl font-semibold mb-4'>Apellido</h2>
                                            <input
                                                type="text"
                                                name="apellido"
                                                id="apellido"
                                                value={apellido}
                                                onChange={(e) => setApellido(e.target.value)}
                                                placeholder="Ingresa tu apellido"
                                                className="w-full p-3 mb-4 rounded-lg bg-[#1A202C] text-white border border-[#2D3748] focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                required
                                            />
                                        </div>

                                        <div>
                                            <h2 className='text-white text-2xl font-semibold mb-4'>DNI</h2>
                                            <input
                                                type="text"
                                                name="dni"
                                                id="dni"
                                                value={dni}
                                                onChange={(e) => setDNI(e.target.value)}
                                                placeholder="Ingresa tu dni"
                                                className="w-full p-3 mb-4 rounded-lg bg-[#1A202C] text-white border border-[#2D3748] focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                required
                                            />
                                        </div>

                                        <div>
                                            <h2 className='text-white text-2xl font-semibold mb-4'>Correo electrónico</h2>
                                            <input
                                                type="email"
                                                name="correo"
                                                id="correo"
                                                value={correo}
                                                onChange={(e) => setCorreo(e.target.value)}
                                                placeholder="Ingresa tu correo electrónico"
                                                className="w-full p-3 mb-4 rounded-lg bg-[#1A202C] text-white border border-[#2D3748] focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                required
                                            />
                                        </div>

                                        <div>
                                            <h2 className='text-white text-2xl font-semibold mb-4'>Contraseña</h2>
                                            <input
                                                type="password"
                                                name="contraseña"
                                                id="contraseña"
                                                value={contraseña}
                                                onChange={(e) => setContraseña(e.target.value)}
                                                placeholder="Ingresa tu contraseña"
                                                className="w-full p-3 mb-4 rounded-lg bg-[#1A202C] text-white border border-[#2D3748] focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                required
                                            />
                                        </div>

                                        <div>
                                            <h2 className='text-white text-2xl font-semibold mb-4'>Vuelve a escribir la contraseña</h2>
                                            <input
                                                type="password"
                                                name="contraseña2"
                                                id="contraseña2"
                                                value={contraseña2}
                                                onChange={(e) => setContraseña2(e.target.value)}
                                                placeholder="Repite tu contraseña"
                                                className="w-full p-3 mb-6 rounded-lg bg-[#1A202C] text-white border border-[#2D3748] focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                required
                                            />
                                        </div>
                                    </>
                                )}

                                {step === 2 && (
                                    <>
                                        <div>
                                            <h2 className='text-white text-2xl font-semibold mb-4'>Calle Primaria</h2>
                                            <input
                                                type="text"
                                                name="callePrimaria"
                                                id="callePrimaria"
                                                value={callePrimaria}
                                                onChange={(e) => setCallePrimaria(e.target.value)}
                                                placeholder="Ingresa la calle principal"
                                                className="w-full p-3 mb-4 rounded-lg bg-[#1A202C] text-white border border-[#2D3748] focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                required
                                            />
                                        </div>

                                        <div>
                                            <h2 className='text-white text-2xl font-semibold mb-4'>Calle Secundaria</h2>
                                            <input
                                                type="text"
                                                name="calleSegundaria"
                                                id="calleSegundaria"
                                                value={calleSegundaria}
                                                onChange={(e) => setCalleSegundaria(e.target.value)}
                                                placeholder="Ingresa la calle secundaria"
                                                className="w-full p-3 mb-4 rounded-lg bg-[#1A202C] text-white border border-[#2D3748] focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>

                                        <div>
                                            <h2 className='text-white text-2xl font-semibold mb-4'>Referencia</h2>
                                            <input
                                                type="text"
                                                name="referencia"
                                                id="referencia"
                                                value={referencia}
                                                onChange={(e) => setReferencia(e.target.value)}
                                                placeholder="Ingresa una referencia"
                                                className="w-full p-3 mb-4 rounded-lg bg-[#1A202C] text-white border border-[#2D3748] focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                required
                                            />
                                        </div>

                                        <div>
                                            <h2 className='text-white text-2xl font-semibold mb-4'>Ciudad</h2>
                                            <input
                                                type="text"
                                                name="ciudad"
                                                id="ciudad"
                                                value={ciudad}
                                                onChange={(e) => setCiudad(e.target.value)}
                                                placeholder="Ingresa tu ciudad"
                                                className="w-full p-3 mb-4 rounded-lg bg-[#1A202C] text-white border border-[#2D3748] focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                required
                                            />
                                        </div>

                                        <div>
                                            <h2 className='text-white text-2xl font-semibold mb-4'>Número de Casa</h2>
                                            <input
                                                type="number"
                                                name="nCasa"
                                                id="nCasa"
                                                value={nCasa}
                                                onChange={(e) => setNCasa(e.target.value)}
                                                placeholder="Ingresa el número de casa"
                                                className="w-full p-3 mb-4 rounded-lg bg-[#1A202C] text-white border border-[#2D3748] focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                required
                                            />
                                        </div>

                                        <div>
                                            <h2 className='text-white text-2xl font-semibold mb-4'>Provincia</h2>
                                            <input
                                                type="text"
                                                name="provincia"
                                                id="provincia"
                                                value={provincia}
                                                onChange={(e) => setProvincia(e.target.value)}
                                                placeholder="Ingresa tu provincia"
                                                className="w-full p-3 mb-4 rounded-lg bg-[#1A202C] text-white border border-[#2D3748] focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                required
                                            />
                                        </div>

                                        <div>
                                            <h2 className='text-white text-2xl font-semibold mb-4'>Código Postal</h2>
                                            <input
                                                type="number"
                                                name="codPostal"
                                                id="codPostal"
                                                value={codPostal}
                                                onChange={(e) => setCodPostal(e.target.value)}
                                                placeholder="Ingresa el código postal"
                                                className="w-full p-3 mb-4 rounded-lg bg-[#1A202C] text-white border border-[#2D3748] focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                required
                                            />
                                        </div>

                                        <div>
                                            <h2 className='text-white text-2xl font-semibold mb-4'>País</h2>
                                            <input
                                                type="text"
                                                name="pais"
                                                id="pais"
                                                value={pais}
                                                onChange={(e) => setPais(e.target.value)}
                                                placeholder="Ingresa tu país"
                                                className="w-full p-3 mb-6 rounded-lg bg-[#1A202C] text-white border border-[#2D3748] focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                required
                                            />
                                        </div>
                                    </>
                                )}

                                {step === 3 && (
                                    <>
                                        <div>
                                            <h2 className='text-white text-2xl font-semibold mb-4'>Número de Tarjeta</h2>
                                            <input
                                                type="text"
                                                name="nTarjeta"
                                                id="nTarjeta"
                                                value={nTarjeta}
                                                onChange={(e) => setNTarjeta(e.target.value)}
                                                placeholder="Ingresa el número de tarjeta"
                                                className="w-full p-3 mb-4 rounded-lg bg-[#1A202C] text-white border border-[#2D3748] focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                required
                                            />
                                        </div>

                                        <div>
                                            <h2 className='text-white text-2xl font-semibold mb-4'>Tipo de Tarjeta</h2>
                                            <select
                                                name="tipoTarjeta"
                                                id="tipoTarjeta"
                                                value={tipoTarjeta}
                                                onChange={(e) => setTipoTarjeta(e.target.value)}
                                                className="w-full p-3 mb-4 rounded-lg bg-[#1A202C] text-white border border-[#2D3748] focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                required
                                            >
                                                <option value="">Selecciona un tipo</option>
                                                <option value="Visa">Visa</option>
                                                <option value="MasterCard">MasterCard</option>
                                                <option value="American Express">American Express</option>
                                            </select>
                                        </div>

                                        <div>
                                            <h2 className='text-white text-2xl font-semibold mb-4'>CVC</h2>
                                            <input
                                                type="number"
                                                name="cvc"
                                                id="cvc"
                                                value={cvc}
                                                onChange={(e) => setCvc(e.target.value)}
                                                placeholder="Ingresa el CVC"
                                                className="w-full p-3 mb-4 rounded-lg bg-[#1A202C] text-white border border-[#2D3748] focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                required
                                            />
                                        </div>

                                        <div>
                                            <h2 className='text-white text-2xl font-semibold mb-4'>Fecha de Vencimiento</h2>
                                            <input
                                                type="date"
                                                name="fechaVenci"
                                                id="fechaVenci"
                                                value={fechaVenci}
                                                onChange={(e) => setFechaVenci(e.target.value)}
                                                className="w-full p-3 mb-6 rounded-lg bg-[#1A202C] text-white border border-[#2D3748] focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                required
                                            />
                                        </div>
                                    </>
                                )}

                                <div className="col-span-2">
                                    <button
                                        type="submit"
                                        className="w-full p-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        {step === 3 ? 'Finalizar Registro' : 'Continuar'}
                                    </button>
                                </div>

                                {step > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => setStep(step - 1)}
                                        className="w-full p-3 rounded-lg bg-gray-600 text-white font-semibold hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
                                    >
                                        Volver
                                    </button>
                                )}

                                <p className="text-white mt-4 text-center">
                                    ¿Tienes una cuenta?
                                    <span
                                        className="text-blue-400 hover:underline ml-1 cursor-pointer"
                                        onClick={() => navigate("/login")}
                                    >
                                        Inicia sesión
                                    </span>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Register;