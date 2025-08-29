// src/pages/requester/Formservice.jsx
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { services } from "../../data/services.js";
import {fechaMinima} from "../../data/helpers.js";

const Formservice = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const service = services.find(s => s.key === state?.serviceKey);

    const [form, setForm] = useState({});

    useEffect(() => {
        if (!service) {
            navigate("/solicitar");
        }
    }, [service, navigate]);

    if (!service) return null;

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleContinue = () => {
        navigate("/ubicacionServicio");
    };

    // Detecta si urgencia es "si"
    const isUrgente = form["urgencia"] === "si";

    return (
        <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-8 mt-8">
            <h1 className="text-2xl font-bold mb-6 text-center">Formulario para: {service.name}</h1>
            <form className="space-y-5" >

                <div className="flex flex-col">
                    <label className="mb-1 font-medium">¿Es una urgencia?</label>
                    <select
                        name="urgencia"
                        value={form["urgencia"] || ""}
                        onChange={handleChange}
                        className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        <option value="">Seleccione...</option>
                        <option value="si">Sí</option>
                        <option value="no">No</option>
                    </select>
                </div>

                <div className="flex flex-col">
                    <label className="mb-1 font-medium">¿Para qué fecha lo necesitas?</label>
                    <input
                        type="date"
                        name="fecha"
                        value={form["fecha"] || ""}
                        onChange={handleChange}
                        min={fechaMinima}
                        className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                <div className="flex flex-col">
                    <label className="mb-1 font-medium">Describe el problema</label>
                    <textarea
                        name="descripcion"
                        value={form["descripcion"] || ""}
                        onChange={handleChange}
                        rows={4}
                        cols={40}
                        className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
                    />
                </div>





                {service.questions?.map((q) => {
                    if (q.type === "input") {
                        return (
                            <div key={q.key} className="flex flex-col">
                                <label className="mb-1 font-medium">{q.label}</label>
                                <input
                                    type={q.inputType || "text"}
                                    name={q.key}
                                    value={form[q.key] || ""}
                                    onChange={handleChange}
                                    className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                />
                            </div>
                        );
                    }

                    if (q.type === "textarea") {
                        return (
                            <div key={q.key} className="flex flex-col">
                                <label className="mb-1 font-medium">{q.label}</label>
                                <textarea
                                    name={q.key}
                                    value={form[q.key] || ""}
                                    onChange={handleChange}
                                    rows={4}
                                    cols={40}
                                    className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
                                />
                            </div>
                        );
                    }

                    if (q.type === "select") {
                        return (
                            <div key={q.key} className="flex flex-col">
                                <label className="mb-1 font-medium">{q.label}</label>
                                <select
                                    name={q.key}
                                    value={form[q.key] || ""}
                                    onChange={handleChange}
                                    className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                >
                                    <option value="">Seleccione...</option>
                                    {q.options.map(opt => (
                                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                                    ))}
                                </select>
                            </div>
                        );
                    }
                    if (q.type === "date") {
                        if(q.key === "fecha" && isUrgente){
                            return null; // No mostrar el campo fecha si es urgente
                        }
                        return (
                            <div key={q.key} className="flex flex-col">
                                <label className="mb-1 font-medium">{q.label}</label>
                                <input
                                    type="date"
                                    name={q.key}
                                    value={form[q.key] || ""}
                                    onChange={handleChange}
                                    className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                />
                            </div>


                        );
                    }
                    return null;
                })}

                {isUrgente && (
                    <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded">
                        El servicio se deberá hacer con mayor prioridad y podria incluir gastos adicionales.
                    </div>
                )}

                <button
                    type="submit"
                    onClick={handleContinue}
                    className="w-full bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700 transition"
                >
                    Continuar
                </button>
            </form>
        </div>
    );
};

export default Formservice;