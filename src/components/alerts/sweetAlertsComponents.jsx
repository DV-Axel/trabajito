// javascript
// File: src/components/alerts/sweetAlertsComponents.jsx
import Swal from 'sweetalert2';

export const showSuccessAlert = (
    title = '¡Éxito!', text = 'Operación realizada correctamente') => {
    return Swal.fire({
        icon: 'success',
        title,
        text,
        confirmButtonColor: '#02283A'
    });
};

export const showErrorAlert = (
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
        cancelButtonText = 'Cancelar',
        inputOptions,           // object { value: label }
        options: optionsAlias,  // alternate name
        selectOptions           // array [{ value, text }] or [[value, text]]
    } = options;

    // Normalizar inputOptions a objeto que espera SweetAlert2
    let finalInputOptions = inputOptions || optionsAlias || undefined;
    if ((!finalInputOptions || Object.keys(finalInputOptions).length === 0) && Array.isArray(selectOptions)) {
        finalInputOptions = selectOptions.reduce((acc, item) => {
            if (Array.isArray(item) && item.length >= 2) {
                acc[String(item[0])] = item[1];
            } else if (item && typeof item === 'object' && 'value' in item && 'text' in item) {
                acc[String(item.value)] = item.text;
            }
            return acc;
        }, {});
    }

    const result = await Swal.fire({
        title,
        input: inputType,
        inputLabel: label,
        inputValue,
        inputOptions: finalInputOptions,
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