import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { formatDate, formatearLocacion } from '../../data/helpers';
import useGetJobRequest from '../../data/hooks/useGetJobRequest';
import useGetApplicationsById from '../../data/hooks/useGetApplicationsById.js';
import { FaRegCalendarAlt, FaRegClock } from 'react-icons/fa';
import { FiImage as ImageIcon } from 'react-icons/fi';
import { AiOutlineCheckCircle as CheckCircle } from 'react-icons/ai';
import { FaRegUser as User, FaRegCompass as CompassIcon } from 'react-icons/fa';


const RequestService = () => {
    const { id } = useParams();
    const [modalFoto, setModalFoto] = useState(null);
    const navigate = useNavigate();

    const { servicio, loadingServicio, errorServicio } = useGetJobRequest(id);
    const { applications, loadingApplications, errorApplications } = useGetApplicationsById(id);

    const handleExpandirFoto = (foto) => setModalFoto(foto);
    const handleCerrarModal = () => setModalFoto(null);

    if (loadingServicio) return <div>Cargando...</div>;
    if (errorServicio) return <div>Error al obtener la solicitud</div>;

    if (loadingApplications) return <div>Cargando Postulaciones</div>;
    if (errorApplications) return <div>Error al obtener las postulaciones</div>;

    // TODO: implementar los botones



    const postulationSelected = servicio.applicationSelectedId;

    console.log('servicio', servicio)
    console.log('postulaciones', applications)

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
                                    <span>Creado {formatDate(servicio.jobCreationDate)}</span>
                                </div>

                                <div className="flex items-center gap-1.5">
                                    <FaRegClock className="h-4 w-4" />
                                    <span>Fecha solicitada: {formatDate(servicio.date)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>  
            </div>

            {/* <div className="text-black px-12 text-left">
                <h1 className="m-0 text-3xl font-bold tracking-tight">Detalle de Solicitud de Servicio</h1>
                <h1 className="m-0 text-3xl font-bold tracking-tight">{servicio.title}</h1>
            </div> */}

            {/* Grid cards (Opción B): left detail card + right applications card */}
            <div className="container mx-auto px-4 py-8 md:px-6 lg:px-8">
                <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
                    {/* Left column (detalle del servicio) */}
                    <div className="space-y-6">
                        <div className="rounded-lg bg-white border border-gray-100 shadow-lg p-6 dark:bg-card">
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex-1 min-w-0">
                                    <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
                                        Detalle del Servicio
                                    </h1>
                                    {/* <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                                        <div className="flex items-center gap-1.5">
                                            <FaRegCalendarAlt className="h-4 w-4" />
                                            <span>Creado {formatDate(servicio.jobCreationDate)}</span>
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <FaRegClock className="h-4 w-4" />
                                            <span>Fecha solicitada: {formatDate(servicio.date)}</span>
                                        </div>
                                        {servicio?.urgency && (
                                            <span className="ml-2 inline-flex items-center rounded-full bg-red-100 text-red-700 text-xs font-semibold px-2.5 py-1">
                                                Urgente
                                            </span>
                                        )}
                                    </div> */}
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
                                    {servicio?.urgency? 'Si' : 'No' || 'Sin descripción'}
                                </p>
                            </div>

                            {/* Galería de fotos */}
                            <div className="mt-6">
                                <div className="flex items-center gap-2">
                                    {/* <ImageIcon className="h-4 w-4 text-muted-foreground text-[#0c7fcf]" /> */}
                                    <p className="text-lg font-bold text-[#0c7fcf] text-muted-foreground">
                                        Fotos ({servicio?.photos?.length || 0})
                                    </p>
                                </div>

                                <div className="mt-3 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                                    {Array.isArray(servicio?.photos) && servicio.photos.length > 0 ? (
                                        servicio.photos.map((foto, idx) => (
                                            <button
                                                type="button"
                                                key={idx}
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

                                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                                                <div className="bg-black absolute bottom-0 left-0 right-0 p-3 text-white opacity-0 transition-opacity group-hover:opacity-100">
                                                    <p className="text-xs font-medium line-clamp-2">{foto.note}</p>
                                                </div>
                                            </button>
                                        ))
                                    ) : (
                                        <div className="text-sm text-muted-foreground">No hay fotos</div>
                                    )}
                                </div>
                            </div>

                            {/* Botones de acción */}
                            <div className="mt-6 flex flex-wrap gap-3">
                                {postulationSelected ? (
                                    <>
                                        {servicio.agreementUser && servicio.agreementWorker ? (
                                            <button
                                                className="inline-flex items-center gap-2 rounded-full bg-[#02283A] hover:bg-[#03506f] text-white px-6 py-2 font-semibold"
                                                onClick={() => navigate(`/seguimiento-servicio/${servicio.id}`)}
                                            >
                                                <CompassIcon className="h-4 w-4" />
                                                Tracking service
                                            </button>

                                        ) : (
                                            <button
                                                className="inline-flex items-center gap-2 rounded-full bg-[#02283A] hover:bg-[#03506f] text-white px-6 py-2 font-semibold"
                                                onClick={() => navigate(`/contacto-laboral/${servicio.id}`)}
                                            >
                                                <CheckCircle className="h-4 w-4" />
                                                Comenzar contacto
                                            </button>
                                        )}
                                    </>
                                ) : (
                                    <>
                                        <button className="rounded-full bg-[#02283A] hover:bg-[#03506f] text-white px-6 py-2 font-semibold">
                                            Editar Servicio
                                        </button>
                                        <button
                                            className="rounded-full border border-border bg-transparent px-6 py-2 text-sm font-medium text-muted-foreground hover:bg-gray-50"
                                            onClick={() => { /* ver estado */ }}
                                        >
                                            Ver estado
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Right column (postulaciones) */}
                    <aside className="space-y-4">
                        <div className="sticky top-6">
                            <div className="rounded-lg bg-white border border-gray-100 p-4 shadow-lg dark:bg-card">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h2 className="text-lg font-bold">Postulaciones</h2>
                                        <p className="text-sm text-muted-foreground mt-1">
                                            {Array.isArray(applications) ? applications.length : 0} profesionales interesados
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-4 max-h-[calc(100vh-240px)] overflow-y-auto pr-2 space-y-3">
                                    {(!Array.isArray(applications) || applications.length === 0) ? (
                                        <div className="text-center py-12">
                                            <User className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                                            <p className="text-sm text-muted-foreground">Aún no hay postulaciones para este servicio</p>
                                        </div>
                                    ) : (
                                        applications.map((app) => (
                                            <article key={app.id} className="bg-background border border-border rounded-lg p-3">
                                                <div className="flex items-start gap-3">
                                                    <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center text-sm font-semibold text-gray-800 overflow-hidden">
                                                        {app.worker?.user?.profilePicture ? (
                                                            <img
                                                                src={`http://localhost:3000/${app.worker.profilePicture}`}
                                                                alt={`${app.worker.user.firstName} avatar`}
                                                                className="h-full w-full object-cover"
                                                            />
                                                        ) : (
                                                            `${app.worker?.user?.firstName?.[0] || ''}${app.worker?.user?.lastName?.[0] || ''}`
                                                        )}

                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <h3 className="text-base font-semibold truncate">
                                                            {app.worker?.user?.firstName} {app.worker?.user?.lastName}
                                                        </h3>
                                                        <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                                                            <span>⭐ {app.rating ?? '-'}</span>
                                                            <span>•</span>
                                                            <span>{app.completedJobs ?? 0} trabajos</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="mt-3">
                                                    <p className="text-sm font-semibold text-accent">${app.budget}</p>
                                                    <p className="text-sm mt-1 text-muted-foreground line-clamp-3">{app.description}</p>
                                                </div>

                                                <div className="mt-3">
                                                    <button
                                                        className={`w-full rounded-full px-4 py-2 font-semibold ${postulationSelected ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-[#02283A] hover:bg-[#03506f] text-white'}`}
                                                        onClick={() => navigate(`/postulacion/${app.id}`)}
                                                        disabled={!!postulationSelected}
                                                    >
                                                        Ver perfil completo
                                                    </button>
                                                </div>
                                            </article>
                                        ))
                                    )}
                                </div>
                            </div>
                        </div>
                    </aside>
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