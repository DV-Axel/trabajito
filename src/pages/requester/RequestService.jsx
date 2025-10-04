import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { formatDate, formatearLocacion } from '../../data/helpers';

const RequestService = () => {
    const { id } = useParams();
    const [servicio, setServicio] = useState(null);
    const [modalFoto, setModalFoto] = useState(null);

    useEffect(() => {
        const fetchServicio = async () => {
            try {
                const response = await fetch(`http://localhost:3000/job-requests/detalle/${id}`);
                const data = await response.json();
                setServicio(data);
            } catch (error) {
                console.error('Error al obtener la solicitud:', error);
            }
        };
        fetchServicio();
    }, [id]);

    const handleExpandirFoto = (foto) => setModalFoto(foto);
    const handleCerrarModal = () => setModalFoto(null);

    if (!servicio) return <div>Cargando...</div>;

    const postulaciones = servicio.postulaciones || [];

    console.log(servicio)

    return (
        <div className="py-10">
            <div className="text-black px-12 text-center">
                <h1 className="m-0 text-3xl font-bold tracking-tight">Detalle de Solicitud de Servicio</h1>
            </div>
            <div className="flex flex-col md:flex-row gap-0 px-12 py-10">
                {/* Izquierda: Datos del servicio */}
                <div className="flex-1 pr-8">
                    <h2 className="mb-5 font-bold text-2xl">Datos del Servicio</h2>
                    <div className="mb-4 w-full space-y-2 text-base text-left">
                        <p><span className="font-bold ">Nombre del servicio:</span> {servicio.title}</p>
                        <p><span className="font-bold ">Fecha de creación:</span> {formatDate(servicio.jobCreationDate)}</p>
                        <p><span className="font-bold ">Tipo de servicio:</span> {servicio.service.name}</p>
                        <p><span className="font-bold ">Urgencia:</span> {servicio.urgency ? 'Si' : 'No'}</p>
                        <p><span className="font-bold ">Fecha solicitada:</span> {formatDate(servicio.date)}</p>
                        <p><span className="font-bold ">Ubicación:</span> {formatearLocacion(servicio.address)}</p>
                        <div>
                            <span className="font-bold">Descripción:</span>
                            <p className="whitespace-pre-line">{servicio.description}</p>
                        </div>
                        <div>
                            <span className="font-bold">Fotos:</span>
                            <div className="flex gap-4 mt-2 flex-wrap">
                                {servicio.photos && servicio.photos.length > 0 ? (
                                    servicio.photos.map((foto, idx) => (
                                        <div key={idx} className="flex flex-col items-center mb-2">
                                            <img
                                                src={`http://localhost:3000${foto.url}`}
                                                alt={foto.name || `Foto ${idx + 1}`}
                                                className="w-52 h-36 object-cover rounded shadow mb-1 cursor-pointer"
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
                    </div>
                    <button className="mt-6 bg-[#02283A] hover:bg-[#03506f] text-white  rounded-full px-8 py-3 font-semibold text-base">
                        Editar Servicio
                    </button>
                </div>
                {/* Derecha: Lista de postulaciones */}
                <div className="flex-1 pl-8 overflow-y-auto max-h-[70vh]">
                    <h2 className="mb-5 font-bold text-lg">Postulaciones</h2>
                    <ul className="space-y-6">
                        {postulaciones.map(s => (
                            <li key={s.id} className="border-b border-gray-200 pb-4">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="font-bold">{s.nombre}</span>
                                </div>
                                <div className="mb-1">
                                    <span className="font-bold">Presupuesto:</span> <span className="text-gray-800">{s.presupuesto}</span>
                                </div>
                                <div>
                                    <span className="font-bold">Comentarios:</span>
                                    <p className="whitespace-pre-line">{s.comentarios}</p>
                                </div>
                                <div className="text-right md:mx-10 mdplus:mx-20">
                                    <button className="mt-6 bg-[#02283A] hover:bg-[#03506f] text-white rounded-full px-8 py-3 font-semibold text-base shadow transition-colors">
                                        Ver Mas
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
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

export default RequestService;