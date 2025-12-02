import { jwtDecode } from 'jwt-decode';

// Provincias de Argentina.
export const provinciasArgentina = [
    { value: "Ciudad Autónoma de Buenos Aires", label: "Ciudad Autónoma de Buenos Aires" },
    { value: "Buenos Aires", label: "Buenos Aires" },
    { value: "Catamarca", label: "Catamarca" },
    { value: "Chaco", label: "Chaco" },
    { value: "Chubut", label: "Chubut" },
    { value: "Córdoba", label: "Córdoba" },
    { value: "Corrientes", label: "Corrientes" },
    { value: "Entre Ríos", label: "Entre Ríos" },
    { value: "Formosa", label: "Formosa" },
    { value: "Jujuy", label: "Jujuy" },
    { value: "La Pampa", label: "La Pampa" },
    { value: "La Rioja", label: "La Rioja" },
    { value: "Mendoza", label: "Mendoza" },
    { value: "Misiones", label: "Misiones" },
    { value: "Neuquén", label: "Neuquén" },
    { value: "Río Negro", label: "Río Negro" },
    { value: "Salta", label: "Salta" },
    { value: "San Juan", label: "San Juan" },
    { value: "San Luis", label: "San Luis" },
    { value: "Santa Cruz", label: "Santa Cruz" },
    { value: "Santa Fe", label: "Santa Fe" },
    { value: "Santiago del Estero", label: "Santiago del Estero" },
    { value: "Tierra del Fuego", label: "Tierra del Fuego" },
    { value: "Tucumán", label: "Tucumán" }
];


//Dias de la semana.
export const diasSemana = [
    { value: "Lunes", label: "Lunes" },
    { value: "Martes", label: "Martes" },
    { value: "Miércoles", label: "Miércoles" },
    { value: "Jueves", label: "Jueves" },
    { value: "Viernes", label: "Viernes" },
    { value: "Sábado", label: "Sábado" },
    { value: "Domingo", label: "Domingo" },
];

//Horarios disponibles
export const horarios = [
    { value: "Mañana (8-12)", label: "Mañana (8-12)" },
    { value: "Tarde (12-18)", label: "Tarde (12-18)" },
    { value: "Noche (18-22)", label: "Noche (18-22)" },
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
    const {road, house_number, city, state, postcode, country} = location;
    if (!location) return 'Ubicación no disponible';
    //console.log(location);
    return `${road} ${house_number}, ${postcode} - ${city}, ${state} - ${country}`;
}

// Formatear fecha DD-MM-YYYY
export const formatDate = (dateString) => {
    if (!dateString) return '';
    const [year, month, day] = dateString.slice(0, 10).split('-');
    return `${day}-${month}-${year}`;
};


//Validador para inputs numéricos en formularios
export const handleNumericInputChange = (e, form, setForm, numericFields = []) => {
    const { name, value } = e.target;
    if (numericFields.includes(name)) {
        if (/^\d*$/.test(value)) {
            setForm({ ...form, [name]: value });
        }
    } else {
        setForm({ ...form, [name]: value });
    }
};

