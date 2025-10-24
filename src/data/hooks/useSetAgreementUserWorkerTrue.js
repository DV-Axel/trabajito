import { showConfirmAlert, showErrorAlert, showSuccessAlert } from '../../components/alerts/sweetAlertsComponents';

const useSetAgreementUserWorkerTrue = () => {
    const setAgreementUserWorkerTrue = async (idJobRequest, entidad) => {
        if (!idJobRequest || !entidad) return;

        const confirmado = await showConfirmAlert(
            'Confirmar Acuerdo Mutuo',
            '¿Estás seguro de que deseas confirmar el acuerdo mutuo?',
            'Confirmar',
            'Cancelar'
        );
        if (!confirmado) return;

        try {
            const res = await fetch(`http://localhost:3000/job-requests/acuerdo-mutuo/${idJobRequest}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ entidad })
            });
            if (res.ok) {
                showSuccessAlert('¡Éxito!', 'Acuerdo confirmado correctamente.');
            } else {
                const data = await res.json();
                showErrorAlert('Error', data.error || 'No se pudo confirmar el acuerdo.');
            }
        } catch {
            showErrorAlert('Error', 'No se pudo confirmar el acuerdo. Inténtalo de nuevo más tarde.');
        }
    };

    return { setAgreementUserWorkerTrue };
};

export default useSetAgreementUserWorkerTrue;