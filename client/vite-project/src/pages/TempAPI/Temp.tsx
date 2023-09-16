import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './TempPage.css';

function TempPage() {
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

  const [searchedWords, setSearchedWords] = useState<string[]>([]);

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

  const handleFetchData = () => {
    fetchRandomNasaData();
  };

  const handleDictionarySearch = async () => {
    const inpWord = document.getElementById("inp-word").value;
    fetchDictionaryData(inpWord);

    if (inpWord.trim() !== '') {
      setSearchedWords([...searchedWords, inpWord]);
    }
  };

  useEffect(() => {
    fetchRandomNasaData();
  }, []);

  return (
    <div>
    

      <button className="fetch-button" onClick={handleFetchData}>Click Here For New Planet Facts</button>
      <div>
        {nasaData.imageUrl ? (
          <div>
            <img src={nasaData.imageUrl} alt="NASA" width="500" height="300" />
            <p className="description">{nasaData.description}</p>
          </div>
        ) : (
          <p>No NASA image available</p>
        )}
      </div>

      <input
        type="text"
        id="inp-word"
        placeholder="Enter a word"
      />
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
        <h3 id="">Searched Words</h3>
        <ul>
          {searchedWords.map((word, index) => (
            <li key={index}>{word}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default TempPage;