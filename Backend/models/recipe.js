// models/recipe.js
const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
  name: { type: String, required: true },
  ingredients: { type: String, required: true },
  steps: { type: String, required: true },
  preparationTime: { type: Number, required: true },
  photo: { type: String } // Assuming the photo will be stored as a URL
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
