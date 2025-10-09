import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {formatearLocacion, getUserIdFromToken} from "../../data/helpers";
import Swal from 'sweetalert2';

function formatearNombre(nombre) {
    if (!nombre) return "";
    return nombre.charAt(0).toUpperCase() + nombre.slice(1).toLowerCase();
}

const ViewJobRequest = () => {
    const { id } = useParams();
    const [jobRequest, setJobRequest] = useState(null);
    const [modalFoto, setModalFoto] = useState(null);
    const [modalPostular, setModalPostular] = useState(false);
    const [presupuesto, setPresupuesto] = useState("");
    const [presentacion, setPresentacion] = useState("");
    const [requiereVisita, setRequiereVisita] = useState(false);
    const [isWorkerRegistered, setIsWorkerRegistered] = useState(null);

    useEffect(() => {
        const fetchJobRequest = async () => {
            if (!id) return;
            try {
                const response = await fetch(`http://localhost:3000/job-requests/detalle/${id}`);
                if (!response.ok) throw new Error("Error al obtener la solicitud");
                const data = await response.json();
                setJobRequest(data);
            } catch (error) {
                setJobRequest(null);
            }
        };
        fetchJobRequest();
    }, [id]);

    useEffect(() => {
        const checkWorker = async () => {
            const idUser = getUserIdFromToken();
            if (!idUser) {
                setIsWorkerRegistered(false);
                return;
            }
            try {
                const response = await fetch(`http://localhost:3000/workers/check-postulacion?idUser=${idUser}&idJobRequest=${id}`);
                const data = await response.json(); // data = { yaPostulado: true/false }
                setIsWorkerRegistered(!data.yaPostulado); // true si puede postularse, false si ya está postulado
            } catch (error) {
                setIsWorkerRegistered(false);
            }
        };
        checkWorker();
    }, [id]);


    if (!jobRequest) {
        return (
            <div className="flex justify-center items-center h-64">
                <span className="text-gray-500">Cargando solicitud...</span>
            </div>
        );
    }

    const handleExpandirFoto = (foto) => setModalFoto(foto);
    const handleCerrarModal = () => setModalFoto(null);

    const handleEnviarPostulacion = async () => {
        // mando el id del usuario, para en el controlador buscar el worker asociado
        const idUser = getUserIdFromToken();

        const postulacion = {
            idJobRequest: jobRequest.id,
            presupuesto,
            presentacion,
            requiereVisita,
            idUser
        };

        const confirm = await Swal.fire({
            title: '¿Confirmar postulación?',
            html: `
            <div>
                <b>Trabajo:</b> ${jobRequest.title}<br/>
                <b>Presupuesto:</b> $${postulacion.presupuesto}<br/>
                <b>¿Requiere visita previa?</b> ${postulacion.requiereVisita ? 'Sí' : 'No'}
            </div>
        `,
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Sí, postularme',
            cancelButtonText: 'Cancelar',
            confirmButtonColor: '#02283A',
            cancelButtonColor: '#aaa'
        });

        if (confirm.isConfirmed) {

            try {
                const response = await fetch('http://localhost:3000/job-requests/postularse', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(postulacion)
                });
                if (!response.ok) throw new Error('Error al enviar la postulación');
                Swal.fire('¡Postulación enviada!', '', 'success');
            } catch (error) {
                Swal.fire('Error', 'No se pudo enviar la postulación', 'error');
            }
        }
    };


    /*TODO: ver que en el panel de worker no se vean los mismo servicios que uno carga*/

    return (
        <div className="flex max-w-5xl mx-auto mt-8 bg-white rounded-lg shadow-lg p-0 overflow-hidden min-h-[600px]">
            {/* Izquierda: Detalle de la solicitud */}
            <div className="w-1/2 p-6 border-r border-gray-200">
                <div className="flex items-center justify-between mb-2">
                    <h2 className="text-2xl font-bold text-gray-800">{jobRequest.title}</h2>
                    {jobRequest.urgency && (
                        <span className="bg-red-600 text-white text-xs px-3 py-1 rounded-full font-bold animate-pulse">
                            URGENTE
                        </span>
                    )}
                </div>
                <div className="mb-2 text-sm text-gray-600">
                    <span className="font-semibold">Tipo de servicio:</span> {jobRequest.service.name}
                </div>
                <div className="mb-2 text-sm text-gray-600">
                    <span className="font-semibold">Tipo de propiedad:</span> {jobRequest.propertyType || "No especificado"}
                </div>
                <div className="mb-2 text-sm text-gray-600">
                    <span className="font-semibold">Dirección:</span> {formatearLocacion(jobRequest.address)}
                </div>
                <div className="mb-2 text-sm text-gray-600">
                    <span className="font-semibold">Fecha de solicitud:</span>{" "}
                    {jobRequest.date ? new Date(jobRequest.date).toLocaleDateString() : "No especificada"}
                </div>
                <div className="mb-4 text-gray-800">
                    <span className="font-semibold block mb-1">Descripción:</span>
                    {jobRequest.description}
                </div>
                {jobRequest.photos && jobRequest.photos.length > 0 && (
                    <div className="mb-4">
                        <span className="font-semibold text-gray-700">Fotos:</span>
                        <div className="flex gap-4 mt-2 flex-wrap">
                            {jobRequest.photos.map((foto, idx) => (
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
                            ))}
                        </div>
                    </div>
                )}
                <div className="mt-6 text-xs text-gray-400 text-right">
                    Solicitado por: {formatearNombre(jobRequest.user.firstName)} {formatearNombre(jobRequest.user.lastName)}
                </div>
            </div>
            {/* Derecha: Box de presentación */}
            <div className="w-1/2 p-8 flex flex-col justify-between">
                <div>
                    <h3 className="text-xl font-bold mb-4 text-gray-800 text-center">
                        Presentación para el trabajo
                    </h3>
                    {isWorkerRegistered ? (
                        <>
                <textarea
                    className="border rounded px-3 py-2 mb-4 w-full min-h-[150px] resize-none"
                    placeholder="Escribe una breve presentación o descripción para el cliente..."
                    value={presentacion}
                    onChange={e => setPresentacion(e.target.value)}
                />
                            <input
                                type="number"
                                min="0"
                                className="border rounded px-3 py-2 mb-4 w-full text-center"
                                placeholder="Ingrese un monto en $"
                                value={presupuesto}
                                onChange={e => setPresupuesto(e.target.value)}
                            />
                            <div className="flex items-center mb-4">
                                <input
                                    type="checkbox"
                                    id="requiereVisita"
                                    checked={requiereVisita}
                                    onChange={e => setRequiereVisita(e.target.checked)}
                                    className="mr-2"
                                />
                                <label htmlFor="requiereVisita" className="text-gray-700">
                                    ¿Requiere visita previa para el trabajo?
                                </label>
                            </div>
                        </>
                    ) : (
                        <div className="text-center text-green-700 font-semibold text-lg mb-6">
                            Ya estás registrado en esta solicitud.
                        </div>
                    )}
                </div>
                <div className="flex gap-4 w-full">
                    {isWorkerRegistered ? (
                        <button
                            className={`px-4 py-2 rounded-full font-semibold flex-1 transition-colors
                    ${presupuesto
                                ? 'bg-[#02283A] text-white hover:bg-[#03506b] cursor-pointer'
                                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            }`
                            }
                            onClick={handleEnviarPostulacion}
                            disabled={!presupuesto}
                        >
                            Enviar postulación
                        </button>
                    ) : null}
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

export default ViewJobRequest;