import React, { useState } from "react";
import { difference } from "lodash";
import Board from "../tictactoeV1/Board";

const winPattern = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const isWon = (board) => {
  for (let i = 0; i < winPattern.length; i++) {
    let [a, b, c] = winPattern[i];
    if (board[a] && board[a] === board[b] && board[b] === board[c]) {
      return true;
    }
  }
  return false;
};

const isDraw = (board) => {
  return board.filter((box) => !box).length === 0;
};

const GameV1 = () => {
  const [board, setBoard] = useState(Array(9).fill(""));
  const [isGameStopped, setGameStop] = useState(false);
  const [message, setMessage] = useState("Tic Tac toe");
  const player = {
    human: "X",
    computer: "0",
  };

  const refresh = () => {
    setBoard(Array(9).fill(""));
    setGameStop(false);
    setMessage("Click to start");
  };

  const handleClick = (pos) => {
    if (isGameStopped) {
      return;
    }
    if (board[pos]) {
      return;
    }
    const boardCopy = [...board];
    boardCopy[pos] = player.human;
    setBoard(boardCopy);

    //   check win and draw
    if (isWon(boardCopy)) {
      setMessage(`Winner is ${player.human}`);
      setGameStop(true);
      return;
    }

    if (isDraw(boardCopy)) {
      setMessage("Draw");
      setGameStop(true);
      return;
    }

    // computermove
    setTimeout(() => {
      const computerIndex = determineComputerMove(boardCopy, player);
      const boardCopy2 = [...boardCopy];
      boardCopy2[computerIndex] = player.computer;
      setBoard(boardCopy2);

      //   check win and draw
      if (isWon(boardCopy2)) {
        setMessage(`Winner is ${player.computer}`);
        setGameStop(true);
        return;
      }

      if (isDraw(boardCopy)) {
        setMessage("Draw");
        setGameStop(true);
        return;
      }
    }, 500);
  };

  console.log(board);

  return (
    <div>
      <h3 style={{ marginLeft: "8px", fontSize: "30px", color: "#f62682" }}>
        {message}
      </h3>
      <Board value={board} onClick={handleClick}></Board>
      <button
        style={{
          margin: "3rem 1.5rem",
          display: "inline-block",
          padding: "15px 20px",
          color: "white",
          backgroundColor: "#6a5af9",
          fontSize: "16px",
          border: "none",
          outline: "none",
          cursor: "pointer",
        }}
        onClick={refresh}
      >
        Refresh
      </button>
    </div>
  );
};

export default GameV1;

// Các vị trí nên đánh của bot
function determineComputerMove(board, player) {
  // Lấy hết tất cả vị trí bot có thể đánh
  const computerMoves = [];
  // Lấy hết tất cả vị trí human  có thể đánh
  const humanMoves = [];
  // chạy lọc qua
  board.forEach((box, index) => {
    if (box === player.computer) {
      computerMoves.push(index);
    }
    if (box === player.human) {
      humanMoves.push(index);
    }
  });
  // if can win, then win

  // Lặp qua các vị trí có thể win
  for (let pattern of winPattern) {
    // difference sẽ tạo một mảng chứa những phần tử khác nhau của hai array.
    const winPositions = difference(pattern, computerMoves);
    // Còn 1 vị trí để win thì win
    if (winPositions.length === 1) {
      const winPos = board[winPositions[0]];
      // Nếu còn trống vị trí thì return vị trí đó luôn
      if (!winPos) {
        return winPositions[0];
      }
    }
  }

  // if cannot win, then block

  for (let pattern of winPattern) {
    const winPositions = difference(pattern, humanMoves);
    if (winPositions.length === 1) {
      const winPos = board[winPositions[0]];
      if (!winPos) {
        return winPositions[0];
      }
    }
  }

  // if cannot block, take the middle

  const centerSquare = 4;
  // nếu board còn trống thì đánh tiếp vào chỗ đó
  if (!board[centerSquare]) {
    return centerSquare;
  }

  // if cannot take the middle random

  let randomPos = getRandomInt(0, 9);
  while (board[randomPos]) {
    // Tiếp tục random vị trí khác
    randomPos = getRandomInt(0, 9);
  }
  return randomPos;
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}
