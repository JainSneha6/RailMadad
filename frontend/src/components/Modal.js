import React from 'react';
import ReactDOM from 'react-dom';
import { useModal } from '../store/ModalProvider';
import RailwayAdminLoginModal from './RailwayAdminLoginModal';

export const Modal = () => {
    const { isModalOpen, closeModal } = useModal();

    if (!isModalOpen) return null;

    return ReactDOM.createPortal(
        <RailwayAdminLoginModal onClose={closeModal} />,
        document.body
    );
};

export default Modal;
