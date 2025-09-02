import { useState } from "react";

const rubrosDisponibles = [
    { value: "electricidad", label: "Electricidad" },
    { value: "plomeria", label: "Plomería" },
    { value: "pintura", label: "Pintura" },
    { value: "gas", label: "Gas" },
    { value: "albañileria", label: "Albañilería" },
];

const diasSemana = [
    { value: "lunes", label: "Lunes" },
    { value: "martes", label: "Martes" },
    { value: "miercoles", label: "Miércoles" },
    { value: "jueves", label: "Jueves" },
    { value: "viernes", label: "Viernes" },
    { value: "sabado", label: "Sábado" },
    { value: "domingo", label: "Domingo" },
];

const horarios = [
    { value: "manana", label: "Mañana (8-12)" },
    { value: "tarde", label: "Tarde (12-18)" },
    { value: "noche", label: "Noche (18-22)" },
];

const FormWorker = () => {
    const [form, setForm] = useState({
        nombre: "",
        subtitulo: "",
        descripcion: "",
        ubicaciones: "",
        radio: "",
        dias: [],
        horarios: [],
        rubros: [],
        rubroPrincipal: "",
        foto: null,
    });
    const [preview, setPreview] = useState(null);

    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target;
        if (type === "checkbox") {
            setForm((prev) => ({
                ...prev,
                [name]: checked
                    ? [...prev[name], value]
                    : prev[name].filter((v) => v !== value),
            }));
        } else if (type === "file") {
            setForm((prev) => ({
                ...prev,
                foto: files[0],
            }));
            if (files[0]) {
                setPreview(URL.createObjectURL(files[0]));
            } else {
                setPreview(null);
            }
        } else {
            setForm((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    const handleRubrosChange = (e) => {
        const { value, checked } = e.target;
        let nuevosRubros = checked
            ? [...form.rubros, value]
            : form.rubros.filter((v) => v !== value);
        setForm((prev) => ({
            ...prev,
            rubros: nuevosRubros,
            rubroPrincipal: nuevosRubros.includes(prev.rubroPrincipal)
                ? prev.rubroPrincipal
                : "",
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Aquí va la lógica para enviar el formulario
        console.log(form);
    };

    return (
        <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-8 mt-8">
            <h1 className="text-2xl font-bold mb-6 text-center">¡Completa tu perfil de WORKER!</h1>
            <form className="space-y-5" onSubmit={handleSubmit}>
                {/* Foto de perfil */}
                <div className="flex flex-col items-center">
                    <label className="mb-1 font-medium">Foto de perfil</label>
                    {preview && (
                        <img
                            src={preview}
                            alt="Preview"
                            className="w-24 h-24 rounded-full object-cover mb-2 border"
                        />
                    )}
                    <input
                        type="file"
                        name="foto"
                        accept="image/*"
                        onChange={handleChange}
                        className="mb-2"
                    />
                </div>
                {/* Subtítulo */}
                <div className="flex flex-col">
                    <label className="mb-1 font-medium">Subtítulo para tu perfil</label>
                    <input
                        type="text"
                        name="subtitulo"
                        value={form.subtitulo}
                        onChange={handleChange}
                        className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder='Ej: "Albañil experimentado", "Electricista matriculado", etc.'
                        required
                    />
                </div>
                {/* Descripción */}
                <div className="flex flex-col">
                    <label className="mb-1 font-medium">Descripción de tu perfil</label>
                    <textarea
                        name="descripcion"
                        value={form.descripcion}
                        onChange={handleChange}
                        rows={3}
                        className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
                        placeholder="Contanos sobre tu experiencia, habilidades, etc."
                        required
                    />
                </div>
                {/* Ubicaciones */}
                <div className="flex flex-col">
                    <label className="mb-1 font-medium">Ubicaciones donde trabajás</label>
                    <input
                        type="text"
                        name="ubicaciones"
                        value={form.ubicaciones}
                        onChange={handleChange}
                        className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="Ej: CABA, Zona Oeste, etc."
                        required
                    />
                </div>
                {/* Radio */}
                <div className="flex flex-col">
                    <label className="mb-1 font-medium">Radio de trabajo (km)</label>
                    <input
                        type="number"
                        name="radio"
                        value={form.radio}
                        onChange={handleChange}
                        min={1}
                        className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="Ej: 10"
                        required
                    />
                </div>
                {/* Días disponibles */}
                <div className="flex flex-col">
                    <label className="mb-1 font-medium">Días disponibles</label>
                    <div className="flex flex-wrap gap-3">
                        {diasSemana.map((d) => (
                            <label key={d.value} className="flex items-center gap-1">
                                <input
                                    type="checkbox"
                                    name="dias"
                                    value={d.value}
                                    checked={form.dias.includes(d.value)}
                                    onChange={handleChange}
                                />
                                {d.label}
                            </label>
                        ))}
                    </div>
                </div>
                {/* Horarios disponibles */}
                <div className="flex flex-col">
                    <label className="mb-1 font-medium">Horarios disponibles</label>
                    <div className="flex flex-wrap gap-3">
                        {horarios.map((h) => (
                            <label key={h.value} className="flex items-center gap-1">
                                <input
                                    type="checkbox"
                                    name="horarios"
                                    value={h.value}
                                    checked={form.horarios.includes(h.value)}
                                    onChange={handleChange}
                                />
                                {h.label}
                            </label>
                        ))}
                    </div>
                </div>
                {/* Rubros */}
                <div className="flex flex-col">
                    <label className="mb-1 font-medium">Rubros en los que trabajás</label>
                    <div className="flex flex-wrap gap-3">
                        {rubrosDisponibles.map((r) => (
                            <label key={r.value} className="flex items-center gap-1">
                                <input
                                    type="checkbox"
                                    name="rubros"
                                    value={r.value}
                                    checked={form.rubros.includes(r.value)}
                                    onChange={handleRubrosChange}
                                />
                                {r.label}
                            </label>
                        ))}
                    </div>
                </div>
                {/* Rubro principal */}
                <div className="flex flex-col">
                    <label className="mb-1 font-medium">¿Cuál es tu rubro principal?</label>
                    <select
                        name="rubroPrincipal"
                        value={form.rubroPrincipal}
                        onChange={handleChange}
                        className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                        disabled={form.rubros.length === 0}
                    >
                        <option value="">Seleccione...</option>
                        {rubrosDisponibles
                            .filter((r) => form.rubros.includes(r.value))
                            .map((r) => (
                                <option key={r.value} value={r.value}>
                                    {r.label}
                                </option>
                            ))}
                    </select>
                </div>
                <button
                    type="submit"
                    className="w-full bg-[#02283A] hover:bg-[#03506f] text-white font-semibold py-2 rounded transition"
                >
                    Guardar perfil
                </button>
            </form>
        </div>
    );
};

export default FormWorker;