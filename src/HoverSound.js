import React from 'react';

const HoverSound = () => {
  const playSound = () => {
    new Audio('/sounds/hover.mp3').play();
  };

  return <div onMouseEnter={playSound}></div>;
};

export default HoverSound;
