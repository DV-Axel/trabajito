import React, { useMemo, useState } from 'react';
import {useParams} from "react-router-dom";

const WorkerJobRequestContact = () => {
    // Datos hardcodeados
    const jobRequest = {
        title: 'Limpieza de Departamento en Recoleta',
        description: 'Solicito limpieza profunda para un departamento de 2 ambientes.',
        date: '2024-07-15',
        budget: '$10.000',
        location: 'Recoleta, CABA',
        requester: {
            firstName: 'Lucía',
            lastName: 'Martínez',
            email: 'lucia.martinez@email.com',
            phone: '+54 9 11 9876-5432'
        },
        photos: [
            { url: '/uploads/limpieza1.jpg', name: 'Cocina', note: 'Cocina antes de la limpieza' },
            { url: '/uploads/limpieza2.jpg', name: 'Baño', note: 'Baño a limpiar' }
        ]
    };

    const worker = {
        profilePicture: 'uploads/worker2.jpg',
        user: {
            firstName: 'Marcos',
            lastName: 'Fernández'
        },
        rating: 4.9,
        description: 'Experto en limpieza y mantenimiento de hogares.',
        subtitle: 'Limpieza profesional',
        workLocation: ['Recoleta', 'Belgrano'],
        workingDays: ['Martes', 'Jueves', 'Sábado'],
        workingHours: ['09:00-13:00', '15:00-19:00']
    };




    const [modalFoto, setModalFoto] = useState(null);
    const handleExpandirFoto = (foto) => setModalFoto(foto);
    const handleCerrarModal = () => setModalFoto(null);

    // Calcula los días restantes
    const daysLeft = useMemo(() => {
        const today = new Date();
        const serviceDate = new Date(jobRequest.date);
        const diff = Math.ceil((serviceDate - today) / (1000 * 60 * 60 * 24));
        return diff > 0 ? diff : 0;
    }, [jobRequest.date]);

    return (
        <div>
            <h1 className="text-3xl font-bold text-center mb-8">{jobRequest.title}</h1>
            <div className="flex flex-row gap-8 bg-white p-8 rounded shadow items-stretch">
                {/* Columna izquierda: JobRequest */}
                <div className="flex-1 p-8 flex flex-col items-center border-r">
                    <h2 className="text-xl font-bold mb-2">Solicitud</h2>
                    <p className="text-gray-700 text-center mb-2">{jobRequest.description}</p>
                    <div className="mb-1">
                        <span className="font-semibold">Fecha:</span>
                        <span className="ml-1">{jobRequest.date}</span>
                    </div>
                    <div className="mb-1">
                        <span className="font-semibold">Presupuesto:</span>
                        <span className="ml-1">{jobRequest.budget}</span>
                    </div>
                    <div className="mb-1">
                        <span className="font-semibold">Ubicación:</span>
                        <span className="ml-1">{jobRequest.location}</span>
                    </div>
                    <div className="mb-1">
                        <span className="font-semibold">Solicitante:</span>
                        <span className="ml-1">{jobRequest.requester.firstName} {jobRequest.requester.lastName}</span>
                    </div>
                    <div className="mb-1">
                        <span className="font-semibold">Email:</span>
                        <span className="ml-1">{jobRequest.requester.email}</span>
                    </div>
                    <div>
                        <span className="font-semibold">Teléfono:</span>
                        <span className="ml-1">{jobRequest.requester.phone}</span>
                    </div>
                    <div className="mt-6 mb-4 text-center">
                        <span className="font-semibold text-indigo-700">Faltan {daysLeft} días para el servicio</span>
                    </div>
                    {/* Fotos */}
                    <div className="w-full mt-4">
                        <span className="font-semibold">Fotos:</span>
                        <div className="flex gap-4 mt-2 flex-wrap">
                            {jobRequest.photos && jobRequest.photos.length > 0 ? (
                                jobRequest.photos.map((foto, idx) => (
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
                    <div className="flex flex-col gap-4 mt-6 w-full items-center">
                        <button
                            className="bg-blue-500 hover:bg-blue-600 text-white rounded-full px-6 py-2 font-semibold shadow w-48"
                            onClick={() => alert('Servicio confirmado')}
                        >
                            Confirmar
                        </button>
                        <button
                            className="bg-red-500 hover:bg-red-600 text-white rounded-full px-6 py-2 font-semibold shadow w-48"
                            onClick={() => alert('Servicio cancelado')}
                        >
                            Cancelar servicio
                        </button>
                    </div>
                </div>
                {/* Columna derecha: Worker */}
                <div className="flex-1 p-8 flex flex-col items-center border-l">
                    <img
                        src={`http://localhost:3000/${worker.profilePicture}`}
                        alt="Foto de perfil"
                        className="w-40 h-40 rounded-full object-cover border-2 border-[#00b4d8] mb-3 shadow-2xl"
                    />
                    <h2 className="text-xl font-bold mb-1">{worker.user.firstName} {worker.user.lastName}</h2>
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
                    <div className="flex flex-col gap-4 mt-8 w-full items-center">
                        <button
                            className="bg-blue-500 hover:bg-blue-600 text-white rounded-full px-6 py-2 font-semibold shadow w-48"
                            onClick={() => alert('Trabajo confirmado por el trabajador')}
                        >
                            Confirmar
                        </button>
                        <button
                            className="bg-red-500 hover:bg-red-600 text-white rounded-full px-6 py-2 font-semibold shadow w-48"
                            onClick={() => alert('Trabajo cancelado por el trabajador')}
                        >
                            Cancelar servicio
                        </button>
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