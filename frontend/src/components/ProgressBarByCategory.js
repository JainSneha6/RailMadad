import React from 'react';

const ProgressBarByCategory = ({ grievances }) => {
    const data = grievances.reduce((acc, grievance) => {
        const category = grievance.departmentType;
        if (!acc[category]) {
            acc[category] = { resolved: 0, total: 0 };
        }
        acc[category].total++;
        if (grievance.status === 'resolved') {
            acc[category].resolved++;
        }
        return acc;
    }, {});

    const chartData = Object.keys(data).map(key => ({
        category: key,
        resolved: data[key].resolved,
        total: data[key].total,
        percentage: (data[key].resolved / data[key].total) * 100
    }));

    return (
        <div className="bg-gradient-to-br from-blue-50 to-blue-200 p-6 mt-5 rounded-lg shadow-xl" style={{ width: '100%', maxWidth: '700px' }}>
            <h2 className="text-3xl font-bold mb-6 text-blue-900">Resolved Grievances Progress by Category</h2>
            <div className="space-y-4">
                {chartData.map((data, index) => (
                    <div key={index} className="flex items-center space-x-4">
                        <div className="w-1/4 text-blue-900 font-semibold">{data.category}</div>
                        <div className="w-3/4">
                            <div className="relative pt-1">
                                <div className="flex items-center justify-between">
                                    <span className="text-xs text-blue-600">{Math.round(data.percentage)}%</span>
                                </div>
                                <div className="flex-1 bg-gray-200 rounded-full h-4">
                                    <div
                                        className="bg-blue-500 h-4 rounded-full"
                                        style={{ width: `${data.percentage}%` }}
                                    ></div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProgressBarByCategory;
