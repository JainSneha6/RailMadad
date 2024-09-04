import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TTETable from './TTETable';
import { useParams } from 'react-router-dom';
import ProgressBarByCategory from './ProgressBarByCategory';
import ProgressBarBySubCategory from './ProgressBarBySubCategory';
import RadialProgressChart from './ProgressBarByPriority';
import CircularProgressBar from './TotalChart';

const GrievanceByTrainNo = () => {
    const { trainNo } = useParams();
    const [grievances, setGrievances] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (trainNo) {
            fetchGrievancesByTrainNo(trainNo);
        }
    }, [trainNo]);

    const fetchGrievancesByTrainNo = async (trainNo) => {
        try {
            const response = await axios.get(`http://localhost:5000/grievance/complaints_by_train?trainNo=${trainNo}`);
            const realData = response.data.complaints;

            const hardcodedData = [
                {
                    incidentDate: '2024-09-01T08:30:00Z',
                    file: 'example-file.pdf',
                    grievanceDescription: 'Seat not cleaned properly.',
                    pnr: '1234567890',
                    trainNo: '12345',
                    train_details: { coach: 'Coach S5', seat: 'Seat 12' },
                    departmentType: 'Coach - Cleanliness',
                    departmentSubtype: 'Seat Maintenance',
                    priority: '1',
                    status: 'resolved'
                },
                {
                    incidentDate: '2024-09-02T09:45:00Z',
                    file: 'another-file.pdf',
                    grievanceDescription: 'AC not working.',
                    pnr: '0987654321',
                    trainNo: '12345',
                    train_details: { coach: 'Coach S6', seat: 'Seat 5' },
                    departmentType: 'Facilities',
                    departmentSubtype: 'AC Maintenance',
                    priority: '2',
                    status: 'resolved'
                },
                {
                    incidentDate: '2024-09-05T12:00:00Z',
                    file: 'file3.pdf',
                    grievanceDescription: 'Uncomfortable seat.',
                    pnr: '9988776655',
                    trainNo: '54321',
                    train_details: { coach: 'Coach S1', seat: 'Seat 15' },
                    departmentType: 'Comfort',
                    departmentSubtype: 'Seat Adjustment',
                    priority: '2',
                    status: 'resolved'
                },
                {
                    incidentDate: '2024-09-06T13:30:00Z',
                    file: 'file4.pdf',
                    grievanceDescription: 'Delayed food service.',
                    pnr: '6677889900',
                    trainNo: '54321',
                    train_details: { coach: 'Coach S2', seat: 'Seat 7' },
                    departmentType: 'Food Service',
                    departmentSubtype: 'Delay',
                    priority: '3',
                    status: 'resolved'
                }
            ];

            setGrievances([...realData, ...hardcodedData]);
        } catch (error) {
            console.error('Error fetching grievances:', error);
        } finally {
            setLoading(false);
        }
    };
    
    return (
        <div className="p-6 flex-1 min-h-screen">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Grievances for Train No. {trainNo}</h2>
            {loading && <p className="text-gray-600">Loading...</p>}
            {!loading && grievances.length > 0 && (
                <>
                    <div className='flex flex-col'>
                        <div className='ml-2 flex flex-row space-x-8'>
                            <ProgressBarByCategory grievances={grievances} />
                            <RadialProgressChart grievances={grievances} />
                        </div>
                        <div className='ml-2 flex flex-row space-x-8'>
                            <ProgressBarBySubCategory grievances={grievances} />
                            <CircularProgressBar grievances={grievances} type="resolved" />
                            <CircularProgressBar grievances={grievances} type="unresolved" />
                        </div>
                    </div>
                    <TTETable grievances={grievances} trainNo={trainNo}/>
                </>
            )}
            {!loading && grievances.length === 0 && <p className="text-gray-600">No grievances found for this train number.</p>}
        </div>
    );
};

export default GrievanceByTrainNo;
