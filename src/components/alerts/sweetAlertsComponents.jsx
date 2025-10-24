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
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText,
        cancelButtonText
    }).then(result => result.isConfirmed);
};
