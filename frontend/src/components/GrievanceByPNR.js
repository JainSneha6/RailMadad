// src/components/GrievanceByPNR.jsx

import React, { useState } from 'react';

const GrievanceByPNR = ({ grievances }) => {
  const [pnr, setPnr] = useState('');
  const [searchResult, setSearchResult] = useState(null);

  const handleSearch = () => {
    const result = grievances.find(grievance => grievance.pnrNumber === pnr);
    setSearchResult(result || { message: 'No grievance found for this PNR' });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg mt-4 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold text-maroon mb-6">Search Grievance by PNR Number</h2>
      <div className="flex mb-6">
        <input
          type="text"
          value={pnr}
          onChange={(e) => setPnr(e.target.value)}
          className="border border-gray-300 rounded-l-lg px-4 py-2 w-full sm:w-64"
          placeholder="Enter PNR number..."
        />
        <button
          onClick={handleSearch}
          className="bg-maroon text-white px-4 py-2 rounded-r-lg ml-2"
        >
          Search
        </button>
      </div>

      {searchResult ? (
        searchResult.message ? (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
            <p className="font-semibold">{searchResult.message}</p>
          </div>
        ) : (
          <div className="bg-gray-100 p-6 rounded-lg border border-gray-200">
            <h3 className="text-xl font-semibold text-maroon mb-4">Grievance Details</h3>
            <p><strong>ID:</strong> {searchResult.id}</p>
            <p><strong>Category:</strong> {searchResult.category}</p>
            <p><strong>Sub-Category:</strong> {searchResult.subCategory}</p>
            <p><strong>Priority:</strong> {searchResult.priority}</p>
            <p><strong>Description:</strong> {searchResult.description}</p>
            <p><strong>Station:</strong> {searchResult.station || 'N/A'}</p>
            <p><strong>TTE:</strong> {searchResult.tte || 'N/A'}</p>
            <p><strong>Reason for Unresolved:</strong> {searchResult.reasonForUnresolved || 'N/A'}</p>
            <p><strong>Contact:</strong> {searchResult.contact || 'N/A'}</p>
            <p><strong>PNR Number:</strong> {searchResult.pnrNumber || 'N/A'}</p>
          </div>
        )
      ) : null}
    </div>
  );
};

export default GrievanceByPNR;
