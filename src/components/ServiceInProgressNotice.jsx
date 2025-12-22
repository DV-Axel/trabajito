// javascript
import React from 'react';
import { FaCompass } from 'react-icons/fa';

export const ServiceInProgressNotice = ({ className = '', showIcon = false }) => {
    return (
        <div className={`bg-green-50 border border-green-200 rounded-lg px-4 py-3 ${className}`}>
            <div className="flex items-center gap-2">
                {showIcon && <FaCompass className="w-4 h-4 text-green-700" />}
                <div className="text-sm font-semibold text-green-700">Servicio en curso</div>
            </div>
            <div className="text-sm text-gray-700 mt-1">
                Accede al seguimiento del servicio desde el botón.
            </div>
        </div>
    );
};

export default ServiceInProgressNotice;
