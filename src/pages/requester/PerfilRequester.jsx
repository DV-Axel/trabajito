// javascript
// File: `src/pages/requester/PerfilRequester.jsx`
import {formatDate} from '../../data/helpers';
import { FaIdCard, FaEnvelope, FaBirthdayCake, FaPhone, FaMapMarkerAlt, FaHashtag, FaCamera, FaPen } from 'react-icons/fa';
import useSetNewProfilePictureUser from '../../data/hooks/useSetNewProfilePictureUser.js';
import useGetUserById from '../../data/hooks/useGetUserById.js'
import useUpdatePerfilAtribute from '../../data/hooks/useUpdatePerfilAtribute';
import { getUserIdFromToken } from "../../data/helpers.js";
import React, {useRef} from "react";

const PerfilRequester = () => {
    const id = getUserIdFromToken();
    const { updatePerfilAtribute } = useUpdatePerfilAtribute();
    const { user, loadingUser, errorUser } = useGetUserById(id);
    const { cambiarFotoPerfilUser } = useSetNewProfilePictureUser(id);

    const fileInputRef = useRef(null);

    const handleChangePhoto = () => {
        fileInputRef.current.click();
    };

    if (loadingUser) return <div>Cargando solicitud...</div>;
    if (errorUser) return <div>Error al obtener la solicitud</div>;
    if (!user) return null;

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#F4FBFD]">
            <div className="w-full max-w-2xl bg-white mt-8 mb-8 rounded-lg shadow-lg p-10 border border-gray-300">
                <div className="flex flex-col items-center mb-9">
                    <div className="mb-4 text-center">
                        <span className="text-2xl font-bold text-[#02283A]">
                            {user.firstName} {user.lastName}
                        </span>
                    </div>
                    <div className="relative w-52 h-52 mb-3">
                        <img
                            src={`http://localhost:3000${user.profilePicture}`}
                            alt="Foto de perfil"
                            className="w-52 h-52 rounded-full object-cover border-2 border-[#00b4d8] mb-3 shadow-2xl"
                        />
                        <button
                            onClick={handleChangePhoto}
                            className="absolute bottom-4 right-4 bg-[#00b4d8] text-white p-2 rounded-full shadow hover:bg-[#0288a7] transition"
                            title="Actualizar foto de perfil"
                        >
                            <FaCamera />
                        </button>
                        <input
                            type="file"
                            accept="image/*"
                            ref={fileInputRef}
                            style={{ display: 'none' }}
                            onChange={cambiarFotoPerfilUser}
                        />
                    </div>
                    <span className="text-lg text-[#00b4d8] mt-1 bg-[#e8fbff] px-3 py-1 rounded-full font-medium">Solicitante de servicios</span>
                </div>
                <div className="space-y-5">
                    <div className="flex items-center gap-3">
                        <FaIdCard className="text-[#00b4d8] text-xl" />
                        <span className="font-semibold text-[#02283A]">Tipo y N° de identificación:</span>
                        <span className="uppercase">{user.idType} {user.dni}</span>
                    </div>

                    <div className="flex items-center gap-3">
                        <FaEnvelope className="text-[#00b4d8] text-xl" />
                        <span className="font-semibold text-[#02283A]">Correo electrónico:</span>
                        <span>{user.email}</span>
                    </div>

                    <div className="flex items-center gap-3">
                        <FaBirthdayCake className="text-[#00b4d8] text-xl" />
                        <span className="font-semibold text-[#02283A]">Fecha de nacimiento:</span>
                        <span>{formatDate(user.birthDate)}</span>
                    </div>

                    <div className="flex items-center gap-3">
                        <FaPhone className="text-[#00b4d8] text-xl" />
                        <span className="font-semibold text-[#02283A]">Teléfono:</span>
                        <span>{user.phone}</span>
                        <button
                            type="button"
                            onClick={() => updatePerfilAtribute(user.id, 'phone', 'Numero de Teléfono', user.phone)}
                            className="ml-2 p-1 rounded hover:bg-gray-100"
                            title="Editar Teléfono"
                            aria-label="Editar Teléfono"
                        >
                            <FaPen className="text-[#00b4d8]" />
                        </button>
                    </div>

                    <div className="flex items-center gap-3">
                        <FaMapMarkerAlt className="text-[#00b4d8] text-xl" />
                        <span className="font-semibold text-[#02283A]">Dirección:</span>
                        <span>
                            {user.address} {user.number}
                            {user.departmentNumber && `, Piso ${user.departmentNumber}`}
                            {user.departamento && `, Depto. ${user.departamento}`}
                        </span>
                        <button
                            type="button"
                            onClick={() => updatePerfilAtribute(user.id, 'address', 'Direccion')}
                            className="ml-2 p-1 rounded hover:bg-gray-100"
                            title="Editar Dirección"
                            aria-label="Editar Dirección"
                        >
                            <FaPen className="text-[#00b4d8]" />
                        </button>
                    </div>

                    <div className="flex items-center gap-3">
                        <FaHashtag className="text-[#00b4d8] text-xl" />
                        <span className="font-semibold text-[#02283A]">Código postal:</span>
                        <span>{user.postalCode}</span>
                        <button
                            type="button"
                            onClick={() => updatePerfilAtribute(user.id, 'postalCode', 'Codigo Posta')}
                            className="ml-2 p-1 rounded hover:bg-gray-100"
                            title="Editar Código Postal"
                            aria-label="Editar Código Postal"
                        >
                            <FaPen className="text-[#00b4d8]" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PerfilRequester;