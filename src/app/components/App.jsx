// src/app/components/App.jsx
"use client";

import React, { useState, useEffect } from 'react';
import GameBoard from './GameBoard';
import Keyboard from './Keyboard';
import Controls from './Controls';
import Message from './Message';

const App = () => {
  const [message, setMessage] = useState('');
  const [scrambledMessage, setScrambledMessage] = useState('');
  const [errors, setErrors] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [activeBox, setActiveBox] = useState(null);
  const [secretMap, setSecretMap] = useState({});

  const hiddenMessageServiceURL = `${process.env.NEXT_PUBLIC_API_URL}/hidden-message`;

  // Fetch the message when the component mounts
  useEffect(() => {
    const fetchMessage = async () => {
      try {
        // Simulate a delay to mimic server response time
        const response = await fetch(hiddenMessageServiceURL);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setMessage(data.message.toUpperCase());
      } catch (error) {
        console.error('Error fetching message:', error);
        setMessage('');
      }
    };

    fetchMessage();
  }, []);

  // Update scrambled message and reset game state when the message changes
  useEffect(() => {
    setScrambledMessage(scrambleMessage(message));
    setSecretMap(generateSecretMap());
    setActiveBox(null);
    setErrors(0);
    setGameOver(false);
  }, [message]);

  /**
  * Scrambles a given message by obscuring a portion of its alphabetic characters
  * with underscores, while revealing a minimum number of characters.
  *
  * The function ensures that at least 10% of the alphabetic characters in the
  * message are revealed, with a minimum of 3 characters being visible. Non-alphabetic
  * characters are preserved in their original positions.
  *
  * @param {string} msg - The message to be scrambled.
  * @returns {string} - The scrambled message with some characters replaced by underscores.
  */
  const scrambleMessage = (msg) => {
    const msgArray = msg.split('');
    const length = msgArray.length;
    const numToReveal = Math.max(3, Math.ceil(length * 0.1));
  
    // Create a mapping of letter characters to their positions
    const letterIndices = msgArray.reduce((acc, char, index) => {
      if (/[a-zA-Z]/.test(char)) {
        acc.push(index);
      }
      return acc;
    }, []);
  
    // Shuffle the array of letter indices
    for (let i = letterIndices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [letterIndices[i], letterIndices[j]] = [letterIndices[j], letterIndices[i]];
    }
  
    // Select the first `numToReveal` indices to reveal
    const revealedIndices = new Set(letterIndices.slice(0, numToReveal));
  
    // Create scrambled message
    return msgArray.map((char, index) => {
      if (!/[a-zA-Z]/.test(char)) return char; // Preserve non-letter characters
      return revealedIndices.has(index) ? char : '_';
    }).join('');
  };

  /**
  * Generates a secret map that assigns each letter of the English alphabet
  * (A-Z) to a unique number between 1 and 26. The numbers are shuffled randomly
  * to ensure that each letter is mapped to a different number each time the
  * function is called.
  */
  const generateSecretMap = () => {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    const numbers = Array.from({ length: 26 }, (_, i) => i + 1);

    for (let i = numbers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
    }

    const map = {};
    letters.forEach((letter, index) => {
      map[letter] = numbers[index];
    });

    return map;
  };

  /**
  * Asynchronously handles the reset operation by fetching a hidden message from a specified URL.
  * 
  * This function performs a network request to retrieve a message from service.
  * Upon a successful response, it converts the message to uppercase and updates the state with this message.
  * If the network request fails or the response is not successful, it logs the error to the console and sets
  * the message state to an empty string as a fallback.
  */
  const handleReset = async () => {
    try {
      const response = await fetch(hiddenMessageServiceURL);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setMessage(data.message.toUpperCase());
    } catch (error) {
      console.error('Error fetching message:', error);
      setMessage(''); // Fallback message in case of error
    }
  };

  return (
    <div className="app-container">
      <div className="top-bar">
        <div className="message">
          <Message errors={errors} gameOver={gameOver} />
        </div>
        <div className="controls">
          <Controls onReset={handleReset} />
        </div>
      </div>
      <GameBoard
        message={message}
        scrambledMessage={scrambledMessage}
        activeBox={activeBox}
        setActiveBox={setActiveBox}
        secretMap={secretMap}
      />
      <Keyboard
        activeBox={activeBox}
        message={message}
        scrambledMessage={scrambledMessage}
        setScrambledMessage={setScrambledMessage}
        errors={errors}
        setErrors={setErrors}
        setGameOver={setGameOver}
        setActiveBox={setActiveBox}
      />
    </div>
  );

};

/**

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAqP9Kx_Iy0OdKEcGefWqurCiaLNvucDwo",
  authDomain: "cryptogram-service.firebaseapp.com",
  projectId: "cryptogram-service",
  storageBucket: "cryptogram-service.firebasestorage.app",
  messagingSenderId: "865463059773",
  appId: "1:865463059773:web:5c1c5d71ee491b67eb7154",
  measurementId: "G-RL5R2QELGJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

 */

export default App;