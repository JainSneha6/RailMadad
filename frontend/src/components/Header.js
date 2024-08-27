import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';

const Header = () => {
  return (
    <header className="flex items-center justify-between py-2 px-6 bg-white shadow-sm">
      <div className="flex items-center space-x-4">
        {/* <img src={indiaEmblem} alt="India Emblem" className="h-10" />
        <img src={g20Logo} alt="G20 Logo" className="h-10" /> */}
        <div>
          <h1 className="text-3xl font-bold text-maroon">RailMadad</h1>
          <p className="text-sm text-gray-600">For Inquiry, Assistance & Grievance Redressal</p>
        </div>
      </div>
      <div className="flex items-center space-x-6">
        <div className="flex items-center bg-orange-500 text-white py-1 px-4 rounded-full">
          <i className="fas fa-phone-alt mr-2"></i>
          <span className="font-bold text-lg">139</span>
        </div>
        <p className="text-sm text-gray-600">for Security/Medical Assistance</p>
        <button className="px-4 py-2 bg-indigo-50 text-indigo-600 rounded-md hover:bg-indigo-100">Log In</button>
        <button className="px-4 py-2 bg-red-50 text-red-600 rounded-md hover:bg-red-100">Sign Up</button>
        <select className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500">
          <option>English</option>
          <option>Hindi</option>
        </select>
        <button className="text-gray-600 hover:text-gray-800 text-lg">
          <i className="fas fa-microphone"></i>
        </button>
        <button className="text-lg bg-blue-500 text-white rounded-full p-3 cursor-pointer hover:bg-blue-600">
          <i className="fas fa-universal-access"></i>
        </button>
      </div>
    </header>
  );
};

export default Header;
