import React, { useState } from "react";
import { calculateWinner } from "./util";
import Board from "./Board";
import "./css/GameStyles.css";

const Game = () => {
  // 15x15
  const [board, setBoard] = useState(Array(225).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  const winner = calculateWinner(board);
  const handleClick = (index) => {
    const boardCopy = [...board];
    if (winner || boardCopy[index]) return;
    boardCopy[index] = xIsNext ? "X" : "O";
    setBoard(boardCopy);
    setXIsNext(!xIsNext);
  };
  const handleResetGame = () => {
    // 15x15
    setBoard(Array(225).fill(null));
    setXIsNext(true);
  };
  return (
    <div>
      <Board cells={board} onClick={handleClick}></Board>
      {winner && <div className="game-winner">Winner is {winner}</div>}
      <div className="game-wrapper">
        <button className="game-reset" onClick={handleResetGame}>
          Reset game
        </button>
      </div>
    </div>
  );
};

export default Game;
