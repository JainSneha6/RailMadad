import React from 'react';

const GrievanceTable = ({ grievances, colorScheme }) => {
  const colorClasses = {
    category: {
      headerBg: 'bg-blue-50',
      textColor: 'text-blue-600',
      borderColor: 'border-blue-300',
      hoverBg: 'hover:bg-blue-50'
    },
    subCategory: {
      headerBg: 'bg-purple-50',
      textColor: 'text-purple-600',
      borderColor: 'border-purple-300',
      hoverBg: 'hover:bg-purple-50'
    },
    priority: {
      headerBg: 'bg-green-50',
      textColor: 'text-green-600',
      borderColor: 'border-green-300',
      hoverBg: 'hover:bg-green-50'
    },
    pnr: {
      headerBg: 'bg-yellow-50',
      textColor: 'text-yellow-600',
      borderColor: 'border-yellow-300',
      hoverBg: 'hover:bg-yellow-50'
    }
  };

  const { headerBg, textColor, borderColor, hoverBg } = colorClasses[colorScheme] || {};

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg mt-6 max-w-full overflow-x-auto">
      <h2 className={`text-2xl font-bold mb-6 ${textColor}`}>Grievance Details</h2>
      <table className="min-w-full divide-y divide-gray-200 text-sm">
        <thead className={headerBg}>
          <tr>
            <th className={`px-4 py-3 text-left font-medium ${textColor} uppercase tracking-wider border-b ${borderColor}`}>ID</th>
            <th className={`px-4 py-3 text-left font-medium ${textColor} uppercase tracking-wider border-b ${borderColor}`}>Category</th>
            <th className={`px-4 py-3 text-left font-medium ${textColor} uppercase tracking-wider border-b ${borderColor}`}>Sub-Category</th>
            <th className={`px-4 py-3 text-left font-medium ${textColor} uppercase tracking-wider border-b ${borderColor}`}>Priority</th>
            <th className={`px-4 py-3 text-left font-medium ${textColor} uppercase tracking-wider border-b ${borderColor}`}>Description</th>
            <th className={`px-4 py-3 text-left font-medium ${textColor} uppercase tracking-wider border-b ${borderColor}`}>Station</th>
            <th className={`px-4 py-3 text-left font-medium ${textColor} uppercase tracking-wider border-b ${borderColor}`}>TTE</th>
            <th className={`px-4 py-3 text-left font-medium ${textColor} uppercase tracking-wider border-b ${borderColor}`}>Reason for Unresolved</th>
            <th className={`px-4 py-3 text-left font-medium ${textColor} uppercase tracking-wider border-b ${borderColor}`}>Contact</th>
            <th className={`px-4 py-3 text-left font-medium ${textColor} uppercase tracking-wider border-b ${borderColor}`}>PNR Number</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {grievances.map(grievance => (
            <tr key={grievance.id} className={hoverBg}>
              <td className="px-4 py-3 whitespace-nowrap text-gray-800">{grievance.id}</td>
              <td className="px-4 py-3 whitespace-nowrap text-gray-600">{grievance.category}</td>
              <td className="px-4 py-3 whitespace-nowrap text-gray-600">{grievance.subCategory}</td>
              <td className="px-4 py-3 whitespace-nowrap text-gray-600">{grievance.priority}</td>
              <td className="px-4 py-3 whitespace-nowrap text-gray-600">{grievance.description}</td>
              <td className="px-4 py-3 whitespace-nowrap text-gray-600">{grievance.station || 'N/A'}</td>
              <td className="px-4 py-3 whitespace-nowrap text-gray-600">{grievance.tte || 'N/A'}</td>
              <td className="px-4 py-3 whitespace-nowrap text-gray-600">{grievance.reasonForUnresolved || 'N/A'}</td>
              <td className="px-4 py-3 whitespace-nowrap text-gray-600">{grievance.contact || 'N/A'}</td>
              <td className="px-4 py-3 whitespace-nowrap text-gray-600">{grievance.pnrNumber || 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GrievanceTable;
