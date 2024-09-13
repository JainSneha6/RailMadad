import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';

const Header = () => {
  return (
    <header className="flex items-center justify-between py-4 px-10 bg-transparent text-white shadow-md">
      <div className="flex items-center space-x-4">
        <div>
          <h1 className="text-4xl font-bold">RailMadad</h1>
          <p className="text-sm text-gray-300">For Inquiry, Assistance & Grievance Redressal</p>
        </div>
      </div>
      <div className="flex items-center space-x-6">
        <button className="px-4 py-2 font-bold text-white border border-white rounded-md hover:bg-white hover:text-black">Log In</button>
        <button className="px-4 py-2 font-bold text-white border border-white rounded-md hover:bg-white hover:text-black">Sign Up</button>
        <select className="px-4 py-2 border rounded-md bg-transparent text-white focus:outline-none">
          <option className="text-black">English</option>
          <option className="text-black">Hindi</option>
        </select>
      </div>
    </header>
  );
};

export default Header;
