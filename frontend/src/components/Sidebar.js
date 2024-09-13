import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';

const Sidebar = ({ setActiveForm }) => {
    return (
        <div className="w-30 bg-[#800020] text-white" style={{ height: '240px' }}>
            <nav className="space-y-2 pt-4">
                <div
                    className="flex flex-col items-center justify-center space-x-2 py-3 hover:bg-[#73001A] cursor-pointer"
                    onClick={() => setActiveForm('train')}
                >
                    <i className="fas fa-train text-2xl"></i>
                    <span className="text-xs font-semibold">GRIEVANCE</span>
                </div>
                <div
                    className="flex flex-col items-center justify-center space-x-2 py-3 hover:bg-[#73001A] cursor-pointer"
                    onClick={() => setActiveForm('appreciation')}
                >
                    <i className="fas fa-thumbs-up text-2xl"></i>
                    <span className="text-xs font-semibold">APPRECIATION</span>
                </div>
                <div
                    className="flex flex-col items-center justify-center space-x-2 py-3 hover:bg-[#73001A] cursor-pointer"
                    onClick={() => setActiveForm('trackConcern')}
                >
                    <i className="fas fa-file-alt text-2xl"></i>
                    <span className="text-xs font-semibold">TRACK YOUR CONCERN</span>
                </div>
            </nav>
        </div>
    );
};

export default Sidebar;
