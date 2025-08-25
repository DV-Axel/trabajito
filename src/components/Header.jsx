import { FaRegQuestionCircle, FaSignInAlt, FaReact } from 'react-icons/fa';
import logo from '../assets/images/logo trabajito.png';
import { Link } from 'react-router-dom';

const Header = () => {
    return (

        <header className="bg-[#02283A] flex justify-between items-center px-8 py-2">

            { /* TODO: hacer el menu hamburguesa */ }

            <Link to="/" className="flex items-center text-white text-3xl font-semibold">
                <img src={logo} alt="Logo" className="mr-4 w-16 h-16 object-contain" />
                TRABAJITO
            </Link>

            <div className="flex gap-12 text-white">
                <div className="flex flex-col items-center">
                    <FaRegQuestionCircle title="Ayuda" className="cursor-pointer text-4xl" />
                    <span className="text-base mt-2 uppercase">Ayuda</span>
                </div>
                <Link to="/login" className="flex flex-col items-center">
                    <FaSignInAlt title="Iniciar sesión" className="cursor-pointer text-4xl" />
                    <span className="text-base mt-2 uppercase">Iniciar Sesión</span>
                </Link>
            </div>
        </header>
    );
}

export default Header;