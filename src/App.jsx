import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';

import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Confirm from './pages/Confirm';
import {Component} from "react";

class App extends Component {
    render() {
        return (
            <Router>
                <div className="min-h-screen flex flex-col">
                    <Header/>
                    <main className="flex-1">
                        <Routes>
                            <Route path="/" element={<Home/>}/>
                            <Route path="/login" element={<Login/>}/>
                            <Route path="/registro" element={<Signup/>}/>
                            <Route path="/confirmacion" element={<Confirm/>}/>
                        </Routes>
                    </main>
                    <Footer/>
                </div>
            </Router>
        );
    }
}

export default App;