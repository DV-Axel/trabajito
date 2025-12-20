// File: src/components/PostulacionesAside.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaRegUser as User } from 'react-icons/fa';
import { AiFillStar } from 'react-icons/ai';

const getProfilePicture = (worker) => {
    const pic = worker?.profilePicture ?? worker?.user?.profilePicture;
    if (!pic) return null;
    // si la ruta ya incluye http(s) devolverla tal cual
    return pic.startsWith('http') ? pic : `http://localhost:3000/${pic}`;
};

const initialsOf = (worker) => {
    const first = worker?.user?.firstName?.[0] ?? '';
    const last = worker?.user?.lastName?.[0] ?? '';
    return `${first}${last}`.toUpperCase();
};

/*
 Props:
 - applications: array o wrapper (lo mismo que en el componente padre)
 - apps: lista normalizada (opcional)
 - isWorker: boolean
 - application: postulación seleccionada (cuando isWorker)
 - postulationSelected: id o flag para deshabilitar botones
*/
export default function PostulacionesAside({
                                               applications,
                                               apps,
                                               isWorker,
                                               application,
                                               postulationSelected
                                           }) {
    const navigate = useNavigate();
    const list = Array.isArray(applications) ? applications : (apps ?? []);

    return (
        <aside className="space-y-4">
            <div className="sticky top-6">
                <div className="rounded-lg bg-white border border-gray-300 p-4 shadow-lg dark:bg-card">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-lg font-bold">Postulaciones</h2>
                            <p className="text-sm text-muted-foreground mt-1">
                                {list.length} profesionales interesados
                            </p>
                        </div>
                    </div>

                    <div className="mt-4 max-h-[calc(100vh-240px)] overflow-y-auto pr-2 space-y-3">
                        {isWorker ? (
                            application ? (
                                <article key={application.id ?? application._id} className="bg-background border border-border rounded-lg p-3">
                                    <div className="flex items-start gap-3">
                                        <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center text-sm font-semibold text-gray-800 overflow-hidden">
                                            {getProfilePicture(application.worker) ? (
                                                <img src={getProfilePicture(application.worker)} alt="avatar" className="w-full h-full object-cover" />
                                            ) : (
                                                initialsOf(application.worker)
                                            )}
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <h3 className="text-base font-semibold truncate">
                                                {application.worker?.user?.firstName} {application.worker?.user?.lastName}
                                            </h3>
                                            <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                                                <span><AiFillStar className="inline text-yellow-400" /> {application.worker?.rating ?? '-'}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-3">
                                        <p className="text-sm font-semibold text-accent">${application.budget}</p>
                                        <p className="text-sm mt-1 text-muted-foreground line-clamp-3">{application.description}</p>
                                    </div>

                                    <div className="mt-3">
                                        <button
                                            className={`w-full rounded-full px-4 py-2 font-semibold ${postulationSelected ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-[#02283A] hover:bg-[#03506f] text-white'}`}
                                            onClick={() => navigate(`/postulacion/${application.id}`)}
                                            disabled={!!postulationSelected}
                                        >
                                            Ver perfil completo
                                        </button>
                                    </div>
                                </article>
                            ) : (
                                <div className="text-center py-12">
                                    <User className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                                    <p className="text-sm text-muted-foreground">Aún no hay postulaciones para este servicio</p>
                                </div>
                            )
                        ) : (
                            (!Array.isArray(list) || list.length === 0) ? (
                                <div className="text-center py-12">
                                    <User className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                                    <p className="text-sm text-muted-foreground">Aún no hay postulaciones para este servicio</p>
                                </div>
                            ) : (
                                list.map((app) => (
                                    <article key={app.id} className="bg-background border border-border rounded-lg p-3">
                                        <div className="flex items-start gap-3">
                                            <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center text-sm font-semibold text-gray-800 overflow-hidden">
                                                {getProfilePicture(app.worker) ? (
                                                    <img src={getProfilePicture(app.worker)} alt="avatar" className="w-full h-full object-cover" />
                                                ) : (
                                                    initialsOf(app.worker)
                                                )}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h3 className="text-base font-semibold truncate">
                                                    {app.worker?.user?.firstName} {app.worker?.user?.lastName}
                                                </h3>
                                                <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                                                    <span><AiFillStar className="inline text-yellow-400" /> {app.worker?.rating ?? '-'}</span>
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
                            )
                        )}
                    </div>
                </div>
            </div>
        </aside>
    );
}