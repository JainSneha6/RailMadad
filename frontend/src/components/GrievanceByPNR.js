import React, { useState } from 'react';

const GrievanceByPNR = ({ grievances }) => {
  const [pnr, setPnr] = useState('');
  const [searchResult, setSearchResult] = useState(null);

  const handleSearch = () => {
    const result = grievances.find(grievance => grievance.pnrNumber === pnr);
    setSearchResult(result || { message: 'No grievance found for this PNR' });
  };

  return (
    <div className="bg-gradient-to-br from-yellow-50 via-yellow-100 to-yellow-300 p-6 rounded-lg shadow-lg mt-4 max-w-3xl mx-auto transition-transform transform hover:scale-105">
      <h2 className="text-2xl font-bold text-yellow-800 mb-6">Search Grievance by PNR Number</h2>
      <div className="flex mb-6">
        <input
          type="text"
          value={pnr}
          onChange={(e) => setPnr(e.target.value)}
          className="border border-yellow-300 rounded-l-lg px-4 py-2 w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          placeholder="Enter PNR number..."
        />
        <button
          onClick={handleSearch}
          className="bg-gradient-to-r from-yellow-500 to-yellow-700 text-white px-4 py-2 rounded-r-lg ml-2 transition-transform transform hover:scale-105"
        >
          Search
        </button>
      </div>

      {searchResult ? (
        searchResult.message ? (
          <div className="bg-gradient-to-r from-yellow-100 via-yellow-200 to-yellow-300 border border-yellow-400 text-yellow-700 px-4 py-3 rounded-lg animate-pulse">
            <p className="font-semibold">{searchResult.message}</p>
          </div>
        ) : (
          <div className="bg-gradient-to-br from-yellow-100 via-yellow-200 to-yellow-300 p-6 rounded-lg border border-yellow-200 shadow-lg">
            <h3 className="text-xl font-semibold text-yellow-800 mb-4">Grievance Details</h3>
            <div className="space-y-2">
              <DetailItem label="ID" value={searchResult.id} />
              <DetailItem label="Category" value={searchResult.category} />
              <DetailItem label="Sub-Category" value={searchResult.subCategory} />
              <DetailItem label="Priority" value={searchResult.priority} />
              <DetailItem label="Description" value={searchResult.description} />
              <DetailItem label="Station" value={searchResult.station || 'N/A'} />
              <DetailItem label="TTE" value={searchResult.tte || 'N/A'} />
              <DetailItem label="Reason for Unresolved" value={searchResult.reasonForUnresolved || 'N/A'} />
              <DetailItem label="Contact" value={searchResult.contact || 'N/A'} />
              <DetailItem label="PNR Number" value={searchResult.pnrNumber || 'N/A'} />
            </div>
          </div>
        )
      ) : null}
    </div>
  );
};

// Helper component for displaying detail items
const DetailItem = ({ label, value }) => (
  <div className="bg-white border border-yellow-300 p-3 rounded-lg shadow-sm">
    <p className="font-semibold text-yellow-800">{label}:</p>
    <p className="text-yellow-600">{value}</p>
  </div>
);

export default GrievanceByPNR;
