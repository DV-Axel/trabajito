import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { services } from "../../data/services.js";

const RequesterIndex = () => {
    const [selected, setSelected] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    const handleServiceClick = (key) => {
        setSelected(key);
        setShowModal(true);
    };

    const handleContinue = () => {
        setShowModal(false);
        navigate("/formularioSolicitud", { state: { serviceKey: selectedService.key } });
    };

    const selectedService = services.find(s => s.key === selected); // Encuentra el servicio seleccionado

    return (
        <div className="flex flex-col items-center py-8">
            <h2 className="text-2xl font-bold mb-6 text-[#0c3444]">Elige un tipo de servicio</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                {services.map(service => (
                    <button
                        key={service.key}
                        onClick={() => handleServiceClick(service.key)}
                        className={`flex flex-col items-center p-4 rounded-lg border-2 transition-all
                            ${selected === service.key ? "border-[#0c7fcf] bg-blue-50" : "border-gray-200 bg-white"}
                            hover:border-[#008ED6] hover:bg-blue-100`}
                        type="button"
                    >
                        <span className="mb-2 text-[#0c7fcf]">
                            {React.createElement(service.icon, { size: 40 })}
                        </span>
                        <span className="text-lg font-medium">{service.name}</span>
                    </button>
                ))}
            </div>

            {showModal && selected && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
                    <div className="bg-white rounded-lg p-8 shadow-lg flex flex-col items-center">
                        <h3 className="text-xl font-bold mb-4">¿Continuar con este servicio?</h3>
                        <div className="mb-6 text-[#0c7fcf] font-semibold text-lg">
                            {selectedService.name}
                        </div>
                        <div className="flex gap-4">
                            <button
                                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                                onClick={() => {
                                    setShowModal(false);
                                    setSelected(null);
                                }}
                            >
                                Cancelar
                            </button>
                            <button
                                className="bg-[#0c7fcf] hover:bg-[#095a8e] text-white font-bold py-2 px-4 rounded"
                                onClick={handleContinue}
                            >
                                Continuar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RequesterIndex;