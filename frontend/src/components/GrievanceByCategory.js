// src/components/GrievanceByCategory.jsx

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const GrievanceByCategory = ({ grievances }) => {
  const data = grievances.reduce((acc, grievance) => {
    const category = grievance.category;
    acc[category] = (acc[category] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.keys(data).map(key => ({
    category: key,
    count: data[key],
  }));

  return (
    <div className="bg-white p-4 rounded shadow" style={{width:'1600px'}}>
      <h2 className="text-xl font-semibold mb-4 text-maroon">Grievances by Category</h2>
      <div style={{ width: '100%', height: 500 }}>
        <ResponsiveContainer>
          <BarChart data={chartData}>
            <XAxis dataKey="category" stroke="#800020" />
            <YAxis stroke="#800020" hide={true}/>
            <Tooltip cursor={{ fill: 'transparent' }} />
            <Bar dataKey="count" fill="#800020" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default GrievanceByCategory;
