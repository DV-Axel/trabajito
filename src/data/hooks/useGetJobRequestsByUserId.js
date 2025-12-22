import {useEffect, useState} from "react";

export default function useGetJobRequestsByUserId(userId) {
    const [jobRequests, setJobRequests] = useState();
    const [loadingJobRequests, setLoadingJobRequests] = useState(true);
    const [errorJobRequests, setErrorJobRequests] = useState(null);

    // async function traerSolicitudesDelUsuario(userId){
    //     if(!userId) return null;

    //     try{

    //         const res = await fetch(`http://localhost:3000/job-requests/${userId}`);
    //         if (!res.ok) throw new Error(`HTTP ${res.status}`);
    //         return await res.json();
    //     } catch (err){
    //         console.log('traerSolicitudesDelUsuario error:', err);
    //         throw err;
    //     }
    // }

    // useEffect(() => {
    // let mounted = true;
    // setLoadingJobRequests(true);
    // traerSolicitudesDelUsuario(userId)
    //     .then(data => {
    //         if (mounted) setJobRequests(data);
    //     })
    //     .catch(err => {
    //         if (mounted) setErrorJobRequests(err);
    //     })
    //     .finally(() => {
    //         if (mounted) setLoadingJobRequests(false);
    //     });
    // return () => { mounted = false; };
    // }, [userId]);

    // return {jobRequests, loadingJobRequests, errorJobRequests};
        async function traerSolicitudesDelUsuario(userId){
        if(!userId) return { jobRequests: [], message: null };

        try{
            const res = await fetch(`http://localhost:3000/job-requests/${userId}`);
            const text = await res.text();
            let data;
            try { data = JSON.parse(text); } catch { data = text; }

            if (res.status === 404) {
                return { jobRequests: [], message: data?.error || 'No se encontraron solicitudes' };
            }
            if (!res.ok) throw new Error(`HTTP ${res.status}`);

            // backend puede devolver un array o { jobRequests, message }
            if (Array.isArray(data)) return { jobRequests: data, message: null };
            return { jobRequests: data.jobRequests || [], message: data.message || null };
        } catch (err){
            console.log('traerSolicitudesDelUsuario error:', err);
            throw err;
        }
    }

    useEffect(() => {
        let mounted = true;
        setLoadingJobRequests(true);

        traerSolicitudesDelUsuario(userId)
            .then(({ jobRequests, message }) => {
                if (!mounted) return;
                setJobRequests(Array.isArray(jobRequests) ? jobRequests : []);
                // opcional: mostrar mensaje en UI
                if (message) setInfoMessage?.(message);
                setErrorJobRequests(null);
            })
            .catch(err => {
                if (mounted) setErrorJobRequests(err);
            })
            .finally(() => {
                if (mounted) setLoadingJobRequests(false);
            });

        return () => { mounted = false; };
    }, [userId]);

    return { jobRequests, loadingJobRequests, errorJobRequests };
}

