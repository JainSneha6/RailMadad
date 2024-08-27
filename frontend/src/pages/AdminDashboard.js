import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { useNavigate } from 'react-router-dom';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const AdminDashboard = () => {
    const [grievanceCount, setGrievanceCount] = useState(0);
    const [departmentData, setDepartmentData] = useState([]);
    const [subDepartmentData, setSubDepartmentData] = useState([]);
    const [priorityData, setPriorityData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const countResponse = await axios.get('http://localhost:5000/get_grievance_count');
                setGrievanceCount(countResponse.data.count);

                const statsResponse = await axios.get('http://localhost:5000/get_grievance_stats');
                const { departments, subDepartments, priorities } = statsResponse.data;

                setDepartmentData(departments);
                setSubDepartmentData(subDepartments);
                setPriorityData(priorities);
            } catch (error) {
                console.error('Error fetching grievance data:', error);
            }
        };

        fetchData();
    }, []);

    const handlePieClick = (event, chartElement) => {
        if (chartElement.length > 0) {
            const { index } = chartElement[0];
            const chart = event.chart; // Use event.chart to get the chart instance
            const label = chart.data.labels[index];

            if (label) {
                // Navigate to the grievances page with the department name
                navigate(`/grievances/department/${encodeURIComponent(label)}`);
            } else {
                console.error('Label not found for pie chart click event');
            }
        } else {
            console.error('Chart element is not defined');
        }
    };
    
    const handleBarClick = (event, chartElement) => {
        if (chartElement.length > 0) {
            const { index } = chartElement[0];
            const chart = event.chart; // Use event.chart to get the chart instance
            const label = chart.data.labels[index];

            if (label) {
                // Navigate to the grievances page with the sub-department name
                navigate(`/grievances/sub-department/${encodeURIComponent(label)}`);
            } else {
                console.error('Label not found for bar chart click event');
            }
        } else {
            console.error('Chart element is not defined');
        }
    };

    const prepareBarChartData = (data, label) => {
        return {
            labels: data.map(item => item._id || item.name),
            datasets: [{
                label: label,
                data: data.map(item => item.count),
                backgroundColor: 'rgba(44, 130, 201, 0.6)',
                borderColor: 'rgba(44, 130, 201, 1)',
                borderWidth: 1,
            }]
        };
    };

    const preparePieChartData = (data, label) => ({
        labels: data.map(item => item._id || item.name),
        datasets: [{
            label: label,
            data: data.map(item => item.count),
            backgroundColor: data.map(() => `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.6)`),
            borderColor: 'rgba(0, 0, 0, 0.2)',
            borderWidth: 1,
        }]
    });

    return (
        <div className="p-8 bg-gray-100 min-h-screen">
            <h1 className="text-4xl font-extrabold mb-8 text-gray-900">RailMadad Admin Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="bg-white p-8 rounded-lg shadow-md">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Total Grievances Registered</h2>
                    <p className="text-5xl font-bold text-blue-600">{grievanceCount}</p>
                </div>

                <div className="bg-white p-8 rounded-lg shadow-md">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Grievances by Department</h2>
                    <Pie
                        data={preparePieChartData(departmentData, 'Departments')}
                        options={{
                            onClick: handlePieClick
                        }}
                    />
                </div>

                <div className="bg-white p-8 rounded-lg shadow-md">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Grievances by Priority</h2>
                    <Pie
                        data={preparePieChartData(priorityData, 'Priorities')}
                        options={{
                            onClick: handlePieClick
                        }}
                    />
                </div>

                <div className="bg-white p-4 rounded-lg shadow-md col-span-1 md:col-span-2 lg:col-span-3">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Grievances by Sub-Department</h2>
                    <div className="chart-container" style={{ position: 'relative', height: '300px', width: '100%' }}>
                        <Bar
                            data={prepareBarChartData(subDepartmentData, 'Sub-Departments')}
                            options={{
                                onClick: handleBarClick
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
