import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid
} from 'recharts';
import './NutrientBarChart.css';

export default function NutrientBarChart({ data = [] }) {
  if (!data.length) {
    return <p className="no-nutrient-data">No nutrient data to display.</p>;
  }

  return (
    <div className="nutrient-bar-container">
      <h3 className="nutrient-bar-title">Nutrient Comparison</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 20, right: 20, left: 0, bottom: 10 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="label" tick={{ fill: '#2f5b4c', fontSize: 12 }} />
          <YAxis tick={{ fill: '#2f5b4c' }} />
          <Tooltip />
          <Bar dataKey="value" fill="#ed7f27" radius={[10, 10, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
