import imagenLogin from "../../assets/images/image login.png";
import { Link } from "react-router-dom";

const BeSponsor = () => {
    return (
        <div className="flex flex-1 flex-col md:flex-row">
            {/* Sección de la imagen */}
            <div className="hidden mdplus:block md:w-1/2 h-full mdplus:h-[724px] bg-gradient-to-b from-[#0c3444] to-[#e9ecf2] flex items-center justify-center">
                <img
                    src={imagenLogin}
                    alt="Sponsor"
                    className="object-cover w-full h-full mdplus:max-h-[724px]"
                />
            </div>
            {/* Sección de bienvenida e incentivo para sponsors */}
            <div className="w-full flex items-center justify-center bg-white">
                <div className="max-w-lg w-full px-8 py-16">
                    <h2 className="text-3xl md:text-4xl font-semibold text-[#0c3444] mb-6 text-center">
                        ¡Bienvenido, <span className="font-bold">SPONSOR!</span>
                    </h2>
                    <p className="text-lg text-gray-700 mb-6 text-center">
                        Como sponsor, serás responsable de gestionar y acompañar a los trabajadores que deseen sumarse a la plataforma.
                    </p>
                    <ul className="mb-8 space-y-3">
                        <li className="flex items-center">
                            <span className="text-[#0c7fcf] text-xl mr-2">📝</span>
                            <span className="text-gray-800">Aprueba o rechaza solicitudes de trabajadores que quieran ser sponsoreados.</span>
                        </li>
                        <li className="flex items-center">
                            <span className="text-[#0c7fcf] text-xl mr-2">⏸️</span>
                            <span className="text-gray-800">Pausa o reactiva el sponsoreo de un trabajador en cualquier momento.</span>
                        </li>
                        <li className="flex items-center">
                            <span className="text-[#0c7fcf] text-xl mr-2">📊</span>
                            <span className="text-gray-800">Haz seguimiento de los servicios y desempeño de tus sponsoreados.</span>
                        </li>
                        <li className="flex items-center">
                            <span className="text-[#0c7fcf] text-xl mr-2">🤝</span>
                            <span className="text-gray-800">Acompaña y potencia el crecimiento profesional de tu equipo.</span>
                        </li>
                    </ul>
                    <div className="flex justify-center">
                        <Link
                            to="/registro-sponsor"
                            className="bg-[#0c7fcf] hover:bg-[#095a8e] text-white font-semibold py-3 px-8 rounded-md transition-all text-lg shadow"
                        >
                            ¡Quiero ser sponsor!
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BeSponsor;