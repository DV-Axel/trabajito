import { useNavigate } from "react-router-dom";
import { getUserIdFromToken, formatearLocacion  } from '../../data/helpers';
import { traerIdServicio } from '../../data/services.js'
import {showConfirmAlert, showErrorAlert, showSuccessAlert} from "../../components/alerts/sweetAlertsComponents.jsx";
import useGetJobRequestsByUserId from "../../data/hooks/useGetJobRequestsByUserId.js";
import React from "react";

const ActiveServices = () => {
    const navigate = useNavigate();


    const userId = getUserIdFromToken();

    const { jobRequests, loadingJobRequests, errorJobRequests } = useGetJobRequestsByUserId(userId);



    const handleCancel = async (id) => {
        const result = await showConfirmAlert(
            '¿Cancelar solicitud?',
            `¿Estás seguro de cancelar esta solicitud? Esta acción no se puede deshacer. ${id}`   ,
            'Sí, cancelar',
            'No'
        );
        if (result) {
            try {
                // Ejemplo de uso del id para cancelar la solicitud
                await showSuccessAlert('Cancelado', 'La solicitud fue cancelada.');
            } catch (e) {
                await showErrorAlert('No se pudo cancelar la solicitud', e);
            }
        }
    };


    if (loadingJobRequests) return <div>Cargando solicitudes...</div>;
    if (errorJobRequests) return <div>Error al obtener las solicitudes del usuario</div>;
    if (!jobRequests) return null;

    const handleServiceDetails = (id) => {
        navigate(`/servicio/${id}`);
    };


    return (
        <div className="max-w-4xl mx-auto my-10 p-6 bg-white rounded-3xl shadow-2xl border-2 border-gray-300">
            <h2 className="text-2xl font-bold text-[#02283A] mb-6">Solicitudes activas</h2>
            <ul className="space-y-6">
                {jobRequests.map(solicitud => (
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
                                onClick={() => handleCancel(solicitud.id)}
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