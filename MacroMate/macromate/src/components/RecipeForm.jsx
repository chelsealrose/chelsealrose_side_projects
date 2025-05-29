import React, { useState, useEffect } from "react";
import NutrientChart from "./NutrientChart"; // ✅ This import must be at the top

export default function RecipeForm({ initialRecipe, onSave, onCancel }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (initialRecipe) {
      setName(initialRecipe.name || "");
      setDescription(initialRecipe.description || "");
    } else {
      setName("");
      setDescription("");
    }
  }, [initialRecipe]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return alert("Please enter a recipe name.");
    onSave({ ...initialRecipe, name, description });
  };

  const sampleNutrients = [
    { name: "Protein", value: 25, unit: "g" },
    { name: "Carbs", value: 30, unit: "g" },
    { name: "Fat", value: 10, unit: "g" },
    { name: "Fiber", value: 5, unit: "g" },
  ];

  return (
    <>
      <form onSubmit={handleSubmit} style={{ marginBottom: "1rem" }}>
        <h2>{initialRecipe ? "Edit Recipe" : "New Recipe"}</h2>
        <div>
          <label>
            Name: <br />
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              style={{ width: "300px" }}
            />
          </label>
        </div>
        <div>
          <label>
            Description: <br />
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              style={{ width: "300px" }}
            />
          </label>
        </div>
        <button type="submit">💾 Save</button>
        <button type="button" onClick={onCancel} style={{ marginLeft: "1rem" }}>
          ❌ Cancel
        </button>
      </form>

      {/* ✅ Nutrient Chart Preview */}
      <NutrientChart nutrients={sampleNutrients} />
    </>
  );
}




