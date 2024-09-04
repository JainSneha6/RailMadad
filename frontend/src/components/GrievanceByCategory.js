import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { FaCircle } from 'react-icons/fa';

const GrievanceByCategory = ({ grievances }) => {
  // Reduce grievances into a category count object
  const data = grievances.reduce((acc, grievance) => {
    const category = grievance.category;
    acc[category] = (acc[category] || 0) + 1;
    return acc;
  }, {});

  // Transform the data into an array suitable for the chart
  const chartData = Object.keys(data).map(key => ({
    category: key,
    count: data[key],
  }));

  return (
    <div className="bg-gradient-to-br from-blue-50 to-blue-200 p-6 rounded-lg shadow-xl" style={{ width: '100%', maxWidth: '1800px' }}>
      {/* Title with a bold and prominent style */}
      <h2 className="text-3xl font-bold mb-6 text-blue-900">Grievances by Category</h2>
      <div style={{ width: '100%', height: 500 }}>
        <ResponsiveContainer>
          <BarChart 
            data={chartData} 
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
          >
            <defs>
              {/* Define a darker blue gradient for the bars */}
              <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#1e3a8a" stopOpacity={0.9} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.7} />
              </linearGradient>
            </defs>

            {/* Add grid lines for better readability */}
            <CartesianGrid strokeDasharray="3 3" stroke="#d1d5db" />

            {/* Style the axes */}
            <XAxis dataKey="category" stroke="#4b5563" />
            <YAxis stroke="#4b5563" />

            {/* Custom tooltip with icons and color */}
            <Tooltip 
              contentStyle={{ backgroundColor: '#ffffff', borderColor: '#ddd', borderRadius: '8px' }} 
              itemStyle={{ color: '#1f2937' }} 
              cursor={{ fill: 'rgba(31, 41, 55, 0.1)' }} 
              formatter={(value) => [value, <FaCircle style={{ color: '#3498db' }} />]} 
            />

            {/* Darker gradient-filled bars with smooth animations */}
            <Bar 
              dataKey="count" 
              fill="url(#colorGradient)" 
              barSize={60} 
              radius={[10, 10, 0, 0]} 
              animationDuration={1500} 
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default GrievanceByCategory;
