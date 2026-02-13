import { useState } from "react";
import { MdPassword } from "react-icons/md";
import { Link } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import {showErrorAlert, showSuccessAlert} from "../../components/alerts/sweetAlertsComponents.jsx";

// Función para evaluar la seguridad de la contraseña
const getPasswordStrength = (password) => {
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    if (score === 0) return { label: "Muy débil", color: "bg-red-400", width: "w-1/4" };
    if (score === 1) return { label: "Débil", color: "bg-orange-400", width: "w-1/3" };
    if (score === 2) return { label: "Media", color: "bg-yellow-400", width: "w-2/3" };
    if (score === 3) return { label: "Fuerte", color: "bg-green-400", width: "w-3/4" };
    return { label: "Muy fuerte", color: "bg-green-600", width: "w-full" };
};

const NewPassword = () => {
    const [password, setPassword] = useState("");
    const [repeat, setRepeat] = useState("");
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get("token");
    const navigate = useNavigate();

    const strength = getPasswordStrength(password);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!password || !repeat) {
            showErrorAlert('Error', 'Todos los campos son obligatorios.');
            return;
        }
        if (password !== repeat) {
            showErrorAlert('Error', 'Las contraseñas no coinciden.');
            return;
        }

        try {
            const response = await fetch(`http://localhost:3000/auth/reset-password?token=${token}`, {
                method: 'POST',
                body: JSON.stringify({ newPassword: password, confirmPassword: repeat }),
                headers: { 'Content-Type': 'application/json' }
            });


            if (response.ok) {
                showSuccessAlert('Éxito', 'Contraseña cambiada correctamente.');
                navigate('/login');
            } else {
                showErrorAlert('Error', 'Hubo un problema al cambiar la contraseña.');
            }
        } catch {
            showErrorAlert('Error', 'Hubo un problema al cambiar la contraseña.');
        }
    };

    return (
        <div className="flex-1 flex items-center justify-center bg-white smplus:px-4 ">
            <div className="max-w-md w-full flex flex-col items-center smplus:px-4">
                <MdPassword className="text-7xl mdplus:mt-8 mdplus:mb-4 text-[#02283A]" />
                <h2 className="text-3xl font-extrabold text-[#0c3444] mb-6 text-center">
                    Cambiar contraseña
                </h2>
                <p className="text-base text-gray-700 text-center mb-4">
                    Ingresa tu nueva contraseña y repítela para confirmar.
                </p>
                <form onSubmit={handleSubmit} className="w-full flex flex-col items-center">
                    <input
                        type="password"
                        placeholder="Nueva contraseña"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        className="mb-2 px-4 py-3 w-full border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-[#008ED6]"
                        minLength={6}
                    />
                    {/* Barra de seguridad */}
                    {password && (
                        <div className="w-full mb-2">
                            <div className="h-2 rounded transition-all duration-300 overflow-hidden bg-gray-200">
                                <div className={`${strength.color} ${strength.width} h-2 rounded`}></div>
                            </div>
                            <span className="text-xs text-gray-600">{strength.label}</span>
                        </div>
                    )}
                    <input
                        type="password"
                        placeholder="Repetir contraseña"
                        value={repeat}
                        onChange={e => setRepeat(e.target.value)}
                        className="mb-4 px-4 py-3 w-full border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-[#008ED6]"
                        minLength={6}
                    />

                    <button
                        type="submit"
                        className="bg-[#0c7fcf] hover:bg-[#095a8e] text-white font-bold mt-4 py-3 px-8 rounded-lg text-lg shadow-md transition-all"
                    >
                        Cambiar contraseña
                    </button>
                </form>
            </div>
        </div>
    );
};

export default NewPassword;