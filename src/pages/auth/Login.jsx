import imagenLogin from '../../assets/images/image login.png'

import axios from 'axios';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {

    //state de los inputs
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    //state del mensaje de error
    const [errorMessage, setErrorMessage] =  useState('');

    //state de los input que faltan
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');

        // Validación de campos vacíos
        if (!email || !password) {
            setEmailError(!email);
            setPasswordError(!password);
            setErrorMessage('Complete todos los campos');
            return;
        } else {
            setEmailError(false);
            setPasswordError(false);
        }

        // Validación de formato de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setErrorMessage('Ingrese un correo electrónico válido');
            return;
        }

        try {
            const res = await axios.post('http://localhost:8888/login', { email, password });
            console.log(res);
            // Aquí puedes redirigir o guardar el token si el login es exitoso
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                setErrorMessage(error.response.data.message);
            } else {
                setErrorMessage('Error al conectar con el servidor');
            }
        }
    };

    return (
        <div className="flex flex-1 flex-col md:flex-row">
            {/* Sección de la imagen */}
            <div className="hidden mdplus:block md:w-1/2 h-full mdplus:h-[724px] bg-gradient-to-b from-[#0c3444] to-[#e9ecf2] flex items-center justify-center">
                <img
                    src={imagenLogin}
                    alt="Trabajador"
                    className="object-cover w-full h-full mdplus:max-h-[724px]"
                />
            </div>
            {/* Sección del login */}
            <div className="w-full flex items-center justify-center bg-white">
                <div className="max-w-lg w-full px-8 py-16">
                    <h2 className="text-3xl md:text-4xl font-semibold text-[#0c3444] mb-8 text-center">
                        Te damos la bienvenida de nuevo
                    </h2>
                    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-8 space-y-6 border border-gray-300">
                        <div>
                            <label htmlFor="email" className="block text-lg font-medium text-gray-700 mb-1">
                                Correo electronico
                            </label>
                            <input
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                type="email"
                                placeholder="Tu Email"
                                className={`w-full border ${emailError ? 'border-red-500' : 'border-gray-300'} rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-[#0c3444] transition-all`}
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-lg font-medium text-gray-700 mb-1">
                                Contraseña
                            </label>
                            <input
                                id="password"
                                type="password"
                                placeholder="Tu contraseña"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className={`w-full border ${passwordError ? 'border-red-500' : 'border-gray-300'} rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-[#0c3444] transition-all`}
                            />
                            <div className="text-right mt-2">
                                <Link to="/restablecerContraseña" className="text-[#0c7fcf] hover:underline text-sm">
                                    ¿Olvidaste tu contraseña?
                                </Link>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <input
                                id="remember"
                                type="checkbox"
                                className="mr-2"
                            />


                            <label htmlFor="remember" className="text-gray-700 text-sm">
                                Recordar contraseña
                                { /* TODO: Implementar funcionalidad */}
                            </label>
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-[#0c7fcf] hover:bg-[#095a8e] text-white font-semibold py-2 rounded-md transition-all"
                        >
                            INICIAR SESION
                        </button>
                        <div className="text-right text-sm text-gray-600 mt-2">
                            ¿No tienes cuenta?{" "}
                            <Link to='/registro' className="text-[#0c7fcf] hover:underline">
                                Crea una ahora mismo
                            </Link>
                        </div>
                    </form>

                    {errorMessage && <p className="text-center text-l mdplus:my-2 my-4 text-red-500">{errorMessage}</p>}

                </div>
            </div>
        </div>
    )
}

export default Login;