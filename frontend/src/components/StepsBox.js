// src/components/StepsBox.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const StepsBox = ({ grievance, onClose }) => {
    const [steps, setSteps] = useState('');

    useEffect(() => {
        // Fetch steps from the backend
        const fetchSteps = async () => {
            try {
                console.log(grievance.pnr)
                const response = await fetch(`http://localhost:5000/steps/get_steps`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        grievanceId: grievance.pnr,
                    }),
                });

                const result = await response.json();

                console.log(result)
                setSteps(result.steps);
            } catch (error) {
                console.error('Error fetching steps:', error);
                setSteps('Failed to fetch steps. Please try again.');
            }
        };

        fetchSteps();
    }, [grievance]);

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-55">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
                <div className="flex justify-between items-center">
                    <h2 className="text-lg font-bold">Steps to be Taken</h2>
                    <button onClick={onClose} className="text-orange-500 text-lg font-bold">X</button>
                </div>
                <div className="mt-4">
                    {steps ? (
                        <p>{steps}</p>
                    ) : (
                        <p>Loading steps...</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default StepsBox;
