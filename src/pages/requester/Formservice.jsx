import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { services } from "../../data/services.js";

const Formservice = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const service = services.find(s => s.key === state?.serviceKey);

    useEffect(() => {
        if (!service) {
            navigate("/solicitar");
        }
    }, [service, navigate]);

    if (!service) return null;

    return (
        <div>
            <h1>Formulario para: {service.name}</h1>
            {/* Resto del formulario */}
        </div>
    );
};

export default Formservice;