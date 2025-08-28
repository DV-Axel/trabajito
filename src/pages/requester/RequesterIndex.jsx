import { useState } from "react";
import {
    FaBroom, FaPaintRoller, FaFaucet, FaBolt, FaSnowflake, FaBoxes , FaTruck
} from "react-icons/fa";
import {
    GiBrickWall, GiGardeningShears, GiBabyBottle, GiLockpicks,
    GiBlacksmith, GiGearHammer, GiNurseFemale, GiWoodBeam
} from "react-icons/gi";

const services = [
    { key: "aires", name: "Aires Acondicionados", icon: <FaSnowflake size={40} /> },
    { key: "albanileria", name: "Albañilería", icon: <GiBrickWall size={40} /> },
    { key: "carpintero", name: "Carpintero", icon: <GiWoodBeam size={40} /> },
    { key: "cerrajeria", name: "Cerrajería", icon: <GiLockpicks size={40} /> },
    { key: "cuidados_adultos", name: "Cuidados Adultos", icon: <GiNurseFemale size={40} /> },
    { key: "electricidad", name: "Electricidad", icon: <FaBolt size={40} /> },
    { key: "herrería", name: "Herrería", icon: <GiBlacksmith size={40} /> },
    { key: "jardineria", name: "Jardinería", icon: <GiGardeningShears size={40} /> },
    { key: "limpieza", name: "Limpieza", icon: <FaBroom size={40} /> },
    { key: "logistica", name: "Logística", icon: <FaBoxes size={40} /> },
    { key: "mudanzas", name: "Mudanzas", icon: <FaTruck size={40} /> },
    { key: "ninera", name: "Niñera", icon: <GiBabyBottle size={40} /> },
    { key: "pintura", name: "Pintura", icon: <FaPaintRoller size={40} /> },
    { key: "plomeria", name: "Plomería", icon: <FaFaucet size={40} /> },
    { key: "tornería", name: "Tornería", icon: <GiGearHammer size={40} /> },
];

const RequesterIndex = () => {
    const [selected, setSelected] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const handleServiceClick = (key) => {
        setSelected(key);
        setShowModal(true);
    };

    const handleContinue = () => {
        setShowModal(false);
        // Aquí puedes mostrar el formulario de preguntas o avanzar al siguiente paso
    };

    {/*TODO: mejorar el responsive*/}

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
                        <span className="mb-2 text-[#0c7fcf]">{service.icon}</span>
                        <span className="text-lg font-medium">{service.name}</span>
                    </button>
                ))}
            </div>

            {showModal && selected && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
                    <div className="bg-white rounded-lg p-8 shadow-lg flex flex-col items-center">
                        <h3 className="text-xl font-bold mb-4">¿Continuar con este servicio?</h3>
                        <div className="mb-6 text-[#0c7fcf] font-semibold text-lg">
                            {services.find(s => s.key === selected).name}
                        </div>
                        <div className="flex gap-4">
                            <button
                                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                                onClick={() => setShowModal(false)}
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




{/*

const serviceQuestions = {
  limpieza: [
    { label: "¿Cuántos ambientes necesita limpiar?", type: "input" },
    { label: "¿Qué tipo de limpieza requiere?", type: "select", options: ["General", "Profunda", "Oficina"] }
  ],
  plomeria: [
    { label: "¿Cuál es el problema de plomería?", type: "input" },
    { label: "¿En qué parte de la casa?", type: "select", options: ["Baño", "Cocina", "Patio"] }
  ],
  // ...otros servicios
};


{selectedQuestions.length > 0 && (
  <form className="mt-6 flex flex-col gap-4">
    {selectedQuestions.map((q, idx) => (
      <label key={idx} className="flex flex-col">
        {q.label}
        {q.type === "input" && (
          <input type="text" className="border rounded p-2 mt-1" />
        )}
        {q.type === "select" && (
          <select className="border rounded p-2 mt-1">
            {q.options.map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        )}
      </label>
    ))}
    <button type="submit" className="mt-4 bg-blue-500 text-white rounded p-2">Enviar solicitud</button>
  </form>
)}


*/}