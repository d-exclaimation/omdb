import { match, type Union } from "@d-exclaimation/common/union";
import { useEffect, useReducer, type FC } from "react";

type Vec2 = {
  x: number;
  y: number;
};

type SnakeState = {
  snake: Vec2[];
  direction: "up" | "down" | "left" | "right";
  food: Vec2;
  going: boolean;
  dead: boolean;
};

type SnakeAction = Union<{
  next: {};
  change: {
    direction: SnakeState["direction"];
  };
}>;

const MAX_X = 20;
const MAX_Y = 20;

function generateFood(snake: Vec2[]): Vec2 {
  const chosen = Array.from({ length: MAX_Y })
    .flatMap((_, y) => Array.from({ length: MAX_X }).map((_, x) => ({ x, y })))
    .filter(({ x, y }) => !snake.some((vec) => vec.x === x && vec.y === y));

  return chosen[Math.floor(Math.random() * chosen.length)];
}

function snakeReducer(state: SnakeState, action: SnakeAction): SnakeState {
  return match(action, {
    change: ({ direction }) => ({
      ...state,
      direction,
      going: state.going || direction === state.direction,
    }),
    next: () => {
      if (!state.going || state.dead) return state;

      const [tail, ...body] = state.snake;
      const head = state.snake[state.snake.length - 1];

      const newHead =
        state.direction === "up"
          ? { x: head.x, y: head.y - 1 }
          : state.direction === "down"
          ? { x: head.x, y: head.y + 1 }
          : state.direction === "left"
          ? { x: head.x - 1, y: head.y }
          : { x: head.x + 1, y: head.y };

      const hitWall =
        newHead.x < 0 ||
        newHead.y < 0 ||
        newHead.x >= MAX_X ||
        newHead.y >= MAX_Y;

      const hitSelf = state.snake.some(
        (vec) => vec.x === newHead.x && vec.y === newHead.y
      );

      const dead = hitWall || hitSelf;

      if (dead) {
        return {
          ...state,
          going: false,
          dead,
        };
      }

      const grow = newHead.x === state.food.x && newHead.y === state.food.y;
      const newFood = grow ? generateFood(state.snake) : state.food;
      const newSnake = grow ? [tail, ...body, newHead] : [...body, newHead];

      return {
        ...state,
        snake: newSnake,
        food: newFood,
      };
    },
  });
}

const SnakePage: FC = () => {
  const [snake, dispatch] = useReducer(snakeReducer, {
    snake: [{ x: 0, y: 0 }],
    direction: "right",
    food: { x: 10, y: 10 },
    going: false,
    dead: false,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch({ kind: "next" });
    }, 100);

    const keydown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowUp":
          dispatch({ kind: "change", direction: "up" });
          break;
        case "ArrowDown":
          dispatch({ kind: "change", direction: "down" });
          break;
        case "ArrowLeft":
          dispatch({ kind: "change", direction: "left" });
          break;
        case "ArrowRight":
          dispatch({ kind: "change", direction: "right" });
          break;
      }
    };

    window.addEventListener("keydown", keydown);

    return () => {
      clearInterval(interval);
      window.removeEventListener("keydown", keydown);
    };
  }, []);

  return (
    <>
      <div className="grid grid-cols-[repeat(20,minmax(0,1fr))] grid-rows-[repeat(20,minmax(0,1fr))]">
        {Array.from({ length: MAX_Y }).map((_, y) =>
          Array.from({ length: MAX_X }).map((_, x) => (
            <div
              key={`${x}-${y}`}
              className="w-4 h-4 border transition-all duration-100 border-gray-500/20 
            data-[snake=false]:data-[food=true]:bg-chart data-[dead=true]:duration-500
            data-[snake=true]:bg-zinc-950 data-[snake=true]:data-[dead=true]:!bg-rose-950"
              data-snake={snake.snake.some((vec) => vec.x === x && vec.y === y)}
              data-food={snake.food.x === x && snake.food.y === y}
              data-dead={snake.dead}
            />
          ))
        )}
      </div>
      <div className="md:hidden flex flex-col my-3 items-center w-40 h-24 justify-around">
        <button
          className="bg-zinc-50 text-black py-1 px-3 rounded-md shadow active:scale-95"
          onClick={() => dispatch({ kind: "change", direction: "up" })}
        >
          &uarr;
        </button>
        <div className="flex flex-row items-center w-full justify-around">
          <button
            className="bg-zinc-50 text-black py-1 px-3 rounded-md shadow active:scale-95"
            onClick={() => dispatch({ kind: "change", direction: "left" })}
          >
            &larr;
          </button>
          <button
            className="bg-zinc-50 text-black py-1 px-3 rounded-md shadow active:scale-95"
            onClick={() => dispatch({ kind: "change", direction: "right" })}
          >
            &rarr;
          </button>
        </div>
        <button
          className="bg-zinc-50 text-black py-1 px-3 rounded-md shadow active:scale-95"
          onClick={() => dispatch({ kind: "change", direction: "down" })}
        >
          &darr;
        </button>
      </div>
    </>
  );
};

export default SnakePage;
