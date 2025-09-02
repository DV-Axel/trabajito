import { useState } from "react";
import { services } from "../../data/services";

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
        subtitulo: "",
        descripcion: "",
        ubicaciones: "",
        radio: "",
        dias: [],
        horarios: [],
        rubros: [],
        foto: null,
    });
    const [preview, setPreview] = useState(null);
    const [showConfirm, setShowConfirm] = useState(false);

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
        setShowConfirm(true);
    };

    const handleConfirm = () => {
        setShowConfirm(false);
        // Aquí va la lógica para enviar el formulario
        console.log(form);
        // Puedes redirigir o mostrar otro mensaje aquí
    };

    const handleCancel = () => {
        setShowConfirm(false);
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
                    <div className="flex flex-wrap gap-2">
                        {diasSemana.map((d) => (
                            <label
                                key={d.value}
                                className={`cursor-pointer px-4 py-2 rounded-full border transition
                    ${form.dias.includes(d.value)
                                    ? "bg-blue-100 border-blue-400 text-blue-800 font-semibold"
                                    : "bg-white border-gray-300 text-gray-700 hover:bg-blue-50"}
                `}
                            >
                                <input
                                    type="checkbox"
                                    name="dias"
                                    value={d.value}
                                    checked={form.dias.includes(d.value)}
                                    onChange={handleChange}
                                    className="hidden"
                                />
                                {d.label}
                            </label>
                        ))}
                    </div>
                </div>
                {/* Horarios disponibles */}
                <div className="flex flex-col">
                    <label className="mb-1 font-medium">Horarios disponibles</label>
                    <div className="flex flex-wrap gap-2">
                        {horarios.map((h) => (
                            <label
                                key={h.value}
                                className={`cursor-pointer px-4 py-2 rounded-full border transition
                    ${form.horarios.includes(h.value)
                                    ? "bg-blue-100 border-blue-400 text-blue-800 font-semibold"
                                    : "bg-white border-gray-300 text-gray-700 hover:bg-blue-50"}
                `}
                            >
                                <input
                                    type="checkbox"
                                    name="horarios"
                                    value={h.value}
                                    checked={form.horarios.includes(h.value)}
                                    onChange={handleChange}
                                    className="hidden"
                                />
                                {h.label}
                            </label>
                        ))}
                    </div>
                </div>
                {/* Rubros */}
                <div className="flex flex-col">
                    <label className="mb-1 font-medium">Rubros en los que trabajás</label>
                    <div className="flex flex-wrap gap-2">
                        {services.map((s) => (
                            <label
                                key={s.key}
                                className={`cursor-pointer px-4 py-2 rounded-full border transition
                    ${form.rubros.includes(s.key)
                                    ? "bg-blue-100 border-blue-400 text-blue-800 font-semibold"
                                    : "bg-white border-gray-300 text-gray-700 hover:bg-blue-50"}
                `}
                            >
                                <input
                                    type="checkbox"
                                    name="rubros"
                                    value={s.key}
                                    checked={form.rubros.includes(s.key)}
                                    onChange={handleRubrosChange}
                                    className="hidden"
                                />
                                {s.name}
                            </label>
                        ))}
                    </div>
                </div>
                <button
                    type="submit"
                    className="w-full bg-[#02283A] hover:bg-[#03506f] text-white font-semibold py-2 rounded transition"
                >
                    Continuar
                </button>
            </form>

            {/* Modal de confirmación */}
            {showConfirm && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
                        <h2 className="text-lg font-bold mb-2">¿Estás seguro?</h2>
                        <p className="mb-4 text-gray-700">
                            Verifica que los datos seleccionados sean correctos.<br />
                            Recuerda que estos datos te permiten acceder a los trabajos que desees.
                        </p>
                        <div className="flex justify-end gap-2">
                            <button
                                onClick={handleCancel}
                                className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={handleConfirm}
                                className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
                            >
                                Confirmar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FormWorker;