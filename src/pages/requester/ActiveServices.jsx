import { useEffect, useState } from 'react';
import axios from 'axios';

const ActiveServices = () => {
    const [solicitudes, setSolicitudes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Datos de ejemplo
        const datosDemo = [
            {
                id: 1,
                titulo: 'Reparación de aire acondicionado',
                descripcion: 'El aire acondicionado no enfría correctamente.',
                fechaCreacion: '2024-06-01T10:00:00Z',
                tipoTrabajo: 'Reparación',
                urgente: true,
                ubicacion: 'Madrid',
                estado: 'Pendiente',
                presupuesto: 120
            },
            {
                id: 2,
                titulo: 'Instalación de lámpara',
                descripcion: 'Necesito instalar una lámpara en el salón.',
                fechaCreacion: '2024-06-03T15:30:00Z',
                tipoTrabajo: 'Instalación',
                urgente: false,
                ubicacion: 'Barcelona',
                estado: 'En proceso',
                presupuesto: 50
            },
            {
                id: 2,
                titulo: 'Instalación de lámpara',
                descripcion: 'Necesito instalar una lámpara en el salón.',
                fechaCreacion: '2024-06-03T15:30:00Z',
                tipoTrabajo: 'Instalación',
                urgente: false,
                ubicacion: 'Barcelona',
                estado: 'En proceso',
                presupuesto: 50
            },
            {
                id: 2,
                titulo: 'Instalación de lámpara',
                descripcion: 'Necesito instalar una lámpara en el salón.',
                fechaCreacion: '2024-06-03T15:30:00Z',
                tipoTrabajo: 'Instalación',
                urgente: false,
                ubicacion: 'Barcelona',
                estado: 'En proceso',
                presupuesto: 50
            },
            {
                id: 2,
                titulo: 'Instalación de lámpara',
                descripcion: 'Necesito instalar una lámpara en el salón.',
                fechaCreacion: '2024-06-03T15:30:00Z',
                tipoTrabajo: 'Instalación',
                urgente: false,
                ubicacion: 'Barcelona',
                estado: 'En proceso',
                presupuesto: 50
            }
        ];
        setSolicitudes(datosDemo);
        setLoading(false);
    }, []);

    // useEffect(() => {
    //     // Reemplaza la URL por la de tu API
    //     axios.get('http://localhost:3000/solicitudes/activas')
    //         .then(res => setSolicitudes(res.data))
    //         .catch(() => setSolicitudes([]))
    //         .finally(() => setLoading(false));
    // }, []);

    if (loading) {
        return <div className="text-center mt-10 text-lg text-gray-600">Cargando solicitudes...</div>;
    }

    if (solicitudes.length === 0) {
        return <div className="text-center mt-10 text-lg text-gray-600">No tienes solicitudes activas.</div>;
    }

    return (
        <div className="max-w-4xl mx-auto my-10 p-6 bg-white rounded-3xl shadow-2xl border-4 border-[#00b4d8]">
            <h2 className="text-2xl font-bold text-[#02283A] mb-6">Solicitudes activas</h2>
            <ul className="space-y-6">
                {solicitudes.map(solicitud => (
                    <li key={solicitud.id} className="p-6 rounded-xl bg-[#f4fbfd] shadow flex flex-col md:flex-row md:items-center md:justify-between border border-[#00b4d8]">
                        <div>
                            <h3 className="text-xl font-bold text-[#02283A] mb-2">{solicitud.titulo}</h3>
                            <p className="text-gray-700 mb-2">{solicitud.descripcion}</p>
                            <div className="flex flex-wrap gap-4 text-sm text-[#02283A] mb-2">
                                <span><strong>Fecha de creación:</strong> {new Date(solicitud.fechaCreacion).toLocaleDateString()}</span>
                                <span><strong>Tipo de trabajo:</strong> {solicitud.tipoTrabajo}</span>
                                <span><strong>Urgencia:</strong> {solicitud.urgente ? 'Sí' : 'No'}</span>
                                <span><strong>Ubicación:</strong> {solicitud.ubicacion}</span>
                                {solicitud.estado && <span><strong>Estado:</strong> {solicitud.estado}</span>}
                                {solicitud.presupuesto && <span><strong>Presupuesto:</strong> ${solicitud.presupuesto}</span>}
                            </div>
                        </div>
                        <div className="flex gap-3 mt-4 md:mt-0">
                            <button
                                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full font-semibold shadow transition"
                                onClick={() => alert(`Editar solicitud ${solicitud.id}`)}
                            >
                                Editar
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