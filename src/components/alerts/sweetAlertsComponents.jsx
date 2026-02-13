// src/components/alerts/alertsSAlert2.jsx
import Swal from 'sweetalert2';

export const showSuccessAlert = (
    // Valores por defecto
    title = '¡Éxito!', text = 'Operación realizada correctamente') => {
    return Swal.fire({
        icon: 'success',
        title,
        text,
        confirmButtonColor: '#02283A'
    });
};

export const showErrorAlert = (
    // Valores por defecto
    title = 'Error',
    text = 'Ocurrió un error inesperado') => {
    return Swal.fire({
        icon: 'error',
        title,
        text,
        confirmButtonColor: '#d33'
    });
};

export const showConfirmAlert = (
    title = '¿Estás seguro?',
    content = 'Esta acción no se puede deshacer.',
    confirmButtonText = 'Sí, confirmar',
    cancelButtonText = 'Cancelar'
) => {
    return Swal.fire({
        icon: 'warning',
        title,
        html: content,
        showCancelButton: true,
        confirmButtonColor:'#3085d6',
        cancelButtonColor:  '#d33',
        confirmButtonText,
        cancelButtonText
    }).then(result => result.isConfirmed);
};


export const showInputAlert = async (title, inputTypeOrOptions = {}) => {
    const options = typeof inputTypeOrOptions === 'string'
        ? { inputType: inputTypeOrOptions }
        : (inputTypeOrOptions || {});

    const {
        label = 'Ingrese un valor',
        inputType = 'text',
        inputValue = '',
        confirmButtonText = 'Aceptar',
        cancelButtonText = 'Cancelar'
    } = options;

    const result = await Swal.fire({
        title,
        input: inputType,
        inputLabel: label,
        inputValue,
        showCancelButton: true,
        confirmButtonText,
        cancelButtonText,
        confirmButtonColor: '#02283A',
        cancelButtonColor: '#d33',
        preConfirm: (value) => {
            if (value === '' || value == null) {
                Swal.showValidationMessage('El campo no puede estar vacío');
                return false;
            }
            return value;
        }
    });

    return result.isConfirmed ? result.value : null;
};
