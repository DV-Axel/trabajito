import {
    FaBroom, FaPaintRoller, FaFaucet, FaBolt, FaSnowflake, FaBoxes, FaTruck
} from "react-icons/fa";
import {
    GiBrickWall, GiGardeningShears, GiBabyBottle, GiLockpicks,
    GiBlacksmith, GiGearHammer, GiNurseFemale, GiWoodBeam
} from "react-icons/gi";

//TODO: terminar de hardcodear los sericios y agregar las preguntas especificas de cada uno

export const services = [
    {
        key: "1",
        name: "Aires Acondicionados",
        icon: FaSnowflake,
        questions: [
            {
                key: "tipo_servicio",
                label: "¿Qué tipo de servicio necesitas?",
                type: "select",
                options: [
                    { value: "instalacion", label: "Instalación" },
                    { value: "mantenimiento", label: "Mantenimiento" },
                    { value: "reparacion", label: "Reparación" },
                    { value: "retiro", label: "Retiro" }
                ]
            },
            {
                key: "cantidad_equipos",
                label: "¿Cuántos equipos de aire acondicionado son?",
                type: "number"
            },
            {
                key: "tipo_equipo",
                label: "¿Qué tipo de equipo es?",
                type: "select",
                options: [
                    { value: "split", label: "Split" },
                    { value: "ventana", label: "Ventana" },
                    { value: "central", label: "Central" },
                    { value: "otro", label: "Otro" }
                ]
            },
            {
                key: "capacidad",
                label: "¿Cuál es la capacidad (en frigorías o BTU) de los equipos?",
                type: "text"
            },
            {
                key: "acceso",
                label: "¿El lugar de instalación/reparación es de fácil acceso?",
                type: "select",
                options: [
                    { value: "si", label: "Sí" },
                    { value: "no", label: "No" }
                ]
            },
            {
                key: "requiere_gas",
                label: "¿Se requiere recarga de gas refrigerante?",
                type: "select",
                options: [
                    { value: "si", label: "Sí" },
                    { value: "no", label: "No" }
                ]
            },
            {
                key: "descripcion_adicional",
                label: "¿Hay algo más que debamos saber?",
                type: "textarea"
            }
        ]
    },
    {
        key: "2",
        name: "Albañilería",
        icon: GiBrickWall,
        questions: [
            {
                key: "tipo_trabajo",
                label: "¿Qué tipo de trabajo necesitas?",
                type: "select",
                options: [
                    { value: "construccion", label: "Construcción" },
                    { value: "reparacion", label: "Reparación" },
                    { value: "remodelacion", label: "Remodelación" },
                    { value: "otro", label: "Otro" }
                ]
            },
            {
                key: "superficie",
                label: "¿Cuál es la superficie aproximada (en m²)?",
                type: "number"
            },
            {
                key: "materiales",
                label: "¿Cuentas con los materiales necesarios?",
                type: "select",
                options: [
                    { value: "si", label: "Sí" },
                    { value: "no", label: "No" }
                ]
            },
            {
                key: "acceso",
                label: "¿El lugar es de fácil acceso?",
                type: "select",
                options: [
                    { value: "si", label: "Sí" },
                    { value: "no", label: "No" }
                ]
            },
            {
                key: "descripcion_adicional",
                label: "¿Hay algo más que debamos saber?",
                type: "textarea"
            }
        ]
    }
    ,
    {
        key: "3",
        name: "Carpintero",
        icon: GiWoodBeam,
        questions: [
            {
                key: "tipo_trabajo",
                label: "¿Qué tipo de trabajo necesitas?",
                type: "select",
                options: [
                    { value: "muebles", label: "Fabricación de muebles" },
                    { value: "puertas", label: "Instalación o reparación de puertas" },
                    { value: "ventanas", label: "Instalación o reparación de ventanas" },
                    { value: "pisos", label: "Colocación o reparación de pisos" },
                    { value: "otro", label: "Otro" }
                ]
            },
            {
                key: "material",
                label: "¿Qué tipo de material prefieres?",
                type: "select",
                options: [
                    { value: "madera_maciza", label: "Madera maciza" },
                    { value: "mdf", label: "MDF" },
                    { value: "melamina", label: "Melamina" },
                    { value: "otro", label: "Otro" }
                ]
            },
            {
                key: "dimensiones",
                label: "¿Cuáles son las dimensiones aproximadas (en metros)?",
                type: "text"
            },
            {
                key: "diseno",
                label: "¿Requieres un diseño personalizado?",
                type: "select",
                options: [
                    { value: "si", label: "Sí" },
                    { value: "no", label: "No" }
                ]
            },
            {
                key: "materiales_cliente",
                label: "¿Cuentas con los materiales necesarios?",
                type: "select",
                options: [
                    { value: "si", label: "Sí" },
                    { value: "no", label: "No" }
                ]
            },
            {
                key: "acceso",
                label: "¿El lugar es de fácil acceso?",
                type: "select",
                options: [
                    { value: "si", label: "Sí" },
                    { value: "no", label: "No" }
                ]
            },
            {
                key: "descripcion_adicional",
                label: "¿Hay algo más que debamos saber?",
                type: "textarea"
            }
        ]
    },
    {
        key: "4",
        name: "Cerrajería",
        icon: GiLockpicks,
        questions: [
            {
                key: "tipo_servicio",
                label: "¿Qué tipo de servicio necesitas?",
                type: "select",
                options: [
                    { value: "apertura", label: "Apertura de puerta" },
                    { value: "cambio", label: "Cambio de cerradura" },
                    { value: "instalacion", label: "Instalación de cerradura" },
                    { value: "duplicado", label: "Duplicado de llave" },
                    { value: "otro", label: "Otro" }
                ]
            },
            {
                key: "tipo_cerradura",
                label: "¿Qué tipo de cerradura es?",
                type: "select",
                options: [
                    { value: "puerta", label: "Puerta" },
                    { value: "auto", label: "Auto" },
                    { value: "caja_fuerte", label: "Caja fuerte" },
                    { value: "otro", label: "Otro" }
                ]
            },
            {
                key: "acceso",
                label: "¿El lugar es de fácil acceso?",
                type: "select",
                options: [
                    { value: "si", label: "Sí" },
                    { value: "no", label: "No" }
                ]
            },
            {
                key: "descripcion_adicional",
                label: "¿Hay algo más que debamos saber?",
                type: "textarea"
            }
        ]
    },
    {
        key: "5",
        name: "Cuidados Adultos",
        icon: GiNurseFemale,
        questions: [
            {
                key: "tipo_cuidado",
                label: "¿Qué tipo de cuidado necesitas?",
                type: "select",
                options: [
                    { value: "compañia", label: "Compañía" },
                    { value: "asistencia_personal", label: "Asistencia personal (higiene, alimentación, etc.)" },
                    { value: "enfermeria", label: "Cuidados de enfermería" },
                    { value: "otro", label: "Otro" }
                ]
            },
            {
                key: "horario",
                label: "¿Qué horario necesitas?",
                type: "select",
                options: [
                    { value: "diurno", label: "Diurno" },
                    { value: "nocturno", label: "Nocturno" },
                    { value: "24hs", label: "24 horas" },
                    { value: "por_horas", label: "Por horas" }
                ]
            },
            {
                key: "condiciones_especiales",
                label: "¿La persona requiere atención especial (movilidad reducida, medicación, etc.)?",
                type: "textarea"
            },
            {
                key: "experiencia",
                label: "¿Requiere experiencia o formación específica?",
                type: "select",
                options: [
                    { value: "si", label: "Sí" },
                    { value: "no", label: "No" }
                ]
            },
            {
                key: "descripcion_adicional",
                label: "¿Hay algo más que debamos saber?",
                type: "textarea"
            }
        ]
    },
    {
        key: "6",
        name: "Electricidad",
        icon: FaBolt,
        questions: [
            {
                key: "tipo_trabajo",
                label: "¿Qué tipo de trabajo necesitas?",
                type: "select",
                options: [
                    { value: "instalacion", label: "Instalación" },
                    { value: "reparacion", label: "Reparación" },
                    { value: "mantenimiento", label: "Mantenimiento" }
                ]
            },
            {
                key: "corte_general",
                label: "¿El trabajo requiere corte general de energía?",
                type: "select",
                options: [
                    { value: "si", label: "Sí" },
                    { value: "no", label: "No" }
                ]
            },
            {
                key: "acceso_seguro",
                label: "¿El lugar cuenta con acceso seguro para el trabajo eléctrico?",
                type: "select",
                options: [
                    { value: "si", label: "Sí" },
                    { value: "no", label: "No" }
                ]
            },
            {
                key: "interior_exterior",
                label: "¿El trabajo es en interior o exterior?",
                type: "select",
                options: [
                    { value: "interior", label: "Interior" },
                    { value: "exterior", label: "Exterior" }
                ]
            },
            {
                key: "certificacion",
                label: "¿Se requiere certificación o informe eléctrico?",
                type: "select",
                options: [
                    { value: "si", label: "Sí" },
                    { value: "no", label: "No" }
                ]
            },
            {
                key: "tablero",
                label: "¿Hay acceso a tablero eléctrico?",
                type: "select",
                options: [
                    { value: "si", label: "Sí" },
                    { value: "no", label: "No" }
                ]
            },
            {
                key: "descripcion_adicional",
                label: "¿Hay algo más que debamos saber?",
                type: "textarea"
            }
        ]
    },
    {
        key: "7",
        name: "Herrería",
        icon: GiBlacksmith,
        questions: [
            {
                key: "tipo_trabajo",
                label: "¿Qué tipo de trabajo necesitas?",
                type: "select",
                options: [
                    { value: "rejas", label: "Rejas" },
                    { value: "puertas", label: "Puertas" },
                    { value: "portones", label: "Portones" },
                    { value: "estructuras", label: "Estructuras metálicas" },
                    { value: "otro", label: "Otro" }
                ]
            },
            {
                key: "material",
                label: "¿Qué material prefieres?",
                type: "select",
                options: [
                    { value: "hierro", label: "Hierro" },
                    { value: "acero", label: "Acero" },
                    { value: "aluminio", label: "Aluminio" },
                    { value: "otro", label: "Otro" }
                ]
            },
            {
                key: "dimensiones",
                label: "¿Cuáles son las dimensiones aproximadas (en metros)?",
                type: "text"
            },
            {
                key: "acabado",
                label: "¿Qué tipo de acabado deseas?",
                type: "select",
                options: [
                    { value: "pintura", label: "Pintura" },
                    { value: "galvanizado", label: "Galvanizado" },
                    { value: "sin_acabado", label: "Sin acabado" }
                ]
            },
            {
                key: "materiales_cliente",
                label: "¿Cuentas con los materiales necesarios?",
                type: "select",
                options: [
                    { value: "si", label: "Sí" },
                    { value: "no", label: "No" }
                ]
            },
            {
                key: "acceso",
                label: "¿El lugar es de fácil acceso?",
                type: "select",
                options: [
                    { value: "si", label: "Sí" },
                    { value: "no", label: "No" }
                ]
            },
            {
                key: "descripcion_adicional",
                label: "¿Hay algo más que debamos saber?",
                type: "textarea"
            }
        ]
    }
    ,
    {
        key: "8",
        name: "Jardinería",
        icon: GiGardeningShears,
        questions: [
            {
                key: "tipo_trabajo",
                label: "¿Qué tipo de trabajo necesitas?",
                type: "select",
                options: [
                    { value: "mantenimiento", label: "Mantenimiento" },
                    { value: "poda", label: "Poda" },
                    { value: "corte_cesped", label: "Corte de césped" },
                    { value: "diseño", label: "Diseño de jardín" },
                    { value: "riego", label: "Instalación o reparación de riego" },
                    { value: "otro", label: "Otro" }
                ]
            },
            {
                key: "superficie",
                label: "¿Cuál es la superficie aproximada (en m²)?",
                type: "number"
            },
            {
                key: "frecuencia",
                label: "¿Con qué frecuencia necesitas el servicio?",
                type: "select",
                options: [
                    { value: "una_vez", label: "Una vez" },
                    { value: "semanal", label: "Semanal" },
                    { value: "quincenal", label: "Quincenal" },
                    { value: "mensual", label: "Mensual" }
                ]
            },
            {
                key: "materiales_cliente",
                label: "¿Cuentas con herramientas o materiales necesarios?",
                type: "select",
                options: [
                    { value: "si", label: "Sí" },
                    { value: "no", label: "No" }
                ]
            },
            {
                key: "acceso",
                label: "¿El lugar es de fácil acceso?",
                type: "select",
                options: [
                    { value: "si", label: "Sí" },
                    { value: "no", label: "No" }
                ]
            },
            {
                key: "descripcion_adicional",
                label: "¿Hay algo más que debamos saber?",
                type: "textarea"
            }
        ]
    },
    {
        key: "9",
        name: "Limpieza",
        icon: FaBroom,
        questions: [
            {
                key: "tipo_limpieza",
                label: "¿Qué tipo de limpieza necesitas?",
                type: "select",
                options: [
                    { value: "hogar", label: "Limpieza de hogar" },
                    { value: "oficina", label: "Limpieza de oficina" },
                    { value: "profunda", label: "Limpieza profunda" },
                    { value: "post_obra", label: "Limpieza post-obra" },
                    { value: "otro", label: "Otro" }
                ]
            },
            {
                key: "superficie",
                label: "¿Cuál es la superficie aproximada (en m²)?",
                type: "number"
            },
            {
                key: "frecuencia",
                label: "¿Con qué frecuencia necesitas el servicio?",
                type: "select",
                options: [
                    { value: "una_vez", label: "Una vez" },
                    { value: "semanal", label: "Semanal" },
                    { value: "quincenal", label: "Quincenal" },
                    { value: "mensual", label: "Mensual" }
                ]
            },
            {
                key: "materiales_cliente",
                label: "¿Cuentas con los materiales y productos de limpieza necesarios?",
                type: "select",
                options: [
                    { value: "si", label: "Sí" },
                    { value: "no", label: "No" }
                ]
            },
            {
                key: "acceso",
                label: "¿El lugar es de fácil acceso?",
                type: "select",
                options: [
                    { value: "si", label: "Sí" },
                    { value: "no", label: "No" }
                ]
            },
            {
                key: "descripcion_adicional",
                label: "¿Hay algo más que debamos saber?",
                type: "textarea"
            }
        ]
    },
    {
        key: "10",
        name: "Logística",
        icon: FaBoxes,
        questions: [
            {
                key: "tipo_servicio",
                label: "¿Qué tipo de servicio logístico necesitas?",
                type: "select",
                options: [
                    { value: "transporte", label: "Transporte" },
                    { value: "almacenaje", label: "Almacenaje" },
                    { value: "distribucion", label: "Distribución" },
                    { value: "otro", label: "Otro" }
                ]
            },
            {
                key: "tipo_carga",
                label: "¿Qué tipo de carga necesitas trasladar o almacenar?",
                type: "select",
                options: [
                    { value: "mercaderia", label: "Mercadería general" },
                    { value: "fragil", label: "Frágil" },
                    { value: "peligrosa", label: "Peligrosa" },
                    { value: "alimentos", label: "Alimentos" },
                    { value: "otro", label: "Otro" }
                ]
            },
            {
                key: "volumen_peso",
                label: "¿Cuál es el volumen o peso aproximado de la carga?",
                type: "text"
            },
            {
                key: "origen",
                label: "¿Cuál es el lugar de origen?",
                type: "text"
            },
            {
                key: "destino",
                label: "¿Cuál es el destino?",
                type: "text"
            },
            {
                key: "requiere_embalaje",
                label: "¿Requieres servicio de embalaje?",
                type: "select",
                options: [
                    { value: "si", label: "Sí" },
                    { value: "no", label: "No" }
                ]
            },
            {
                key: "acceso",
                label: "¿El lugar de carga/descarga es de fácil acceso?",
                type: "select",
                options: [
                    { value: "si", label: "Sí" },
                    { value: "no", label: "No" }
                ]
            },
            {
                key: "descripcion_adicional",
                label: "¿Hay algo más que debamos saber?",
                type: "textarea"
            }
        ]
    },
    {
        key: "11",
        name: "Mudanzas",
        icon: FaTruck,
        questions: [
            {
                key: "tipo_mudanza",
                label: "¿Qué tipo de mudanza necesitas?",
                type: "select",
                options: [
                    { value: "hogar", label: "Mudanza de hogar" },
                    { value: "oficina", label: "Mudanza de oficina" },
                    { value: "local", label: "Mudanza de local comercial" },
                    { value: "otro", label: "Otro" }
                ]
            },
            {
                key: "volumen_peso",
                label: "¿Cuál es el volumen o peso aproximado de la mudanza?",
                type: "text"
            },
            {
                key: "origen",
                label: "¿Cuál es el lugar de origen?",
                type: "text"
            },
            {
                key: "destino",
                label: "¿Cuál es el destino?",
                type: "text"
            },
            {
                key: "requiere_embalaje",
                label: "¿Requieres servicio de embalaje?",
                type: "select",
                options: [
                    { value: "si", label: "Sí" },
                    { value: "no", label: "No" }
                ]
            },
            {
                key: "objetos_fragiles",
                label: "¿Hay objetos frágiles o de valor?",
                type: "select",
                options: [
                    { value: "si", label: "Sí" },
                    { value: "no", label: "No" }
                ]
            },
            {
                key: "acceso",
                label: "¿El lugar de carga/descarga es de fácil acceso?",
                type: "select",
                options: [
                    { value: "si", label: "Sí" },
                    { value: "no", label: "No" }
                ]
            },
            {
                key: "descripcion_adicional",
                label: "¿Hay algo más que debamos saber?",
                type: "textarea"
            }
        ]
    },
    {
        key: "12",
        name: "Niñera",
        icon: GiBabyBottle,
        questions: [
            {
                key: "cantidad_ninos",
                label: "¿Cuántos niños necesitan cuidado?",
                type: "number"
            },
            {
                key: "edades",
                label: "¿Qué edades tienen los niños?",
                type: "text"
            },
            {
                key: "horario",
                label: "¿Qué horario necesitas?",
                type: "select",
                options: [
                    { value: "manana", label: "Mañana" },
                    { value: "tarde", label: "Tarde" },
                    { value: "noche", label: "Noche" },
                    { value: "por_horas", label: "Por horas" },
                    { value: "fijo", label: "Fijo" }
                ]
            },
            {
                key: "tareas",
                label: "¿Qué tareas debe realizar la niñera?",
                type: "checkbox",
                options: [
                    { value: "alimentacion", label: "Alimentación" },
                    { value: "higiene", label: "Higiene y cambio de pañales" },
                    { value: "juegos", label: "Juegos y entretenimiento" },
                    { value: "ayuda_tareas", label: "Ayuda con tareas escolares" },
                    { value: "otro", label: "Otro" }
                ]
            },
            {
                key: "mascotas",
                label: "¿Hay mascotas en el hogar?",
                type: "select",
                options: [
                    { value: "si", label: "Sí" },
                    { value: "no", label: "No" }
                ]
            },
            {
                key: "acceso",
                label: "¿El lugar es de fácil acceso?",
                type: "select",
                options: [
                    { value: "si", label: "Sí" },
                    { value: "no", label: "No" }
                ]
            },
            {
                key: "descripcion_adicional",
                label: "¿Hay algo más que debamos saber?",
                type: "textarea"
            }
        ]
    },
    {
        key: "13",
        name: "Pintura",
        icon: FaPaintRoller,
        questions: [
            {
                key: "tipo_trabajo",
                label: "¿Qué tipo de trabajo de pintura necesitas?",
                type: "select",
                options: [
                    { value: "interior", label: "Interior" },
                    { value: "exterior", label: "Exterior" },
                    { value: "rejas", label: "Rejas/Metales" },
                    { value: "madera", label: "Madera" },
                    { value: "otro", label: "Otro" }
                ]
            },
            {
                key: "superficie",
                label: "¿Cuál es la superficie aproximada a pintar (en m²)?",
                type: "number"
            },
            {
                key: "tipo_pintura",
                label: "¿Qué tipo de pintura prefieres?",
                type: "select",
                options: [
                    { value: "latex", label: "Látex" },
                    { value: "sintetico", label: "Sintético" },
                    { value: "esmalte", label: "Esmalte" },
                    { value: "impermeabilizante", label: "Impermeabilizante" },
                    { value: "otro", label: "Otro" }
                ]
            },
            {
                key: "color",
                label: "¿Qué color o colores deseas?",
                type: "text"
            },
            {
                key: "materiales_cliente",
                label: "¿Cuentas con los materiales y pintura necesarios?",
                type: "select",
                options: [
                    { value: "si", label: "Sí" },
                    { value: "no", label: "No" }
                ]
            },
            {
                key: "acceso",
                label: "¿El lugar es de fácil acceso?",
                type: "select",
                options: [
                    { value: "si", label: "Sí" },
                    { value: "no", label: "No" }
                ]
            },
            {
                key: "descripcion_adicional",
                label: "¿Hay algo más que debamos saber?",
                type: "textarea"
            }
        ]
    },
    {
        key: "14",
        name: "Plomería",
        icon: FaFaucet,
        questions: [
            {
                key: "tipo_trabajo",
                label: "¿Qué tipo de trabajo de plomería necesitas?",
                type: "select",
                options: [
                    { value: "reparacion", label: "Reparación" },
                    { value: "instalacion", label: "Instalación" },
                    { value: "destape", label: "Destape de cañerías" },
                    { value: "fuga", label: "Fuga de agua/gas" },
                    { value: "otro", label: "Otro" }
                ]
            },
            {
                key: "ubicacion_problema",
                label: "¿En qué ambiente se encuentra el problema (baño, cocina, lavadero, etc.)?",
                type: "text"
            },
            {
                key: "elemento_afectado",
                label: "¿Qué elemento está afectado (caño, grifería, inodoro, bidet, etc.)?",
                type: "text"
            },
            {
                key: "filtracion_visible",
                label: "¿Hay filtración o humedad visible?",
                type: "select",
                options: [
                    { value: "si", label: "Sí" },
                    { value: "no", label: "No" }
                ]
            },
            {
                key: "requiere_corte_agua",
                label: "¿Se requiere corte general de agua para el trabajo?",
                type: "select",
                options: [
                    { value: "si", label: "Sí" },
                    { value: "no", label: "No" },
                    { value: "no_sabe", label: "No sabe" }
                ]
            },
            {
                key: "materiales_cliente",
                label: "¿Cuentas con los materiales necesarios?",
                type: "select",
                options: [
                    { value: "si", label: "Sí" },
                    { value: "no", label: "No" }
                ]
            },
            {
                key: "acceso",
                label: "¿El lugar es de fácil acceso?",
                type: "select",
                options: [
                    { value: "si", label: "Sí" },
                    { value: "no", label: "No" }
                ]
            },
            {
                key: "descripcion_adicional",
                label: "¿Hay algo más que debamos saber?",
                type: "textarea"
            }
        ]
    }
    ,
    { key: "15", name: "Tornería", icon: GiGearHammer },
];



export const traerIdServicio = (id) => {
    const servicio = services.find(s => String(s.key) === String(id));
    return servicio ? servicio.name : "Servicio Desconocido";
}
