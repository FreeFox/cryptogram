// components/KeyboardButton.js
import React from 'react';
import kbStyles from '../styles/KeyboardButton.module.css';

type KeyboardButtonProps = {
  letter: string;
  onClick: () => void;
};

const KeyboardButton : React.FC<KeyboardButtonProps> = ({ letter, onClick }) => {
  return (
    <button className={kbStyles["keyboard-button"]} onClick={onClick}>
      {letter}
    </button>
  );
};

export default KeyboardButton;
