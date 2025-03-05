// src/app/components/LetterBox.jsx
import React from 'react';
import lbStyles from '../styles/LetterBox.module.css';

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
    <div className={lbStyles["letter-box-container"]}>
      <div 
        className={`${lbStyles["letter-box"]} ${isActive ? lbStyles["active"] : ""}`} 
        onClick={handleClick}
      >
        <div className={lbStyles.char}>{char !== '_' ? char : ''}</div>
      </div>
      <div className={lbStyles.index}>{letterIndex}</div>
    </div>
  );
};

export default LetterBox;