import { jwtDecode } from 'jwt-decode';

// Provincias de Argentina.
export const provinciasArgentina = [
    { value: "capital_federal", label: "Ciudad Autónoma de Buenos Aires" },
    { value: "buenos_aires", label: "Buenos Aires" },
    { value: "catamarca", label: "Catamarca" },
    { value: "chaco", label: "Chaco" },
    { value: "chubut", label: "Chubut" },
    { value: "cordoba", label: "Córdoba" },
    { value: "corrientes", label: "Corrientes" },
    { value: "entre_rios", label: "Entre Ríos" },
    { value: "formosa", label: "Formosa" },
    { value: "jujuy", label: "Jujuy" },
    { value: "la_pampa", label: "La Pampa" },
    { value: "la_rioja", label: "La Rioja" },
    { value: "mendoza", label: "Mendoza" },
    { value: "misiones", label: "Misiones" },
    { value: "neuquen", label: "Neuquén" },
    { value: "rio_negro", label: "Río Negro" },
    { value: "salta", label: "Salta" },
    { value: "san_juan", label: "San Juan" },
    { value: "san_luis", label: "San Luis" },
    { value: "santa_cruz", label: "Santa Cruz" },
    { value: "santa_fe", label: "Santa Fe" },
    { value: "santiago_del_estero", label: "Santiago del Estero" },
    { value: "tierra_del_fuego", label: "Tierra del Fuego" },
    { value: "tucuman", label: "Tucumán" }
];


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
    const {road, house_number, suburb, town, state_district, state, postcode} = location;
    if (!location) return 'Ubicación no disponible';
    //console.log(location);
    return `${road} ${house_number}, ${postcode} - ${suburb}, ${state_district}, ${state} `;
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

