// src/components/GrievanceDashboard.jsx

import React, { useState } from 'react';
import GrievanceByCategory from './GrievanceByCategory';
import GrievanceBySubCategory from './GrievanceBySubCategory';
import GrievanceByPriority from './GrievanceByPriority';
import GrievanceByPNR from './GrievanceByPNR';
import GrievanceTable from './GrievanceTable';

const GrievanceDashboard = ({ grievances }) => {
  const [view, setView] = useState('category');

  return (
    <div className="p-6 bg-gray-100 flex-1">
      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setView('category')}
          className={`px-4 py-2 rounded ${view === 'category' ? 'bg-maroon text-white' : 'bg-white text-maroon border border-maroon'}`}
        >
          By Category
        </button>
        <button
          onClick={() => setView('subCategory')}
          className={`px-4 py-2 rounded ${view === 'subCategory' ? 'bg-maroon text-white' : 'bg-white text-maroon border border-maroon'}`}
        >
          By Sub-Category
        </button>
        <button
          onClick={() => setView('priority')}
          className={`px-4 py-2 rounded ${view === 'priority' ? 'bg-maroon text-white' : 'bg-white text-maroon border border-maroon'}`}
        >
          By Priority
        </button>
        <button
          onClick={() => setView('pnr')}
          className={`px-4 py-2 rounded ${view === 'pnr' ? 'bg-maroon text-white' : 'bg-white text-maroon border border-maroon'}`}
        >
          By PNR
        </button>
      </div>

      {view === 'category' && <GrievanceByCategory grievances={grievances} />}
      {view === 'subCategory' && <GrievanceBySubCategory grievances={grievances} />}
      {view === 'priority' && <GrievanceByPriority grievances={grievances} />}
      {view === 'pnr' && <GrievanceByPNR grievances={grievances} />}

      {view !== 'pnr' && <GrievanceTable grievances={grievances} />}
    </div>
  );
};

export default GrievanceDashboard;
