import React from 'react';
import { useModal } from '../store/ModalProvider';

const Footer = () => {
    const { openModal } = useModal();

    return (
        <footer className="bg-maroon flex flex-col md:flex-row justify-between items-center text-white text-center py-4 px-12">
            <p className="mb-4 md:mb-0">Copyright ©2019 RAILMADAD. All Rights Reserved.</p>
            <div className="text-sm">
                <a href="#!" className="mx-2">Home</a> | 
                <a href="#!" className="mx-2">FAQs</a> | 
                <a href="#!" className="mx-2" onClick={openModal}>Railway Admin Login</a> | 
                <a href="#!" className="mx-2">MIS Report Login</a>
            </div>
        </footer>
    );
};

export default Footer;
