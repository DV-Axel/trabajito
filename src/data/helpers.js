import { jwtDecode } from 'jwt-decode';

//Dias de la semana.
export const diasSemana = [
    { value: "lunes", label: "Lunes" },
    { value: "martes", label: "Martes" },
    { value: "miercoles", label: "Miércoles" },
    { value: "jueves", label: "Jueves" },
    { value: "viernes", label: "Viernes" },
    { value: "sabado", label: "Sábado" },
    { value: "domingo", label: "Domingo" },
];

//Horarios disponibles
export const horarios = [
    { value: "manana", label: "Mañana (8-12)" },
    { value: "tarde", label: "Tarde (12-18)" },
    { value: "noche", label: "Noche (18-22)" },
];

//Calculo de feha minima de servicio
//no pueden ser ni el mismo dia ni dias anteriores
const mañana = new Date() //le asigno TEMPORALMENTE la fecha de hoy
mañana.setDate(mañana.getDate() + 1);
export const fechaMinima = mañana.toISOString().split('T')[0]; // Formato YYYY-MM-DD


// Obtener userId del token
export const getUserIdFromToken = () => {
    const token = localStorage.getItem('token');
    if (token) {
        try {
            const decoded = jwtDecode(token);
            return decoded.id || decoded.userId || decoded.sub;
        } catch {
            return null;
        }
    }
    return null;
};


// Formatear Locacion
export const formatearLocacion = (location) => {
    const {road, house_number, town, state_district, state, postcode} = location;
    if (!location) return 'Ubicación no disponible';

    return `${road} ${house_number}, ${postcode} - ${town}, ${state_district}, ${state} `;
}

// Formatear fecha DD-MM-YYYY
export const formatDate = (dateString) => {
    if (!dateString) return '';
    const [year, month, day] = dateString.slice(0, 10).split('-');
    return `${day}-${month}-${year}`;
};