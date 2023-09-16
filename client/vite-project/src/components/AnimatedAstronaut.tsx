import React from 'react';
import {Link} from 'react-router-dom';
import animatedAstronautImage from '../assets/AnimatedAstro.gif'

const AnimatedAstronaut = () => {
  const imageStyle: React.CSSProperties = {
   width: '100vw',
   height: '100vh',
  };

  const handleClick = () => {
    window.open("./Game/index.html");
  };
  return (
    <div className="animated-astronaut" onClick={handleClick} style={{cursor: 'pointer'}}>
      <img 
      src={animatedAstronautImage}
      alt="astronaut"
      style={imageStyle}
      />
    </div>
  );
};

export default AnimatedAstronaut;
