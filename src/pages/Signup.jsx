import { Link } from "react-router-dom";
import { FaRegHandshake } from "react-icons/fa6";
import { useState } from "react";

const Signup = () => {
    {/* TODO: Generar validaciones */}

    //State de imputs
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [tipoIdentificacion, setTipoIdentificacion] = useState('');
    const [numeroIdentificacion, setNumeroIdentificacion] = useState(0);
    const [direccion, setDireccion] = useState('');
    const [numero, setNumero] = useState(0);
    const [departamento, setDepartamento] = useState('');
    const [codigoPostal, setCodigoPostal] = useState(0);
    const [email, setEmail] = useState('');
    const [repEmail, setRepEmail] = useState('');
    const [telefono, setTelefono] = useState(0);
    const [fechaNacimiento, setFechaNacimiento] = useState('');

    //state del mensaje de error
    const [errorMessage, setErrorMessage] =  useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');

    }

    return (
        <div className="flex flex-1 min-h-screen items-center justify-center bg-white">
            <div className="max-w-3xl w-full px-8 py-6">
                <div className="flex justify-center mb-4">
                    <FaRegHandshake className="text-9xl text-[#02283A]" />
                </div>
                <h2 className="text-3xl md:text-4xl font-semibold text-[#0c3444] mb-8 text-center">
                    Estas a un paso de encontrar la solución que tanto buscas
                </h2>
                <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-8 space-y-6 border border-gray-300">
                    <div>
                        <label htmlFor="nombre" className="block text-lg font-medium text-gray-700 mb-1">
                            Nombre
                        </label>
                        <input
                            id="nombre"
                            type="text"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            placeholder="Tu nombre"
                            className="w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-[#0c3444] transition-all"
                        />
                    </div>
                    <div>
                        <label htmlFor="apellido" className="block text-lg font-medium text-gray-700 mb-1">
                            Apellido
                        </label>
                        <input
                            id="apellido"
                            value={apellido}
                            onChange={(e) => setApellido(e.target.value)}
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
                                value={tipoIdentificacion}
                                onChange={(e) => setTipoIdentificacion(e.target.value)}
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
                                value={numeroIdentificacion}
                                onChange={(e) => setNumeroIdentificacion(e.target.value)}
                                placeholder="Número"
                                className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-[#0c3444] transition-all w-1/2"
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="direccion" className="block text-lg font-medium text-gray-700 mb-1">
                            Dirección
                        </label>
                        <input
                            id="direccion"
                            type="text"
                            value={direccion}
                            onChange={(e) => setDireccion(e.target.value)}
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
                                id="numero"
                                type="number"
                                value={numero}
                                onChange={(e) => setNumero(e.target.value)}
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
                                value={departamento}
                                onChange={(e) => setDepartamento(e.target.value)}
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
                            value={codigoPostal}
                            onChange={(e) => setCodigoPostal(e.target.value)}
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
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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
                            value={repEmail}
                            onChange={(e) => setRepEmail(e.target.value)}
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
                            value={telefono}
                            onChange={(e) => setTelefono(e.target.value)}
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
                            value={fechaNacimiento}
                            onChange={(e) => setFechaNacimiento(e.target.value)}
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
                {errorMessage && <p className="text-center text-l mdplus:my-2 my-4 text-red-500">{errorMessage}</p>}
            </div>
        </div>
    );
};

export default Signup;