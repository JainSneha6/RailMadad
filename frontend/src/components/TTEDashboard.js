import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import GrievanceTable from './GrievanceTable';
import TTETable from './TTETable';

const GrievanceByTrainNo = () => {
    const { trainNo } = useParams();
    const [grievances, setGrievances] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (trainNo) {
            fetchGrievancesByTrainNo(trainNo);
        }
    }, [trainNo]);

    const fetchGrievancesByTrainNo = async (trainNo) => {
        setLoading(true);
        try {
            const response = await fetch(`http://localhost:5000/grievance/complaints_by_train?trainNo=${trainNo}`);
            const data = await response.json();
            console.log(data)
            setGrievances(data.complaints);

            console.log(grievances)
        } catch (error) {
            console.error('Error fetching grievances:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6 bg-gray-100 flex-1">
            <h2 className="text-lg font-bold mb-4">Grievances for Train No. {trainNo}</h2>
            {loading && <p>Loading...</p>}
            {!loading && grievances.length > 0 && <TTETable grievances={grievances} />}
            {!loading && grievances.length === 0 && <p>No grievances found for this train number.</p>}
        </div>
    );
};

export default GrievanceByTrainNo;
