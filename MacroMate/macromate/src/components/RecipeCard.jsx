import React from 'react';
import './RecipeCard.css';

export default function RecipeCard({ recipe, onSelect }) {
  return (
    <div
      className="recipe-card"
      onClick={() => onSelect(recipe)}
      tabIndex={0}
      role="button"
      aria-pressed="false"
      onKeyDown={(e) => e.key === 'Enter' && onSelect(recipe)}
      style={{
        border: '1px solid #ccc',
        padding: '10px',
        marginBottom: '10px',
        cursor: 'pointer',
        borderRadius: '5px',
        backgroundColor: '#fafafa',
      }}
    >
      <h3>{recipe.name}</h3>
      <p>{recipe.description || 'No description available.'}</p>
      <small>{recipe.ingredients?.length || 0} ingredients</small>
    </div>
  );
}

