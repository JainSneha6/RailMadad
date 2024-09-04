import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, CartesianGrid, Legend } from 'recharts';

const GrievanceByPriority = ({ grievances }) => {
  // Step 1: Aggregate the data by priority
  const data = grievances.reduce((acc, grievance) => {
    const priority = grievance.priority;
    acc[priority] = (acc[priority] || 0) + 1;
    return acc;
  }, {});

  // Step 2: Convert the aggregated data into a format suitable for the chart
  const chartData = Object.keys(data).map(key => ({
    priority: key,
    count: data[key],
  }));

  return (
    <div className="bg-gradient-to-br from-green-50 to-green-200 p-6 rounded-lg shadow-xl" style={{ width: '100%', maxWidth: '1800px' }}>
      <h2 className="text-3xl font-bold mb-6 text-teal-900">Grievances by Priority</h2>
      <ResponsiveContainer width="100%" height={500}>
        <BarChart data={chartData}>
          <defs>
            {/* Define a teal gradient for the bars */}
            <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#34d399" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#065f46" stopOpacity={0.8} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#d1d5db" />
          <XAxis dataKey="priority" stroke="#065f46" tick={{ fontSize: 14, fontWeight: 'bold' }} />
          <YAxis stroke="#065f46" tick={{ fontSize: 14, fontWeight: 'bold' }} />
          <Tooltip 
            cursor={{ fill: 'rgba(6, 95, 70, 0.1)' }} 
            contentStyle={{ backgroundColor: '#065f46', borderRadius: '10px', color: '#fff' }} 
            itemStyle={{ color: '#e5e7eb' }}
          />
          <Legend wrapperStyle={{ color: '#065f46' }} />
          <Bar dataKey="count" fill="url(#colorGradient)" barSize={70} radius={[10, 10, 0, 0]} animationDuration={1500}>
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill="url(#colorGradient)" />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GrievanceByPriority;
