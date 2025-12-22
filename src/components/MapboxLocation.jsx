// javascript
import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

function logFeatureDebug(prefix, feature) {
    console.log(`${prefix} - feature keys:`, Object.keys(feature || {}));
    console.log(`${prefix} - place_type:`, feature?.place_type);
    console.log(`${prefix} - text / place_name:`, feature?.text, feature?.place_name);
    console.log(`${prefix} - properties:`, feature?.properties);
    console.log(`${prefix} - context ids:`, feature?.context?.map(c => c.id) || []);
    console.log(`${prefix} - context items:`, feature?.context);
}

function parseAddress(feature) {
    const addr = {
        road: "",
        house_number: feature.address || "",
        town: "",
        city: "",
        state: "",
        state_district: "",
        country: "",
        postcode: ""
    };

    if (feature.text) addr.road = feature.text;

    // propiedades directas (sin intentar extraer 'partido')
    if (feature.properties) {
        const p = feature.properties;
        if (p.postcode) addr.postcode = addr.postcode || p.postcode;
        // no asignamos `state_district` desde propiedades
    }

    // context (llenar ciudad, localidad, provincia y postal; NO partido)
    if (feature.context && Array.isArray(feature.context)) {
        feature.context.forEach(c => {
            const id = (c.id || "").split(".")[0];
            if (id === "place") addr.city = addr.city || c.text;
            if (id === "locality" || id === "neighborhood" || id === "town" || id === "village") addr.town = addr.town || c.text;
            if (id === "region") addr.state = addr.state || c.text;
            if (id === "country") addr.country = addr.country || c.text;
            if (id === "postcode" || id === "postalcode") addr.postcode = addr.postcode || c.text;
            // no mapear 'district'/'county' a state_district
        });
    }

    return addr;
}

