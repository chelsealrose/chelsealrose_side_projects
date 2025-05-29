import React, { useState } from 'react';
import NutrientRadarChart from './NutrientRadarChart';
import NutrientBarChart from './NutrientBarChart';
import './NutrientToggleChart.css';

export default function NutrientToggleChart({ data }) {
  const [view, setView] = useState('radar');

  const toggleChart = () => {
    setView((prev) => (prev === 'radar' ? 'bar' : 'radar'));
  };

  return (
    <div className="nutrient-toggle-chart">
      <div className="chart-toggle-buttons">
        <button onClick={toggleChart} className="toggle-button">
          Switch to {view === 'radar' ? 'Bar' : 'Radar'} Chart
        </button>
      </div>

      {view === 'radar' ? (
        <NutrientRadarChart data={data} />
      ) : (
        <NutrientBarChart data={data} />
      )}
    </div>
  );
}
