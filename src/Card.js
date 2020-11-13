import React from "react";
import "./Card.css";



function Card({ image, code, degree }) {
  // const degree = randomAngle();
  return (
    <div 
      className="Card"
      style={{ transform: `rotate(${degree})` }}>
      <img src={image} alt={code}></img>
    </div>
  );
}

export default Card;
