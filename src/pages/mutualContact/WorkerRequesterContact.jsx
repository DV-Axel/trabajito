import React from 'react';
import {useParams} from 'react-router-dom'

const WorkerRequesterContact = () => {
    // Datos hardcodeados
    const requester = {
        profilePicture: 'uploads/requester1.jpg',
        firstName: 'Ana',
        lastName: 'García',
        description: 'Solicitante frecuente de servicios de jardinería y limpieza.',
        subtitle: 'Cliente Premium',
        email: 'ana.garcia@email.com',
        phone: '+54 9 11 1234-5678'
    };

    const worker = {
        profilePicture: 'uploads/worker1.jpg',
        user: {
            firstName: 'Carlos',
            lastName: 'Pérez'
        },
        rating: 4.8,
        description: 'Especialista en mantenimiento de jardines y espacios verdes.',
        subtitle: 'Jardinero certificado',
        workLocation: ['Palermo', 'Recoleta'],
        workingDays: ['Lunes', 'Miércoles', 'Viernes'],
        workingHours: ['08:00-12:00', '14:00-18:00']
    };

    const service = {
        date: '2024-07-10',
        budget: '$15.000',
        type: 'Jardinería',
        location: 'Palermo, CABA'
    };

    const {id}= useParams()
    console.log('id', id)

    return (
        <div className="flex flex-row gap-8 bg-white p-8 rounded shadow items-stretch">
            {/* Columna izquierda: Requester */}
            <div className="flex-1 p-8 flex flex-col items-center border-r">
                <img
                    src={`http://localhost:3000/${requester.profilePicture}`}
                    alt="Foto de perfil"
                    className="w-40 h-40 rounded-full object-cover border-2 border-[#00b4d8] mb-3 shadow-2xl"
                />
                <h2 className="text-xl font-bold mb-1">{requester.firstName} {requester.lastName}</h2>
                <p className="text-gray-700 text-center mb-2">{requester.description}</p>
                <p className="text-indigo-700 font-semibold mb-1">{requester.subtitle}</p>
                <div className="mb-1">
                    <span className="font-semibold">Email:</span>
                    <span className="ml-1">{requester.email}</span>
                </div>
                <div>
                    <span className="font-semibold">Teléfono:</span>
                    <span className="ml-1">{requester.phone}</span>
                </div>
                <button
                    className="mt-6 bg-[#00b4d8] hover:bg-[#0096c7] text-white rounded-full px-6 py-2 font-semibold shadow"
                    onClick={() => alert('Acuerdo confirmado por el solicitante')}
                >
                    Confirmar acuerdo
                </button>
            </div>
            {/* Columna central: Servicio */}
            <div className="flex flex-col justify-center items-center px-10 min-w-[260px]">
                <h2 className="text-2xl font-bold mb-4">Servicio</h2>
                <div className="mb-2">
                    <span className="font-semibold">Fecha:</span>
                    <span className="ml-2">{service.date}</span>
                </div>
                <div className="mb-2">
                    <span className="font-semibold">Presupuesto:</span>
                    <span className="ml-2">{service.budget}</span>
                </div>
                <div className="mb-2">
                    <span className="font-semibold">Tipo:</span>
                    <span className="ml-2">{service.type}</span>
                </div>
                <div>
                    <span className="font-semibold">Ubicación:</span>
                    <span className="ml-2">{service.location}</span>
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
                <button
                    className="mt-6 bg-[#00b4d8] hover:bg-[#0096c7] text-white rounded-full px-6 py-2 font-semibold shadow"
                    onClick={() => alert('Acuerdo confirmado por el trabajador')}
                >
                    Confirmar acuerdo
                </button>
            </div>
        </div>
    );
};

export default WorkerRequesterContact;