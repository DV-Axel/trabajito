import React from 'react';
import { useParams } from 'react-router-dom';
import useGetJobRequest from '../../data/hooks/useGetJobRequest';
import useGetApplicationById from '../../data/hooks/useGetApplicationById';
import useSetAgreementUserWorkerTrue from "../../data/hooks/useSetAgreementUserWorkerTrue.js";
import useGetWorkerById from '../../data/hooks/useGetWorkerById';
import { formatDate, formatearLocacion } from '../../data/helpers';

// TODO: revisar que el diseño y los datos queden bien.
/*TODO: implementar funcionalidad de cancelar acuerdo*/

const WorkerRequesterContact = () => {
    const { id } = useParams();

    const { setAgreementUserWorkerTrue } = useSetAgreementUserWorkerTrue();
    // TODO: esta hardcodeado el workerId, hay que traerlo de la application seleccionada en el servicio
    const { worker, loadingWorker, errorWorker } = useGetWorkerById(1)
    const { servicio, loadingServicio, errorServicio } = useGetJobRequest(id);
    const applicationSelectedId = servicio?.applicationSelectedId ?? null;
    const { application, loadingApplication, errorApplication } = useGetApplicationById(applicationSelectedId);


    if (loadingServicio) return <div>Cargando solicitud...</div>;
    if (errorServicio) return <div>Error al obtener la solicitud</div>;
    if (!servicio) return null;

    if(loadingApplication) return <div>Cargando postulacion</div>
    if(errorApplication) return <div>Error al obtener la postulacion</div>
    if(!application) return null;

    if(loadingWorker) return <div>Cargando worker...</div>
    if(errorWorker) return <div>Error al obtener la worker...</div>
    if(!worker) return null;

    console.log('servicio',servicio)
    console.log('worker',   worker)

    return (
        <div className="flex flex-row gap-8 bg-white p-8 rounded shadow items-stretch">

            {/* Columna izquierda: Requester */}
            <div className="flex-1 p-8 flex flex-col items-center border-r">
                <img
                    src={`http://localhost:3000${servicio.user.profilePicture}`}
                    alt="Foto de perfil"
                    className="w-40 h-40 rounded-full object-cover border-2 border-[#00b4d8] mb-3 shadow-2xl"
                />
                <h2 className="text-xl font-bold mb-1">{servicio.user.firstName} {servicio.user.lastName}</h2>
                {/*TODO: ver de adaptar esto*/}
                {/*TODO: hacer andar las fotos*/}
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
                {
                    !servicio.agreementUser
                        ? (
                            <button
                                className="mt-6 bg-[#00b4d8] hover:bg-[#0096c7] text-white rounded-full px-6 py-2 font-semibold shadow"
                                onClick={() => setAgreementUserWorkerTrue(servicio.id, 'user')}
                            >
                                Confirmar acuerdo
                            </button>
                        )
                        : (
                            <button
                                className="mt-6 bg-red-500 hover:bg-red-700 text-white rounded-full px-6 py-2 font-semibold shadow"
                                onClick={() => setAgreementUserWorkerTrue(servicio.id, 'user')}
                            >
                                Cancelar acuerdo

                            </button>
                        )
                }
            </div>
            {/* Columna central: Servicio */}
            <div className="flex flex-col justify-center items-center px-10 min-w-[260px]">
                <h2 className="text-2xl font-bold mb-4">{servicio.title}</h2>
                <div className="mb-2">
                    <span className="font-semibold">Fecha:</span>
                    <span className="ml-2">{formatDate(servicio.date)}</span>
                </div>
                <div className="mb-2">
                    {/*TODO: Tengo que traer el presupuesto de la aplication*/}
                    <span className="font-semibold">Presupuesto:</span>
                    <span className="ml-2">${application.budget}</span>
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
            <div className="flex-1 p-8 flex flex-col items-center border-l">
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
                    !servicio.agreementWorker
                        ? (
                            <button
                                className="mt-6 bg-[#00b4d8] hover:bg-[#0096c7] text-white rounded-full px-6 py-2 font-semibold shadow"
                                onClick={() => setAgreementUserWorkerTrue(servicio.id, 'worker')}
                            >
                                Confirmar acuerdo
                            </button>
                        )
                        : (
                            <button
                                className="mt-6 bg-red-500 hover:bg-red-700 text-white rounded-full px-6 py-2 font-semibold shadow"
                                onClick={() => setAgreementUserWorkerTrue(servicio.id, 'worker')}
                            >
                                Cancelar acuerdo
                            </button>
                        )
                }
            </div>
        </div>
    );
};

export default WorkerRequesterContact;