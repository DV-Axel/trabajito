// src/data/hooks/useUpdatePerfilAtribute.js
import Swal from 'sweetalert2';
import {
    showConfirmAlert,
    showErrorAlert,
    showInputAlert,
    showSuccessAlert
} from '../../components/alerts/sweetAlertsComponents';

const useUpdatePerfilAtribute = () => {
    const updatePerfilAtribute = async (idUser, atributo, labelAtributo, valorInicial = null) => {
        if (!idUser || !atributo || !labelAtributo) return;

        try {
            if (atributo === 'address') {
                // Preguntar si es departamento
                const checkboxResult = await Swal.fire({
                    title: `¿Es departamento?`,
                    input: 'checkbox',
                    inputPlaceholder: 'Marcar si corresponde a un departamento',
                    showCancelButton: true,
                    confirmButtonText: 'Siguiente',
                    cancelButtonText: 'Cancelar',
                    confirmButtonColor: '#02283A',
                    cancelButtonColor: '#d33'
                });

                if (!checkboxResult.isConfirmed) return;
                const isDept = !!checkboxResult.value;

                // Prefill
                const addressPrefill = valorInicial?.address || '';
                const numberPrefill = valorInicial?.number || '';
                const deptPrefill = valorInicial?.departmentNumber || '';

                let html = `
                    <input id="swal-address" class="swal2-input" placeholder="Calle" value="${String(addressPrefill).replace(/"/g,'&quot;')}">
                    <input id="swal-number" class="swal2-input" placeholder="Número" value="${String(numberPrefill).replace(/"/g,'&quot;')}">
                `;
                if (isDept) {
                    html += `<input id="swal-dept" class="swal2-input" placeholder="Número de departamento" value="${String(deptPrefill).replace(/"/g,'&quot;')}">`;
                }

                const formResult = await Swal.fire({
                    title: isDept ? `Actualizar ${labelAtributo} (Departamento)` : `Actualizar ${labelAtributo}`,
                    html,
                    focusConfirm: false,
                    showCancelButton: true,
                    confirmButtonText: 'Actualizar',
                    cancelButtonText: 'Cancelar',
                    confirmButtonColor: '#02283A',
                    cancelButtonColor: '#d33',
                    preConfirm: () => {
                        const address = document.getElementById('swal-address')?.value?.trim();
                        const number = document.getElementById('swal-number')?.value?.trim();
                        const departmentNumber = isDept ? document.getElementById('swal-dept')?.value?.trim() : null;
                        if (!address) {
                            Swal.showValidationMessage('La calle no puede estar vacía');
                            return false;
                        }
                        if (!number) {
                            Swal.showValidationMessage('El número no puede estar vacío');
                            return false;
                        }
                        return { address, number, departmentNumber: isDept ? departmentNumber : null };
                    }
                });

                if (!formResult.isConfirmed || !formResult.value) return;
                const nuevoValor = formResult.value;

                const confirmado = await showConfirmAlert(
                    'Confirmar Actualización de Perfil',
                    `¿Estás seguro de que deseas actualizar tu ${labelAtributo} a:\nCalle: ${nuevoValor.address}\nNúmero: ${nuevoValor.number}${isDept && nuevoValor.departmentNumber ? `\nDepto: ${nuevoValor.departmentNumber}` : ''}`,
                    'Confirmar',
                    'Cancelar'
                );
                if (!confirmado) return;

                // Enviar address, number y departmentNumber por separado
                const res = await fetch(`http://localhost:3000/users/actualizar-atributo/${idUser}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        atributo,
                        address: nuevoValor.address,
                        number: nuevoValor.number,
                        departmentNumber: nuevoValor.departmentNumber
                    })
                });

                if (res.ok) {
                    await showSuccessAlert('¡Éxito!', `Tu ${labelAtributo} ha sido actualizado correctamente.`);
                    window.location.reload();
                } else {
                    const data = await res.json().catch(() => ({}));
                    showErrorAlert('Error', data.error || `No se pudo actualizar tu ${labelAtributo}.`);
                }
                return;
            }

            // Caso general
            let typeValor = 'text';
            if (atributo === 'phone') typeValor = 'number';

            const valor = await showInputAlert(
                `Actualizar ${labelAtributo}`,
                {
                    inputType: typeValor,
                    label: `Nuevo ${labelAtributo}`,
                    inputValue: valorInicial ?? '',
                    confirmButtonText: 'Aceptar',
                    cancelButtonText: 'Cancelar'
                }
            );

            if (valor == null) return;

            const confirmado = await showConfirmAlert(
                'Confirmar Actualización de Perfil',
                `¿Estás seguro de que deseas actualizar tu ${labelAtributo} a ${valor}?`,
                'Confirmar',
                'Cancelar'
            );

            if (!confirmado) return;

            const res = await fetch(`http://localhost:3000/users/actualizar-atributo/${idUser}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ atributo, valor })
            });

            if (res.ok) {
                await showSuccessAlert('¡Éxito!', `Tu ${labelAtributo} ha sido actualizado correctamente.`);
                window.location.reload();
            } else {
                const data = await res.json().catch(() => ({}));
                showErrorAlert('Error', data.error || `No se pudo actualizar tu ${labelAtributo}.`);
            }
        } catch (e) {
            console.error(e);
            showErrorAlert('Error', `No se pudo actualizar tu ${labelAtributo}. Inténtalo de nuevo más tarde.`);
        }
    };

    return { updatePerfilAtribute };
};

export default useUpdatePerfilAtribute;