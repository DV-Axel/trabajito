import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { services } from "../../data/services";
import {diasSemana, horarios} from "../../data/helpers.js";

const FormWorker = () => {
    const [form, setForm] = useState({
        subtitulo: "",
        descripcion: "",
        ubicacion: "",
        radio: "",
        dias: [],
        horarios: [],
        rubros: [],
        foto: null,
        sponsor: {
            tipo: "cuit",
            cuit: "",
            nombre: "",
            motivo: "",
            origen: "",
            contacto: "",
            expectativas: ""
        }
    });
    const [preview, setPreview] = useState(null);
    const [showConfirm, setShowConfirm] = useState(false);

    const navigate = useNavigate();

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
            rubros: nuevosRubros
        }));
    };

    // Sponsor
    const handleSponsorChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({
            ...prev,
            sponsor: {
                ...prev.sponsor,
                [name]: value
            }
        }));
    };

    const handleSponsorTypeChange = (e) => {
        setForm(prev => ({
            ...prev,
            sponsor: {
                ...prev.sponsor,
                tipo: e.target.value,
                cuit: "",
                nombre: ""
            }
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setShowConfirm(true);
    };

    const handleConfirm = () => {
        setShowConfirm(false);

        /*TODO: aca va la logica para guardar en la bbdd.*/

        navigate("/confirmacionWorker");
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
                    />
                </div>
                {/* Ubicacion
                TODO: ver si para esto se puede implementar un autocarga de lugares
                */}
                <div className="flex flex-col">
                    <label className="mb-1 font-medium">Ubicacion donde trabajás</label>
                    <input
                        type="text"
                        name="ubicacion"
                        value={form.ubicacion}
                        onChange={handleChange}
                        className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="Ej: CABA, Zona Oeste, etc."
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
                {/* Sponsor */}
                <div className="mt-8">
                    <h2 className="text-lg font-bold mb-2">Datos de la entidad sponsor</h2>
                    <div className="flex gap-4 mb-2 items-center">
                        <label className="flex items-center">
                            <input
                                type="radio"
                                className="mx-1"
                                name="sponsorType"
                                value="cuit"
                                checked={form.sponsor.tipo === "cuit"}
                                onChange={handleSponsorTypeChange}
                            />
                            CUIT
                        </label>
                        <label className="flex items-center">
                            <input
                                className="mx-1"
                                type="radio"
                                name="sponsorType"
                                value="nombre"
                                checked={form.sponsor.tipo === "nombre"}
                                onChange={handleSponsorTypeChange}
                            /> Nombre de la empresa
                        </label>
                    </div>
                    {/*TODO: Ver una forma de que haya una busqueda al poner el CUIT o un autocomplete para el nombre, todo desde la base de datos*/}
                    {form.sponsor.tipo === "cuit" ? (
                        <input
                            type="text"
                            name="cuit"
                            value={form.sponsor.cuit}
                            onChange={handleSponsorChange}
                            placeholder="CUIT de la empresa"
                            className="border rounded px-3 py-2 w-full"
                        />
                    ) : (
                        <input
                            type="text"
                            name="nombre"
                            value={form.sponsor.nombre}
                            onChange={handleSponsorChange}
                            placeholder="Nombre de la empresa"
                            className="border rounded px-3 py-2 w-full"
                        />
                    )}
                    <input
                        type="text"
                        name="motivo"
                        value={form.sponsor.motivo}
                        onChange={handleSponsorChange}
                        placeholder="¿Por qué la elige?"
                        className="border rounded px-3 py-2 w-full mt-2"
                    />
                    <input
                        type="text"
                        name="origen"
                        value={form.sponsor.origen}
                        onChange={handleSponsorChange}
                        placeholder="¿De dónde la conoce?"
                        className="border rounded px-3 py-2 w-full mt-2"
                    />
                    <input
                        type="text"
                        name="contacto"
                        value={form.sponsor.contacto}
                        onChange={handleSponsorChange}
                        placeholder="¿Con quién tuvo el primer contacto?"
                        className="border rounded px-3 py-2 w-full mt-2"
                    />
                    <textarea
                        name="expectativas"
                        value={form.sponsor.expectativas}
                        onChange={handleSponsorChange}
                        placeholder="Expectativas para trabajar juntos"
                        className="border rounded px-3 py-2 w-full mt-2"
                    />
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