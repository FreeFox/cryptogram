// src/app/components/GameBoard.tsx
import React from "react";
import LetterBox from "./LetterBox";

type GameBoardProps = {
  message: string;
  scrambledMessage: string;
  activeBox: number | null;
  setActiveBox: React.Dispatch<React.SetStateAction<number | null>>;
  secretMap: Record<string, number>;
};

const GameBoard : React.FC<GameBoardProps> = ({
  message,
  scrambledMessage,
  activeBox,
  setActiveBox,
  secretMap,
} : GameBoardProps) => {
  // Split the message into words
  const words = message.split(" ");
  let currentGlobalIndex = 0; // Initialize a counter for the global index

  return (
    <div className="gameboard-container">
      <div className="gameboard">
        {words.map((word, wordIndex) => {
          // Add a space between words, except for the first word
          if (wordIndex > 0) {
            currentGlobalIndex++; // Increment the global index for the space
          }

          return (
            <div key={`word-${wordIndex}`} className="word">
              {word.split("").map((char, index) => {
                // Use a combination of wordIndex and index to ensure uniqueness
                const uniqueKey = `word-${wordIndex}-char-${index}`;
                const globalIndex = currentGlobalIndex++; // Increment the global index for each character

                if (!/[a-zA-Z_]/.test(char)) {
                  // If the character is not a letter or underscore, render it directly
                  return <span key={uniqueKey}>{char}</span>;
                }

                // If the character is a letter or underscore, render it using LetterBox
                return (
                  <LetterBox
                    key={uniqueKey}
                    char={scrambledMessage[globalIndex]} // Use scrambled character for display
                    index={globalIndex}
                    activeBox={activeBox}
                    setActiveBox={setActiveBox}
                    letterIndex={secretMap[char.toUpperCase()]}
                  />
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GameBoard;
