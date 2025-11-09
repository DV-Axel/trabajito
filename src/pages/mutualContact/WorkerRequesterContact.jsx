// javascript
// File: `src/pages/mutualContact/WorkerRequesterContact.jsx`
import React from 'react';
import { useParams } from 'react-router-dom';
import useGetJobRequest from '../../data/hooks/useGetJobRequest';
import useGetApplicationById from '../../data/hooks/useGetApplicationById';
import useSetAgreementUserWorkerTrue from "../../data/hooks/useSetAgreementUserWorkerTrue.js";
import useSetAgreementUserWorkerFalse from "../../data/hooks/useSetAgreementUserWorkerFalse.js";
import useGetWorkerById from '../../data/hooks/useGetWorkerById';
import { formatDate, formatearLocacion, getUserIdFromToken } from '../../data/helpers';
import useEditBudget from '../../data/hooks/useEditBudget.js';
import useEditServiceDate from '../../data/hooks/useEditServiceDate.js';

import { FiEdit } from 'react-icons/fi';

const WorkerRequesterContact = () => {
    const { id } = useParams();
    const idLogeado = getUserIdFromToken();

    const { editBudget } = useEditBudget();
    const { editServiceDate } = useEditServiceDate();
    const { setAgreementUserWorkerTrue } = useSetAgreementUserWorkerTrue();
    const { setAgreementUserWorkerFalse } = useSetAgreementUserWorkerFalse();
    const { servicio, loadingServicio, errorServicio } = useGetJobRequest(id);
    const applicationSelectedId = servicio?.applicationSelectedId ?? null;
    const { application, loadingApplication, errorApplication } = useGetApplicationById(applicationSelectedId);

    // Siempre llama al hook, aunque application aún no esté cargada
    const workerId = application?.workerId ?? null;
    const { worker, loadingWorker, errorWorker } = useGetWorkerById(workerId);

    if (loadingServicio) return <div>Cargando solicitud...</div>;
    if (errorServicio) return <div>Error al obtener la solicitud</div>;
    if (!servicio) return null;

    if (loadingApplication) return <div>Cargando postulacion</div>;
    if (errorApplication) return <div>Error al obtener la postulacion</div>;
    if (!application) return null;

    if (loadingWorker) return <div>Cargando worker...</div>;
    if (errorWorker) return <div>Error al obtener la worker...</div>;
    if (!worker) return null;

    const canEditBudget = idLogeado === worker.userId;
    const canEditDate = idLogeado === servicio.userId; // solo el solicitante puede cambiar la fecha

    return (
        <div className="grid grid-cols-3 gap-8 bg-white p-8 rounded shadow items-stretch">

            {/* Columna izquierda: Requester */}
            <div className="p-8 flex flex-col items-center border-r">
                <img
                    src={`http://localhost:3000${servicio.user.profilePicture}`}
                    alt="Foto de perfil"
                    className="w-40 h-40 rounded-full object-cover border-2 border-[#00b4d8] mb-3 shadow-2xl"
                />
                <h2 className="text-xl font-bold mb-1">{servicio.user.firstName} {servicio.user.lastName}</h2>
                <p className="text-gray-700 text-center mb-2">Solicitante de servicios</p>
                <p className="text-indigo-700 font-semibold mb-1">Datos de contacto</p>
                <div className="mb-1">
                    <span className="font-semibold">Email:</span>
                    <span className="ml-1">{servicio.user.email}</span>
                </div>
                <div>
                    <span className="font-semibold">Teléfono:</span>
                    <span className="ml-1">{servicio.user.phone}</span>
                </div>
                {servicio.userId === idLogeado ? (
                    !servicio.agreementUser ? (
                        <button
                            className="mt-6 bg-[#00b4d8] hover:bg-[#0096c7] text-white rounded-full px-6 py-2 font-semibold shadow"
                            onClick={() => setAgreementUserWorkerTrue(servicio.id, 'user')}
                        >
                            Confirmar acuerdo
                        </button>
                    ) : (
                        <button
                            className="mt-6 bg-red-500 hover:bg-red-700 text-white rounded-full px-6 py-2 font-semibold shadow"
                            onClick={() => setAgreementUserWorkerFalse(servicio.id, 'user')}
                        >
                            Cancelar acuerdo
                        </button>
                    )
                ) : (
                    servicio.agreementUser ? (
                        <div className="mt-6 px-6 py-2 rounded-full bg-green-100 text-green-700 font-semibold shadow text-center">
                            El solicitante aceptó la solicitud
                        </div>
                    ) : (
                        <div className="mt-6 px-6 py-2 rounded-full bg-yellow-100 text-yellow-700 font-semibold shadow text-center">
                            El solicitante aún no acepta la solicitud
                        </div>
                    )
                )}
            </div>

            {/* Columna central: Servicio */}
            <div className="flex flex-col justify-center items-center px-10">
                <h2 className="text-2xl font-bold mb-4">{servicio.title}</h2>
                <div className="mb-2">
                    <span className="font-semibold">Fecha:</span>
                    <span className="ml-2">{formatDate(servicio.date)}</span>
                    {canEditDate && (
                        <button
                            type="button"
                            onClick={() => editServiceDate({ jobRequestId: servicio.id, currentDate: servicio.date, onSuccess: () => window.location.reload() })}
                            className="ml-2 text-[#00b4d8] hover:text-[#0096c7] p-1 rounded"
                            aria-label="Editar fecha"
                        >
                            <FiEdit className="h-5 w-5" />
                        </button>
                    )}
                </div>
                <div className="mb-2 flex items-center">
                    <span className="font-semibold">Presupuesto:</span>
                    <span className="ml-2">${application.budget}</span>
                    {canEditBudget && (
                        <button
                            type="button"
                            onClick={() => editBudget({ applicationId: application.id, currentBudget: application.budget, onSuccess: () => window.location.reload() })}
                            className="ml-2 text-[#00b4d8] hover:text-[#0096c7] p-1 rounded"
                            aria-label="Editar presupuesto"
                        >
                            <FiEdit className="h-5 w-5" />
                        </button>
                    )}
                </div>
                <div className="mb-2">
                    <span className="font-semibold">Tipo:</span>
                    <span className="ml-2">{servicio.service.name}</span>
                </div>
                <div>
                    <span className="font-semibold">Ubicación:</span>
                    <span className="ml-2">{formatearLocacion(servicio.address)}</span>
                </div>
            </div>

            {/* Columna derecha: Worker */}
            <div className="p-8 flex flex-col items-center border-l">
                <img
                    src={`http://localhost:3000/${worker.profilePicture}`}
                    alt="Foto de perfil"
                    className="w-40 h-40 rounded-full object-cover border-2 border-[#00b4d8] mb-3 shadow-2xl"
                />
                <h2 className="text-xl font-bold mb-1">{application.worker.user.firstName} {application.worker.user.lastName}</h2>
                <p className="text-gray-700 text-center mb-2">Worker</p>
                <p className="text-yellow-500 mb-1 flex items-center gap-1">
                    <span>⭐</span> {worker.rating}
                </p>
                <p className="text-indigo-700 font-semibold mb-1">Datos de contacto </p>
                <div className="mb-1 text-center w-full">
                    <span className="font-semibold">Locaciones:</span>
                    <span className="ml-1">{worker.workLocation.join(", ")}</span>
                </div>
                <div className="mb-1 text-center w-full">
                    <span className="font-semibold">Días:</span>
                    <span className="ml-1">{worker.workingDays.join(", ")}</span>
                </div>
                <div className="text-center w-full">
                    <span className="font-semibold">Horarios:</span>
                    <span className="ml-1">{worker.workingHours.join(", ")}</span>
                </div>
                {
                    worker.userId === idLogeado ? (
                        !servicio.agreementWorker ? (
                            <button
                                className="mt-6 bg-[#00b4d8] hover:bg-[#0096c7] text-white rounded-full px-6 py-2 font-semibold shadow"
                                onClick={() => setAgreementUserWorkerTrue(servicio.id, 'worker')}
                            >
                                Confirmar acuerdo
                            </button>
                        ) : (
                            <button
                                className="mt-6 bg-red-500 hover:bg-red-700 text-white rounded-full px-6 py-2 font-semibold shadow"
                                onClick={() => setAgreementUserWorkerFalse(servicio.id, 'worker')}
                            >
                                Cancelar acuerdo
                            </button>
                        )
                    ) : (
                        servicio.agreementWorker ? (
                            <div className="mt-6 px-6 py-2 rounded-full bg-green-100 text-green-700 font-semibold shadow text-center">
                                Acuerdo aceptado por el trabajador
                            </div>
                        ) : (
                            <div className="mt-6 px-6 py-2 rounded-full bg-yellow-100 text-yellow-700 font-semibold shadow text-center">
                                El trabajador aún no acepta el acuerdo
                            </div>
                        )
                    )
                }
            </div>
        </div>
    );
};

export default WorkerRequesterContact;