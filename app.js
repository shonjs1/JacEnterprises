const express = require('express')
const app = express()
const axios = require('axios'); // Import axios
const cors = require('cors');
const port = 9006;

app.use(cors()); // Enable CORS for all routes


let history = [];

async function getNasa(search_term) {
    try {
    const response = await axios.get("https://images-api.nasa.gov/search?q=" + search_term);
    if (response.status !== 200) {
        throw new Error('Failed to fetch data from NASA API');
    }

    const data = response.data.collection.items;
    
    if (data.length === 0) {
        throw new Error('No items found in NASA API response');
    }

    const randomItem = data[Math.floor(Math.random() * data.length)];

    return randomItem;
    } catch (error) {
    console.error('Error fetching data from NASA API:', error);
    throw error;
    }
}

app.get("/", async (req, res) => {
try {
    const image = await getNasa(req.query.q);
    history.push(image.links[0].href);
    res.status(200).json({
        "message": "Object Saved!",
        "history": history
    });
    } catch (error) {
    res.status(500).json({
        "message": "Error fetching data from NASA API"
    });
    }
});

app.listen(port, () => {
    console.log(`App listening on port:${port}`);
});

app.get("/solar-system-data", async (req, res) => {
    try {
        const response = await axios.get("https://api.le-systeme-solaire.net/rest/");
        if (response.status !== 200) {
        throw new Error('Failed to fetch data from Solar System Open Data API');
    }

        const data = response.data; 
    
        res.status(200).json(data);
    } catch (error) {
        console.error('Error fetching data from Solar System Open Data API:', error);
        res.status(500).json({
        "message": "Error fetching data from Solar System Open Data API",
        "error": error.message
        });
    }
});