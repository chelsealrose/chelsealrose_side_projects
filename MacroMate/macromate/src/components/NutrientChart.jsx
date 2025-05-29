import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LabelList } from "recharts";

export default function NutrientChart({ nutrients }) {
  // Expected: [{ name: "Protein", value: 20, unit: "g" }, ...]
  if (!nutrients || nutrients.length === 0) return null;

  return (
    <div style={{ width: "100%", height: 300 }}>
      <h3>Nutrient Breakdown</h3>
      <ResponsiveContainer>
        <BarChart data={nutrients}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill="#76a458">
            <LabelList dataKey="value" position="top" />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
