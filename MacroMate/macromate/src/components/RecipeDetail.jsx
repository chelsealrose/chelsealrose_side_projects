// src/components/RecipeDetails.jsx (or wherever you're showing recipe info)
import React from 'react';
import NutrientChartToggle from './NutrientChartToggle';

const RecipeDetails = ({ recipe }) => {
  // Mock nutrient data for now — this should come from your recipe API eventually
  const nutrientData = {
    Carbs: recipe?.carbs || 40,
    Protein: recipe?.protein || 25,
    Fat: recipe?.fat || 20,
    Fiber: recipe?.fiber || 10,
    Sugar: recipe?.sugar || 5
  };

  return (
    <div className="recipe-details">
      <h2>{recipe?.name}</h2>
      <p>{recipe?.description}</p>

      {/* Nutrient chart */}
      <NutrientChartToggle data={nutrientData} />
    </div>
  );
};

export default RecipeDetails;
