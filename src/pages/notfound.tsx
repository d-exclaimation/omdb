import { Transition } from "@headlessui/react";
import { useCallback, useMemo, useState, type FC } from "react";
import { findWinner, type Board } from "../common/utils/tic-tac-toe";

const NotFoundPage: FC = () => {
  const [board, setBoard] = useState([
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ] as Board);
  const winner = useMemo(() => findWinner(board), [board]);

  const clickAt = useCallback(
    (i: 0 | 1 | 2, j: 0 | 1 | 2) => {
      if (winner !== "" || board[i][j] !== "") return;
      const newBoard = board.map((row, rowIdx) =>
        row.map((col, colIdx) => {
          if (rowIdx === i && colIdx === j && col === "") {
            return "X";
          }
          return col;
        })
      ) as Board;

      const hasWin = findWinner(newBoard) === "X";

      if (hasWin) {
        setBoard(newBoard);
        return;
      }

      const res = newBoard
        .flatMap((row, rowIdx) =>
          row.map((col, colIdx) => [col, rowIdx, colIdx] as const)
        )
        .filter(([col]) => col === "")
        .filter(([_, rowIdx, colIdx]) => rowIdx !== i && colIdx !== j);
      const [_, x, y] = res[Math.floor(Math.random() * res.length)];
      const newBoard2 = newBoard.map((row, rowIdx) =>
        row.map((col, colIdx) => {
          if (rowIdx === x && colIdx === y && col === "") {
            return "O";
          }
          return col;
        })
      ) as Board;

      setBoard(newBoard2);
    },
    [setBoard, winner, board]
  );

  return (
    <div className="min-h-screen w-full max-w-3xl px-5 h-max flex flex-col overflow-x-hidden items-center gap-4 justify-center pt-2 pb-20">
      <Transition
        as="div"
        className="flex-1 w-full min-h-full h-max flex flex-col translate-y-10 justify-center items-center"
        key="login-page"
        appear
        show
        enter="transition-all duration-500"
        enterFrom="opacity-0 translate-y-10"
        enterTo="opacity-100 translate-y-0"
        leave="transition-all duration-500"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-10"
      >
        <div className="flex flex-row items-center gap-4 mb-5 justify-center">
          <h2 className="font-bold text-4xl">404</h2>
          <span className="w-[1px] h-8 my-4 bg-black/30" />
          <h3 className="font-medium text-lg">Page not found</h3>
        </div>
        <div className="grid grid-cols-3 grid-rows-3">
          {board.map((row, rowIdx) =>
            row.map((col, colIdx) => (
              <div
                key={`${rowIdx}-${colIdx}`}
                className="w-20 h-20 border border-black/30 flex items-center justify-center"
                onClick={() =>
                  clickAt(rowIdx as 0 | 1 | 2, colIdx as 0 | 1 | 2)
                }
              >
                <span
                  className="w-4 h-4 data-selected:opacity-100 opacity-0"
                  data-selected={col === ""}
                />
                <img
                  src="/icons/X.svg"
                  className="absolute w-4 h-4 transition-all duration-500 data-selected:opacity-100 opacity-0"
                  data-selected={col === "X"}
                />
                <img
                  src="/icons/O.svg"
                  className="absolute w-4 h-4 transition-all duration-500 delay-300 data-selected:opacity-100 opacity-0"
                  data-selected={col === "O"}
                />
              </div>
            ))
          )}
        </div>
        <div className="text-base h-4 mt-4 font-mono">
          <span
            className="transition-all data-[has-winner='true']:opacity-100 data-[has-winner='true']:translate-y-0 -translate-y-20 duration-1000 opacity-0"
            data-has-winner={winner !== ""}
          >
            {winner === "X" ? "🎉 You win" : "💩 You lose"}
          </span>
        </div>
      </Transition>
    </div>
  );
};

export default NotFoundPage;
