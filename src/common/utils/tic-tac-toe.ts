export type Col = "X" | "O" | "";

export type Board = [[Col, Col, Col], [Col, Col, Col], [Col, Col, Col]];

export function findWinner(board: Board): Col {
  for (let i = 0; i < 3; i++) {
    if (board[i][0] === board[i][1] && board[i][1] === board[i][2]) {
      if (board[i][0] === "") continue;
      return board[i][0];
    }
  }

  // Columns
  for (let i = 0; i < 3; i++) {
    if (board[0][i] === board[1][i] && board[1][i] === board[2][i]) {
      if (board[0][i] === "") continue;
      return board[0][i];
    }
  }

  // Diagonals
  if (board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
    if (board[0][0] !== "") {
      return board[0][0];
    }
  }
  if (board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
    if (board[0][2] !== "") {
      return board[0][2];
    }
  }

  return "";
}
