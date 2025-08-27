import { FaRegQuestionCircle, FaSignInAlt, FaBars } from 'react-icons/fa';
import logo from '../assets/images/logo trabajito.png';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header className="bg-[#02283A] flex justify-between items-center px-8 py-2 relative">
            <Link to="/" className="flex items-center text-white text-3xl font-semibold">
                <img src={logo} alt="Logo" className="mr-4 w-16 h-16 object-contain" />
                TRABAJITO
            </Link>

            {/* Botón hamburguesa solo en móvil */}
            <button
                className="mdplus:hidden text-white text-4xl"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Abrir menú"
            >
                <FaBars />
            </button>

            {/* Links en desktop */}
            <div className="hidden mdplus:flex gap-12 text-white">
                <div className="flex flex-col items-center">
                    <FaRegQuestionCircle title="Ayuda" className="cursor-pointer text-4xl" />
                    <span className="text-base mt-2 uppercase">Ayuda</span>
                </div>
                <Link to="/login" className="flex flex-col items-center">
                    <FaSignInAlt title="Iniciar sesión" className="cursor-pointer text-4xl" />
                    <span className="text-base mt-2 uppercase">Iniciar Sesión</span>
                </Link>
            </div>

            {/* Menú hamburguesa en móvil */}
            {/*TODO: cambiar el color de los iconos en el menu hamburguesa*/}
            {menuOpen && (
                <div className="absolute top-full right-0 bg-[#02283A] w-48 rounded-lg shadow-lg flex flex-col items-center py-4 mdplus:hidden z-50">
                    <div className="flex flex-col items-center mb-4">
                        <FaRegQuestionCircle title="Ayuda" className="cursor-pointer text-white text-3xl" />
                        <span className="text-base mt-2 uppercase text-white">Ayuda</span>
                    </div>
                    <Link to="/login" className="flex flex-col items-center">
                        <FaSignInAlt title="Iniciar sesión" className="cursor-pointer text-white text-3xl" />
                        <span className="text-base mt-2 uppercase text-white">Iniciar Sesión</span>
                    </Link>
                </div>
            )}
        </header>
    );
}

export default Header;