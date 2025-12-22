import React from 'react';

const SelectWorkerNotice = ({ className = '' }) => (
    <div className={`bg-yellow-50 border border-yellow-200 rounded-lg px-4 py-3 ${className}`}>
        <div className="text-sm font-semibold text-yellow-700">
            Debes seleccionar un worker para este servicio
        </div>
        <div className="text-sm text-gray-700 mt-1">
            Ve al listado de postulaciones y elige el profesional que deseas contratar.
        </div>
    </div>
);

export default SelectWorkerNotice;
