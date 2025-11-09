import React, { useState } from 'react';
import {useParams} from "react-router-dom";
import useGetJobRequest from "../../data/hooks/useGetJobRequest.js";
import useGetWorkerById from "../../data/hooks/useGetWorkerById.js";
import {formatDate, formatearLocacion, getUserIdFromToken} from "../../data/helpers.js";
import useGetApplicationById from "../../data/hooks/useGetApplicationById.js";

const WorkerJobRequestContact = () => {
    const { id } = useParams();
    const idLogeado = getUserIdFromToken();

    const { servicio, loadingServicio, errorServicio } = useGetJobRequest(id);
    const applicationSelectedId = servicio?.applicationSelectedId ?? null;
    const { application, loadingApplication, errorApplication } = useGetApplicationById(applicationSelectedId);

    const workerId = application?.workerId ?? null;
    const { worker, loadingWorker, errorWorker } = useGetWorkerById(workerId);

    const [modalFoto, setModalFoto] = useState(null);
    const handleExpandirFoto = (foto) => setModalFoto(foto);
    const handleCerrarModal = () => setModalFoto(null);

    if (loadingServicio) return <div>Cargando solicitud...</div>;
    if (errorServicio) return <div>Error al obtener la solicitud</div>;
    if (!servicio) return null;

    if(loadingWorker) return <div>Cargando worker...</div>
    if(errorWorker) return <div>Error al obtener la worker...</div>
    if(!worker) return null;

    if(loadingApplication) return <div>Cargando postulacion</div>
    if(errorApplication) return <div>Error al obtener la postulacion</div>
    if(!application) return null;

    console.log('servicio', servicio);
    console.log('application', application);
    console.log('worker', worker);

    return (
        <div>
            <h1 className="text-3xl font-bold text-center py-6">¡Hay un acuerdo de servicio!</h1>
            <div className="flex flex-row gap-8 bg-white p-8 rounded shadow items-stretch">
                {/* Columna izquierda: JobRequest */}
                <div className="flex-1 p-8 flex flex-col items-center border-r">
                    <h2 className="text-xl font-bold mb-2">Solicitud</h2>
                    <p className="text-gray-700 text-center mb-2">{servicio.description}</p>
                    <div className="mb-1">
                        <span className="font-semibold">Fecha:</span>
                        <span className="ml-1">{formatDate(servicio.date)}</span>
                    </div>
                    <div className="mb-1">
                        <span className="font-semibold">Presupuesto:</span>
                        <span className="ml-1">${servicio.finalBudget}</span>
                    </div>
                    <div className="mb-1">
                        <span className="font-semibold">Ubicación:</span>
                        <span className="ml-1">{formatearLocacion(servicio.address)}</span>
                    </div>
                    <div className="mb-1">
                        <span className="font-semibold">Solicitante:</span>
                        <span className="ml-1">{servicio.user.firstName} {servicio.user.lastName}</span>
                    </div>
                    <div className="mb-1">
                        <span className="font-semibold">Email:</span>
                        <span className="ml-1">{servicio.user.email}</span>
                    </div>
                    <div>
                        <span className="font-semibold">Teléfono:</span>
                        <span className="ml-1">{servicio.user.phone}</span>
                    </div>
                    <div className="mt-6 mb-4 text-center">
                        <span className="font-semibold text-indigo-700">Faltan X días para el servicio</span>
                    </div>

                    {/* Fotos */}
                    <div className="w-full mt-4">
                        <span className="font-semibold">Fotos:</span>
                        <div className="flex gap-4 mt-2 flex-wrap">
                            {servicio.photos && servicio.photos.length > 0 ? (
                                servicio.photos.map((foto, idx) => (
                                    <div key={idx} className="flex flex-col items-center mb-2">
                                        <img
                                            src={`http://localhost:3000${foto.url}`}
                                            alt={foto.name}
                                            className="w-32 h-24 object-cover rounded shadow mb-1 cursor-pointer"
                                            onClick={() => handleExpandirFoto(foto)}
                                        />
                                        <span className="text-xs text-gray-600">{foto.note}</span>
                                        <button
                                            className="mt-1 text-blue-600 underline text-xs"
                                            onClick={() => handleExpandirFoto(foto)}
                                        >
                                            Ampliar Foto
                                        </button>
                                    </div>
                                ))
                            ) : (
                                <span>No hay fotos</span>
                            )}
                        </div>
                    </div>

                    {/* Acciones solicitante */}
                    <div className="flex flex-col gap-4 mt-6 w-full items-center">
                        {servicio.userId === idLogeado ? (
                            <>
                                {!servicio.workFinishedUser ? (
                                    <button
                                        className="mt-6 bg-[#00b4d8] hover:bg-[#0096c7] text-white rounded-full px-6 py-2 font-semibold shadow"
                                        // onClick={() => setAgreementUserWorkerTrue(servicio.id, 'user')}
                                    >
                                        Confirmar trabajo finalizado
                                    </button>
                                ) : (
                                    <div className="mt-6 px-4 py-2 rounded-full bg-green-100 text-green-700 font-semibold shadow text-center w-64">
                                        Ya declaraste el trabajo como finalizado
                                    </div>
                                )}

                                <button
                                    className="mt-4 bg-red-500 hover:bg-red-600 text-white rounded-full px-6 py-2 font-semibold shadow w-48"
                                    onClick={() => alert('Trabajo cancelado por el solicitante')}
                                >
                                    Cancelar servicio
                                </button>
                            </>
                        ) : servicio.workFinishedUser ? (
                            <div className="mt-6 px-4 py-2 rounded-full bg-green-100 text-green-700 font-semibold shadow text-center w-64">
                                El solicitante declaró el trabajo como finalizado
                            </div>
                        ) : (
                            <div className="mt-6 px-4 py-2 rounded-full bg-yellow-100 text-yellow-700 font-semibold shadow text-center w-64">
                                El solicitante aún no ha declarado el trabajo como finalizado
                            </div>
                        )}
                    </div>

                </div>

                {/* Columna derecha: Worker */}
                <div className="flex-1 p-8 flex flex-col items-center border-l">
                    <img
                        src={`http://localhost:3000/${worker.profilePicture}`}
                        alt="Foto de perfil"
                        className="w-40 h-40 rounded-full object-cover border-2 border-[#00b4d8] mb-3 shadow-2xl"
                    />
                    <h2 className="text-xl font-bold mb-1">{application.worker.user.firstName} {application.worker.user.lastName}</h2>
                    <p className="text-yellow-500 mb-1 flex items-center gap-1">
                        <span>⭐</span> {worker.rating}
                    </p>
                    <p className="text-gray-700 text-center mb-2">{worker.description}</p>
                    <p className="text-indigo-700 font-semibold mb-1">{worker.subtitle}</p>
                    <div className="mb-1">
                        <span className="font-semibold">Locaciones:</span>
                        <span className="ml-1">{worker.workLocation.join(", ")}</span>
                    </div>
                    <div className="mb-1">
                        <span className="font-semibold">Días:</span>
                        <span className="ml-1">{worker.workingDays.join(", ")}</span>
                    </div>
                    <div>
                        <span className="font-semibold">Horarios:</span>
                        <span className="ml-1">{worker.workingHours.join(", ")}</span>
                    </div>

                    {/* Acciones trabajador */}
                    <div className="flex flex-col gap-4 mt-8 w-full items-center">
                        {worker.userId === idLogeado ? (
                            <>
                                {!servicio.workFinishedWorker ? (
                                    <button
                                        className="bg-blue-500 hover:bg-blue-600 text-white rounded-full px-6 py-2 font-semibold shadow w-48"
                                        // onClick={() => setAgreementUserWorkerTrue(servicio.id, 'worker')}
                                    >
                                        Confirmar trabajo finalizado
                                    </button>
                                ) : (
                                    <div className="mt-6 px-4 py-2 rounded-full bg-green-100 text-green-700 font-semibold shadow text-center w-64">
                                        Ya declaraste el trabajo como finalizado
                                    </div>
                                )}

                                <button
                                    className="mt-4 bg-red-500 hover:bg-red-600 text-white rounded-full px-6 py-2 font-semibold shadow w-48"
                                    onClick={() => alert('Trabajo cancelado por el trabajador')}
                                >
                                    Cancelar servicio
                                </button>
                            </>
                        ) : servicio.workFinishedWorker ? (
                            <div className="mt-6 px-4 py-2 rounded-full bg-green-100 text-green-700 font-semibold shadow text-center w-64">
                                El trabajador declaró el trabajo como finalizado
                            </div>
                        ) : (
                            <div className="mt-6 px-4 py-2 rounded-full bg-yellow-100 text-yellow-700 font-semibold shadow text-center w-64">
                                El trabajador aún no ha declarado el trabajo como finalizado
                            </div>
                        )}
                    </div>

                </div>
            </div>

            {/* Modal para expandir foto */}
            {modalFoto && (
                <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded shadow-lg max-w-lg w-full flex flex-col items-center">
                        <img
                            src={`http://localhost:3000${modalFoto.url}`}
                            alt={modalFoto.name}
                            className="max-w-full max-h-[70vh] rounded mb-4"
                        />
                        <div className="mb-2 text-gray-800 text-center">{modalFoto.note}</div>
                        <button
                            className="bg-[#02283A] text-white px-6 py-2 rounded-full font-semibold"
                            onClick={handleCerrarModal}
                        >
                            Cerrar
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default WorkerJobRequestContact;