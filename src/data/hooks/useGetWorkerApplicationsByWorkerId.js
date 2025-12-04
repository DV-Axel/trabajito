import { useEffect, useState } from "react";

export default function useGetWorkerApplicationsByWorkerId(id) {
    const [jobRequestsAppliedsByWorker, setJobRequestsAppliedsByWorker] = useState();
    const [loadingJobRequestsAppliedsByWorker, setLoadingJobRequestsAppliedsByWorker] = useState(true);
    const [errorJobRequestsAppliedsByWorker, setErrorJobRequestsAppliedsByWorker] = useState(null);

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
        setLoadingJobRequestsAppliedsByWorker(true);
        traerPostulaciones(id)
            .then(data => {
                if (mounted) setJobRequestsAppliedsByWorker(data);
            })
            .catch(err => {
                if (mounted) setErrorJobRequestsAppliedsByWorker(err);
            })
            .finally(() => {
                if (mounted) setLoadingJobRequestsAppliedsByWorker(false);
            });
        return () => { mounted = false; };
    }, [id]);

    return { jobRequestsAppliedsByWorker, loadingJobRequestsAppliedsByWorker, errorJobRequestsAppliedsByWorker };

}