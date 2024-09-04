import React from 'react';
import { RadialBarChart, RadialBar, Legend, Tooltip, ResponsiveContainer } from 'recharts';

const RadialProgressChart = ({ grievances }) => {
    // Aggregate grievances by priority
    const data = grievances.reduce((acc, grievance) => {
        const priority = grievance.priority;
        if (!acc[priority]) {
            acc[priority] = { resolved: 0, total: 0 };
        }
        acc[priority].total++;
        if (grievance.status === 'resolved') {
            acc[priority].resolved++;
        }
        return acc;
    }, {});

    // Convert to array for Recharts
    const chartData = Object.keys(data).map(key => ({
        priority: `Priority ${key}`,
        percentage: (data[key].resolved / data[key].total) * 100
    }));

    return (
        <div className="bg-gradient-to-br from-green-50 to-green-200 p-6 mt-5 rounded-lg shadow-xl" style={{ width: '100%', maxWidth: '700px' }}>
            <h2 className="text-3xl font-bold mb-6 text-green-900">Resolved Grievances Progress by Priority</h2>
            <div style={{ width: '100%', height: 300 }}>
                <ResponsiveContainer>
                    <RadialBarChart 
                        innerRadius="10%" 
                        outerRadius="80%" 
                        data={chartData} 
                        startAngle={180}
                        endAngle={-180}
                        margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                    >
                        <defs>
                            <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="#34d399" stopOpacity={0.6} />
                            </linearGradient>
                        </defs>
                        <RadialBar 
                            minAngle={15} 
                            clockWise={true} 
                            dataKey="percentage" 
                            stroke="#fff" 
                            fill="url(#colorGradient)" 
                            background={{ fill: '#eee' }}
                        />
                        <Tooltip />
                    </RadialBarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default RadialProgressChart;
