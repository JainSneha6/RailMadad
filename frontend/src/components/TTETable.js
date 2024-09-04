// src/components/TTETable.jsx
import React, { useState } from 'react';
import TTEChatbot from './TTEChatbot';
import StepsBox from './StepsBox';

const TTETable = ({ grievances }) => {
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
        // You may need to call an API or update local state
        console.log(`Grievance ${grievanceId} resolved`);
    };

    return (
        <div className="bg-white p-4 rounded shadow mt-6 max-w-full overflow-x-auto relative">
            <h2 className="text-xl font-semibold mb-4 text-maroon">Grievance Details</h2>
            <table className="min-w-full divide-y divide-gray-200 text-sm">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="px-3 py-2 text-left font-medium text-gray-500 uppercase tracking-wider">ID</th>
                        <th className="px-3 py-2 text-left font-medium text-gray-500 uppercase tracking-wider">Incident Date</th>
                        <th className="px-3 py-2 text-left font-medium text-gray-500 uppercase tracking-wider">File</th>
                        <th className="px-3 py-2 text-left font-medium text-gray-500 uppercase tracking-wider">Description</th>
                        <th className="px-3 py-2 text-left font-medium text-gray-500 uppercase tracking-wider">PNR</th>
                        <th className="px-3 py-2 text-left font-medium text-gray-500 uppercase tracking-wider">Train No</th>
                        <th className="px-3 py-2 text-left font-medium text-gray-500 uppercase tracking-wider">Coach</th>
                        <th className="px-3 py-2 text-left font-medium text-gray-500 uppercase tracking-wider">Seat</th>
                        <th className="px-3 py-2 text-left font-medium text-gray-500 uppercase tracking-wider">Department Type</th>
                        <th className="px-3 py-2 text-left font-medium text-gray-500 uppercase tracking-wider">Department Subtype</th>
                        <th className="px-3 py-2 text-left font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                        <th className="px-3 py-2 text-left font-medium text-gray-500 uppercase tracking-wider">Chat</th>
                        <th className="px-3 py-2 text-left font-medium text-gray-500 uppercase tracking-wider">Steps</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {grievances.map((grievance, index) => (
                        <tr key={index}>
                            <td className="px-3 py-2 whitespace-nowrap text-gray-900">{index + 1}</td>
                            <td className="px-3 py-2 whitespace-nowrap text-gray-500">{new Date(grievance.incidentDate).toLocaleString()}</td>
                            <td className="px-3 py-2 whitespace-nowrap text-gray-500">
                                {grievance.file ? <a href={`/${grievance.file}`} className="text-blue-500 underline">View File</a> : 'N/A'}
                            </td>
                            <td className="px-3 py-2 whitespace-nowrap text-gray-500">{grievance.grievanceDescription}</td>
                            <td className="px-3 py-2 whitespace-nowrap text-gray-500">{grievance.pnr}</td>
                            <td className="px-3 py-2 whitespace-nowrap text-gray-500">{grievance.trainNo}</td>
                            <td className="px-3 py-2 whitespace-nowrap text-gray-500">{grievance.train_details.coach}</td>
                            <td className="px-3 py-2 whitespace-nowrap text-gray-500">{grievance.train_details.seat}</td>
                            <td className="px-3 py-2 whitespace-nowrap text-gray-500">{grievance.departmentType}</td>
                            <td className="px-3 py-2 whitespace-nowrap text-gray-500">{grievance.departmentSubtype}</td>
                            <td className="px-3 py-2 whitespace-nowrap text-gray-500">{grievance.priority}</td>
                            <td className="px-3 py-2 whitespace-nowrap text-gray-500">
                                <button
                                    onClick={() => handleChatClick(grievance)}
                                    className="text-blue-500 hover:underline"
                                >
                                    Start Chat
                                </button>
                            </td>
                            <td className="px-3 py-2 whitespace-nowrap text-gray-500">
                                <button
                                    onClick={() => handleStepsClick(grievance)}
                                    className="text-blue-500 hover:underline"
                                >
                                    View Steps
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {selectedGrievance && (
                <TTEChatbot grievance={selectedGrievance} onClose={() => setSelectedGrievance(null)} onResolve={handleResolve} />
            )}

            {selectedStepsGrievance && (
                <StepsBox grievance={selectedStepsGrievance} onClose={() => setSelectedStepsGrievance(null)} />
            )}
        </div>
    );
};

export default TTETable;
