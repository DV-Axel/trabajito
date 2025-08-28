import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';

import Home from './pages/Home';
import Login from './pages/auth/Login.jsx';
import Signup from './pages/auth/Signup.jsx';
import Confirm from './pages/auth/Confirm.jsx';
import Validate from './pages/auth/Validate.jsx';
import RestartPassword from "./pages/auth/RestartPassword.jsx";
import NewPassword from "./pages/auth/NewPassword.jsx";
import IndexRequester from "./pages/requester/RequesterIndex.jsx";


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

                            {/* Rutas de los solicitantes de servicios */}
                            <Route path="/solicitar" element={<IndexRequester />} />
                        </Routes>
                    </main>
                    <Footer/>
                </div>
            </Router>
        );
    }


export default App;