import React from "react";

export default function RecipeList({ recipes, onSelect }) {
  if (!recipes || recipes.length === 0) {
    return <p>No recipes yet. Click “Add New Recipe” to get started.</p>;
  }

  return (
    <div>
      <h2>Your Recipes</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {recipes.map((r) => (
          <li
            key={r.id}
            onClick={() => onSelect(r)}
            tabIndex={0}
            role="button"
            style={{
              padding: "0.5rem",
              marginBottom: "0.5rem",
              border: "1px solid #ccc",
              borderRadius: "4px",
              cursor: "pointer",
              backgroundColor: "#f9f9f9",
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") onSelect(r);
            }}
          >
            <strong>{r.name}</strong>
            {r.description && <p>{r.description}</p>}
          </li>
        ))}
      </ul>
    </div>
  );
}




