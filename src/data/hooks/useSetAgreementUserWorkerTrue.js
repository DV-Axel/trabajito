// javascript
// File: `src/data/hooks/useSetAgreementUserWorkerTrue.js`
import { showConfirmAlert, showErrorAlert, showSuccessAlert } from '../../components/alerts/sweetAlertsComponents';

const useSetAgreementUserWorkerTrue = () => {
    // ahora acepta finalBudget opcional
    const setAgreementUserWorkerTrue = async (idJobRequest, entidad, agreementsConfirmed, finalBudget) => {
        if (!idJobRequest || !entidad || !agreementsConfirmed) return;

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

                await showSuccessAlert('¡Éxito!', 'Acuerdo confirmado correctamente.');


                // actualizar estado local del objeto pasado por referencia
                if(entidad === 'user') {
                    agreementsConfirmed.agreementUser = true;
                } else if(entidad === 'worker') {
                    agreementsConfirmed.agreementWorker = true;
                } else {
                    showErrorAlert('Error', 'Entidad no válida.');
                    return;
                }

                console.log('agreementosConfirmed después de setear:', agreementsConfirmed);

                // Si ambos confirmaron, intentar setear presupuesto final (si se pasó)
                if (agreementsConfirmed.agreementUser && agreementsConfirmed.agreementWorker) {
                    if (finalBudget != null) {
                        try {
                            const resFinal = await fetch(`http://localhost:3000/job-requests/establecer-presupuesto-final/${idJobRequest}`, {
                                method: 'PUT', // ajustar según backend
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({ finalBudget })
                            });

                            if (!resFinal.ok) {
                                const data = await resFinal.json().catch(() => ({}));
                            }
                        } catch (err) {
                            console.error(err);
                        }
                    }
                }

                window.location.reload();
            } else {
                const data = await res.json().catch(() => ({}));
                showErrorAlert('Error', data.error || 'No se pudo confirmar el acuerdo.');
            }
        } catch (err) {
            console.error(err);
            showErrorAlert('Error', 'No se pudo confirmar el acuerdo. Inténtalo de nuevo más tarde.');
        }
    };

    return { setAgreementUserWorkerTrue };
};

export default useSetAgreementUserWorkerTrue;