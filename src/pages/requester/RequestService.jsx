import React from 'react';

const servicio = {
    tipo: 'Reparación',
    nombre: 'Reparación de aire acondicionado',
    urgente: true,
    fechaCreacion: '2024-06-01',
    solicitante: 'Juan Pérez',
    fechaSolicitud: '2024-06-10',
    descripcion: 'El aire acondicionado no enfría correctamente. Se requiere revisión completa y posible recarga de gas. El problema persiste desde hace una semana y es urgente por las altas temperaturas.',
    ubicacion: 'Madrid',
    fotos: [
        'https://via.placeholder.com/120x80?text=Foto+1',
        'https://via.placeholder.com/120x80?text=Foto+2'
    ]
};

const postulaciones = Array.from({ length: 8 }, (_, i) => ({
    id: i + 1,
    nombre: `Proveedor ${i + 1}`,
    presupuesto: `${150 + i * 10} €`,
    comentarios: `Comentario del proveedor ${i + 1}. Este es un comentario de ejemplo que puede ser extenso y detalla la propuesta del proveedor para el servicio solicitado.`,
    estado: i % 2 === 0 ? 'Pendiente' : 'Aceptada'
}));

const RequestService = () => (

    // TODO: mejorar estilo mobil

    <div className="py-10">
        <div className="text-black px-12 text-center">
            <h1 className="m-0 text-3xl font-bold tracking-tight">Detalle de Solicitud de Servicio</h1>
        </div>
        <div className="flex flex-col md:flex-row gap-0 px-12 py-10">
            {/* Izquierda: Datos del servicio */}
            <div className="flex-1 pr-8">
                <h2 className="mb-5 font-bold text-2xl">Datos del Servicio</h2>
                <div className="mb-4 w-full space-y-2 text-base text-left">
                    <p><span className="font-bold ">Tipo de servicio:</span> {servicio.tipo}</p>
                    <p><span className="font-bold ">Nombre del servicio:</span> {servicio.nombre}</p>
                    <p><span className="font-bold ">Urgencia:</span> {servicio.urgente ? 'Sí' : 'No'}</p>
                    <p><span className="font-bold ">Fecha de creación:</span> {servicio.fechaCreacion}</p>
                    <p><span className="font-bold ">Solicitante:</span> {servicio.solicitante}</p>
                    <p><span className="font-bold ">Fecha solicitada:</span> {servicio.fechaSolicitud}</p>
                    <p><span className="font-bold ">Ubicación:</span> {servicio.ubicacion}</p>
                    <div>
                        <span className="font-bold">Descripción:</span>
                        <p className="whitespace-pre-line">{servicio.descripcion}</p>
                    </div>
                    <div>
                        <span className="font-bold">Fotos:</span>
                        <div className="flex gap-3 mt-2">
                            {servicio.fotos.map((foto, idx) => (
                                <img key={idx} src={foto} alt={`Foto ${idx + 1}`} className="w-32 h-20 object-cover rounded shadow" />
                            ))}
                        </div>
                    </div>
                </div>
                <button className="mt-6 bg-gradient-to-r from-indigo-500 to-blue-400 text-white rounded-full px-8 py-3 font-semibold text-base shadow hover:from-indigo-600 hover:to-blue-500 transition-colors">
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
                                {/*TODO: terminar accion de contrar*/}
                                <button className="mt-3 bg-gradient-to-r from-indigo-500 to-blue-400 text-white rounded-full px-4 py-2 font-medium text-sm shadow hover:from-indigo-600 hover:to-blue-500 transition-colors">
                                    Contratar
                                </button>
                            </div>

                        </li>
                    ))}
                </ul>
            </div>
        </div>
    </div>
);

export default RequestService;