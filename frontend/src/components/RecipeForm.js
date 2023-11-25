// RecipeForm.js
import React, { useState } from 'react';
import axios from 'axios';
import '../styles/RecipeForm.css';

const RecipeForm = () => {
  const [recipe, setRecipe] = useState({
    name: '',
    // Add other fields as needed
  });

  const handleChange = (e) => {
    setRecipe({
      ...recipe,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('/api/recipes', recipe)
      .then(response => {
        // Handle success (update state, show notification, etc.)
        console.log('Recipe added successfully:', response.data);
      })
      .catch(error => {
        // Handle error (show error message, etc.)
        console.error('Error adding recipe:', error.response.data);
      });
  };

  return (
    <div className="recipe-form-container">
      <h2>Add Recipe</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" name="name" value={recipe.name} onChange={handleChange} />
        </label>
        {/* Add other input fields for additional recipe properties */}
        <button type="submit">Add Recipe</button>
      </form>
    </div>
  );
};

export default RecipeForm;
