import { Link } from "react-router-dom";
import { MdWorkspacePremium } from "react-icons/md";

const Validate = () => {
        return (
            <div className="flex-1 flex items-center justify-center bg-white">
                <div className="max-w-md w-full flex flex-col items-center">
                    <h2 className="text-4xl font-extrabold text-[#0c3444] mdplus:my-10 my-6 text-center">
                        ¡Correo validado con éxito!
                    </h2>
                    <p className="text-lg text-[#008ED6] text-center mb-4 font-semibold">
                        Tu correo electrónico ha sido verificado correctamente.
                    </p>
                    <p className="text-base text-gray-700 text-center mb-8">
                        Ya puedes iniciar sesión en la plataforma.
                    </p>
                    <Link
                        to="/login"
                        className="bg-[#0c7fcf] hover:bg-[#095a8e] text-white font-bold py-3 px-8 rounded-lg text-lg shadow-md transition-all"
                    >
                        Ir al Login
                    </Link>
                    <MdWorkspacePremium className="text-9xl mdplus:mb-10 my-6 text-[#02283A]"/>
                </div>
            </div>
        );
}

export default Validate;