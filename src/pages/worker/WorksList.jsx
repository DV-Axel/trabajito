import { useEffect, useState } from "react";
import {getUserIdFromToken} from "../../data/helpers";
import { useNavigate } from "react-router-dom";


const WorksList = () => {
    const [works, setWorks] = useState([]);
    const navigate = useNavigate();


    const userId = getUserIdFromToken();

    useEffect(() => {


        const fetchSolicitudesRubro = async () => {
            if (!userId) return;

            try {
                const response = await fetch(`http://localhost:3000/workers/solicitudes-rubro/${userId}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                });


                if (!response.ok) throw new Error("Error al obtener las solicitudes");
                const data = await response.json();
                setWorks(Array.isArray(data) ? data : []);

            } catch (error) {
                // Puedes manejar el error aquí, por ejemplo:
                setWorks([]);
            }
        };
        fetchSolicitudesRubro();
    }, [userId]);

    console.log(works)


    return (
        <div className="max-w-3xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6 text-center">Trabajos disponibles</h1>
            <div className="space-y-4">
                {works.length === 0 ? (
                    <p className="text-center text-gray-500">
                        No hay solicitudes correspondientes a tu rubro.
                    </p>
                ) : (
                    works.map(work => {
                        const isOwnPostulation = String(work.userId) === String(userId);
                        return (
                            <div
                                key={work.id}
                                className={`border border-gray-500 rounded-lg p-4 shadow-sm ${isOwnPostulation ? "bg-gray-300" : "bg-white"}`}
                            >

                                <div className="flex justify-between items-center mb-2">
                                    <h2 className="text-xl font-semibold">{work.title}</h2>
                                    {work.urgency && (
                                        <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-bold">URGENTE</span>
                                    )}
                                </div>
                                <div className="text-sm text-gray-600 mb-1">
                                    Fecha: {work.date ? new Date(work.date).toLocaleDateString() : "No especificada"}
                                </div>
                                <div className="text-sm text-gray-600 mb-1">
                                    Dirección: {work.address ? `${work.address.road || ""} ${work.address.house_number || ""}, ${work.address.town || ""}` : "No especificada"}
                                </div>
                                <div className="text-sm text-gray-600 mb-1">
                                    Tipo de trabajo: <span className="font-semibold capitalize">{work.position?.tipo_trabajo || "No especificado"}</span>
                                </div>
                                <div className="mt-2 text-gray-800">{work.description}</div>
                                <div className="mt-4 flex justify-between items-center">
                                    {isOwnPostulation && (
                                        <div className="text-sm text-gray-700 font-semibold">
                                            Esta es tu propia postulación
                                        </div>
                                    )}
                                    <button
                                        className={`font-semibold py-1 px-4 rounded transition ${
                                            isOwnPostulation
                                                ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                                                : "bg-blue-600 hover:bg-blue-700 text-white"
                                        }`}
                                        disabled={isOwnPostulation}
                                        onClick={() => navigate(`/solicitud/${work.id}`)}
                                    >
                                        Ver Servicio
                                    </button>
                                </div>

                            </div>
                        );
                    })

                )}

            </div>
        </div>
    );
}

export default WorksList