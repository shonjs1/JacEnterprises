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
    fetchDictionaryData(inpWord);
    //code so words that are incorrect is not saved under Searched Words
    if (isValidWord(inpWord)){
      fetchDictionaryData(inpWord);
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
      // a POST request to save the word
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
    <img className="bg" src="/src/images/background.png" />

    <div className="container-fluid text-center">

      <div className="row justify-content-md-center">
        <div className="col-md-auto">
          <button className="fetch-button" onClick={handleFetchData}>
            Click Here For New Planet Facts
          </button>
        </div>
      </div>

      <div className="row justify-content-md-center">
        {nasaData.imageUrl ? (
          <div className="col-md">
            <img
              src={nasaData.imageUrl}
              alt="NASA"
              width="500"
              height="300"
            />
            <div className="col-md col-border">
              <p className="font-style font-small">{nasaData.description}</p>
            </div>
            
          </div>
        ) : (
          <p>No NASA image available</p>
        )}
      </div>

      <div className="row justify-content-md-center">
        <div className="col-md-auto">
          <input type="text" id="inp-word" placeholder="Enter a word" />
          <button onClick={handleDictionarySearch}>Search Dictionary</button>
        </div>
      </div>

      <div className="row justify-content-md-center" id="dictionary-result">
        <div className="col-sm-8 col-border">
          {dictionaryData.word && (
            <div className="font-style font-big">
              <h3>{dictionaryData.word}</h3>
              <p>{dictionaryData.partOfSpeech}</p>
              <p>{dictionaryData.phonetic}</p>
              <p>{dictionaryData.meaning}</p>
              <p>{dictionaryData.example}</p>
            </div>
          )}
        </div>

        <div className="col-sm-4 col-border">
            <h3 className="font-style font-big">Searched Words</h3>
            <ul className="font-style font-small">
              {searchedWords.map((word, index) => (
                <li key={index}>
                  {index + 1}. {word}
                </li>
              ))}
            </ul>
        </div>

      </div>

    </div>
  </div>
  );
}

export default TempPage;