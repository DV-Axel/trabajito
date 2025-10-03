import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { getUserIdFromToken, formatearLocacion  } from '../../data/helpers';
import { traerIdServicio } from '../../data/services.js'

const ActiveServices = () => {
    const [solicitudes, setSolicitudes] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();


    const userId = getUserIdFromToken();
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchSolicitudes = async () => {

            if (!userId) return;

            try {
                const response = await fetch(`http://localhost:3000/job-requests/${userId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                if (!response.ok) throw new Error('Error al obtener solicitudes');
                const data = await response.json();
                setSolicitudes(data);
            } catch (error) {
                setSolicitudes([]);
            } finally {
                setLoading(false);
            }
        };
        if (userId && token) fetchSolicitudes();
    }, [userId, token]);

    if (loading) {
        return <div className="text-center mt-10 text-lg text-gray-600">Cargando solicitudes...</div>;
    }

    if (!solicitudes || solicitudes.length === 0) {
        return <div className="text-center mt-10 text-lg text-gray-600">No tienes solicitudes activas.</div>;
    }

    const handleServiceDetails = (id) => {
        navigate(`/servicio/${id}`);
    };


    return (
        <div className="max-w-4xl mx-auto my-10 p-6 bg-white rounded-3xl shadow-2xl border-4 border-[#00b4d8]">
            <h2 className="text-2xl font-bold text-[#02283A] mb-6">Solicitudes activas</h2>
            <ul className="space-y-6">
                {solicitudes.map(solicitud => (
                    <li key={solicitud.id} className="p-6 rounded-xl bg-[#f4fbfd] shadow flex flex-col md:flex-row md:items-center md:justify-between border border-[#00b4d8]">
                        <div>
                            <h3 className="text-xl font-bold text-[#02283A] mb-2">{solicitud.title}</h3>
                            <p className="text-gray-700 mb-2">{solicitud.description}</p>
                            <div className="flex flex-wrap gap-4 text-sm text-[#02283A] mb-2">
                                <span><strong>Fecha de creación:</strong> {new Date(solicitud.jobCreationDate).toLocaleDateString()}</span>
                                <span><strong>Tipo de trabajo:</strong> {traerIdServicio(solicitud.serviceKey)}</span>
                                <span><strong>Urgencia:</strong> {solicitud.urgency ? 'Sí' : 'No'}</span>
                                {console.log(solicitud.serviceKey)}

                                <span><strong>Ubicación:</strong> {formatearLocacion(solicitud.address)}</span>
                            </div>
                        </div>
                        <div className="flex gap-3 mt-4 md:mt-0">
                            <button
                                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full font-semibold shadow transition"
                                onClick={() => handleServiceDetails(solicitud.id)}
                            >
                                Ver
                            </button>

                            <button
                                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full font-semibold shadow transition"
                                onClick={() => alert(`Cancelar solicitud ${solicitud.id}`)}
                            >
                                Cancelar
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ActiveServices;