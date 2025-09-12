import { FaRegQuestionCircle, FaSignInAlt, FaBars, FaUserCircle, FaClipboardList } from 'react-icons/fa';
import { GiStoneCrafting } from "react-icons/gi";
import logo from '../assets/images/logo trabajito.png';
import { Link } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import { useAuth } from '../context/useAuth';

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const { user, logout } = useAuth();
    const userMenuRef = useRef(null);

    useEffect(() => {
        if (!userMenuOpen) return;
        const handleClickOutside = (event) => {
            if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
                setUserMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [userMenuOpen]);

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

            {/* Menú de escritorio */}
            <div className="hidden mdplus:flex gap-10 text-white items-center">
                <Link to="/ayuda" className="flex flex-col items-center hover:text-[#00b4d8] transition-colors">
                    <FaRegQuestionCircle title="Ayuda" className="text-4xl" />
                    <span className="text-base mt-2 uppercase">Ayuda</span>
                </Link>
                {user ? (
                    <>
                        <Link to="/solicitar" className="flex flex-col items-center hover:text-[#00b4d8] transition-colors">
                            <GiStoneCrafting className="text-4xl" />
                            <span className="text-base mt-2 uppercase">Pedir un servicio</span>
                        </Link>
                        <div className="relative flex flex-col items-center">
                            <button
                                onClick={() => setUserMenuOpen(!userMenuOpen)}
                                className="flex flex-col items-center gap-0 focus:outline-none"
                            >
                                <FaUserCircle className="text-4xl" />
                                <span className="text-base mt-2 uppercase">
                                    {user.nombre} {user.apellido}
                                </span>
                            </button>
                            {userMenuOpen && (
                                <div
                                    ref={userMenuRef}
                                    className="absolute top-full right-0 bg-[#02283A] text-white rounded-xl shadow-2xl mt-2 w-56 z-50 border border-[#095a8e] animate-fade-in"
                                >
                                    <Link
                                        to="/perfil"
                                        className="flex items-center gap-3 px-5 py-3 hover:bg-[#095a8e] transition-colors rounded-t-xl"
                                    >
                                        <FaUserCircle className="text-2xl" />
                                        <span>Ver perfil</span>
                                    </Link>
                                    <Link
                                        to="/mis-servicios"
                                        className="flex items-center gap-3 px-5 py-3 hover:bg-[#095a8e] transition-colors"
                                    >
                                        <FaClipboardList className="text-2xl" />
                                        <span>Mis servicios</span>
                                    </Link>
                                    <div className="border-t border-[#095a8e] my-1"></div>
                                    <button
                                        onClick={logout}
                                        className="flex items-center gap-3 w-full text-left px-5 py-3 hover:bg-[#ffeaea] text-[#d32f2f] font-semibold transition-colors rounded-b-xl"
                                    >
                                        <FaSignInAlt className="text-2xl" />
                                        Cerrar sesión
                                    </button>
                                </div>
                            )}
                        </div>
                    </>
                ) : (
                    <Link to="/login" className="flex flex-col items-center hover:text-[#00b4d8] transition-colors">
                        <FaSignInAlt title="Iniciar sesión" className="text-4xl" />
                        <span className="text-base mt-2 uppercase">Iniciar Sesión</span>
                    </Link>
                )}
            </div>

            {/* Menú hamburguesa en móvil */}
            {menuOpen && (
                <div className="absolute top-full right-0 bg-[#02283A] w-56 rounded-xl shadow-2xl flex flex-col items-center py-4 mdplus:hidden z-50 border border-[#095a8e] animate-fade-in">
                    {!user ? (
                        <Link to="/login" className="flex flex-col items-center hover:text-[#00b4d8] transition-colors">
                            <FaSignInAlt title="Iniciar sesión" className="text-white text-3xl" />
                            <span className="text-base mt-2 uppercase text-white">Iniciar Sesión</span>
                        </Link>
                    ) : (
                        <>
                            <div className="flex flex-col items-center mb-2">
                                <FaUserCircle className="text-white text-3xl" />
                                <span className="text-base mt-2 uppercase text-white">
                        {user.nombre} {user.apellido}
                    </span>
                            </div>
                            <Link to="/solicitar" className="flex flex-col items-center mb-2 hover:text-[#00b4d8] transition-colors">
                                <GiStoneCrafting className="text-white text-3xl" />
                                <span className="text-base mt-2 uppercase text-white">Pedir un servicio</span>
                            </Link>
                            <Link to="/mis-servicios" className="flex flex-col items-center mb-2 hover:text-[#00b4d8] transition-colors">
                                <FaClipboardList className="text-white text-3xl" />
                                <span className="text-base mt-2 uppercase text-white">Mis servicios</span>
                            </Link>
                            <Link to="/ayuda" className="flex flex-col items-center mb-2 hover:text-[#00b4d8] transition-colors">
                                <FaRegQuestionCircle className="text-white text-3xl" />
                                <span className="text-base mt-2 uppercase text-white">Ayuda</span>
                            </Link>
                            <button
                                onClick={logout}
                                className="flex items-center gap-2 w-full text-left px-4 py-2 text-white hover:bg-[#ffeaea] hover:text-[#d32f2f] font-semibold transition-colors"
                            >
                                <FaSignInAlt className="text-2xl" />
                                <span>Cerrar sesión</span>
                            </button>
                        </>
                    )}
                </div>
            )}
        </header>
    );
};

export default Header;