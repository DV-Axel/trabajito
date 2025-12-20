// File: src/data/hooks/useSubmitRating.js
import { useCallback, useState } from 'react';
import { showSuccessAlert } from '../../components/alerts/sweetAlertsComponents';

export default function useSubmitRating(baseUrl = '') {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const openRating = useCallback(() => setOpen(true), []);
    const closeRating = useCallback(() => setOpen(false), []);

    /**
     * submitRating: envía rating y comment al endpoint correspondiente.
     * Recibe un objeto { serviceId, rating, comment }.
     * Lanza error si serviceId no está presente o la respuesta no es OK.
     */
    const submitRating = useCallback(async ({ serviceId, rating, comment }) => {
        if (!serviceId) throw new Error('serviceId requerido');
        setLoading(true);
        try {
            const res = await fetch(`http://localhost:3000/job-requests/calificar-servicio/${serviceId}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ rating, comment }),
            });

            if (!res.ok) {
                const text = await res.text();
                throw new Error(text || 'Error al enviar la calificación');
            }

            const data = await res.json();

            // Cerrar el modal antes de mostrar la alerta
            setOpen(false);

            // Mostrar alerta de éxito y después recargar la página
            await showSuccessAlert('Calificación enviada', 'Se calificó correctamente');
            // Recargar independientemente de cómo se cerró la alerta (confirmar o tocar fuera)
            window.location.reload();

            return data;
        } finally {
            setLoading(false);
        }
    }, [baseUrl]);

    return {
        open,
        openRating,
        closeRating,
        loading,
        submitRating,
    };
}
