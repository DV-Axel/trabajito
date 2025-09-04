import { useState } from "react";
import { services } from "../../data/services";
import {useNavigate} from "react-router-dom";
import {diasSemana} from "../../data/helpers.js";

const FormSponsor = () => {
    const [form, setForm] = useState({
        foto: null,
        preview: null,
        razonSocial: "",
        nombreComercial: "",
        cuil: "",
        direccion: "",
        contacto: "",
        telefono: "",
        email: "",
        emailAlternativo: "",
        rubros: [],
        dias: [],
        horarioInicio: "",
        horarioFin: "",
        instagram: "",
        facebook: "",
        web: "",
        otros: "",
        altaEmpresa: null,
        altaEmpresaNombre: "",
    });
    const [showConfirm, setShowConfirm] = useState(false);
    const navigate = useNavigate();


    const handleChange = (e) => {
        const { name, value, type, files, checked } = e.target;

        if (type === "file" && name === "altaEmpresa") {
            setForm((prev) => ({
                ...prev,
                altaEmpresa: files[0],
                altaEmpresaNombre: files[0] ? files[0].name : "",
            }));
        }else if (type === "file") {
            setForm((prev) => ({
                ...prev,
                foto: files[0],
                preview: files[0] ? URL.createObjectURL(files[0]) : null,
            }));
        } else if (type === "checkbox" && name === "dias") {
            setForm((prev) => ({
                ...prev,
                dias: checked
                    ? [...prev.dias, value]
                    : prev.dias.filter((d) => d !== value),
            }));
        } else if (type === "checkbox" && name === "rubros") {
            setForm((prev) => ({
                ...prev,
                rubros: checked
                    ? [...prev.rubros, value]
                    : prev.rubros.filter((r) => r !== value),
            }));
        } else {
            setForm((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setShowConfirm(true);
    };

    const handleConfirm = () => {
        {/*TODO: Aca deberia ir la la insersion a la base de datos*/}
        setShowConfirm(false);
        // Aquí va la lógica de envío real
        navigate("/confirmacionSponsor");

    };

    const handleCancel = () => setShowConfirm(false);

    return (
        <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-8 mt-8">
            <h1 className="text-2xl font-bold mb-6 text-center">¡Completa el perfil de tu entidad Sponsor!</h1>
            <form className="space-y-5" onSubmit={handleSubmit}>
                {/* Logo o foto */}
                <div className="flex flex-col items-center">
                    <label className="mb-1 font-medium">
                        Logo o foto de la entidad <span className="text-gray-500 text-sm">(agregue el logo de la empresa o una foto representativa)</span>
                    </label>
                    {form.preview && (
                        <img
                            src={form.preview}
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
                {/* Nombre comercial */}
                <div className="flex flex-col">
                    <label className="mb-1 font-medium">Nombre de propaganda / comercial</label>
                    <input
                        type="text"
                        name="nombreComercial"
                        value={form.nombreComercial}
                        onChange={handleChange}
                        className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="Nombre con el que se conoce el local"
                    />
                </div>
                {/* Razón social */}
                <div className="flex flex-col">
                    <label className="mb-1 font-medium">Razón social</label>
                    <input
                        type="text"
                        name="razonSocial"
                        value={form.razonSocial}
                        onChange={handleChange}
                        className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="Nombre legal de la entidad"
                    />
                </div>
                {/* CUIL/CUIT */}
                <div className="flex flex-col">
                    <label className="mb-1 font-medium">CUIT/CUIL</label>
                    <input
                        type="text"
                        name="cuil"
                        value={form.cuil}
                        onChange={handleChange}
                        className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="Ej: 30-12345678-9"
                    />
                </div>
                {/* Dirección */}
                <div className="flex flex-col">
                    <label className="mb-1 font-medium">Dirección física</label>
                    <input
                        type="text"
                        name="direccion"
                        value={form.direccion}
                        onChange={handleChange}
                        className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="Ej: Av. Siempreviva 123, CABA"
                    />
                </div>

                <div className="flex flex-col items-center">
                    <label className="mb-1 font-medium">
                        Alta de la empresa <span className="text-gray-500 text-sm">(PDF)</span>
                    </label>
                    <input
                        type="file"
                        name="altaEmpresa"
                        accept="application/pdf"
                        onChange={handleChange}
                        className="mb-2"
                    />
                    {form.altaEmpresaNombre && (
                        <span className="text-sm text-gray-600">{form.altaEmpresaNombre}</span>
                    )}
                </div>

                {/* Contacto */}
                <div className="flex flex-col">
                    <label className="mb-1 font-medium">Nombre de contacto</label>
                    <input
                        type="text"
                        name="contacto"
                        value={form.contacto}
                        onChange={handleChange}
                        className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="Persona responsable"
                    />
                </div>
                {/* Teléfono */}
                <div className="flex flex-col">
                    <label className="mb-1 font-medium">Teléfono</label>
                    <input
                        type="text"
                        name="telefono"
                        value={form.telefono}
                        onChange={handleChange}
                        className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="Ej: 11-1234-5678"
                    />
                </div>
                {/* Email */}
                <div className="flex flex-col">
                    <label className="mb-1 font-medium">Correo electrónico</label>
                    <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="ejemplo@email.com"
                    />
                </div>
                {/* Correo alternativo */}
                <div className="flex flex-col">
                    <label className="mb-1 font-medium">Correo alternativo</label>
                    <input
                        type="email"
                        name="emailAlternativo"
                        value={form.emailAlternativo}
                        onChange={handleChange}
                        className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="Otro correo de contacto"
                    />
                </div>
                {/* Rubros */}
                <div className="flex flex-col">
                    <label className="mb-1 font-medium">Rubros</label>
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
                                    onChange={handleChange}
                                    className="hidden"
                                />
                                {s.name}
                            </label>
                        ))}
                    </div>
                </div>
                {/* Días de atención */}
                <div className="flex flex-col">
                    <label className="mb-1 font-medium">Días de atención</label>
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
                {/* Horarios de atención */}
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex flex-col flex-1">
                        <label className="mb-1 font-medium">Horario de inicio</label>
                        <input
                            type="time"
                            name="horarioInicio"
                            value={form.horarioInicio}
                            onChange={handleChange}
                            className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <div className="flex flex-col flex-1">
                        <label className="mb-1 font-medium">Horario de fin</label>
                        <input
                            type="time"
                            name="horarioFin"
                            value={form.horarioFin}
                            onChange={handleChange}
                            className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                </div>
                {/* Redes sociales */}
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex flex-col flex-1">
                        <label className="mb-1 font-medium">Instagram</label>
                        <input
                            type="text"
                            name="instagram"
                            value={form.instagram}
                            onChange={handleChange}
                            className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="@usuario"
                        />
                    </div>
                    <div className="flex flex-col flex-1">
                        <label className="mb-1 font-medium">Facebook</label>
                        <input
                            type="text"
                            name="facebook"
                            value={form.facebook}
                            onChange={handleChange}
                            className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="facebook.com/usuario"
                        />
                    </div>
                    <div className="flex flex-col flex-1">
                        <label className="mb-1 font-medium">Página web</label>
                        <input
                            type="text"
                            name="web"
                            value={form.web}
                            onChange={handleChange}
                            className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="www.tusitio.com"
                        />
                    </div>
                </div>
                {/* Otros datos */}
                <div className="flex flex-col">
                    <label className="mb-1 font-medium">Otros datos de interés</label>
                    <textarea
                        name="otros"
                        value={form.otros}
                        onChange={handleChange}
                        className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
                        placeholder="Información adicional"
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
                            Verifica que los datos ingresados sean correctos.<br />
                            Recuerda que estos datos serán usados para certificar a los workers.
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

export default FormSponsor;