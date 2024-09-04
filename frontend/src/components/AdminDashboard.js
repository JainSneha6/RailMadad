import React, { useState } from 'react';
import GrievanceByCategory from './GrievanceByCategory';
import GrievanceBySubCategory from './GrievanceBySubCategory';
import GrievanceByPriority from './GrievanceByPriority';
import GrievanceByPNR from './GrievanceByPNR';
import GrievanceTable from './GrievanceTable';
import Header from './AdminDashboardHeader';
import Chatbot from './Chatbot';

const GrievanceDashboard = ({ grievances }) => {
  const [view, setView] = useState('category');

  const getColorScheme = () => {
    switch (view) {
      case 'category':
        return 'category';
      case 'subCategory':
        return 'subCategory';
      case 'priority':
        return 'priority';
      case 'pnr':
        return 'pnr';
      default:
        return 'category';
    }
  };

  return (
    <>
      <Header />
      <div className="p-6 bg-gradient-to-br from-gray-100 via-white to-gray-200 min-h-screen">
        <div className="bg-white shadow-lg rounded-lg p-4 mb-6">
          <div className="flex space-x-4 mb-6 border-b border-gray-300">
            <button
              onClick={() => setView('category')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ease-in-out ${view === 'category' ? 'bg-gradient-to-r from-blue-500 to-blue-700 text-white' : 'bg-white text-blue-600 border border-blue-300'} hover:bg-gradient-to-r hover:from-blue-400 hover:to-blue-600 hover:text-white`}
            >
              By Category
            </button>
            <button
              onClick={() => setView('subCategory')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ease-in-out ${view === 'subCategory' ? 'bg-gradient-to-r from-purple-500 to-purple-700 text-white' : 'bg-white text-purple-600 border border-purple-300'} hover:bg-gradient-to-r hover:from-purple-400 hover:to-purple-600 hover:text-white`}
            >
              By Sub-Category
            </button>
            <button
              onClick={() => setView('priority')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ease-in-out ${view === 'priority' ? 'bg-gradient-to-r from-green-500 to-green-700 text-white' : 'bg-white text-green-600 border border-green-300'} hover:bg-gradient-to-r hover:from-green-400 hover:to-green-600 hover:text-white`}
            >
              By Priority
            </button>
            <button
              onClick={() => setView('pnr')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ease-in-out ${view === 'pnr' ? 'bg-gradient-to-r from-yellow-500 to-yellow-700 text-white' : 'bg-white text-yellow-600 border border-yellow-300'} hover:bg-gradient-to-r hover:from-yellow-400 hover:to-yellow-600 hover:text-white`}
            >
              By PNR
            </button>
          </div>

          <Chatbot />

          <div className="space-y-6">
            {view === 'category' && <GrievanceByCategory grievances={grievances} />}
            {view === 'subCategory' && <GrievanceBySubCategory grievances={grievances} />}
            {view === 'priority' && <GrievanceByPriority grievances={grievances} />}
            {view === 'pnr' && <GrievanceByPNR grievances={grievances} />}

            {(view !== 'pnr' || view === 'category') && <GrievanceTable grievances={grievances} colorScheme={getColorScheme()} />}
          </div>
        </div>
      </div>
    </>
  );
};

export default GrievanceDashboard;
