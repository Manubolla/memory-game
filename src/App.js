import React, { useEffect, useState } from "react";
import Card from "./components/Card";
import { database } from "./database";
import "./index.css";

export default function App() {
  const [openedCard, setOpenedCard] = useState([]);
  const [matched, setMatched] = useState([]);
  const [pairOfChars, setPairOfChars] = useState([]);
  const [start, setStart] = useState(false);



  function flipCard(index) {
    setOpenedCard((opened) => [...opened, index]);
  }
  useEffect(() => {
    if (openedCard < 2) return;

    const firstMatched = pairOfChars[openedCard[0]];
    const secondMatched = pairOfChars[openedCard[1]];

    if (secondMatched && firstMatched.id === secondMatched.id) {
      let match = new Set([...matched, firstMatched.id]);
      setMatched([...matched, firstMatched.id]);
      if (match.size === 8) {
        alert('You win! Nice!!')
      }
    }
    if (openedCard.length === 2) setTimeout(() => setOpenedCard([]), 1000);
  }, [openedCard]);
  function shuffleArray(array) {
    let curId = array.length;
    while (0 !== curId) {
      let randId = Math.floor(Math.random() * curId);
      curId -= 1;
      let tmp = array[curId];
      array[curId] = array[randId];
      array[randId] = tmp;
    }
    return array;
  }
  const handleRestart = () => {
    setPairOfChars([])
    setOpenedCard([])
    setMatched([])
    return startGame(0);
  };
  const startGame = (start) => {
    if (start <= 1) {
      const chars = shuffleArray(database.slice(0, 8));
      setPairOfChars((oldChars) => [...oldChars, ...chars]);
      return startGame(start + 1);
    } else if (start === 2) {
      setStart(true);
    }
  };

  return (
    <div className="App">
      <div className='btn-group'>
        {!start ? (
          <button onClick={() => startGame(0)}>Start Game</button>
        ) : (
          <button onClick={handleRestart}>Restart game</button>
        )}
      </div>
      <div className="cards">
        {pairOfChars.map((char, index) => {
          let isFlipped = false;
          if (openedCard.includes(index)) isFlipped = true;
          if (matched.includes(char.id)) isFlipped = true;
          return (
            <Card
              char={char.url}
              index={index}
              flipCard={flipCard}
              isFlipped={isFlipped}
            />
          );
        })}
      </div>
    </div>
  );
}
