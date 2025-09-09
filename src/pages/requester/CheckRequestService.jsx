import { useLocation } from "react-router-dom";
import { services } from "../../data/services";

const CheckRequestService = () => {
    const location = useLocation();
    const {
        serviceKey,
        form,
        address,
        tipoPropiedad,
        piso,
        numeroDepto,
        photos = []
    } = location.state || {};


    const payload = {
        ...location.state,
        photos: (location.state.photos || []).map(photo => ({
            name: photo.file?.name,
            note: photo.note
        }))
    };

    // Buscar el servicio actual y crear un mapa de key a label
    let labelMap = { urgencia: "Urgencia", fecha: "Fecha de solicitada", descripcion: "Descripción" }; // Agregar etiquetas comunes
    const currentService = services.find(s => s.key === serviceKey); // Buscar el servicio actual
    if (currentService && currentService.questions) { // Verificar si existen preguntas
        currentService.questions.forEach(q => {
            labelMap[q.key] = q.label; // Mapear key a label
        });
    }

    const handleSubmit = async () => {
        try {
            const response = await fetch('http://localhost:3000/job-requests/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });
            if (!response.ok) throw new Error('Error al enviar la solicitud');
            alert('¡Solicitud enviada con éxito!');
        } catch (error) {
            alert('Error al enviar la solicitud');
            console.error(error);
        }
    };




    /*TODO: Ser minuscioso con las validaciones del resumen*/

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="max-w-2xl w-full bg-white shadow-lg rounded-lg p-8 my-8 border border-gray-300 animate-fadeIn transition-all duration-500">
                <h1 className="text-3xl font-extrabold mb-8 text-center tracking-wide drop-shadow-lg animate-fadeIn transition-all duration-500">
                    📝 Resumen de tu solicitud
                </h1>

                <section className="mb-8 animate-fadeIn transition-all duration-500 delay-100">
                    <div className="flex items-center mb-2">
                        <h2 className="pl-4 text-xl font-bold">Tipo de servicio</h2>
                        <span className="text-2xl mr-2">🔧</span>
                    </div>
                    <div className="bg-indigo-50 rounded-lg p-4 text-lg font-semibold shadow uppercase">
                        {serviceKey || "No especificado"}
                    </div>
                </section>

                <section className="mb-8 animate-fadeIn transition-all duration-500 delay-200">
                    <div className="flex items-center mb-2">
                        <h2 className="pl-4 text-xl font-bold">Datos del formulario</h2>
                        <span className="text-2xl mr-2">📋</span>
                    </div>
                    <div className="bg-indigo-50 rounded-lg p-4 shadow">
                        {form ? (
                            <ul className="list-disc list-inside space-y-1">
                                {Object.entries(form).map(([key, value]) => (
                                    <li key={key}>
                                        <span className="font-semibold">{labelMap[key] || key}:</span> {value}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-red-500">No se ingresaron datos del formulario.</p>
                        )}
                    </div>
                </section>

                <section className="mb-8 animate-fadeIn transition-all duration-500 delay-300">
                    <div className="flex items-center mb-2">
                        <h2 className="pl-4 text-xl font-bold">Ubicación</h2>
                        <span className="text-2xl mr-2">📍</span>
                    </div>
                    <div className="bg-indigo-50 rounded-lg p-4 shadow">
                        <ul className="list-disc list-inside space-y-1">
                            <li>
                                <span className="font-semibold">Dirección:</span>{" "}
                                {address
                                    ? Object.values(address).join(", ")
                                    : "No especificada"}
                            </li>
                            <li><span className="font-semibold">Tipo de propiedad:</span> {tipoPropiedad || "No especificado"}</li>
                            <li><span className="font-semibold">Piso:</span> {piso || "No especificado"}</li>
                            <li><span className="font-semibold">Número depto:</span> {numeroDepto || "No especificado"}</li>
                        </ul>
                    </div>
                </section>

                <section className="mb-8 animate-fadeIn transition-all duration-500 delay-400">
                    <div className="flex items-center mb-2">
                        <h2 className="text-xl font-bold">Fotos</h2>
                        <span className="text-2xl mr-2">📷</span>
                    </div>
                    <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                        {photos.length === 0 && <p className="text-gray-500">No se subieron fotos.</p>}
                        {photos.map((photo, idx) => (
                            <div key={idx} className="border-2 border-indigo-200 rounded-xl p-2 bg-white flex flex-col items-center shadow">
                                <img
                                    src={URL.createObjectURL(photo.file)}
                                    alt={`foto-${idx}`}
                                    className="w-full h-32 object-cover rounded-lg mb-2 border border-indigo-100"
                                />
                                <span className="text-xs mb-1 font-semibold">{photo.file.name}</span>
                                <p className="text-sm">{photo.note}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <button
                    type="submit"
                    onClick={handleSubmit}
                    className="w-full bg-[#02283A] hover:bg-[#03506f] text-white font-semibold py-2 rounded  transition"
                >
                    Confirmar solicitud
                </button>

            </div>
        </div>
    );
};

export default CheckRequestService;