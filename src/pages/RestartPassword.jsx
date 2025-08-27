import { useState } from "react";
import { MdLockReset } from "react-icons/md";
import { Link } from "react-router-dom";

const RestartPassword = () => {
    const [email, setEmail] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [errorMessage, setErrorMessage] =  useState('');
    const [emailError, setEmailError] = useState(false);


    const handleSubmit = (e) => {
        e.preventDefault();

        if(!email){
            setErrorMessage('Por favor, ingresa tu correo electrónico para continuar');
            setEmailError(true);
            return;
        }

        {/* TODO: aplicar logica de envio de email */}
        setShowModal(true);
    };

    return (
        <div className="flex-1 flex items-center justify-center bg-white smplus:px-4">
            <div className="max-w-md w-full flex flex-col items-center smplus:px-4">
                <MdLockReset className="text-7xl mdplus:mt-8 mdplus:mb-4 text-[#02283A]" />
                <h2 className="text-3xl font-extrabold text-[#0c3444] mb-6 text-center">
                    Restablecer contraseña
                </h2>
                <p className="text-base text-gray-700 text-center mb-4">
                    ¿Olvidaste tu contraseña? Ingresa tu correo electrónico abajo y te enviaremos un enlace para recuperarla.
                </p>
                <form onSubmit={handleSubmit} className="w-full flex flex-col items-center">
                    <input
                        type="email"
                        placeholder="Correo electrónico"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        className={`mb-4 px-4 py-3 w-full border ${emailError ? 'border-red-500' : 'border-gray-300'} rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-[#008ED6]`}
                    />
                    <button
                        type="submit"
                        className="bg-[#0c7fcf] hover:bg-[#095a8e] text-white font-bold py-3 px-8 rounded-lg text-lg shadow-md transition-all"
                    >
                        Restablecer
                    </button>
                </form>
                {errorMessage && (
                    <p className="text-center text-l mdplus:my-2 my-4 text-red-500">
                        {errorMessage}
                    </p>
                )}
            </div>
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50 smplus:px-4">
                    <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full flex flex-col items-center smplus:px-2">
                        <MdLockReset className="text-7xl mb-4 text-[#02283A]" />
                        <h2 className="text-3xl font-extrabold text-[#0c3444] mb-4 text-center">
                            ¡Revisa tu correo!
                        </h2>
                        <p className="text-lg text-[#008ED6] text-center mb-2 font-semibold">
                            Te hemos enviado un enlace para restablecer tu contraseña.
                        </p>
                        <p className="text-base text-gray-700 text-center mb-6">
                            Sigue las instrucciones en el correo para crear una nueva contraseña y luego podrás iniciar sesión.
                        </p>

                        <Link to="/login" className="w-full flex justify-center">
                            <button
                                onClick={() => setShowModal(false)}
                                className="bg-[#0c7fcf] hover:bg-[#095a8e] text-white font-bold py-2 px-6 rounded-lg text-lg shadow-md transition-all"
                            >
                                Ir a Login
                            </button>
                        </Link>


                    </div>

                </div>
            )}
        </div>

    );
};

export default RestartPassword;
