const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(bodyParser.json());

// Enable CORS for all routes
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://localhost/recipeDB', { useNewUrlParser: true, useUnifiedTopology: true });

// Use User Routes
app.use('/api/users', require('./routes/user'));

// Use Recipe Routes
app.use('/api/recipes', require('./routes/recipe'));

// Start the server
app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
