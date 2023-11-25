import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/RecipeList.css';

const RecipeList = ({ authenticated }) => {
  const [recipes, setRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredRecipes, setFilteredRecipes] = useState([]);

  useEffect(() => {
    if (authenticated) {
      axios.get('/api/recipes')
        .then(response => {
          setRecipes(response.data);
          setFilteredRecipes(response.data);
        })
        .catch(error => console.error(error.response.data));
    }
  }, [authenticated]);

  const handleDelete = (recipeId) => {
    axios.delete(`/api/recipes/${recipeId}`)
      .then(() => {
        setRecipes(prevRecipes => prevRecipes.filter(recipe => recipe._id !== recipeId));
        setFilteredRecipes(prevRecipes => prevRecipes.filter(recipe => recipe._id !== recipeId));
      })
      .catch(error => console.error(error.response.data));
  };

  const handleSearch = () => {
    const lowerCaseTerm = searchTerm.toLowerCase();
    const filtered = recipes.filter(
      recipe =>
        recipe.name.toLowerCase().includes(lowerCaseTerm) ||
        recipe.ingredients.some(ingredient => ingredient.toLowerCase().includes(lowerCaseTerm)) ||
        recipe.prepTime.toString().includes(lowerCaseTerm)
    );
    setFilteredRecipes(filtered);
  };

  const handleClearSearch = () => {
    setSearchTerm('');
    setFilteredRecipes(recipes);
  };

  return (
    <div className="recipe-list-container">
      <h2>Recipe List</h2>

      {/* Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by name, ingredients, or prep time"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
        <button onClick={handleClearSearch}>Clear</button>
      </div>

      <ul>
        {filteredRecipes.map(recipe => (
          <li key={recipe._id} className="recipe-item">
            {recipe.name}{' '}
            <button onClick={() => handleDelete(recipe._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecipeList;
