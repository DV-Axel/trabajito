const worker = {
    nombre: "Proveedor 1",
    avatar: "https://via.placeholder.com/100x100?text=Avatar",
    experiencia: "5 años en reparaciones de aire acondicionado",
    calificacion: 4.7,
    ubicacion: "Madrid",
    descripcion: "Técnico certificado, atención rápida y profesional."
};

const postulacion = {
    presupuesto: "160 €",
    comentarios: "Puedo realizar el trabajo en 24h. Incluye materiales.",
    estado: "Pendiente",
    fecha: "2024-06-10"
};

const Postulation = () => (
    <div className="flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center p-8 bg-white rounded-xl shadow-lg w-full max-w-md">
            {/* Avatar y perfil */}
            <img src={worker.avatar} alt="Avatar" className="w-24 h-24 rounded-full mb-4 shadow-xl" />
            <h2 className="text-xl font-bold mb-1">{worker.nombre}</h2>
            <p className="text-gray-600 mb-1">{worker.ubicacion}</p>
            <p className="text-yellow-500 mb-1 flex items-center gap-1">
                <span>⭐</span> {worker.calificacion}
            </p>
            <p className="mb-2 text-sm">{worker.experiencia}</p>
            <p className="text-gray-700 text-center mb-6">{worker.descripcion}</p>
            {/* Detalles de la postulación */}
            <div className="w-full">
                <h2 className="text-2xl font-bold mb-4 text-center">Detalles de la Postulación</h2>
                <p><span className="font-semibold">Presupuesto:</span> {postulacion.presupuesto}</p>
                <p><span className="font-semibold">Estado:</span> {postulacion.estado}</p>
                <p><span className="font-semibold">Fecha:</span> {postulacion.fecha}</p>
                <div className="mt-4">
                    <span className="font-semibold">Comentarios:</span>
                    <p className="bg-gray-100 rounded p-3 mt-1">{postulacion.comentarios}</p>
                </div>
            </div>

            {/*TODO: poner alertas a la hora de contrar*/}
            <div className="mt-8 flex justify-center">
                <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-8 py-3 rounded-full shadow transition-colors">
                    Contratar
                </button>
            </div>
        </div>
    </div>
);

export default Postulation;
