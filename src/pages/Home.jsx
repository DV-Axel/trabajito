import React from "react";
import { useNavigate } from "react-router-dom";
import bannerIndex from '../assets/images/banner index.png';

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex flex-col">
            <div className="relative w-full">
                <img
                    src={bannerIndex}
                    alt="Banner"
                    className="w-full h-[300px] sm:h-[400px] md:h-[500px] object-cover"
                />

                <div className="absolute inset-0 flex items-center justify-center px-2">
                    <div className="bg-black bg-opacity-60 px-4 py-4 rounded-2xl shadow-lg flex flex-col items-center gap-4 text-center w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl sm:px-8 sm:py-6">
                        <span className="text-white font-bold text-lg sm:text-2xl">¿Buscas soluciones?</span>
                        <button
                            onClick={() => navigate('/login')}
                            className="bg-[#008ED6] hover:bg-amber-600 text-white font-semibold px-4 py-2 sm:px-5 sm:py-2 rounded transition w-full sm:w-auto"
                        >
                            Comenzar
                        </button>
                        <span className="text-white font-bold text-lg sm:text-2xl">Publica lo que necesitas que alguien va a ayudarte</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;