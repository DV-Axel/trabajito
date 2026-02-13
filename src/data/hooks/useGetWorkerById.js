import {useEffect, useState} from 'react';

export default function useGetWorkerById(id) {
    const [worker, setWorker] = useState(null);
    const [loadingWorker, setLoadingWorker] = useState(true);
    const [errorWorker, setErrorWorker] = useState(null);

    // Funcion interna para traer al worker
    async function traerWorker(id) {
        if (!id) return null;
        try {
            const res = await fetch(`http://localhost:3000/workers/traer-worker/${id}`);
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            return await res.json();
        } catch (err) {
            console.error('traerWorker error:', err);
            throw err;
        }
    }

    useEffect(() => {
        let mounted = true;
        setLoadingWorker(true);
        traerWorker(id)
            .then(data => {
                if (mounted) setWorker(data);
            })
            .catch(err => {
                if (mounted) setErrorWorker(err);
            })
            .finally(() => {
                if (mounted) setLoadingWorker(false);
            });
        return () => { mounted = false; };
    }, [id]);

    return {worker, loadingWorker, errorWorker};
}