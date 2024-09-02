// src/components/GrievanceByPriority.jsx

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const GrievanceByPriority = ({ grievances }) => {
  const data = grievances.reduce((acc, grievance) => {
    const priority = grievance.priority;
    acc[priority] = (acc[priority] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.keys(data).map(key => ({
    priority: key,
    count: data[key],
  }));

  return (
    <div className="bg-white p-4 rounded shadow" style={{width:'1600px'}}>
      <h2 className="text-xl font-semibold mb-4 text-red-600">Grievances by Priority</h2>
      <ResponsiveContainer width="100%" height={500}>
        <BarChart data={chartData}>
          <XAxis dataKey="priority" stroke="#800020" />
          <YAxis stroke="#800020" hide={true}/>
          <Tooltip cursor={{ fill: 'transparent' }} />
          <Bar dataKey="count" fill="#800020" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GrievanceByPriority;
