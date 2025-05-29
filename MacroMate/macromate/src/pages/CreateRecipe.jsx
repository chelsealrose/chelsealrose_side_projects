import React, { useState } from 'react';

function CreateRecipe() {
  const [recipe, setRecipe] = useState({
    name: '',
    ingredients: '',
    instructions: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipe({ ...recipe, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted Recipe:', recipe);
    alert('Recipe saved! (Not really — just console logged for now.)');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create a New Recipe</h2>

      <label htmlFor="name">Recipe Name</label>
      <input
        type="text"
        id="name"
        name="name"
        value={recipe.name}
        onChange={handleChange}
        required
      />

      <label htmlFor="ingredients">Ingredients</label>
      <textarea
        id="ingredients"
        name="ingredients"
        value={recipe.ingredients}
        onChange={handleChange}
        rows="4"
        placeholder="List ingredients separated by commas"
        required
      />

      <label htmlFor="instructions">Instructions</label>
      <textarea
        id="instructions"
        name="instructions"
        value={recipe.instructions}
        onChange={handleChange}
        rows="4"
        placeholder="Describe how to make it"
        required
      />

      <button type="submit">Save Recipe</button>
    </form>
  );
}

export default CreateRecipe;

