// components/Keyboard.js
import React from "react";
import KeyboardButton from "./KeyboardButton";

// Define the type for the handleKeyPress function
type HandleKeyPress = (letter: string) => void;

// Define the type for the setActiveBox function
type SetActiveBox = React.Dispatch<React.SetStateAction<number | null>>;

// Define the type for the activeBox state
type ActiveBox = number | null;

type KeyboardProps = {
  activeBox: ActiveBox;
  message: string;
  scrambledMessage: string;
  setScrambledMessage: React.Dispatch<React.SetStateAction<string>>;
  errors: number;
  setErrors: React.Dispatch<React.SetStateAction<number>>;
  setGameOver: React.Dispatch<React.SetStateAction<boolean>>;
  setActiveBox: SetActiveBox;
};

const Keyboard : React.FC<KeyboardProps> = ({
  activeBox,
  message,
  scrambledMessage,
  setScrambledMessage,
  errors,
  setErrors,
  setGameOver,
  setActiveBox
}) => {
  const handleKeyPress : HandleKeyPress = (letter : string) => {
    if (activeBox !== null) {
      const correctLetter = message[activeBox];
      
      if (letter === correctLetter) {
        const newMessage = scrambledMessage.split("");
        newMessage[activeBox] = letter;
        setScrambledMessage(newMessage.join(""));

        if (!newMessage.includes("_")) {
          setGameOver(true);
        }

        // Move to the next unguessed box if the guess was correct
        setActiveBox(() => {
          let nextBox = activeBox + 1;
          while (nextBox < newMessage.length && newMessage[nextBox] !== '_') {
            nextBox++;
          }
          return nextBox < newMessage.length ? nextBox : null; // Set to null if no more boxes
        });
      } else {
        setErrors(errors + 1);
        if (errors + 1 >= 3) {
          setGameOver(true);
        }
      }
    }
  };

  const firstRow = "QWERTYUIOP".split("");
  const secondRow = "ASDFGHJKL".split("");
  const thirdRow = "ZXCVBNM".split("");

  return (
    <div className="keyboard">
      <div className="keyboard-row">
        {firstRow.map((key) => (
          <KeyboardButton key={key} letter={key} onClick={() => handleKeyPress(key)} />
        ))}
      </div>
      <div className="keyboard-row">
        {secondRow.map((key) => (
          <KeyboardButton key={key} letter={key} onClick={() => handleKeyPress(key)} />
        ))}
      </div>
      <div className="keyboard-row">
        {thirdRow.map((key) => (
          <KeyboardButton key={key} letter={key} onClick={() => handleKeyPress(key)} />
        ))}
      </div>
    </div>
  );
};

export default Keyboard;