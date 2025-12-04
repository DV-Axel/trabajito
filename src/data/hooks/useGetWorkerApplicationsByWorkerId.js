import { useEffect, useState } from "react";

export default function useGetWorkerApplicationsByWorkerId(id) {
    const [applicationsWorker, setapplicationsWorker] = useState();
    const [loadingapplicationsWorker, setLoadingapplicationsWorker] = useState(true);
    const [errorapplicationsWorker, setErrorapplicationsWorker] = useState(null);

    async function traerPostulaciones(id) {
        if (!id) return null;
        try {
            const res = await fetch(`http://localhost:3000/workers/postulaciones-idWorker/${id}`);
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            return await res.json();
        } catch (err) {
            console.error('traerApplication error:', err);
            throw err;
        }
    }

    useEffect(() => {
        let mounted = true;
        setLoadingapplicationsWorker(true);
        traerPostulaciones(id)
            .then(data => {
                if (mounted) setapplicationsWorker(data);
            })
            .catch(err => {
                if (mounted) setErrorapplicationsWorker(err);
            })
            .finally(() => {
                if (mounted) setLoadingapplicationsWorker(false);
            });
        return () => { mounted = false; };
    }, [id]);

    return { applicationsWorker, loadingapplicationsWorker, errorapplicationsWorker };

}