import { useRef, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { FaIdCard, FaEnvelope, FaBirthdayCake, FaPhone, FaMapMarkerAlt, FaHashtag, FaCamera } from 'react-icons/fa';

const PerfilRequester = () => {
    const [user, setUser] = useState(null);
    const [preview, setPreview] = useState('/default-avatar.png');
    const fileInputRef = useRef(null);

    // Obtener userId del token
    const getUserIdFromToken = () => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decoded = jwtDecode(token);
                return decoded.id || decoded.userId || decoded.sub;
            } catch {
                return null;
            }
        }
        return null;
    };

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem('token');
            const userId = getUserIdFromToken();
            if (!userId) return;

            try {
                const res = await fetch(`http://localhost:3000/users/${userId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                if (res.ok) {
                    const data = await res.json();
                    setUser(data.user);
                    setPreview(data.profilePicture || '/default-avatar.png');
                }
            } catch {
                // Manejo de error opcional
            }
        };
        fetchUser();
    }, []);

    if (!user) {
        return <div className="text-center mt-10 text-lg text-gray-600">Cargando perfil...</div>;
    }

    const handleChangePhoto = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const formData = new FormData();
            formData.append('profilePicture', file);

            const token = localStorage.getItem('token');
            const userId = getUserIdFromToken();

            try {
                //const response = await fetch(`/api/usuario/${userId}/foto`
                const response = await fetch(`http://localhost:3000/users/profile-picture/${userId}`, {
                    method: 'PUT',
                    body: formData,
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setPreview(data.profilePicture);
                } else {
                    alert('Error al subir la foto');
                }
            } catch {
                alert('Error de red al subir la foto');
            }
        }
    };

    return (
        <div className="flex mt-10 items-center justify-center bg-[#f4fbfd]">
            <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl p-10 border-4">
                <div className="flex flex-col items-center mb-8 uppercase">
                    <div className="mb-4 text-center">
                        <span className="text-2xl font-bold text-[#02283A]">
                            {user.firstName} {user.lastName}
                        </span>
                    </div>
                    <div className="relative">
                        <img
                            //src={preview}
                            src={`http://localhost:3000${user.profilePicture}`}
                            alt="Foto de perfil"
                            className="w-52 h-52 rounded-full object-cover border-2 border-[#00b4d8] mb-3 shadow-2xl"
                        />
                        <button
                            onClick={handleChangePhoto}
                            className="absolute bottom-4 right-4 bg-[#00b4d8] text-white p-2 rounded-full shadow hover:bg-[#0288a7] transition"
                            title="Cambiar foto de perfil"
                        >
                            <FaCamera />
                        </button>
                        <input
                            type="file"
                            accept="image/*"
                            ref={fileInputRef}
                            style={{ display: 'none' }}
                            onChange={handleFileChange}
                        />
                    </div>
                    <span className="text-sm text-[#00b4d8] mt-1">Solicitante de servicios</span>
                </div>
                <div className="space-y-5">
                    <div className="flex items-center gap-3">
                        <FaIdCard className="text-[#00b4d8] text-xl" />
                        <span className="font-semibold text-[#02283A]">Tipo y N° de identificación:</span>
                        {/*TODO: falta el tipo de identificacion*/}
                        <span>{user.tipoIdentificacion} {user.dni}</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <FaEnvelope className="text-[#00b4d8] text-xl" />
                        <span className="font-semibold text-[#02283A]">Correo electrónico:</span>
                        <span className="text-gray-500">{user.email}</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <FaBirthdayCake className="text-[#00b4d8] text-xl" />
                        <span className="font-semibold text-[#02283A]">Fecha de nacimiento:</span>
                        <span>{user.birthDate}</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <FaPhone className="text-[#00b4d8] text-xl" />
                        <span className="font-semibold text-[#02283A]">Teléfono:</span>
                        <span>{user.phone}</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <FaMapMarkerAlt className="text-[#00b4d8] text-xl" />
                        <span className="font-semibold text-[#02283A]">Dirección:</span>
                        <span>
                            {user.address} {user.number}
                            {user.departmentNumber && `, Piso ${user.departmentNumber}`}
                            {user.departamento && `, Depto. ${user.departamento}`}
                        </span>
                    </div>
                    <div className="flex items-center gap-3">
                        <FaHashtag className="text-[#00b4d8] text-xl" />
                        <span className="font-semibold text-[#02283A]">Código postal:</span>
                        <span>{user.postalCode}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PerfilRequester;