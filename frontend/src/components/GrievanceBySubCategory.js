import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const COLORS = [
  '#f3e8ff', // Very Light Lavender
  '#d8b4fe', // Light Lavender
  '#c084fc', // Soft Lavender
  '#a78bfa', // Soft Purple
  '#8b5cf6', // Medium Purple
  '#7c3aed', // Deep Purple
  '#6d28d9', // Dark Purple
  '#5b21b6', // Darker Purple
  '#4c1d95', // Very Dark Purple
  '#3b0a45'  // Almost Black Purple
];



const GrievanceBySubCategory = ({ grievances }) => {
  const data = grievances.reduce((acc, grievance) => {
    const subCategory = grievance.subCategory;
    acc[subCategory] = (acc[subCategory] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.keys(data).map((key, index) => ({
    name: key,
    value: data[key],
    color: COLORS[index % COLORS.length],
  }));

  return (
    <div className="bg-gradient-to-br from-purple-50 to-purple-200 p-6 rounded-lg shadow-xl" style={{ width: '100%', maxWidth: '1800px' }}>
      <h2 className="text-3xl font-bold mb-6 text-purple-800">Grievances by Sub-Category</h2>
      <ResponsiveContainer width="100%" height={500}>
        <PieChart>
          <defs>
            {/* Define gradient for each pie slice */}
            {chartData.map((entry, index) => (
              <linearGradient id={`gradient-${index}`} key={index} x1="0" y1="0" x2="1" y2="1">
                <stop offset="5%" stopColor={entry.color} stopOpacity={0.8} />
                <stop offset="95%" stopColor={entry.color} stopOpacity={0.6} />
              </linearGradient>
            ))}
          </defs>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            outerRadius={200}
            fill="#8884d8"
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            labelLine={false}
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={`url(#gradient-${index})`} />
            ))}
          </Pie>
          <Tooltip 
            contentStyle={{ backgroundColor: '#edf2f7', borderColor: '#cbd5e0', borderRadius: '8px', color: '#1a202c' }}
            itemStyle={{ color: '#4c1d95' }}
            cursor={{ fill: 'rgba(76, 29, 149, 0.1)' }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GrievanceBySubCategory;
