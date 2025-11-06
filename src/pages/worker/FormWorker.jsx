import { useState } from "react";
import { services } from "../../data/services";
import { diasSemana, horarios, provinciasArgentina, getUserIdFromToken } from "../../data/helpers.js";
import {showConfirmAlert, showSuccessAlert, showErrorAlert} from "../../components/alerts/sweetAlertsComponents.jsx";
import { useAuth} from "../../context/useAuth.jsx";

const FormWorker = () => {
    const [form, setForm] = useState({
        subtitulo: "",
        descripcion: "",
        dias: [],
        zona_trabajo: [],
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
    const [sponsorData, setSponsorData] = useState(null);
    const { logout } = useAuth();


    const idUser = getUserIdFromToken();

    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target;
        if (type === "checkbox" && (name === "dias" || name === "horarios")) {
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

    const handleZonaTrabajoChange = (e) => {
        const { value, checked } = e.target;
        const provincia = provinciasArgentina.find(p => p.value === value);
        if (!provincia) return;
        setForm((prev) => ({
            ...prev,
            zona_trabajo: checked
                ? [...prev.zona_trabajo, provincia.value]
                : prev.zona_trabajo.filter((p) => p !== provincia.value)
        }));
    };

    // TODO: Verificar como se guardan los datos de horarios de trabajo, dias de trabajo y locaciones.

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { tipo, cuit, nombre } = form.sponsor;
        const body = tipo === "cuit" ? { cuit } : { nombre };

        try {
            const response = await fetch('http://localhost:3000/sponsors/getSponsorFromFormWorker', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            });
            const data = await response.json();
            setSponsorData(data); // Guarda los datos recibidos
        } catch (error) {
            showErrorAlert('Error al enviar la solicitud', 'Ocurrió un error inesperado')
            console.error(error);
            return
        }

        const datosHtml = `
                <p>Verifica los datos de tus sponsor</p><br/>
                <strong>Nombre:</strong> ${sponsorData.nombre}<br/>
                <strong>CUIL:</strong> ${sponsorData.cuil}<br/>
                <strong>Dirección:</strong> ${sponsorData.direccion}<br/>
        `

        const result = await showConfirmAlert('¿Estás seguro?', datosHtml, 'Confirmar', 'Cancelar')

        if(result){
            const formData = new FormData();
            formData.append("subtitle", form.subtitulo);
            formData.append("description", form.descripcion);
            formData.append("workLocation", JSON.stringify(form.zona_trabajo));
            formData.append("idUser", idUser);

            formData.append("workingDays", JSON.stringify(form.dias));
            formData.append("workingHours", JSON.stringify(form.horarios));
            formData.append("idSponsor", sponsorData.id);

            formData.append("rubros", JSON.stringify(form.rubros));
            formData.append("sponsor", JSON.stringify(form.sponsor));

            formData.append("photo", form.foto);


            try {


                const response = await fetch('http://localhost:3000/workers/', {
                    method: 'POST',
                    body: formData
                });


                if(response.ok){
                    showSuccessAlert('¡Éxito!', 'Su perfil de worker fue registrado correctamente. Vuelva a iniciar sesion.')
                    logout();
                }else{
                    showErrorAlert('Error al enviar la solicitud', 'Ocurrió un error inesperado');
                }

            } catch (error) {
                showErrorAlert('Error al enviar la solicitud', 'Ocurrió un error inesperado')
                console.error(error);
            }
        }
    };

    return (
        <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-8 mt-8 mb-8 border border-gray-300">
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
                {/* zona_trabajo */}
                <div className="flex flex-col">
                    <label className="mb-1 font-medium">Provincias donde trabajás</label>
                    <div className="flex flex-wrap gap-2">
                        {provinciasArgentina.map((p) => (
                            <label
                                key={p.value}
                                className={`cursor-pointer px-4 py-2 rounded-full border transition select-none
                    ${form.zona_trabajo.includes(p.value)
                                    ? "bg-blue-100 border-blue-500 text-blue-800 font-semibold shadow"
                                    : "bg-white border-gray-300 text-gray-700 hover:bg-blue-50"}
                `}
                            >
                                <input
                                    type="checkbox"
                                    name="zona_trabajo"
                                    value={p.value}
                                    checked={form.zona_trabajo.includes(p.value)}
                                    onChange={handleZonaTrabajoChange}
                                    className="hidden"
                                />
                                {p.label}
                            </label>
                        ))}
                    </div>
                    <small className="text-black-700 mt-3">* Seleccioná una o varias provincias</small>
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
                                name="tipo"
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
                                name="tipo"
                                value="nombre"
                                checked={form.sponsor.tipo === "nombre"}
                                onChange={handleSponsorTypeChange}
                            /> Nombre de la empresa
                        </label>
                    </div>
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
                    className="w-full bg-[#82E1A1] hover:bg-[#6EBF8A] text-black font-semibold py-2 rounded transition"
                >
                    Continuar
                </button>
            </form>
        </div>
    );
};

export default FormWorker;
