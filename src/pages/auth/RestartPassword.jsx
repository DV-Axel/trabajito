import { useState } from "react";
import { MdLockReset } from "react-icons/md";
import { Link } from "react-router-dom";
import {showErrorAlert, showSuccessAlert} from "../../components/alerts/sweetAlertsComponents.jsx";

const RestartPassword = () => {
    const [email, setEmail] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email) {
            showErrorAlert('Error', 'El campo de correo electrónico es obligatorio.');
            return;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            showErrorAlert('Error', 'Por favor, ingresa un correo electrónico válido.');
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/auth/forgot-password', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email })
            });
            if (response.ok) {
                showSuccessAlert('Correo enviado', 'Te enviamos un correo electronico para restablecer la contraseña.');
            } else {
                showErrorAlert('Error', 'No se pudo enviar el correo. Verifica el email ingresado.');
            }
        } catch (error) {
            showErrorAlert('Error', 'Ocurrió un error inesperado.');
        }
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
                        className={`mb-4 px-4 py-3 w-full border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-[#008ED6]`}
                    />
                    <button
                        type="submit"
                        className="bg-[#0c7fcf] hover:bg-[#095a8e] text-white font-bold py-3 px-8 rounded-lg text-lg shadow-md transition-all"
                    >
                        Restablecer
                    </button>
                </form>
            </div>
        </div>

    );
};

export default RestartPassword;
