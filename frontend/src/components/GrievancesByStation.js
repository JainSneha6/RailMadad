import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import TTETable from './TTETable'; // Assuming this is still useful; otherwise, replace with appropriate component.

const GrievancesByStation = () => {
    const { station_master } = useParams(); // Assuming stationName or station ID will be passed in the URL
    const [grievances, setGrievances] = useState([]);
    const [loading, setLoading] = useState(false);

    console.log(station_master)

    useEffect(() => {
        if (station_master) {
            fetchGrievancesByStation(station_master);
        }
    }, [station_master]);

    const fetchGrievancesByStation = async (station_master) => {
        setLoading(true);
        try {
            const response = await fetch(`http://localhost:5000/grievance/complaints_by_station?station_master=${station_master}`);
            const data = await response.json();
            setGrievances(data.complaints);
        } catch (error) {
            console.error('Error fetching grievances:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6 flex-1">
            <h2 className="text-lg font-bold mb-4">Grievances for Station Master {station_master}</h2>
            {loading && <p>Loading...</p>}
            {!loading && grievances.length > 0 && <TTETable grievances={grievances} />}
            {!loading && grievances.length === 0 && <p>No grievances found for this station.</p>}
        </div>
    );
};

export default GrievancesByStation;
