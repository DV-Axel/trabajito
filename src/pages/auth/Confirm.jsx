import imagenLogin from "../../assets/images/image login.png";
import { Link } from "react-router-dom";

const Confirm = () => {
    return (
        <div className="flex flex-1 flex-col md:flex-row ">
            {/* Sección de la imagen */}
            <div className="hidden mdplus:block md:w-1/2 h-full mdplus:h-[724px] bg-gradient-to-b from-[#0c3444] to-[#e9ecf2] flex items-center justify-center">
                <img
                    src={imagenLogin}
                    alt="Trabajador"
                    className="object-cover w-full h-full mdplus:max-h-[724px]"
                />
            </div>
            {/* Sección del mensaje */}
            <div className="w-full flex items-center justify-center bg-white">
                <div className="max-w-lg w-full px-8 mdplus:py-20 py-28 flex flex-col items-center">
                    <h2 className="text-4xl md:text-5xl font-extrabold text-[#0c3444] mb-8 text-center drop-shadow-lg">
                        ¡Gracias por registrarte!
                    </h2>
                    <p className="text-xl text-[#008ED6] text-center mb-4 font-semibold">
                        Hemos enviado un correo de confirmación a tu casilla.
                    </p>
                    <p className="text-lg text-gray-700 text-center mb-8">
                        Por favor, revisa tu correo electrónico y haz clic en el enlace de validación para activar tu cuenta.
                    </p>
                    <Link
                        to="/login"
                        className="mt-6 bg-[#0c7fcf] hover:bg-[#095a8e] text-white font-bold py-3 px-8 rounded-lg text-lg shadow-md transition-all"
                    >
                        Volver al Login
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Confirm;