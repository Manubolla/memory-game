import React from "react";
import "./index.scss";

const Card = ({ char, index, isFlipped, flipCard }) => {
  return (
    <div
      className={`demon-card ${isFlipped ? "flipped" : ""} `}
      key={index}
      onClick={() => flipCard(index)}
    >
      <div className="inner">
        <div className="front">
          <img src={char} alt="" width="100" />
        </div>
        <div className="back"></div>
      </div>
    </div>
  );
};
export default Card;
