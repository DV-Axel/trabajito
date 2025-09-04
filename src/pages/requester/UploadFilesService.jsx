import React, { useState } from "react";
import {useLocation, useNavigate} from "react-router-dom";

const UploadFilesService = () => {
    // const navigate = useNavigate();
    const [photos, setPhotos] = useState([]);
    const location = useLocation();
    const navigate = useNavigate();


    const handleFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files).map(file => ({
            file,
            note: ""
        }));
        setPhotos(selectedFiles);
    };

    const handleNoteChange = (idx, value) => {
        setPhotos(prev =>
            prev.map((photo, i) =>
                i === idx ? { ...photo, note: value } : photo
            )
        );
    };

    const handleRemovePhoto = (idx) => {
        setPhotos(prev => prev.filter((_, i) => i !== idx));
    };

    // Función para avanzar (ajusta según tu lógica de navegación)
    const handleContinue = () => {
        navigate("/resumenServicio", { state: { ...location.state, photos } });
    };

    console.log(useLocation())

    return (
        <div className="bg-gray-100 flex items-center justify-center">
            <div className="max-w-xl w-full bg-white shadow-lg rounded-lg p-8 my-8 border border-gray-300">
                <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Sube fotos del servicio</h1>
                <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleFileChange}
                    className="mb-4 w-full border border-gray-400 rounded px-2 py-1 bg-gray-50 text-gray-700"
                />
                <div className="flex flex-col gap-4">
                    {photos.map((photo, idx) => (
                        <div key={idx} className="border border-gray-400 rounded p-2 flex flex-col items-center bg-white shadow-sm">
                            <img
                                src={URL.createObjectURL(photo.file)}
                                alt={`preview-${idx}`}
                                className="w-full h-32 object-cover rounded mb-2 border border-gray-300"
                            />
                            <textarea
                                placeholder="Agregar nota..."
                                value={photo.note}
                                onChange={e => handleNoteChange(idx, e.target.value)}
                                rows={3}
                                className="w-full border border-gray-400 rounded px-2 py-1 text-sm resize-none h-20 bg-gray-50 text-gray-700"
                            />
                            <div className="flex items-center justify-between w-full mt-1 text-xs">
                                <span className="text-gray-700">{photo.file.name}</span>
                                <button
                                    type="button"
                                    onClick={() => handleRemovePhoto(idx)}
                                    className="bg-red-600 text-white rounded px-2 py-1 text-xs hover:bg-red-700 ml-2"
                                >
                                    Borrar
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                <button
                    type="button"
                    onClick={handleContinue}
                    className="mt-8 w-full bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700 transition"
                >
                    {photos.length > 0 ? "Continuar" : "Continuar sin fotos"}
                </button>
            </div>
        </div>
    );
};

export default UploadFilesService;