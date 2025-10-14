import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";


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


    const handleSelect = async () => {
        const result = await Swal.fire({
            title: "¿Seleccionar a este worker?",
            text: "Esta acción no se puede deshacer.",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#00b4d8",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, seleccionar",
            cancelButtonText: "Cancelar"
        });

        if (result.isConfirmed) {
            try {
                const response = await fetch(`http://localhost:3000/users/seleccionar-worker`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        jobRequestId: data.jobRequestId, // asegúrate de tener este dato en `data`
                        postulationId: id
                    })
                });
                if (response.ok) {
                    Swal.fire("¡Seleccionado!", "El worker ha sido seleccionado.", "success");
                } else {
                    Swal.fire("Error", "No se pudo seleccionar al worker.", "error");
                }
            } catch (error) {
                Swal.fire("Error", "Ocurrió un error al seleccionar al worker.", "error");
            }
        }
    };



    if (!data) return <div>Cargando...</div>;

    console.log(data)

    const { budget, description, submittedAt, worker, requireVisit } = data;


    console.log('Worker', worker);


    return (
        <div className="flex justify-center bg-gray-50 py-10">
            <div className="flex flex-col md:flex-row bg-white rounded-xl shadow-lg w-full max-w-4xl">
                {/* Columna izquierda: Detalles de la postulación */}
                <div className="flex-1 p-8 border-b md:border-b-0 md:border-r border-gray-200">
                    <h2 className="text-2xl font-bold mb-4 text-center">Detalles de la Postulación</h2>
                    <p><span className="font-semibold">Presupuesto:</span> {budget}</p>
                    <p className="text-gray-400 text-sm mb-2">
                        <span className="font-semibold">Fecha de postulación:</span> {submittedAt?.slice(0,10)}
                    </p>
                    <p>
                        <span className="font-semibold">¿Requiere visita?</span> {requireVisit ? "Sí" : "No"}
                    </p>
                    <div className="mt-4">
                        <span className="font-semibold">Comentarios:</span>
                        <p className="bg-gray-100 rounded p-3 mt-1">{description}</p>
                    </div>
                    <button
                        className="mt-6 w-full bg-[#00b4d8] hover:bg-[#0096c7] text-white font-semibold py-2 px-4 rounded transition-colors"
                        onClick={handleSelect}
                    >
                        Seleccionar Worker
                    </button>

                </div>


                {/* Columna derecha: Perfil del worker */}
                <div className="flex-1 p-8 flex flex-col items-center">

                    <img
                        src={worker.profilePicture}
                        alt="Foto de perfil"
                        className="w-52 h-52 rounded-full object-cover border-2 border-[#00b4d8] mb-3 shadow-2xl"
                    />




                    {/*TODO: formatear bien los datos del worker*/}
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