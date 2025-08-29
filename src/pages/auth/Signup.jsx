
import { useState } from "react";
import { Link } from "react-router-dom";
import { FaRegHandshake } from "react-icons/fa6";

const Signup = () => {
    // Estados para los campos de contraseña
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [dni, setDni] = useState('');
    const [email, setEmail] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [number, setNumber] = useState('');
    const [postalCode, setPostalCode] = useState('');

    // Puedes agregar aquí los demás estados si quieres controlar los otros campos

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password !== repeatPassword) {
            setError("Las contraseñas no coinciden");
            return;
        }
        setError("");
        // Aquí va la lógica para enviar el formulario
        // Por ahora solo mostramos un alert
        alert("Formulario enviado correctamente");
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
                            value={firstName}
                            onChange={e => setFirstName(e.target.value)}
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
                            value={lastName}
                            onChange={e => setLastName(e.target.value)}
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
                                id="tipoIdentificacion"
                                className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-[#0c3444] transition-all w-1/2"
                            >
                                <option value="">Tipo</option>
                                <option value="dni">DNI</option>
                                <option value="cedula">Cédula</option>
                                <option value="pasaporte">Pasaporte</option>
                            </select>
                            <input
                                id="numeroIdentificacion"
                                type="number"
                                placeholder="Número"
                                className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-[#0c3444] transition-all w-1/2"
                            />
                        </div>
                    </div>
                    {/* Campo de contraseña */}
                    <div>
                        <label htmlFor="password" className="block text-lg font-medium text-gray-700 mb-1">
                            Contraseña
                        </label>
                        <input
                            id="password"
                            type="password"
                            placeholder="Contraseña"
                            className="w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-[#0c3444] transition-all"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            autoComplete="off"
                        />
                    </div>
                    {/* Campo de repetir contraseña */}
                    <div>
                        <label htmlFor="repeatPassword" className="block text-lg font-medium text-gray-700 mb-1">
                            Repetir Contraseña
                        </label>
                        <input
                            id="repeatPassword"
                            type="password"
                            placeholder="Repetir Contraseña"
                            className="w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-[#0c3444] transition-all"
                            value={repeatPassword}
                            onChange={(e) => setRepeatPassword(e.target.value)}
                            autoComplete="off"
                        />
                    </div>
                    {/* Mostrar error si las contraseñas no coinciden */}
                    {error && (
                        <div className="text-red-600 text-sm font-semibold text-center">{error}</div>
                    )}
                    <div>
                        <label htmlFor="direccion" className="block text-lg font-medium text-gray-700 mb-1">
                            Dirección
                        </label>
                        <input
                            value={address}
                            onChange={e => setAddress(e.target.value)}
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
                                value={number}
                                onChange={e => setNumber(e.target.value)}
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
                            id="telefono"
                            type="tel"
                            placeholder="Tu teléfono"
                            className="w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-[#0c3444] transition-all"
                        />
                    </div>
                    <div>
                        <label htmlFor="fechaNacimiento" className="block text-lg font-medium text-gray-700 mb-1">
                            Fecha de Nacimiento
                        </label>
                        <input
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