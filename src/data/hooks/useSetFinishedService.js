import { showConfirmAlert, showErrorAlert, showSuccessAlert } from '../../components/alerts/sweetAlertsComponents';

const useSetFinishedService = () => {
    const setFinishedService = async (idJobRequest, entidad) => {
        if(!idJobRequest || !entidad) return;

        const confirmado = await showConfirmAlert(
            'Confirmar Finalización del Servicio',
            '¿Estás seguro de que deseas confirmar la finalización del servicio?',
            'Confirmar',
            'Cancelar'
        );
        if (!confirmado) return;

        try{
            const res = await fetch(`http://localhost:3000/job-requests/confirmar-servicio-finalizado/${idJobRequest}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ entidad })
            });

            if(res.ok){
                await showSuccessAlert('¡Éxito!', 'Servicio finalizado correctamente.');
                window.location.reload();
            } else {
                const data = await res.json().catch(() => ({}));
                showErrorAlert('Error', data.error || 'No se pudo confirmar el acuerdo.');

            }
        }catch (err) {
            console.error(err);
            showErrorAlert('Error', 'No se pudo confirmar el acuerdo. Inténtalo de nuevo más tarde.');
        }

    }

    return { setFinishedService };
}

export default useSetFinishedService;