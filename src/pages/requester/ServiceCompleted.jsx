import React, { useState } from "react";

const ServiceCompleted = ({ onSubmit }) => {
    const [rating, setRating] = useState(0);

    // Datos hardcodeados del trabajador
    const worker = {
        name: "Juan Pérez",
        email: "juan.perez@email.com",
        photo: "https://randomuser.me/api/portraits/men/32.jpg"
    };

    // Datos hardcodeados del servicio
    const service = {
        title: "Limpieza de departamento",
        description: "Limpieza profunda de un departamento de 3 ambientes.",
        date: "2024-06-10"
    };

    return (
        <div className="flex flex-col items-center p-6 bg-white rounded shadow">
            <div className="mb-6 text-center">
                <h2 className="text-2xl font-bold mb-1">{service.title}</h2>
                <p className="mb-1">{service.description}</p>
                <p className="text-gray-500 text-sm">Fecha: {service.date}</p>
            </div>
            <div className="mb-4 text-center">
                <img
                    src={worker.photo}
                    alt="Foto del trabajador"
                    className="w-24 h-24 rounded-full mx-auto mb-2 object-cover"
                />
                <h3 className="text-lg font-semibold mb-1">Datos del trabajador</h3>
                <p><span className="font-bold">Nombre:</span> {worker.name}</p>
                <p><span className="font-bold">Email:</span> {worker.email}</p>
            </div>
            <h2 className="text-xl font-bold mb-2">¡Servicio finalizado!</h2>
            <p className="mb-4">Calificá al trabajador:</p>
            <div className="flex mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                    <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        className="text-3xl focus:outline-none"
                        aria-label={`Calificar con ${star} estrellas`}
                    >
                        {star <= rating ? "★" : "☆"}
                    </button>
                ))}
            </div>
            <button
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full font-semibold"
                disabled={rating === 0}
                onClick={() => onSubmit && onSubmit(rating)}
            >
                Confirmar calificación
            </button>
        </div>
    );
};

export default ServiceCompleted;