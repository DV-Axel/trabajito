import { useEffect, useState } from 'react';

export default function useGetJobRequest(id) {
    const [servicio, setServicio] = useState(null);
    const [loadingServicio, setLoadingServicio] = useState(true);
    const [errorServicio, setErrorServicio] = useState(null);

    // Función interna para traer el servicio
    async function traerServicio(id) {
        if (!id) return null;
        try {
            const res = await fetch(`http://localhost:3000/job-requests/detalle/${id}`);
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            return await res.json();
        } catch (err) {
            console.error('traerServicio error:', err);
            throw err;
        }
    }

    useEffect(() => {
        let mounted = true;
        setLoadingServicio(true);
        traerServicio(id)
            .then(data => {
                if (mounted) setServicio(data);
            })
            .catch(err => {
                if (mounted) setErrorServicio(err);
            })
            .finally(() => {
                if (mounted) setLoadingServicio(false);
            });
        return () => { mounted = false; };
    }, [id]);

    return { servicio, loadingServicio, errorServicio };
}
