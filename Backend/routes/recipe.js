// to handling CRUD operations on recipes
const express = require('express');
const router = express.Router();
const Recipe = require('../models/recipe');
const authenticate = require('../middleware/authenticate');
const { body, validationResult } = require('express-validator');




// Middleware to protect routes
router.use(authenticate);

// Create a new recipe
// router.post('/recipes', async (req, res) => {
//   try {
//     const recipe = new Recipe(req.body);
//     await recipe.save();
//     res.status(201).json(recipe);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });


// Create a new recipe with validation
router.post(
    '/recipes',
    [
      body('name', 'Recipe name is required').trim().notEmpty(),
      // Add more validation rules for other fields as needed
    ],
    async (req, res) => {
      try {
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
  
        const recipe = new Recipe(req.body);
        await recipe.save();
        res.status(201).json(recipe);
      } catch (error) {
        res.status(400).json({ message: 'Failed to create recipe', error: error.message });
      }
    }
  );
  

// Get all recipes 
router.get('/recipes', async (req, res) => {
    try {
      const recipes = await Recipe.find();
  
      if (!recipes || recipes.length === 0) {
        return res.status(404).json({ message: 'No recipes found' });
      }
  
      res.json(recipes);
    } catch (error) {
      res.status(500).json({ message: 'Internal server error', error: error.message });
    }
  });
  

// Get a single recipe by ID
router.get('/recipes/:id', async (req, res) => {
    try {
      const recipe = await Recipe.findById(req.params.id);
  
      if (!recipe) {
        return res.status(404).json({ message: 'Recipe not found' });
      }
  
      res.json(recipe);
    } catch (error) {
      res.status(500).json({ message: 'Internal server error', error: error.message });
    }
  });

// Update a recipe by ID
router.patch(
    '/recipes/:id',
    [
      body('name', 'Recipe name is required').trim().notEmpty(),
      // Add more validation rules for other fields as needed
    ],
    async (req, res) => {
      try {
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
  
        const updatedRecipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, { new: true });
  
        if (!updatedRecipe) {
          return res.status(404).json({ message: 'Recipe not found' });
        }
  
        res.json(updatedRecipe);
      } catch (error) {
        res.status(400).json({ message: 'Failed to update recipe', error: error.message });
      }
    }
  );

// Delete a recipe by ID
router.delete('/recipes/:id', async (req, res) => {
    try {
      const deletedRecipe = await Recipe.findByIdAndRemove(req.params.id);
  
      if (!deletedRecipe) {
        return res.status(404).json({ message: 'Recipe not found' });
      }
  
      res.json({ message: 'Recipe deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Internal server error', error: error.message });
    }
  });

// Middleware function to get a single recipe by ID
async function getRecipe(req, res, next) {
  let recipe;
  try {
    recipe = await Recipe.findById(req.params.id);
    if (recipe == null) {
      return res.status(404).json({ message: 'Recipe not found' });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  res.recipe = recipe;
  next();
}

module.exports = router;
