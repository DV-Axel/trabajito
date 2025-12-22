import { showConfirmAlert, showErrorAlert, showSuccessAlert } from '../../components/alerts/sweetAlertsComponents';

const useSetAgreementUserWorkerFalse = () => {

    const setAgreementUserWorkerFalse = async (idJobRequest, entidad) => {
        if(!idJobRequest || !entidad) return;

        const confirmado = await showConfirmAlert(
            'Cancelar Acuerdo Mutuo',
            '¿Estás seguro de que deseas cancelar el acuerdo mutuo?',
            'Confirmar',
            'Cancelar'
        );

        if (!confirmado) return;

        try {
            const res = await fetch(`http://localhost:3000/job-requests/cancelar-acuerdo-mutuo/${idJobRequest}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ entidad })
            });
            if (res.ok) {
                await showSuccessAlert('¡Éxito!', 'Acuerdo cancelado correctamente.');
                window.location.reload();


            } else {
                const data = await res.json();
                showErrorAlert('Error', data.error || 'No se pudo cancelar el acuerdo.');
            }
        } catch {
            showErrorAlert('Error', 'No se pudo cancelar el acuerdo. Inténtalo de nuevo más tarde.');
        }

    }
        return {setAgreementUserWorkerFalse};
};

export default useSetAgreementUserWorkerFalse;