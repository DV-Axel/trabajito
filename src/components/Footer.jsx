import logo from '../assets/images/logo trabajito.png'; // Ajusta la ruta de tu logo
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => (
    <footer className="w-full bg-[#02283A] text-white py-6 px-4">
        <div className=" mx-auto flex flex-col md:flex-row items-center justify-between">
            {/* Izquierda: Logo y nombre */}
            <div className="flex items-center mb-4 md:mb-0">
                <img src={logo} alt="Logo" className="h-10 w-10 mr-3" />

                { /* TODO: Poner el nombre empresa */ }

                <span className="text-xl font-bold">NombreEmpresa</span>
            </div>
            {/* Centro: Redes sociales */}
            <div className="flex space-x-6 mb-4 md:mb-0">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                    <FaFacebook className="h-6 w-6 hover:text-[#0c7fcf] transition-colors" />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                    <FaTwitter className="h-6 w-6 hover:text-[#0c7fcf] transition-colors" />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                    <FaInstagram className="h-6 w-6 hover:text-[#0c7fcf] transition-colors" />
                </a>
            </div>
            {/* Derecha: Otros datos */}
            <div className="text-sm text-right">
                { /* TODO: ver direcciones de contacto */ }

                <div>Contacto: info@empresa.com</div>
                <div>Tel: +54 11 1234-5678</div>
                <div>Buenos Aires, Argentina</div>
            </div>
        </div>
    </footer>
);

export default Footer;