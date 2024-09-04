// src/components/Footer.jsx
import React from 'react';
import { useModal } from '../store/ModalProvider';
import RailwayAdminLoginModal from './RailwayAdminLoginModal';
import TTELoginModal from './TTELoginModal';
import StationMasterLoginModal from './StationMasterLoginModal';

const Footer = () => {
    const { openModal, closeModal, isModalOpen } = useModal();
    const [modalType, setModalType] = React.useState(null);

    const handleOpenModal = (type) => {
        setModalType(type);
        openModal();
    };

    return (
        <footer className="bg-maroon flex flex-col md:flex-row justify-between items-center text-white text-center py-4 px-12">
            <p className="mb-4 md:mb-0">Copyright ©2019 RAILMADAD. All Rights Reserved.</p>
            <div className="text-sm">
                <a href="#!" className="mx-2">Home</a> |
                <a href="#!" className="mx-2">FAQs</a> |
                <a href="#!" className="mx-2" onClick={() => handleOpenModal('admin')}>Railway Admin Login</a> |
                <a href="#!" className="mx-2" onClick={() => handleOpenModal('tte')}>TTE Login</a> |
                <a href="#!" className="mx-2" onClick={() => handleOpenModal('stationMaster')}>Station Master Login</a> |
                <a href="#!" className="mx-2">MIS Report Login</a>
            </div>

            {isModalOpen && modalType === 'admin' && <RailwayAdminLoginModal onClose={closeModal} />}
            {isModalOpen && modalType === 'tte' && <TTELoginModal onClose={closeModal} />}
            {isModalOpen && modalType === 'stationMaster' && <StationMasterLoginModal onClose={closeModal} />}
        </footer>
    );
};

export default Footer;
