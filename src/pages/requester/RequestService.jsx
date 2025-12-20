// javascript
// File: `src/pages/requester/RequestService.jsx`
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { formatDate, formatearLocacion, getUserIdFromToken } from '../../data/helpers';
import useGetJobRequest from '../../data/hooks/useGetJobRequest';
import useGetApplicationsById from '../../data/hooks/useGetApplicationsById.js';
import useSubmitRating from '../../data/hooks/useSubmitRating';
import { FaRegCalendarAlt, FaRegClock, FaRegUser as User, FaPhoneAlt, FaCompass, FaCommentDots } from 'react-icons/fa';
import { AiFillStar } from 'react-icons/ai';
import SelectWorkerNotice from '../../components/SelectWorkerNotice';
import ServiceInProgressNotice from '../../components/ServiceInProgressNotice';
import RatingModal from '../../components/RatingModel';
import PostulacionesAside from '../../components/PostulacionesAside';


//TODO: hay validacion de las paginas mutuales que no me dejan ir para atras.
//TODO: Las las vaalidaciones de los botones pasarlos a componentes

const RequestService = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [modalFoto, setModalFoto] = useState(null);

    // datos (custom hooks)
    const { servicio, loadingServicio, errorServicio } = useGetJobRequest(id);
    const { applications, loadingApplications, errorApplications } = useGetApplicationsById(id);

    // calcular postulationSelected
    const postulationSelected = servicio?.applicationSelectedId ?? servicio?.postulationSelected;

    // Estado local para la postulación seleccionada
    const [application, setApplication] = useState(null);
    const [loadingApplication, setLoadingApplication] = useState(true);
    const [errorApplication, setErrorApplication] = useState(null);

    // rating hook (modal + submit)
    const {
        open: ratingOpen,
        openRating,
        closeRating,
        loading: ratingLoading,
        submitRating
    } = useSubmitRating();

    // handler: navegar a seguimiento de servicio (status 4)
    const handleServiceTracking = () => {
        navigate(`/seguimiento-servicio/${id}`);
    };

    // hook: obtiene la postulación seleccionada (si existe)
    useEffect(() => {
        let mounted = true;
        const fetchApplication = async () => {
            if (!postulationSelected) {
                if (mounted) {
                    setApplication(null);
                    setLoadingApplication(false);
                    setErrorApplication(null);
                }
                return;
            }

            setLoadingApplication(true);
            setErrorApplication(null);

            try {
                const res = await fetch(`http://localhost:3000/job-requests/postulacion-worker/${postulationSelected}`);
                if (!res.ok) {
                    const text = await res.text();
                    throw new Error(text || `Error al obtener postulación ${postulationSelected}`);
                }
                const json = await res.json();
                if (mounted) setApplication(json);
            } catch (err) {
                if (mounted) setErrorApplication(err);
            } finally {
                if (mounted) setLoadingApplication(false);
            }
        };

        fetchApplication();

        return () => {
            mounted = false;
        };
    }, [postulationSelected]);

    // normalizar aplicaciones (acepta array directo o wrappers)
    const apps = Array.isArray(applications)
        ? applications
        : (applications?.data ?? applications?.applications ?? []);

    // handlers
    const handleExpandirFoto = (foto) => setModalFoto(foto);
    const handleCerrarModal = () => setModalFoto(null);

    // identificación / roles (no son hooks)
    const idUserLogeado = getUserIdFromToken(localStorage.getItem('token'));

    // intentar obtener idWorker desde la application (si existe) y como fallback desde servicio
    const idWorker = application?.worker?.user?.id
        ?? application?.workerId
        ?? application?.worker?.id
        ?? servicio?.applicationSelected?.worker?.user?.id
        ?? servicio?.applicationSelected?.workerId
        ?? servicio?.worker?.user?.id
        ?? servicio?.workerId;

    const requesterId = servicio?.user?.id;

    const isRequester = !!idUserLogeado && !!requesterId && idUserLogeado === requesterId;
    const isWorker = !!idUserLogeado && !!idWorker && idUserLogeado === idWorker;

    // Nota: se removieron las validaciones de redirección por rol según petición.

    // estados de carga / errores (después de declarar todos los hooks)
    if (loadingServicio) return <div>Cargando...</div>;
    if (errorServicio) return <div>Error al obtener la solicitud</div>;

    if (loadingApplications) return <div>Cargando Postulaciones</div>;
    if (errorApplications) return <div>Error al obtener las postulaciones</div>;

    if (loadingApplication) return <div>Cargando Postulación seleccionada...</div>;
    if (errorApplication) return <div>Error al obtener la postulación</div>;

    // handler: contacto laboral (status 2)
    const handleTracking = () => {
        navigate(`/contacto-laboral/${id}`);
    };

    // submit del rating (envía rating + comentario junto al serviceId)
    const handleSubmitRating = async ({ rating, comment }) => {
        try {
            await submitRating({ serviceId: servicio?.id, rating, comment });
            // submitRating ya cierra modal y recarga en caso de éxito
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="min-h-[120px] bg-background">
            <div className="border-b border-border bg-card">
                <div className="container mx-auto px-4 py-8 md:px-6 lg:px-8">
                    <div className="flex items-start justify-between">
                        <div className="space-y-2">
                            <h1 className="text-3xl font-bold tracking-tight text-balance lg:text-4xl">
                                {servicio?.title || 'Título no disponible'}
                            </h1>

                            <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                                <div className="flex items-center gap-1.5">
                                    <FaRegCalendarAlt className="h-4 w-4" />
                                    <span>Creado {formatDate(servicio?.jobCreationDate)}</span>
                                </div>

                                <div className="flex items-center gap-1.5">
                                    <FaRegClock className="h-4 w-4" />
                                    <span>Fecha solicitada: {formatDate(servicio?.date)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8 md:px-6 lg:px-8">
                <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
                    <div className="space-y-6">
                        <div className="rounded-lg bg-white border border-gray-300 shadow-lg p-6 dark:bg-card">
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex-1 min-w-0">
                                    <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
                                        Detalle del Servicio
                                    </h1>
                                </div>
                            </div>

                            <div className="mt-6 grid gap-4 sm:grid-cols-2">
                                <div className="space-y-1">
                                    <p className="text-lg font-bold text-[#0c7fcf] text-muted-foreground">Tipo de servicio</p>
                                    <p className="text-base font-sm">{servicio?.service?.name || '—'}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-lg font-bold text-muted-foreground text-[#0c7fcf]">Ubicación:</p>
                                    <div className="flex items-start gap-2">
                                        <span className="text-muted-foreground text-medium font-sm">{formatearLocacion(servicio?.address)}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 space-y-2">
                                <p className="text-lg font-bold text-[#0c7fcf] text-muted-foreground">Descripción:</p>
                                <p className="text-medium font-sm leading-relaxed whitespace-pre-line text-foreground">
                                    {servicio?.description || 'Sin descripción'}
                                </p>
                            </div>

                            <div className="mt-6 space-y-2">
                                <p className="text-lg font-bold text-[#0c7fcf] text-muted-foreground">Urgencia:</p>
                                <p className="text-medium font-sm leading-relaxed whitespace-pre-line text-foreground">
                                    {typeof servicio?.urgency === 'boolean' ? (servicio.urgency ? 'Sí' : 'No') : 'Sin descripción'}
                                </p>
                            </div>

                            <div className="mt-6">
                                <div className="flex items-center gap-2">
                                    <p className="text-lg font-bold text-[#0c7fcf] text-muted-foreground">
                                        Fotos ({servicio?.photos?.length || 0})
                                    </p>
                                </div>

                                <div className="mt-3 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                                    {Array.isArray(servicio?.photos) && servicio.photos.length > 0 ? (
                                        servicio.photos.map((foto, idx) => (
                                            <button
                                                key={idx}
                                                type="button"
                                                onClick={() => handleExpandirFoto(foto)}
                                                className="group relative overflow-hidden rounded-lg border border-border bg-muted transition-shadow hover:shadow-lg focus:outline-none"
                                                aria-label={`Abrir foto ${idx + 1}`}
                                            >
                                                <img
                                                    src={foto.url ? `http://localhost:3000${foto.url}` : '/placeholder.svg'}
                                                    alt={foto.name || `Foto ${idx + 1}`}
                                                    loading="lazy"
                                                    className="aspect-[16/9] w-full object-cover transition-transform group-hover:scale-105"
                                                />
                                            </button>
                                        ))
                                    ) : (
                                        <div className="text-sm text-muted-foreground">No hay fotos</div>
                                    )}
                                </div>
                            </div>

                            <div className="flex mt-10 w-full flex-col md:flex-row items-center md:items-center justify-between gap-3">
                                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                                    {servicio?.statusId === 1 && isRequester && <SelectWorkerNotice />}

                                    {servicio?.statusId === 2 && (isRequester || isWorker) && (
                                        <ServiceInProgressNotice showIcon />
                                    )}

                                    {/* Mostrar calificación y comentario cuando statusId === 5 */}
                                    {servicio?.statusId === 5 && (
                                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 bg-white border border-border rounded p-3">
                                            <div className="flex items-center gap-2">
                                                <AiFillStar className="text-yellow-400 w-5 h-5" />
                                                <span className="font-semibold text-sm">
                                                    {servicio?.userRatingForWorker ?? '-'} / 5
                                                </span>
                                            </div>

                                            <div className="flex items-start gap-2 max-w-xl">
                                                <FaCommentDots className="w-4 h-4 text-muted-foreground mt-1" />
                                                <p className="text-sm text-muted-foreground break-words">
                                                    {servicio?.userCommentForWorker || 'Sin comentario'}
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="flex-shrink-0 flex items-center gap-2">
                                    {servicio?.statusId === 2 && (isRequester || isWorker) && (
                                        <button
                                            onClick={handleTracking}
                                            className="inline-flex items-center gap-2 bg-[#00b4d8] hover:bg-[#0096c7] text-white font-semibold py-2 px-4 rounded transition-colors"
                                            aria-label="Establecer contacto"
                                        >
                                            <FaPhoneAlt className="w-4 h-4" />
                                            <span>Establecer contacto</span>
                                        </button>
                                    )}

                                    {servicio?.statusId === 3 && (isRequester || isWorker) && (
                                        <button
                                            onClick={handleServiceTracking}
                                            className="inline-flex items-center gap-2 bg-[#00b4d8] hover:bg-[#0096c7] text-white font-semibold py-2 px-4 rounded transition-colors"
                                            aria-label="Tracking service"
                                        >
                                            <FaCompass className="w-4 h-4" />
                                            <span>Tracking service</span>
                                        </button>
                                    )}

                                    {/* Botón de calificar: visible cuando el servicio ya está finalizado (status 4) y es el requester */}
                                    {servicio?.statusId === 4 ? (
                                        isRequester ? (
                                            <button
                                                onClick={openRating}
                                                className="inline-flex items-center gap-2 bg-[#f6c21a] hover:bg-[#e6b10a] text-white font-semibold py-2 px-4 rounded transition-colors"
                                                aria-label="Calificar servicio"
                                            >
                                                <AiFillStar className="w-4 h-4" />
                                                <span>Calificar servicio</span>
                                            </button>
                                        ) : isWorker ? (
                                            <div className="inline-flex items-center gap-2 bg-gray-100 text-gray-600 font-medium py-2 px-4 rounded">
                                                <AiFillStar className="w-4 h-4 text-yellow-400" />
                                                <span>Esperando calificación</span>
                                            </div>
                                        ) : null
                                    ) : null}

                                </div>
                            </div>
                        </div>
                    </div>

                    <PostulacionesAside
                        applications={applications}
                        apps={apps}
                        isWorker={isWorker}
                        application={application}
                        postulationSelected={postulationSelected}
                    />

                </div>
            </div>

            {/* Modal de calificación */}
            <RatingModal
                open={ratingOpen}
                onClose={closeRating}
                onSubmit={handleSubmitRating}
                loading={ratingLoading}
            />

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
