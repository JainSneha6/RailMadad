import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const GrievanceList = () => {
    const { type, name } = useParams();
    const [grievances, setGrievances] = useState([]);

    useEffect(() => {
        const fetchGrievances = async () => {
            try {
                const decodedName = decodeURIComponent(name);

                console.log(decodedName,type)

                if (type && decodedName) {
                    const response = await axios.get('http://localhost:5000/get_grievances', {
                        params: { type, name: decodedName }
                    });
                    setGrievances(response.data);
                } else {
                    console.error('Type or name is undefined');
                }
            } catch (error) {
                console.error('Error fetching grievances:', error);
            }
        };

        fetchGrievances();
    }, [type, name]);

    // Handle undefined type
    const displayType = type ? type.replace(/-/g, ' ').toUpperCase() : 'Unknown Type';

    return (
        <div className="p-8 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold mb-8 text-gray-900">Grievances - {name || 'Unknown'}</h1>
            <div className="bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">{displayType}</h2>
                {grievances.length > 0 ? (
                    <ul>
                        {grievances.map((grievance, index) => (
                            <li key={index} className="mb-4 p-4 border border-gray-200 rounded-md">
                                <h3 className="text-xl font-semibold">{grievance.title}</h3>
                                <p className="text-gray-600">{grievance.description}</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-600">No grievances found.</p>
                )}
            </div>
        </div>
    );
};

export default GrievanceList;
