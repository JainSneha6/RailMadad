import React from 'react';

const ProgressBarBySubCategory = ({ grievances }) => {
    // Aggregate grievances by sub-category
    const data = grievances.reduce((acc, grievance) => {
        const subCategory = grievance.departmentSubtype;
        if (!acc[subCategory]) {
            acc[subCategory] = { resolved: 0, total: 0 };
        }
        acc[subCategory].total++;
        if (grievance.status === 'resolved') {
            acc[subCategory].resolved++;
        }
        return acc;
    }, {});

    // Convert to array for rendering
    const chartData = Object.keys(data).map(key => ({
        subCategory: key,
        resolved: data[key].resolved,
        total: data[key].total,
        percentage: (data[key].resolved / data[key].total) * 100
    }));

    return (
        <div className="bg-gradient-to-br from-purple-50 to-purple-200 p-6 mt-5 rounded-lg shadow-xl" style={{ width: '100%', maxWidth: '800px' }}>
            <h2 className="text-3xl font-bold mb-6 text-purple-900">Resolved Grievances Progress by Sub-Category</h2>
            <div className="space-y-4">
                {chartData.map((data, index) => (
                    <div key={index} className="flex items-center space-x-4">
                        <div className="w-1/4 text-purple-900 font-semibold">{data.subCategory}</div>
                        <div className="w-3/4">
                            <div className="relative pt-1">
                                <div className="flex items-center justify-between">
                                    <span className="text-xs text-purple-600">{Math.round(data.percentage)}%</span>
                                </div>
                                <div className="flex-1 bg-gray-200 rounded-full h-4">
                                    <div
                                        className="bg-purple-500 h-4 rounded-full"
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

export default ProgressBarBySubCategory;
