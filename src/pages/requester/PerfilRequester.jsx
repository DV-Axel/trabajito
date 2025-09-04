import { useAuth } from '../../context/useAuth';
import { FaIdCard, FaEnvelope, FaBirthdayCake, FaPhone, FaMapMarkerAlt, FaHashtag, FaUserEdit, FaCamera } from 'react-icons/fa';

const PerfilRequester = () => {
    const { user } = useAuth();

    if (!user) {
        return <div className="text-center mt-10 text-lg text-gray-600">Cargando perfil...</div>;
    }

    const handleEdit = () => {
        alert('Abrir formulario para editar datos (excepto correo electrónico)');
    };

    const handleChangePhoto = () => {
        alert('Abrir selector para cambiar foto de perfil');
    };

    return (
        <div className="flex mt-10 items-center justify-center bg-[#f4fbfd]">
            <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl p-10 border-4">
                <div className="flex flex-col items-center mb-8">
                    <div className="relative">
                        <img
                            src={user.fotoPerfil || '/default-avatar.png'}
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
                    </div>
                    <div className="flex items-center gap-3 mt-3">
                        <h2 className="text-2xl font-bold text-[#02283A]">{user.nombre} {user.apellido}</h2>
                        <button
                            onClick={handleEdit}
                            className="bg-[#00b4d8] text-white px-3 py-1 rounded-full flex items-center gap-1 shadow hover:bg-[#0288a7] transition text-sm"
                            title="Editar datos"
                        >
                            <FaUserEdit />
                            Editar
                        </button>
                    </div>
                    <span className="text-sm text-[#00b4d8] mt-1">Solicitante de servicios</span>
                </div>
                <div className="space-y-5">
                    <div className="flex items-center gap-3">
                        <FaIdCard className="text-[#00b4d8] text-xl" />
                        <span className="font-semibold text-[#02283A]">Tipo y N° de identificación:</span>
                        <span>{user.tipoIdentificacion} {user.numeroIdentificacion}</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <FaEnvelope className="text-[#00b4d8] text-xl" />
                        <span className="font-semibold text-[#02283A]">Correo electrónico:</span>
                        <span className="text-gray-500">{user.email}</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <FaBirthdayCake className="text-[#00b4d8] text-xl" />
                        <span className="font-semibold text-[#02283A]">Fecha de nacimiento:</span>
                        <span>{user.fechaNacimiento}</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <FaPhone className="text-[#00b4d8] text-xl" />
                        <span className="font-semibold text-[#02283A]">Teléfono:</span>
                        <span>{user.telefono}</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <FaMapMarkerAlt className="text-[#00b4d8] text-xl" />
                        <span className="font-semibold text-[#02283A]">Dirección:</span>
                        <span>
                            {user.direccion} {user.numeroDireccion}
                            {user.piso && `, Piso ${user.piso}`}
                            {user.departamento && `, Depto. ${user.departamento}`}
                        </span>
                    </div>
                    <div className="flex items-center gap-3">
                        <FaHashtag className="text-[#00b4d8] text-xl" />
                        <span className="font-semibold text-[#02283A]">Código postal:</span>
                        <span>{user.codigoPostal}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PerfilRequester;