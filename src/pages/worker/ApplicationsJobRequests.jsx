// javascript
import { useNavigate } from "react-router-dom";
import { getUserIdFromToken, formatearLocacion } from '../../data/helpers';
import { traerIdServicio } from '../../data/services.js';
import { showConfirmAlert, showErrorAlert, showSuccessAlert } from "../../components/alerts/sweetAlertsComponents.jsx";
import useGetWorkerApplicationsByWorkerId from "../../data/hooks/useGetWorkerApplicationsByWorkerId.js";
import React from "react";

const ActiveServices = () => {
    const navigate = useNavigate();
    //TODO: esta hardcodeado el worker


    const userId = getUserIdFromToken();

    const {
        jobRequestsAppliedsByWorker,
        loadingJobRequestsAppliedsByWorker,
        errorJobRequestsAppliedsByWorker
    } = useGetWorkerApplicationsByWorkerId(1);

    const handleCancel = async (applicationId) => {
        const result = await showConfirmAlert(
            '¿Cancelar postulación?',
            `¿Estás seguro de cancelar esta postulación (id: ${applicationId})? Esta acción no se puede deshacer.`,
            'Sí, cancelar',
            'No'
        );
        if (result) {
            try {
                // Ejecutar lógica de cancelación real si existe (API), aquí ejemplo de feedback
                await showSuccessAlert('Cancelado', 'La postulación fue cancelada.');
            } catch (e) {
                await showErrorAlert('No se pudo cancelar la postulación', e?.message || e);
            }
        }
    };

    const handleServiceDetails = (jobId) => {
        navigate(`/solicitud/${jobId}`);
    };

    if (loadingJobRequestsAppliedsByWorker) return <div>Cargando postulaciones...</div>;
    if (errorJobRequestsAppliedsByWorker) return <div>Error al obtener las postulaciones</div>;
    if (!Array.isArray(jobRequestsAppliedsByWorker)) return null;

    return (
        <div className="max-w-4xl mx-auto my-10 p-6 bg-white rounded-3xl shadow-2xl border-2 border-gray-300">
            <h2 className="text-2xl font-bold text-[#02283A] mb-6">Trabajos a los que me postule</h2>
            <ul className="space-y-6">
                {jobRequestsAppliedsByWorker.map(post => (
                    <li
                        key={post.applicationId}
                        className="p-6 rounded-xl bg-[#f4fbfd] shadow flex flex-col md:flex-row md:items-center md:justify-between border border-[#00b4d8]"
                    >
                        <div>
                            <h3 className="text-xl font-bold text-[#02283A] mb-2">{post.title}</h3>
                            <p className="text-gray-700 mb-2">{post.description}</p>

                            <div className="flex flex-wrap gap-4 text-sm text-[#02283A] mb-2">
                                <span>
                                    <strong>Fecha de creación:</strong>{" "}
                                    {post.jobCreationDate ? new Date(post.jobCreationDate).toLocaleDateString() : "-"}
                                </span>

                                <span>
                                    <strong>Fecha de postulación:</strong>{" "}
                                    {post.appliedAt ? new Date(post.appliedAt).toLocaleDateString() : "-"}
                                </span>

                                <span>
                                    <strong>Presupuesto ofertado:</strong>{" "}
                                    {post.applicationBudget ? `$ ${post.applicationBudget}` : "-"}
                                </span>

                                <span>
                                    <strong>Tipo de trabajo:</strong>{" "}
                                    {traerIdServicio(post.serviceKey)}
                                </span>

                                <span>
                                    <strong>Urgencia:</strong>{" "}
                                    {post.urgency ? 'Sí' : 'No'}
                                </span>

                                <span>
                                    <strong>Ubicación:</strong>{" "}
                                    {formatearLocacion(post.address)}
                                </span>
                            </div>
                        </div>

                        <div className="flex gap-3 mt-4 md:mt-0">
                            <button
                                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full font-semibold shadow transition"
                                onClick={() => handleServiceDetails(post.id)}
                            >
                                Ver
                            </button>


                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ActiveServices;
