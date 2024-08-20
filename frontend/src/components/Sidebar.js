import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';

const Sidebar = () => {
  return (
    <div className="w-64 bg-[#800020] text-white min-h-screen">
      <nav className="space-y-2 pt-8">
        <div className="flex items-center justify-center space-x-2 py-4 hover:bg-[#73001A] cursor-pointer">
          <i className="fas fa-train text-3xl"></i>
          <span className="text-sm font-semibold">TRAIN</span>
        </div>
        <div className="flex items-center justify-center space-x-2 py-4 hover:bg-[#73001A] cursor-pointer">
          <i className="fas fa-university text-3xl"></i>
          <span className="text-sm font-semibold">STATION</span>
        </div>
        <div className="flex items-center justify-center space-x-2 py-4 hover:bg-[#73001A] cursor-pointer">
          <i className="fas fa-thumbs-up text-3xl"></i>
          <span className="text-sm font-semibold text-center">APPRECIATION/RAIL ANUBHAV</span>
        </div>
        <div className="flex items-center justify-center space-x-2 py-4 hover:bg-[#73001A] cursor-pointer">
          <i className="fas fa-question-circle text-3xl"></i>
          <span className="text-sm font-semibold">ENQUIRY</span>
        </div>
        <div className="flex items-center justify-center space-x-2 py-4 hover:bg-[#73001A] cursor-pointer">
          <i className="fas fa-file-alt text-3xl"></i>
          <span className="text-sm font-semibold">TRACK YOUR CONCERN</span>
        </div>
        <div className="flex items-center justify-center space-x-2 py-4 hover:bg-[#73001A] cursor-pointer">
          <i className="fas fa-lightbulb text-3xl"></i>
          <span className="text-sm font-semibold">SUGGESTIONS</span>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
