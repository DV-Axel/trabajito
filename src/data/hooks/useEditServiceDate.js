import { showInputAlert, showSuccessAlert, showErrorAlert } from '../../components/alerts/sweetAlertsComponents.jsx';

const toInputDate = (date) => {
    if (!date) return '';
    const d = new Date(date);
    if (Number.isNaN(d)) return '';
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
};

const useEditServiceDate = () => {
    const editServiceDate = async ({ jobRequestId, currentDate = '', onSuccess } = {}) => {
        try {
            const value = await showInputAlert('Editar fecha del servicio', {
                inputType: 'date',
                inputValue: toInputDate(currentDate),
                label: 'Nueva fecha'
            });

            if (value == null) return null; // usuario canceló

            // value viene en formato 'YYYY-MM-DD'
            if (!value || Number.isNaN(Date.parse(value))) {
                showErrorAlert('Valor inválido', 'Ingrese una fecha válida.');
                return null;
            }

            const res = await fetch(`http://localhost:3000/job-requests/cambiar-fecha-servicio/${jobRequestId}`, {
                method: 'PUT', // ajustar a PATCH/PUT según tu backend
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ date: value })
            });

            if (!res.ok) throw new Error('Error al actualizar la fecha');

            await showSuccessAlert('Fecha actualizada', 'La fecha del servicio se actualizó correctamente.');
            if (typeof onSuccess === 'function') onSuccess();
            return value;
        } catch (err) {
            console.error(err);
            showErrorAlert('Error', 'No se pudo actualizar la fecha del servicio.');
            return null;
        }
    };

    return { editServiceDate };
};

export default useEditServiceDate;