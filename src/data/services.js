import {
    FaBroom, FaPaintRoller, FaFaucet, FaBolt, FaSnowflake, FaBoxes, FaTruck
} from "react-icons/fa";
import {
    GiBrickWall, GiGardeningShears, GiBabyBottle, GiLockpicks,
    GiBlacksmith, GiGearHammer, GiNurseFemale, GiWoodBeam
} from "react-icons/gi";

//TODO: terminar de hardcodear los sericios y agregar las preguntas especificas de cada uno

export const services = [
    { key: "aires", name: "Aires Acondicionados", icon: FaSnowflake },
    { key: "albanileria", name: "Albañilería", icon: GiBrickWall },
    { key: "carpintero", name: "Carpintero", icon: GiWoodBeam },
    { key: "cerrajeria", name: "Cerrajería", icon: GiLockpicks },
    { key: "cuidados_adultos", name: "Cuidados Adultos", icon: GiNurseFemale },
    {
        key: "electricidad",
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
                key: "tipo_propiedad",
                label: "¿Qué tipo de propiedad es?",
                type: "select",
                options: [
                    { value: "casa", label: "Casa" },
                    { value: "departamento", label: "Departamento" },
                    { value: "local", label: "Local comercial" },
                    { value: "otro", label: "Otro" }
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
                key: "antecedentes",
                label: "¿Hay antecedentes de problemas eléctricos previos en el lugar?",
                type: "textarea"
            },
            {
                key: "tablero",
                label: "¿Hay acceso a tablero eléctrico?",
                type: "select",
                options: [
                    { value: "si", label: "Sí" },
                    { value: "no", label: "No" }
                ]
            }
        ]
    },
    { key: "herrería", name: "Herrería", icon: GiBlacksmith },
    { key: "jardineria", name: "Jardinería", icon: GiGardeningShears },
    { key: "limpieza", name: "Limpieza", icon: FaBroom },
    { key: "logistica", name: "Logística", icon: FaBoxes },
    { key: "mudanzas", name: "Mudanzas", icon: FaTruck },
    { key: "ninera", name: "Niñera", icon: GiBabyBottle },
    { key: "pintura", name: "Pintura", icon: FaPaintRoller },
    { key: "plomeria", name: "Plomería", icon: FaFaucet },
    { key: "tornería", name: "Tornería", icon: GiGearHammer },
];