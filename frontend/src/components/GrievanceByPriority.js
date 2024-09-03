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

  // Define a color gradient for the bars
  const gradientOffset = () => {
    const dataMax = Math.max(...chartData.map(i => i.count));
    const dataMin = Math.min(...chartData.map(i => i.count));

    if (dataMax <= 0) {
      return 0;
    }

    return dataMin / dataMax;
  };

  const off = gradientOffset();

  return (
    <div className="bg-white p-4 rounded shadow-lg" style={{width:'1600px'}}>
      <h2 className="text-xl font-semibold mb-4 text-red-600">Grievances by Priority</h2>
      <ResponsiveContainer width="100%" height={500}>
        <BarChart data={chartData}>
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#e53e3e" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#800020" stopOpacity={0.8} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="priority" stroke="#800020" tick={{ fontSize: 14, fontWeight: 'bold' }} />
          <YAxis stroke="#800020" tick={{ fontSize: 14, fontWeight: 'bold' }} />
          <Tooltip cursor={{ fill: 'rgba(128, 0, 32, 0.1)' }} contentStyle={{ backgroundColor: '#800020', borderRadius: '10px', color: '#fff' }} />
          <Legend />
          <Bar dataKey="count" fill="url(#colorUv)" barSize={70} radius={[10, 10, 0, 0]} animationDuration={1500}>
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill="url(#colorUv)" />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GrievanceByPriority;
