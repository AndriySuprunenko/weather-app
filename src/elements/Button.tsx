import React from 'react';

import style from '../styles/button.module.scss';

interface Button {
  text: string;
  handleClick: () => void;
}

const Button: React.FC<Button> = ({ text, handleClick }) => {
  return (
    <button type='submit' onClick={handleClick} className={style.button}>
      {text}
    </button>
  );
};

export default Button;
