// src/app/components/LetterBox.jsx
import React from 'react';

type LetterBoxProps = {
  char: string;
  index: number;
  activeBox: number | null;
  setActiveBox: (index: number) => void;
  letterIndex: number;
};

const LetterBox : React.FC<LetterBoxProps> = ({ char, index, activeBox, setActiveBox, letterIndex }) => {
  const isActive = activeBox === index;
  const handleClick = () => setActiveBox(index);

  return (
    <div className="letter-box-container">
      <div 
        className={`letter-box ${isActive ? 'active' : ''}`} 
        onClick={handleClick}
      >
        <div className="char">{char !== '_' ? char : ''}</div>
      </div>
      <div className="index">{letterIndex}</div>
    </div>
  );
};

export default LetterBox;