import React, { useState } from 'react';
import TTEChatbot from './TTEChatbot';
import StepsBox from './StepsBox';

const TTETable = ({ grievances, trainNo }) => {
    const [selectedGrievance, setSelectedGrievance] = useState(null);
    const [selectedStepsGrievance, setSelectedStepsGrievance] = useState(null);

    const handleChatClick = (grievance) => {
        setSelectedGrievance(grievance);
    };

    const handleStepsClick = (grievance) => {
        setSelectedStepsGrievance(grievance);
    };

    const handleResolve = (grievanceId) => {
        // Update the grievance status to resolved
        console.log(`Grievance ${grievanceId} resolved`);
    };

    // Define headers conditionally
    const headers = [
        'ID',

        'File',
        'Description',
        'PNR',
        ...(trainNo ? ['Train No'] : []),
        'Coach',
        'Seat',
        'Department Type',
        'Department Subtype',
        'Priority',
        'Chat',
        'Steps'
    ];

    return (
        <div className="bg-white p-4 rounded-lg shadow-lg mt-6 max-w-full overflow-x-auto relative">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Grievance Details</h2>
            <table className="min-w-full divide-y divide-gray-300 text-xs">
                <thead className="bg-gray-200">
                    <tr>
                        {headers.map((header) => (
                            <th key={header} className="px-2 py-1 text-left font-medium text-gray-600 uppercase tracking-wider">
                                {header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-300">
                    {grievances.map((grievance, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                            <td className="px-2 py-1 whitespace-nowrap text-gray-800">{index + 1}</td>
                            {/* <td className="px-2 py-1 whitespace-nowrap text-gray-600">{new Date(grievance.incidentDate).toLocaleString()}</td> */}
                            <td className="px-2 py-1 whitespace-nowrap text-gray-600">
                                {grievance.file ? <a href={`/${grievance.file}`} className="text-blue-600 hover:underline">View File</a> : 'N/A'}
                            </td>
                            <td className="px-2 py-1 whitespace-nowrap text-gray-600">{grievance.grievanceDescription}</td>
                            <td className="px-2 py-1 whitespace-nowrap text-gray-600">{grievance.pnr}</td>
                            {trainNo && (
                                <td className="px-2 py-1 whitespace-nowrap text-gray-600">{trainNo}</td>
                            )}
                            <td className="px-2 py-1 whitespace-nowrap text-gray-600">{grievance.train_details.coach}</td>
                            <td className="px-2 py-1 whitespace-nowrap text-gray-600">{grievance.train_details.seat}</td>
                            <td className="px-2 py-1 whitespace-nowrap text-gray-600">{grievance.departmentType}</td>
                            <td className="px-2 py-1 whitespace-nowrap text-gray-600">{grievance.departmentSubtype}</td>
                            <td className="px-2 py-1 whitespace-nowrap text-gray-600">{grievance.priority}</td>
                            <td className="px-2 py-1 whitespace-nowrap text-gray-600">
                                <button
                                    onClick={() => handleChatClick(grievance)}
                                    className="text-blue-600 hover:bg-blue-50 rounded px-1 py-0.5 text-xs transition-colors"
                                >
                                    Start Chat
                                </button>
                            </td>
                            <td className="px-2 py-1 whitespace-nowrap text-gray-600">
                                <button
                                    onClick={() => handleStepsClick(grievance)}
                                    className="text-blue-600 hover:bg-blue-50 rounded px-1 py-0.5 text-xs transition-colors"
                                >
                                    View Steps
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {selectedGrievance && (
                <TTEChatbot
                    grievance={selectedGrievance}
                    onClose={() => setSelectedGrievance(null)}
                    onResolve={handleResolve}
                />
            )}

            {selectedStepsGrievance && (
                <StepsBox
                    grievance={selectedStepsGrievance}
                    onClose={() => setSelectedStepsGrievance(null)}
                />
            )}
        </div>
    );
};

export default TTETable;
