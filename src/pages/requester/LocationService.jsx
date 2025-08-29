import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";

//TODO: agregar validaciones
//TODO: nominatim no es el mejor buscador de calles, ver de reemplazarlo
const nominatimUrl = "https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&countrycodes=ar&q=";

function MapAutoCenter({ position }) {
    const map = useMap();
    React.useEffect(() => {
        if (position) {
            map.setView(position, 16);
        }
    }, [position, map]);
    return null;
}

const LocationService = () => {
    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [position, setPosition] = useState(null);
    const [address, setAddress] = useState(null);
    const [tipoPropiedad, setTipoPropiedad] = useState("");
    const [piso, setPiso] = useState("");
    const [numeroDepto, setNumeroDepto] = useState("");
    const navigate = useNavigate();


    const handleInput = async (e) => {
        const value = e.target.value;
        setQuery(value);
        if (value.length > 2) {
            const res = await fetch(nominatimUrl + encodeURIComponent(value));
            const data = await res.json();
            setSuggestions(data);
        } else {
            setSuggestions([]);
        }
    };

    const handleSelect = (place) => {
        setQuery(place.display_name);
        setPosition([parseFloat(place.lat), parseFloat(place.lon)]);
        setAddress(place.address);
        setSuggestions([]);
    };

    const handleContinue = () => {
        navigate("/subirArchivos");
    };

    console.log(address)

    return (
        <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-8 mt-8">
            <h1 className="text-2xl font-bold mb-6 text-center">Selecciona la ubicación de tu servicio</h1>
            <div className="flex flex-col md:flex-row gap-8">
                {/* Formulario */}
                <div className="flex-1 flex flex-col space-y-4">
                    <label className="mb-1 font-medium">Ubicación</label>
                    <div className="relative">
                        <input
                            type="text"
                            value={query}
                            onChange={handleInput}
                            placeholder="Ingresa la direccion donde requieres el servicio"
                            className="border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        {suggestions.length > 0 && (
                            <ul className="absolute z-10 bg-white border border-gray-300 rounded w-full mt-1 max-h-48 overflow-y-auto shadow-lg">
                                {suggestions.map((s) => (
                                    <li
                                        key={s.place_id}
                                        onClick={() => handleSelect(s)}
                                        className="px-4 py-2 hover:bg-blue-100 cursor-pointer text-sm"
                                    >
                                        {s.display_name}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
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
                            <div><span className="font-semibold">Partido:</span> {address.state_district || "-"}</div>
                            <div>
                                <span className="font-semibold">Localidad:</span>{" "}
                                {address.city || address.town || address.village || address.hamlet || "-"}
                            </div>
                            <div><span className="font-semibold">Código Postal:</span> {address.postcode || "-"}</div>
                        </div>
                    )}
                </div>
                {/* Mapa */}
                <div className="flex-1">
                    <label className="mb-1 font-medium block">Vista previa en el mapa</label>
                    <div className="rounded-lg overflow-hidden border border-gray-200" style={{ height: 400 }}>
                        <MapContainer
                            center={position || [-34.6037, -58.3816]}
                            zoom={position ? 16 : 12}
                            style={{ height: "100%", width: "100%" }}
                        >
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            {position && (
                                <>
                                    <MapAutoCenter position={position} />
                                    <Marker position={position}>
                                        <Popup>{query}</Popup>
                                    </Marker>
                                </>
                            )}
                        </MapContainer>
                    </div>
                </div>
            </div>
            {address && (
                <div className="mt-6 text-center text-gray-600 space-y-4">
                    <p>Por favor, verifica que la dirección y los detalles proporcionados sean correctos antes de continuar.</p>
                    <button
                        type="button"
                        onClick={handleContinue}
                        className="bg-blue-600 text-white font-semibold py-2 px-6 rounded hover:bg-blue-700 transition"
                    >
                        Continuar
                    </button>
                </div>
            )}
        </div>
    );
};

export default LocationService;