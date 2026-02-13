// javascript
// File: src/hooks/useEditBudget.js
import { showInputAlert, showSuccessAlert, showErrorAlert } from '../../components/alerts/sweetAlertsComponents.jsx';

const useEditBudget = () => {
    const editBudget = async ({ applicationId, currentBudget = '', onSuccess } = {}) => {
        try {
            const value = await showInputAlert('Editar presupuesto', {
                inputType: 'number',
                inputValue: String(currentBudget),
                label: 'Nuevo presupuesto'
            });

            if (value == null) return null; // usuario canceló

            const newBudget = Number(value);
            if (Number.isNaN(newBudget) || newBudget < 0) {
                showErrorAlert('Valor inválido', 'Ingrese un número válido para el presupuesto.');
                return null;
            }

            const res = await fetch(`http://localhost:3000/job-requests/cambiar-presupuesto-postulacion/${applicationId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ budget: newBudget })
            });

            if (!res.ok) throw new Error('Error al actualizar el presupuesto');

            await showSuccessAlert('Presupuesto actualizado', 'El presupuesto se actualizó correctamente.');
            if (typeof onSuccess === 'function') onSuccess();
            return newBudget;
        } catch (err) {
            console.error(err);
            showErrorAlert('Error', 'No se pudo actualizar el presupuesto.');
            return null;
        }
    };

    return { editBudget };
};

export default useEditBudget;