
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FaRegHandshake } from "react-icons/fa6";

const Signup = () => {
    const [form, setForm] = useState({});
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (form.password !== form.repeatPassword) {
            setError("Las contraseñas no coinciden");
            return;
        }
        try {
            const response = await fetch('http://localhost:3000/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type' : 'application/json'},
                body: JSON.stringify(form)
            });
            if (response.ok) {
                navigate('/confirmacion');
            } else {
                const data = await response.json();
                setError(data.message || 'Error al registrar');
            }
        } catch (error) {
            setError('Error en la red');
            console.log(error)
        }
    };

    return (
        <div className="flex flex-1 min-h-screen items-center justify-center bg-white">
            <div className="max-w-3xl w-full px-8 py-6">
                <div className="flex justify-center mb-4">
                    <FaRegHandshake className="text-9xl text-[#02283A]" />
                </div>
                <h2 className="text-3xl md:text-4xl font-semibold text-[#0c3444] mb-8 text-center">
                    Estas a un paso de encontrar la solución que tanto buscas
                </h2>
                <form className="bg-white shadow-md rounded-lg p-8 space-y-6 border border-gray-300" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="nombre" className="block text-lg font-medium text-gray-700 mb-1">
                            Nombre
                        </label>
                        <input
                            name="firstName"
                            value={form.firstName || ""}
                            onChange={handleChange}
                            id="nombre"
                            type="text"
                            placeholder="Tu nombre"
                            className="w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-[#0c3444] transition-all"
                        />
                    </div>
                    <div>
                        <label htmlFor="apellido" className="block text-lg font-medium text-gray-700 mb-1">
                            Apellido
                        </label>
                        <input
                            name="lastName"
                            value={form.lastName || ""}
                            onChange={handleChange}
                            id="apellido"
                            type="text"
                            placeholder="Tu apellido"
                            className="w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-[#0c3444] transition-all"
                        />
                    </div>
                    <div>
                        <label className="block text-lg font-medium text-gray-700 mb-1">
                            Identificación
                        </label>
                        <div className="flex gap-2">
                            <select
                                name="idType"
                                value={form.idType || ""}
                                onChange={handleChange}
                                id="tipoIdentificacion"
                                className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-[#0c3444] transition-all w-1/2"
                            >
                                <option value="">Tipo</option>
                                <option value="dni">DNI</option>
                                <option value="cedula">Cédula</option>
                                <option value="pasaporte">Pasaporte</option>
                            </select>
                            <input
                                name="dni"
                                value={form.dni || ""}
                                onChange={handleChange}
                                id="numeroIdentificacion"
                                type="number"
                                placeholder="Número"
                                className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-[#0c3444] transition-all w-1/2"
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-lg font-medium text-gray-700 mb-1">
                            Contraseña
                        </label>
                        <input
                            name="password"
                            id="password"
                            type="password"
                            placeholder="Contraseña"
                            className="w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-[#0c3444] transition-all"
                            value={form.password || ""}
                            onChange={handleChange}
                            autoComplete="off"
                        />
                    </div>
                    <div>
                        <label htmlFor="repeatPassword" className="block text-lg font-medium text-gray-700 mb-1">
                            Repetir Contraseña
                        </label>
                        <input
                            name="repeatPassword"
                            id="repeatPassword"
                            type="password"
                            placeholder="Repetir Contraseña"
                            className="w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-[#0c3444] transition-all"
                            value={form.repeatPassword || ""}
                            onChange={handleChange}
                            autoComplete="off"
                        />
                    </div>
                    {error && (
                        <div className="text-red-600 text-sm font-semibold text-center">{error}</div>
                    )}
                    <div>
                        <label htmlFor="direccion" className="block text-lg font-medium text-gray-700 mb-1">
                            Dirección
                        </label>
                        <input
                            name="address"
                            value={form.address || ""}
                            onChange={handleChange}
                            id="direccion"
                            type="text"
                            placeholder="Tu dirección"
                            className="w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-[#0c3444] transition-all"
                        />
                    </div>
                    <div className="flex gap-2">
                        <div className="w-1/2">
                            <label htmlFor="numero" className="block text-lg font-medium text-gray-700 mb-1">
                                Número
                            </label>
                            <input
                                name="number"
                                value={form.number || ""}
                                onChange={handleChange}
                                id="numero"
                                type="number"
                                placeholder="N°"
                                className="w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-[#0c3444] transition-all"
                            />
                        </div>
                        <div className="w-1/2">
                            <label htmlFor="departamento" className="block text-lg font-medium text-gray-700 mb-1">
                                Departamento
                            </label>
                            <input
                                name="deparmentNumber"
                                value={form.deparmentNumber || ""}
                                onChange={handleChange}
                                id="departamento"
                                type="text"
                                placeholder="Depto"
                                className="w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-[#0c3444] transition-all"
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="codigoPostal" className="block text-lg font-medium text-gray-700 mb-1">
                            Código Postal
                        </label>
                        <input
                            name="postalCode"
                            value={form.postalCode || ""}
                            onChange={handleChange}
                            id="codigoPostal"
                            type="number"
                            placeholder="Código Postal"
                            className="w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-[#0c3444] transition-all"
                        />
                    </div>
                    <div>
                        <label htmlFor="correoElectronico" className="block text-lg font-medium text-gray-700 mb-1">
                            Correo Electrónico
                        </label>
                        <input
                            name="email"
                            value={form.email || ""}
                            onChange={handleChange}
                            id="email"
                            type="email"
                            placeholder="Correo Electrónico"
                            className="w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-[#0c3444] transition-all"
                        />
                    </div>
                    <div>
                        <label htmlFor="reCorreoElectronico" className="block text-lg font-medium text-gray-700 mb-1">
                            Repetir Correo Electrónico
                        </label>
                        <input
                            name="repeatEmail"
                            value={form.repeatEmail || ""}
                            onChange={handleChange}
                            id="repEmail"
                            type="email"
                            placeholder="Repetir Correo Electrónico"
                            className="w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-[#0c3444] transition-all"
                        />
                    </div>
                    <div>
                        <label htmlFor="telefono" className="block text-lg font-medium text-gray-700 mb-1">
                            Número de Teléfono
                        </label>
                        <input
                            name="phone"
                            value={form.phone || ""}
                            onChange={handleChange}
                            id="telefono"
                            type="number"
                            placeholder="Tu teléfono"
                            className="w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-[#0c3444] transition-all"
                        />
                    </div>
                    <div>
                        <label htmlFor="fechaNacimiento" className="block text-lg font-medium text-gray-700 mb-1">
                            Fecha de Nacimiento
                        </label>
                        <input
                            name="birthDate"
                            value={form.birthDate || ""}
                            onChange={handleChange}
                            id="fechaNacimiento"
                            type="date"
                            className="w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-[#0c3444] transition-all"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-[#0c7fcf] hover:bg-[#095a8e] text-white font-semibold py-2 rounded-md transition-all"
                    >
                        REGISTRARME
                    </button>
                    <div className="text-right text-sm text-gray-600 mt-2">
                        ¿Ya tienes cuenta?{" "}
                        <Link to='/login' className="text-[#0c7fcf] hover:underline">
                            Inicia sesión
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Signup;