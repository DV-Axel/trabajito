import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';

import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Confirm from './pages/Confirm';
import Validate from './pages/Validate';
import RestartPassword from "./pages/RestartPassword.jsx";
import NewPassword from "./pages/NewPassword.jsx";


function App() {
        return (
            <Router>
                <div className="min-h-screen flex flex-col">
                    <Header/>
                    <main className="flex-1">
                        <Routes>

                            {/* ruta home */}
                            <Route path="/" element={<Home/>}/>

                            {/* Rutas de login y signup */}
                            <Route path="/login" element={<Login/>}/>
                            <Route path="/registro" element={<Signup/>}/>
                            <Route path="/confirmacion" element={<Confirm/>}/>
                            <Route path="/validacion" element={<Validate/>}/>
                            <Route path="/restablecerContraseña" element={<RestartPassword/>}/>
                            <Route path="/nuevaContraseña" element={<NewPassword />}/>
                        </Routes>
                    </main>
                    <Footer/>
                </div>
            </Router>
        );
    }


export default App;