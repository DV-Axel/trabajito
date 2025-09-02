import { Link, useLocation } from "react-router-dom";
import { MdWorkspacePremium } from "react-icons/md";
import { use, useEffect, useRef, useState } from "react";
import axios from "axios";
import { GiToken } from "react-icons/gi";

const Validate = () => {
    const location = useLocation();
    const [status, setStatus] = useState("pending");
    const [message, setMessage] = useState("");
    const hasRun = useRef(false);

    useEffect(() => {
        if (hasRun.current) return;
        hasRun.current = true;

        const validateToken = async () => {
            setStatus("pending");
            setMessage("");
            const params = new URLSearchParams(location.search);
            const token = params.get("token");
            
            if (!token) {
                setStatus("error");
                setMessage("Token invalido");
                return;
            }
            try {
                await axios.get(`http://localhost:3000/auth/confirm?token=${token}`);
                setStatus("success");
                setMessage("¡Correo validado con exito!");
            } catch (err) {
                if (err.response && err.response.status === 400) {
                    setStatus("expired");
                    setMessage(err.response.data.message || "El token ha espirado, solicita un nuevo enlace");
                } else {
                    setStatus("error");
                    setMessage("Ocurrió un error al validar el correo.");
                }
            }
        };
        validateToken();
    }, [location.search]);


    return (
        <div className="flex-1 flex items-center justify-center bg-white">
            <div className="max-w-md w-full flex flex-col items-center">
                <h2 className="text-4xl font-extrabold text-[#0c3444] mdplus:my-10 my-6 text-center">
                    {message || (status === "success" ? "¡Correo validado con éxito!" : status === "expired" ? "Token expirado" : status === "error" ? "Error" : "Validando...")}
                </h2>
                {/* <p className={`text-lg ${status === "success" ? "text-[#008ED6]" : "text-red-500"} text-center mb-4 font-semibold`}>
                    {message}
                </p> */}
                {status === "success" && (
                    <>
                        <p className="text-lg font-bold text-[#36b6ff] text-center mb-2">
                            La cuenta ha sido verificada con éxito
                        </p>
                        <p className="text-base text-gray-700 text-center mb-8">
                            Ya puedes iniciar sesión en la plataforma.
                        </p>
                    </>
                )}
                {status === "success" && (
                    <Link
                        to="/login"
                        className="bg-[#0c7fcf] hover:bg-[#095a8e] text-white font-bold py-3 px-8 rounded-lg text-lg shadow-md transition-all"
                    >
                        Ir al Login
                    </Link>
                )}
                <MdWorkspacePremium className="text-9xl mdplus:mb-10 my-6 text-[#02283A]"/>
            </div>
        </div>
    );
}

export default Validate;