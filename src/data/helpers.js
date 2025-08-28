//Calculo de feha minima de servicio
//no pueden ser ni el mismo dia ni dias anteriores
const mañana = new Date() //le asigno TEMPORALMENTE la fecha de hoy
mañana.setDate(mañana.getDate() + 1);
export const fechaMinima = mañana.toISOString().split('T')[0]; // Formato YYYY-MM-DD