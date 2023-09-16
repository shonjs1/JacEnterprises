import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Import axios to make HTTP requests
import './TempPage.css';

function TempPage() {
  // State for the data of NASA API (We want to extract image and description)
  const [nasaData, setNasaData] = useState<{
    imageUrl: string | null;
    description: string | null;
  }>({
    imageUrl: null,
    description: null,
  });

  //State for dictionary API https://dictionaryapi.dev/
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
  // State for Searched Words connecting to Dictionary API
  const [searchedWords, setSearchedWords] = useState<string[]>([]);

  //Fetching NASA API
  const fetchRandomNasaData = async () => {
    try {
      const response = await fetch('https://images-api.nasa.gov/search?q=Planet');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();

      const items = data.collection.items;

      if (items.length > 0) { //checks that there are items in the array. 
        const randomIndex = Math.floor(Math.random() * items.length); //generates a random index within the range of the length of the array.
        const randomImage = items[randomIndex]; //takes the random image from the array that was generated.
        if (randomImage && randomImage.links && randomImage.links[0] && randomImage.data && randomImage.data[0]) { //makes sure that the image has an image and description.
          const imageUrl = randomImage.links[0].href;
          const description = randomImage.data[0].description;
          setNasaData({ imageUrl, description }); // states the final state with the extracted details.
        }
      }
    } catch (error) {
      console.error('Error fetching NASA data:', error);
    }
  };

  //Fetching Dictionary API
  const fetchDictionaryData = async (word: string) => {
    const apiUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;

    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();

      if (data.length > 0) {
        const dictionaryResult = {
          word,
          partOfSpeech: data[0].meanings[0].partOfSpeech || null,
          phonetic: data[0].phonetic || null,
          meaning: data[0].meanings[0].definitions[0].definition || null,
          example: data[0].meanings[0].definitions[0].example || null,
        };
        setDictionaryData(dictionaryResult);
      } else {
        setDictionaryData({
          word,
          partOfSpeech: null,
          phonetic: null,
          meaning: 'Please retype the word',
          example: null,
        });
      }
    } catch (error) {
      console.error('Error fetching dictionary data:', error);
      setDictionaryData({
        word,
        partOfSpeech: null,
        phonetic: null,
        meaning: 'Please retype the word',
        example: null,
      });
    }
  };
  //Function to handle NASA when button is clicked. Generates random image/description
  const handleFetchData = () => {
    fetchRandomNasaData();
  };

// Function to check if a word is valid
const isValidWord = (word) => {
  
  const minWordLength = 1; // Minimum length required

  const trimmedWord = word.trim().toLowerCase(); //Capitalization is irrevelant

  return /^[a-z]+$/.test(trimmedWord) && trimmedWord.length >= minWordLength; //only alphabetic allowed
};

//function to handle dictionary search
const handleDictionarySearch = async () => {
  const inpWord = document.getElementById('inp-word').value;
  if (isValidWord(inpWord)) {
    fetchDictionaryData(inpWord); // Corrected variable name from impWord to inpWord
    if (inpWord.trim() !== '') {
      setSearchedWords([...searchedWords, inpWord]);
      saveSearchedWord(inpWord);
    }
  } else {
    alert('Please enter a valid word.');
  }
};

  useEffect(() => {
    fetchRandomNasaData();
  }, []);

  // Function to save the searched word to the backend
  const saveSearchedWord = async (word: string) => {
    try {
      // Make a POST request to save the word
      const response = await axios.post('/api/saveWord', { word });

      if (response.status === 200) {
        console.log('Word saved successfully');
      }
    } catch (error) {
      console.error('Error saving word:', error);
    }
  };

  useEffect(() => {
    // After the component mounts, fetch the list of searched words from the backend
    fetchSearchedWords();
  }, []);

  // Function to fetch the list of searched words from the backend
  const fetchSearchedWords = async () => {
    try {
      // Make a GET request to retrieve searched words
      const response = await axios.get('/api/getSearchedWords');

      if (response.status === 200) {
        // Set the retrieved words to the state
        setSearchedWords(response.data);
      }
    } catch (error) {
      console.error('Error fetching searched words:', error);
    }
  };

  return (
    <div>

      <button className="fetch-button" onClick={handleFetchData}>
        Click Here For New Planet Facts
      </button>
      <div>
        {nasaData.imageUrl ? (
          <div>
            <img
              src={nasaData.imageUrl}
              alt="NASA"
              width="500"
              height="300"
            />
            <p className="description">{nasaData.description}</p>
          </div>
        ) : (
          <p>No NASA image available</p>
        )}
      </div>

      <input type="text" id="inp-word" placeholder="Enter a word" />
      <button onClick={handleDictionarySearch}>Search Dictionary</button>
      <div id="dictionary-result">
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

      <div id="searched-words">
        <h3>Searched Words</h3>
        <ul>
          {searchedWords.map((word, index) => (
            <li key={index}>
              {index + 1}. {word}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default TempPage;