import React, { useEffect, useState } from 'react';

function App() {
  //define variable to init image and description from NASA api.
  const [nasaData, setNasaData] = useState<{ imageUrl: string | null; description: string | null }>({
    imageUrl: null, //empty null image
    description: null, //empty null description
  });

  //Function to fetch random NASA image/description
  const fetchRandomNasaData = async () => {
    //try catch to display console error/ error debugging
    try {
      const response = await fetch('https://images-api.nasa.gov/search?q=Planet'); // Replace 'Planet' with any desired search term
      if (!response.ok) {
        throw new Error('Network response ERROR');
      }
      const data = await response.json();

      // Extract a random image/description from the NASA API response
      const items = data.collection.items;
      if (items.length > 0) {
        const randomIndex = Math.floor(Math.random() * items.length);
        const randomImage = items[randomIndex];
        if (randomImage && randomImage.links && randomImage.links[0] && randomImage.data && randomImage.data[0]) {
          const imageUrl = randomImage.links[0].href;
          const description = randomImage.data[0].description;
          setNasaData({ imageUrl, description });
        }
      }
    } catch (error) {
      console.error('Error fetching NASA data:', error);
    }
  };

  const handleFetchData = () => {
    // Call fetchRandomNasaData when the user clicks the button
    fetchRandomNasaData();
  };

  useEffect(() => {
    // Fetch a random NASA image and description when the component mounts
    fetchRandomNasaData();
  }, []); 

  return (
    <div>
      <button onClick={handleFetchData}>Fetch Random NASA Data</button>
      <div>
        {nasaData.imageUrl ? (
          <div>
            <img src={nasaData.imageUrl} alt="NASA" />
            <p>{nasaData.description}</p>
          </div>
        ) : (
          <p>No NASA image available</p>
        )}
      </div>
    </div>
  );
}

export default App;