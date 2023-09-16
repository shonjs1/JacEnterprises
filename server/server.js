const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 5000; // Port for the backend server

// Use middleware to parse JSON requests
app.use(bodyParser.json());

// Create an array to store searched words in memory
const searchedWords = [];

// Define a route to save a searched word
app.post('/api/saveWord', (req, res) => {
  const { word } = req.body;

  if (!word) {
    return res.status(400).json({ error: 'Word is required' });
  }

  searchedWords.push(word);

  return res.status(200).json({ message: 'Word saved successfully' });
});

// Define a route to get the list of searched words
app.get('/api/getSearchedWords', (req, res) => {
  return res.status(200).json(searchedWords);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});