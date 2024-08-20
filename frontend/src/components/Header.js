import React from 'react';
// import indiaEmblem from './path-to-india-emblem.png';
// import g20Logo from './path-to-g20-logo.png';

const Header = () => {
  return (
    <header className="flex items-center justify-between py-2 px-4 bg-white shadow-sm">
      <div className="flex items-center space-x-4">
        {/* <img src={indiaEmblem} alt="India Emblem" className="h-10" />
        <img src={g20Logo} alt="G20 Logo" className="h-10" /> */}
        <div>
          <h1 className="text-2xl font-bold text-maroon">RailMadad</h1>
          <p className="text-sm text-gray-600">For Inquiry, Assistance & Grievance Redressal</p>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <div className="flex items-center bg-orange-500 text-white py-1 px-3 rounded-full">
          <span className="mr-2">📞</span>
          <span className="font-bold text-lg">139</span>
        </div>
        <p className="text-sm text-gray-600">for Security/Medical Assistance</p>
        <button className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-md">Log In</button>
        <button className="px-3 py-1 bg-red-50 text-red-600 rounded-md">Sign Up</button>
        <select className="px-3 py-1 border rounded-md">
          <option>English</option>
          <option>Hindi</option>
        </select>
        <button className="text-lg">🎤</button>
        <button className="text-lg">🚹</button>
      </div>
    </header>
  );
};

export default Header;