const MapboxLocation = ({ initialPosition = null, onSelect, token = null, mapContainerId = null }) => {
    const resolveToken = () => {
        if (token) return token;
        try {
            if (import.meta && import.meta.env && import.meta.env.VITE_MAPBOX_TOKEN) {
                return import.meta.env.VITE_MAPBOX_TOKEN;
            }
        } catch (e) {
            // import.meta no disponible
        }
        if (globalThis && globalThis.process && globalThis.process.env && globalThis.process.env.REACT_APP_MAPBOX_TOKEN) {
            return globalThis.process.env.REACT_APP_MAPBOX_TOKEN;
        }
        if (typeof window !== "undefined" && window.REACT_APP_MAPBOX_TOKEN) {
            return window.REACT_APP_MAPBOX_TOKEN;
        }
        return null;
    };

    const MAPBOX_TOKEN = resolveToken();

    if (!MAPBOX_TOKEN && typeof window !== "undefined") {
        console.warn("Mapbox token not set. Define VITE_MAPBOX_TOKEN (Vite) or REACT_APP_MAPBOX_TOKEN (CRA) or pass `token` prop");
    }

    const internalMapContainer = useRef(null);
    const mapRef = useRef(null);
    const markerRef = useRef(null);

    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const containerEl = mapContainerId ? document.getElementById(mapContainerId) : internalMapContainer.current;
        if (!containerEl) return;

        if (MAPBOX_TOKEN) {
            mapboxgl.accessToken = MAPBOX_TOKEN;
        }

        if (!mapRef.current && containerEl) {
            mapRef.current = new mapboxgl.Map({
                container: containerEl,
                style: "mapbox://styles/mapbox/streets-v11",
                center: initialPosition ? [initialPosition.lng, initialPosition.lat] : [-58.3816, -34.6037],
                zoom: initialPosition ? 16 : 12
            });

            mapRef.current.on("click", async (e) => {
                const lng = e.lngLat.lng;
                const lat = e.lngLat.lat;
                if (markerRef.current) markerRef.current.remove();
                markerRef.current = new mapboxgl.Marker().setLngLat([lng, lat]).addTo(mapRef.current);

                if (MAPBOX_TOKEN) {
                    try {
                        const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${MAPBOX_TOKEN}&country=ar&limit=1`;
                        const res = await fetch(url);
                        const data = await res.json();
                        const f = data.features && data.features[0];

                        console.log("Geocode (click) raw feature:", f);
                        if (f) logFeatureDebug("Click", f);

                        if (f) {
                            const address = parseAddress(f);
                            console.log("Parsed address (click):", address);
                            onSelect({
                                position: [lat, lng],
                                address,
                                display_name: f.place_name
                            });
                        } else {
                            onSelect({ position: [lat, lng], address: null, display_name: null });
                        }
                    } catch (err) {
                        console.error("Geocoding error:", err);
                        onSelect({ position: [lat, lng], address: null, display_name: null });
                    }
                } else {
                    onSelect({ position: [lat, lng], address: null, display_name: null });
                }
            });
        }

        return () => {
            if (markerRef.current) {
                try { markerRef.current.remove(); } catch (cleanupErr) { console.warn("Marker remove error:", cleanupErr); }
                markerRef.current = null;
            }
            if (mapRef.current) {
                try { mapRef.current.remove(); } catch (cleanupErr) { console.warn("Map remove error:", cleanupErr); }
                mapRef.current = null;
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [initialPosition, onSelect, MAPBOX_TOKEN, mapContainerId]);

    useEffect(() => {
        if (initialPosition && mapRef.current) {
            mapRef.current.setCenter([initialPosition.lng, initialPosition.lat]);
            mapRef.current.setZoom(16);
            if (markerRef.current) markerRef.current.remove();
            markerRef.current = new mapboxgl.Marker().setLngLat([initialPosition.lng, initialPosition.lat]).addTo(mapRef.current);
        }
    }, [initialPosition]);

    const handleInput = async (e) => {
        const value = e.target.value;
        setQuery(value);
        setSuggestions([]);
        if (!value || value.length < 3) return;
        if (!MAPBOX_TOKEN) return;

        setLoading(true);
        try {
            const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(value)}.json?access_token=${MAPBOX_TOKEN}&country=ar&autocomplete=true&limit=5&types=address,place,neighborhood,locality`;
            const res = await fetch(url);
            const data = await res.json();

            console.log("Autocomplete raw features:", data.features);
            if (Array.isArray(data.features)) {
                data.features.forEach((f, i) => logFeatureDebug(`Autocomplete[${i}]`, f));
            }

            setSuggestions(data.features || []);
        } catch (fetchErr) {
            console.error("Autocomplete error:", fetchErr);
        } finally {
            setLoading(false);
        }
    };

    const handleSelect = (feature) => {
        const [lng, lat] = feature.center;
        if (mapRef.current) {
            mapRef.current.flyTo({ center: [lng, lat], zoom: 16 });
        }
        if (markerRef.current) markerRef.current.remove();
        markerRef.current = new mapboxgl.Marker().setLngLat([lng, lat]).addTo(mapRef.current);

        console.log("Selected feature raw:", feature);
        logFeatureDebug("Select", feature);

        const address = parseAddress(feature);
        console.log("Selected parsed address:", address);

        setSuggestions([]);
        setQuery(feature.place_name);
        onSelect({
            position: [lat, lng],
            address,
            display_name: feature.place_name
        });
    };

    return (
        <div className="w-full">
            <div className="relative mb-3">
                <input
                    type="text"
                    value={query}
                    onChange={handleInput}
                    placeholder="Buscar dirección (Mapbox)"
                    className="border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                {loading && <div className="absolute right-2 top-2 text-sm text-gray-600">Cargando...</div>}
                {suggestions.length > 0 && (
                    <ul className="absolute z-30 bg-white border rounded w-full mt-1 max-h-48 overflow-y-auto shadow-lg">
                        {suggestions.map(s => (
                            <li
                                key={s.id}
                                onClick={() => handleSelect(s)}
                                className="px-4 py-2 hover:bg-blue-100 cursor-pointer text-sm"
                            >
                                {s.place_name}
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {!mapContainerId && (
                <div style={{ height: 400 }} ref={internalMapContainer} className="rounded-lg overflow-hidden border border-gray-200" />
            )}
        </div>
    );
};

export default MapboxLocation;