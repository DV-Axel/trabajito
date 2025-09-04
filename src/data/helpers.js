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