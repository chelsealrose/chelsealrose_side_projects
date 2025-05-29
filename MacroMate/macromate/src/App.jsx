import React, { useState } from "react";
import RecipeList from "./components/RecipeList";
import RecipeForm from "./components/RecipeForm";
import FoodSearch from "./components/FoodSearch";

export default function App() {
  const [mode, setMode] = useState("search"); // 'search', 'list', or 'form'
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const handleAddNew = () => {
    setSelectedRecipe(null);
    setMode("form");
  };

  const handleSelectRecipe = (recipe) => {
    setSelectedRecipe(recipe);
    setMode("form");
  };

  const handleSaveRecipe = (recipe) => {
    if (selectedRecipe) {
      setRecipes((prev) =>
        prev.map((r) => (r.id === selectedRecipe.id ? recipe : r))
      );
    } else {
      setRecipes((prev) => [...prev, { ...recipe, id: Date.now() }]);
    }
    setSelectedRecipe(null);
    setMode("list");
  };

  const handleCancel = () => {
    setSelectedRecipe(null);
    setMode("list");
  };

  return (
    <div className="App" style={{ padding: "2rem", fontFamily: "Arial" }}>
      <h1>MacroBloom</h1>

      {/* Navigation buttons */}
      <div style={{ marginBottom: "1rem" }}>
        <button onClick={() => setMode("search")} style={{ marginRight: "1rem" }}>
          🔍 Go to Search
        </button>
        <button onClick={() => setMode("list")}>📋 Go to Recipes</button>
      </div>

      {mode === "search" && (
        <div>
          <FoodSearch />
          <p style={{ marginTop: "1rem" }}>
            Click <strong>Go to Recipes</strong> to view your recipe list.
          </p>
        </div>
      )}

      {mode === "list" && (
        <>
          <button onClick={handleAddNew} style={{ marginBottom: "1rem" }}>
            ➕ Add New Recipe
          </button>
          <RecipeList recipes={recipes} onSelect={handleSelectRecipe} />
        </>
      )}

      {mode === "form" && (
        <RecipeForm
          initialRecipe={selectedRecipe}
          onSave={handleSaveRecipe}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
}








