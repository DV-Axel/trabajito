import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';

//home y landing de la pagina
import Home from './pages/Home';

// Rutas de autenticación
import Login from './pages/auth/Login.jsx';
import Signup from './pages/auth/Signup.jsx';
import Confirm from './pages/auth/Confirm.jsx';
import Validate from './pages/auth/Validate.jsx';
import RestartPassword from "./pages/auth/RestartPassword.jsx";
import NewPassword from "./pages/auth/NewPassword.jsx";

// Rutas de solicitantes de servicios
import IndexRequester from "./pages/requester/RequesterIndex.jsx";
import Formservice from "./pages/requester/Formservice.jsx";
import LocationService from "./pages/requester/LocationService.jsx";
import UploadFilesService from "./pages/requester/UploadFilesService.jsx";
import CheckRequestService from "./pages/requester/CheckRequestService.jsx";

//Rutas para registro worker
import BeWorker from "./pages/worker/BeWorker.jsx";
import FormWorker from "./pages/worker/FormWorker.jsx";
import ConfirmWorker from "./pages/worker/ConfirmWorker.jsx";

//Rutas para registro sponsor
import BeSponsor from "./pages/sponsor/BeSponsor.jsx";
import FormSponsor from "./pages/sponsor/FormSponsor.jsx";

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
                            <Route path="/formularioSolicitud" element={<Formservice/>} />
                            <Route path="/ubicacionServicio" element={<LocationService/>} />
                            <Route path="/subirArchivos" element={<UploadFilesService/>} />
                            <Route path="/resumenServicio" element={<CheckRequestService/>} />

                            {/* Rutas de los workers */}
                            <Route path="/seUnWorker" element={<BeWorker />} />
                            <Route path="/registro-worker" element={<FormWorker />} />
                            <Route path="/confirmacionWorker" element={<ConfirmWorker />} />

                            {/* Rutas de los sponsors */}
                            <Route path="/seUnSponsor" element={<BeSponsor />} />
                            <Route path="/registro-sponsor" element={<FormSponsor />} />

                        </Routes>
                    </main>
                    <Footer/>
                </div>
            </Router>
        );
    }


export default App;