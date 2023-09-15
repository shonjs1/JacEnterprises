import React, { useEffect, useState } from 'react';

function App() {
  const [nasaData, setNasaData] = useState<{ imageUrl: string | null; description: string | null }>({
    imageUrl: null,
    description: null,
  });

  const [dictionaryData, setDictionaryData] = useState<{
    word: string | null;
    partOfSpeech: string | null;
    phonetic: string | null;
    meaning: string | null;
    example: string | null;
  }>({
    word: null,
    partOfSpeech: null,
    phonetic: null,
    meaning: null,
    example: null,
  });

  const fetchRandomNasaData = async () => {
    try {
      const response = await fetch('https://images-api.nasa.gov/search?q=Planet'); // Replace 'Planet' with any desired search term
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();

      // Extract a random image and its description from the NASA API response
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

  const fetchDictionaryData = async (word: string) => {
    const apiUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;

    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();

      // Extract and set dictionary data
      if (data.length > 0) {
        const dictionaryResult = {
          word,
          partOfSpeech: data[0].meanings[0].partOfSpeech || null,
          phonetic: data[0].phonetic || null,
          meaning: data[0].meanings[0].definitions[0].definition || null,
          example: data[0].meanings[0].definitions[0].example || null,
        };
        setDictionaryData(dictionaryResult);
      }
    } catch (error) {
      console.error('Error fetching dictionary data:', error);
      setDictionaryData({
        word,
        partOfSpeech: null,
        phonetic: null,
        meaning: null,
        example: null,
      });
    }
  };

  const handleFetchData = () => {
    // Call fetchRandomNasaData when the user clicks the button
    fetchRandomNasaData();
  };

  const handleDictionarySearch = () => {
    const inpWord = document.getElementById("inp-word").value;
    fetchDictionaryData(inpWord);
  };

  useEffect(() => {
    // Fetch a random NASA image and description when the component mounts
    fetchRandomNasaData();
  }, []); // Empty dependency array means this effect runs only once, on component mount

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

      {/* Dictionary search input */}
      <input
        type="text"
        id="inp-word"
        placeholder="Enter a word"
      />
      <button onClick={handleDictionarySearch}>Search Dictionary</button>
      <div id="dictionary-result">
        {/* Dictionary results will be displayed here */}
        {dictionaryData.word && (
          <div>
            <h3>{dictionaryData.word}</h3>
            <p>{dictionaryData.partOfSpeech}</p>
            <p>{dictionaryData.phonetic}</p>
            <p>{dictionaryData.meaning}</p>
            <p>{dictionaryData.example}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;