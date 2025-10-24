import { useEffect, useState } from "react";

export default function useGetApplicationsById(id) {
    const [applications, setApplications] = useState();
    const [loadingApplications, setLoadingApplications] = useState(true);
    const [errorApplications, setErrorApplications] = useState(null);

    async function traerPostulaciones(id) {
        if (!id) return null;
        try {
            const res = await fetch(`http://localhost:3000/job-requests/postulaciones-workers/${id}`);
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            return await res.json();
        } catch (err) {
            console.error('traerApplication error:', err);
            throw err;
        }
    }

    useEffect(() => {
        let mounted = true;
        setLoadingApplications(true);
        traerPostulaciones(id)
            .then(data => {
                if (mounted) setApplications(data);
            })
            .catch(err => {
                if (mounted) setErrorApplications(err);
            })
            .finally(() => {
                if (mounted) setLoadingApplications(false);
            });
        return () => { mounted = false; };
    }, [id]);

    return { applications, loadingApplications, errorApplications };
}
