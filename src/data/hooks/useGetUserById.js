import { useState, useEffect } from 'react';

export default function useGetUserById (id) {
    const [user, setUser] = useState(null);
    const [loadingUser, setLoadingUser] = useState(true);
    const [errorUser, setErrorUser] = useState(null);

    async function traerUsuario(id) {
        if(!id) return null;
        try {
            const res = await fetch(`http://localhost:3000/users/${id}`);
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            return await res.json();
        } catch (err) {
            console.error('traerApplication error:', err);
            throw err;
        }
    }

    useEffect(() => {
        let mounted = true;
        setLoadingUser(true);
        traerUsuario(id)
            .then(data => {
                if (mounted) setUser(data);
            })
            .catch(err => {
                if (mounted) setErrorUser(err);
            })
            .finally(() => {
                if (mounted) setLoadingUser(false);
            });
        return () => { mounted = false; };
    }, [id]);


    return {user, loadingUser, errorUser};
}

