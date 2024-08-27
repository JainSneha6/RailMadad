import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Modal } from './components/Modal';
import { ModalProvider } from './store/ModalProvider';
import Home from './pages/HomePage';
import AdminDashboard from './pages/AdminDashboard'; 
import GrievanceList from './pages/GrievancesList';

function App() {
    return (
        <ModalProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/admin-dashboard" element={<AdminDashboard />} /> 
                    <Route path="/grievances/:type/:name" element={<GrievanceList />} />
                </Routes>
                <Modal />
            </Router>
        </ModalProvider>
    );
}

export default App;
