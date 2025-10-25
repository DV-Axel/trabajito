import { useEffect, useState } from 'react';

export default function useGetApplicationbyId (id) {
    const [application, setApplication] = useState(null);
    const [loadingApplication, setLoadingApplication] = useState(true);
    const [errorApplication, setErrorApplication] = useState(null);


    async function traerApplication(id) {
        if(!id) return null;
        try {
            const res = await fetch(`http://localhost:3000/job-requests/postulacion-worker/${id}`);
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            return await res.json();
        } catch (err) {
            console.error('traerApplication error:', err);
            throw err;
        }
    }

    useEffect(() => {
        let mounted = true;
        setLoadingApplication(true);
        traerApplication(id)
            .then(data => {
                if (mounted) setApplication(data);
            })
            .catch(err => {
                if (mounted) setErrorApplication(err);
            })
            .finally(() => {
                if (mounted) setLoadingApplication(false);
            });
        return () => { mounted = false; };
    }, [id]);

    return {application, loadingApplication, errorApplication};


}