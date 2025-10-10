import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Postulation = () => {
    const { id } = useParams();
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchPostulacion = async () => {
            try {
                const res = await fetch(`http://localhost:3000/job-requests/postulacion-worker/${id}`);
                const json = await res.json();
                setData(json);
            } catch (error) {
                console.error("Error al obtener la postulación:", error);
            }
        };
        fetchPostulacion();
    }, [id]);

    if (!data) return <div>Cargando...</div>;

    const { budget, description, submittedAt, worker } = data;


    console.log(worker);
    console.log(`http://localhost:3000${worker.profilePicture}`)
    console.log(`http://localhost:3000${worker.user.profilePicture}`)


    return (
        <div className="flex justify-center bg-gray-50 min-h-screen py-10">
            <div className="flex flex-col md:flex-row bg-white rounded-xl shadow-lg w-full max-w-4xl">
                {/* Columna izquierda: Detalles de la postulación */}
                <div className="flex-1 p-8 border-b md:border-b-0 md:border-r border-gray-200">
                    <h2 className="text-2xl font-bold mb-4 text-center">Detalles de la Postulación</h2>
                    <p><span className="font-semibold">Presupuesto:</span> {budget}</p>
                    <p><span className="font-semibold">Fecha:</span> {submittedAt?.slice(0,10)}</p>
                    <div className="mt-4">
                        <span className="font-semibold">Comentarios:</span>
                        <p className="bg-gray-100 rounded p-3 mt-1">{description}</p>
                    </div>
                </div>
                {/* Columna derecha: Perfil del worker */}
                <div className="flex-1 p-8 flex flex-col items-center">

                    <img
                        src={`http://localhost:3000${worker.profilePicture}`}
                        alt="Foto de perfil"
                        className="w-52 h-52 rounded-full object-cover border-2 border-[#00b4d8] mb-3 shadow-2xl"
                    />





                    <h2 className="text-xl font-bold mb-1">{worker?.user?.firstName} {worker?.user?.lastName}</h2>
                    <p className="text-yellow-500 mb-1 flex items-center gap-1">
                        <span>⭐</span> {worker?.rating}
                    </p>
                    <p className="text-gray-700 text-center mb-2">{worker?.description}</p>
                    <p className="text-indigo-700 font-semibold mb-1">{worker?.subtitle}</p>
                    <div className="mb-1">
                        <span className="font-semibold">Locaciones:</span>
                        <span className="ml-1">{worker?.workLocation?.join(", ")}</span>
                    </div>
                    <div className="mb-1">
                        <span className="font-semibold">Días:</span>
                        <span className="ml-1">{worker?.workingDays?.join(", ")}</span>
                    </div>
                    <div>
                        <span className="font-semibold">Horarios:</span>
                        <span className="ml-1">{worker?.workingHours?.join(", ")}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Postulation;