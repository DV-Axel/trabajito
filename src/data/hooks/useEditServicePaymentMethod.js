// javascript
import { showInputAlert, showSuccessAlert, showErrorAlert } from '../../components/alerts/sweetAlertsComponents.jsx';

const useEditServicePaymentMethod = () => {
    const editServicePaymentMethod = async ({ jobRequestId, currentPaymentMethodId = 1, onSuccess } = {}) => {
        try {
            const inputOptionsObj = {
                '1': 'Efectivo',
                '2': 'Mercado Pago'
            };

            // también preparamos un array por si el wrapper espera esa forma
            const inputOptionsArray = Object.entries(inputOptionsObj).map(([value, text]) => ({ value, text }));

            const raw = await showInputAlert('Editar método de pago', {
                inputType: 'select',
                // enviamos varias keys para compatibilidad con distintas implementaciones
                inputOptions: inputOptionsObj,
                options: inputOptionsObj,
                selectOptions: inputOptionsArray,
                inputValue: String(currentPaymentMethodId || 1),
                label: 'Seleccioná método de pago'
            });

            if (raw == null) return null; // usuario canceló

            // aceptar respuesta en distintos formatos: valor directo o { value: '1' }
            const value = (typeof raw === 'object' && raw !== null && 'value' in raw) ? raw.value : raw;
            const selected = Number(value);

            if (![1, 2].includes(selected)) {
                await showErrorAlert('Valor inválido', 'Seleccioná un método válido.');
                return null;
            }

            const res = await fetch(`http://localhost:3000/job-requests/cambiar-metodo-pago/${jobRequestId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ paymentMethodId: selected })
            });

            if (!res.ok) throw new Error('Error al actualizar el método de pago');

            await showSuccessAlert('Método de pago actualizado', 'El método de pago se actualizó correctamente.');
            if (typeof onSuccess === 'function') onSuccess();
            return selected;
        } catch (err) {
            console.error(err);
            await showErrorAlert('Error', 'No se pudo actualizar el método de pago.');
            return null;
        }
    };

    return { editServicePaymentMethod };
};

export default useEditServicePaymentMethod;