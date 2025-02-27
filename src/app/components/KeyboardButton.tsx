// components/KeyboardButton.js
import React from 'react';

type KeyboardButtonProps = {
  letter: string;
  onClick: () => void;
};

const KeyboardButton : React.FC<KeyboardButtonProps> = ({ letter, onClick }) => {
  return (
    <button className="keyboard-button" onClick={onClick}>
      {letter}
    </button>
  );
};

export default KeyboardButton;
