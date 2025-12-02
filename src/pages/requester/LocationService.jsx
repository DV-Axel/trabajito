// javascript
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import MapboxLocation from "../../components/MapboxLocation";

const LocationService = () => {
    const [position, setPosition] = useState(null); // formato: [lat, lng]
    const [address, setAddress] = useState(null);
    const [tipoPropiedad, setTipoPropiedad] = useState("");
    const [piso, setPiso] = useState("");
    const [numeroDepto, setNumeroDepto] = useState("");
    const navigate = useNavigate();
    const location = useLocation();

    const handleMapboxSelect = ({ position: pos, address: addr }) => {
        setPosition(pos);
        setAddress(addr);
    };

    const handleContinue = () => {
        let coords = null;
        if (position && Array.isArray(position)) coords = { lat: position[0], lng: position[1] };
        navigate("/subirArchivos", {
            state: {
                ...location.state,
                address,
                tipoPropiedad,
                piso,
                numeroDepto,
                position: coords
            }
        });
    };

    const initialPositionForMapbox = position ? { lat: position[0], lng: position[1] } : null;

    return (
        <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-8 mt-8 border border-gray-400 mb-8">
            <h1 className="text-2xl font-bold mb-6 text-center">Selecciona la ubicación de tu servicio</h1>
            <div className="flex flex-col md:flex-row gap-8">
                <div className="flex-1 flex flex-col space-y-4">
                    <label className="mb-3 font-semibold text-lg text-[#02283A] flex items-center gap-2">
                        <span className="w-1 h-6 bg-[#00b4d8] rounded mr-2 inline-block" /> Ubicación
                    </label>

                    {/* Input y sugerencias (el mapa se monta en la derecha gracias a mapContainerId) */}
                    <MapboxLocation
                        initialPosition={initialPositionForMapbox}
                        onSelect={handleMapboxSelect}
                        mapContainerId="map-preview-container"
                    />

                    {/* Resumen debajo del input */}
                    {address && (
                        <div className="bg-gray-50 border rounded p-4 mt-2 text-base space-y-2">
                            <div className="text-lg font-bold mb-2">RESUMEN</div>
                            <div>
                                <span className="font-semibold">Dirección:</span>{" "}
                                {address.road || "-"} {address.house_number || ""}
                            </div>
                            <div>
                                <span className="font-semibold">Tipo de propiedad:</span>{" "}
                                <select
                                    value={tipoPropiedad}
                                    onChange={e => setTipoPropiedad(e.target.value)}
                                    className="border rounded px-2 py-1 ml-2"
                                >
                                    <option value="">Seleccione...</option>
                                    <option value="casa">Casa</option>
                                    <option value="departamento">Departamento</option>
                                </select>
                            </div>
                            {tipoPropiedad === "departamento" && (
                                <div className="flex gap-4">
                                    <div>
                                        <span className="font-semibold">Piso:</span>{" "}
                                        <input
                                            type="text"
                                            value={piso}
                                            onChange={e => setPiso(e.target.value)}
                                            className="border rounded px-2 py-1 w-16"
                                            placeholder="Ej: 3"
                                        />
                                    </div>
                                    <div>
                                        <span className="font-semibold">N° Depto:</span>{" "}
                                        <input
                                            type="text"
                                            value={numeroDepto}
                                            onChange={e => setNumeroDepto(e.target.value)}
                                            className="border rounded px-2 py-1 w-16"
                                            placeholder="Ej: B"
                                        />
                                    </div>
                                </div>
                            )}
                            <div><span className="font-semibold">Provincia:</span> {address.state || "-"}</div>
                            {/* Partido eliminado */}
                            <div>
                                <span className="font-semibold">Localidad:</span>{" "}
                                {address.city || address.town || address.village || address.hamlet || "-"}
                            </div>
                            <div><span className="font-semibold">Código Postal:</span> {address.postcode || "-"}</div>
                        </div>
                    )}
                </div>

                <div className="flex-1">
                    <label className="mb-3 font-semibold text-lg text-[#02283A] flex items-center gap-2">
                        <span className="w-1 h-6 bg-[#00b4d8] rounded mr-2 inline-block" />
                        Vista previa en el mapa
                    </label>

                    {/* Contenedor del mapa en la derecha; MapboxLocation lo usará por id */}
                    <div id="map-preview-container" className="rounded-lg overflow-hidden border border-gray-200" style={{ height: 400 }} />

                </div>
            </div>

            {address && (
                <div className="mt-7 text-center space-y-4 text-base text-[#ef476f]">
                    <p>Por favor, verifica que la dirección y los detalles proporcionados sean correctos antes de continuar.</p>
                    <button
                        type="button"
                        onClick={handleContinue}
                        className="bg-[#82E1A1] hover:bg-[#6EBF8A] text-black font-semibold py-2 px-6 rounded transition"
                    >
                        Continuar
                    </button>
                </div>
            )}
        </div>
    );
};

export default LocationService;