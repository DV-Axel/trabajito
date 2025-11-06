import { useState } from 'react';
import { showSuccessAlert, showErrorAlert } from "../../components/alerts/sweetAlertsComponents.jsx";


export default function useSetNewProfilePictureUser(userId) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const cambiarFotoPerfilUser = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setLoading(true);
        setError(null);
        const formData = new FormData();
        formData.append('profilePicture', file);

        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`http://localhost:3000/users/profile-picture/${userId}`, {
                method: 'PUT',
                body: formData,
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) throw new Error('Error al subir la foto');
            await response.json();
            await showSuccessAlert('¡Foto actualizada!', 'Tu foto de perfil se actualizó correctamente.');
            window.location.reload();
        } catch (err) {
            setError(err);
            showErrorAlert('Error al subir la foto', 'No se pudo actualizar la foto de perfil.');
        } finally {
            setLoading(false);
        }
    };

    return { cambiarFotoPerfilUser, loading, error };
}