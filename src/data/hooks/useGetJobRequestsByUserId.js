import {useEffect, useState} from "react";

export default function useGetJobRequestsByUserId(userId) {
    const [jobRequests, setJobRequests] = useState();
    const [loadingJobRequests, setLoadingJobRequests] = useState(true);
    const [errorJobRequests, setErrorJobRequests] = useState(null);

    async function traerSolicitudesDelUsuario(userId){
        if(!userId) return null;

        try{

            const res = await fetch(`http://localhost:3000/job-requests/${userId}`);
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            return await res.json();
        } catch (err){
            console.log('traerSolicitudesDelUsuario error:', err);
            throw err;
        }
    }

    useEffect(() => {
    let mounted = true;
    setLoadingJobRequests(true);
    traerSolicitudesDelUsuario(userId)
        .then(data => {
            if (mounted) setJobRequests(data);
        })
        .catch(err => {
            if (mounted) setErrorJobRequests(err);
        })
        .finally(() => {
            if (mounted) setLoadingJobRequests(false);
        });
    return () => { mounted = false; };
    }, [userId]);

    return {jobRequests, loadingJobRequests, errorJobRequests};


}

