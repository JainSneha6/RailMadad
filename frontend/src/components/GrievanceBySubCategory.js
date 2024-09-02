// src/components/GrievanceBySubCategory.jsx

import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const COLORS = ['#e53e3e', '#c53030', '#9b2c2c', '#742a2a', '#63171b'];

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
    <div className="bg-white p-4 rounded shadow" style={{width:'1600px'}}>
      <h2 className="text-xl font-semibold mb-4 text-red-600">Grievances by Sub-Category</h2>
      <ResponsiveContainer width="100%" height={500}>
        <PieChart>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            outerRadius={200}
            fill="#800020"
            label
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GrievanceBySubCategory;
