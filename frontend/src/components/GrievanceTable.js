// src/components/GrievanceTable.jsx

import React from 'react';

const GrievanceTable = ({ grievances }) => {
  return (
    <div className="bg-white p-4 rounded shadow mt-6 max-w-full overflow-x-auto">
      <h2 className="text-xl font-semibold mb-4 text-maroon">Grievance Details</h2>
      <table className="min-w-full divide-y divide-gray-200 text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-3 py-2 text-left font-medium text-gray-500 uppercase tracking-wider">ID</th>
            <th className="px-3 py-2 text-left font-medium text-gray-500 uppercase tracking-wider">Category</th>
            <th className="px-3 py-2 text-left font-medium text-gray-500 uppercase tracking-wider">Sub-Category</th>
            <th className="px-3 py-2 text-left font-medium text-gray-500 uppercase tracking-wider">Priority</th>
            <th className="px-3 py-2 text-left font-medium text-gray-500 uppercase tracking-wider">Description</th>
            <th className="px-3 py-2 text-left font-medium text-gray-500 uppercase tracking-wider">Station</th>
            <th className="px-3 py-2 text-left font-medium text-gray-500 uppercase tracking-wider">TTE</th>
            <th className="px-3 py-2 text-left font-medium text-gray-500 uppercase tracking-wider">Reason for Unresolved</th>
            <th className="px-3 py-2 text-left font-medium text-gray-500 uppercase tracking-wider">Contact</th>
            <th className="px-3 py-2 text-left font-medium text-gray-500 uppercase tracking-wider">PNR Number</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {grievances.map(grievance => (
            <tr key={grievance.id}>
              <td className="px-3 py-2 whitespace-nowrap text-gray-900">{grievance.id}</td>
              <td className="px-3 py-2 whitespace-nowrap text-gray-500">{grievance.category}</td>
              <td className="px-3 py-2 whitespace-nowrap text-gray-500">{grievance.subCategory}</td>
              <td className="px-3 py-2 whitespace-nowrap text-gray-500">{grievance.priority}</td>
              <td className="px-3 py-2 whitespace-nowrap text-gray-500">{grievance.description}</td>
              <td className="px-3 py-2 whitespace-nowrap text-gray-500">{grievance.station || 'N/A'}</td>
              <td className="px-3 py-2 whitespace-nowrap text-gray-500">{grievance.tte || 'N/A'}</td>
              <td className="px-3 py-2 whitespace-nowrap text-gray-500">{grievance.reasonForUnresolved || 'N/A'}</td>
              <td className="px-3 py-2 whitespace-nowrap text-gray-500">{grievance.contact || 'N/A'}</td>
              <td className="px-3 py-2 whitespace-nowrap text-gray-500">{grievance.pnrNumber || 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GrievanceTable;
