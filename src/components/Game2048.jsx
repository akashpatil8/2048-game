import { useEffect, useState } from "react";

import {
  addRandomNumber,
  createEmptyGrid,
  isGameOver,
  isGameWon,
  swipeDown,
  swipeLeft,
  swipeRight,
  swipeUp,
} from "../utils/helper";
import { useArrowKeys } from "../hooks/useArrowKeys";
import Block from "./Block";

export default function Game2048() {
  const [grid, setGrid] = useState(createEmptyGrid());

  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [gridSize, setGridSize] = useState(4);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);

  const initialiseGame = (size = gridSize) => {
    let grid = createEmptyGrid(size);
    grid = addRandomNumber(grid);
    grid = addRandomNumber(grid);
    return grid;
  };

  const resetGame = () => {
    setGrid(initialiseGame());
    setScore(0);
    setGameOver(false);
  };

  useEffect(() => {
    setGrid(initialiseGame(gridSize));
  }, []);

  useEffect(() => {
    resetGame();
  }, [gridSize]);

  const handleSwipe = (direction) => {
    let result;
    switch (direction) {
      case "left":
        result = swipeLeft(grid);
        break;
      case "right":
        result = swipeRight(grid);
        break;
      case "up":
        result = swipeUp(grid);
        break;
      case "down":
        result = swipeDown(grid);
        break;
      default:
        return;
    }

    const newGrid = result.grid;
    const gained = result.scoreGained;

    setGrid(newGrid);
    setScore((prev) => prev + gained);
    setHighScore((prev) => (prev < score + gained ? score + gained : prev));

    if (isGameWon(newGrid)) {
      setGameWon(true);
    } else if (isGameOver(newGrid)) {
      setGameOver(true);
    }
  };

  const handleGridSizeChange = (e) => {
    setGridSize(Number(e.target.value));
  };

  useArrowKeys({
    left: () => handleSwipe("left"),
    right: () => handleSwipe("right"),
    up: () => handleSwipe("up"),
    down: () => handleSwipe("down"),
  });

  console.log(gameOver);

  return (
    <div className="text-center">
      {gameOver && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="rounded-lg bg-white p-8 text-center shadow-lg">
            {gameOver && (
              <h2 className="mb-4 text-2xl font-bold text-red-600">
                Game Over!
              </h2>
            )}
            {gameWon && (
              <h2 className="mb-4 text-2xl font-bold text-green-600">
                Congratulations, you won!
              </h2>
            )}
            <div className="mb-4 flex gap-4">
              <div className="rounded-xl border-2 border-[#8a5cf640] bg-white p-4 text-start shadow-sm">
                <p className="text-sm font-medium text-gray-500 uppercase">
                  Score
                </p>
                <span className="text-2xl font-bold">{score}</span>
              </div>
              <div className="rounded-xl border-2 border-[#e9f65c40] bg-white p-4 text-start shadow-sm">
                <p className="text-sm font-medium text-gray-500 uppercase">
                  Best
                </p>
                <span className="text-2xl font-bold">{highScore}</span>
              </div>
            </div>
            <button
              onClick={resetGame}
              className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white duration-150 hover:bg-blue-700"
            >
              Start New Game
            </button>
          </div>
        </div>
      )}

      <div className="flex justify-between gap-12">
        <div className="text-6xl font-black text-[#8a5cf6b8]">2048</div>
        <div className="flex gap-4">
          <div className="rounded-xl border-2 border-[#8a5cf640] bg-white p-4 text-start shadow-sm">
            <p className="text-sm font-medium text-gray-500 uppercase">Score</p>
            <span className="text-2xl font-bold">{score}</span>
          </div>
          <div className="rounded-xl border-2 border-[#e9f65c40] bg-white p-4 text-start shadow-sm">
            <p className="text-sm font-medium text-gray-500 uppercase">Best</p>
            <span className="text-2xl font-bold">{highScore}</span>
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <label>Grid Size:</label>
          <select
            value={gridSize}
            onChange={handleGridSizeChange}
            className="rounded border px-2 py-1"
          >
            <option value={3}>3 x 3</option>
            <option value={4}>4 x 4</option>
            <option value={5}>5 x 5</option>
            <option value={6}>6 x 6</option>
          </select>
        </div>
        <button
          onClick={resetGame}
          className="cursor-pointer rounded-lg bg-blue-600 px-4 py-2 font-medium text-white duration-100 hover:-translate-y-1.5"
        >
          New Game
        </button>
      </div>
      <div className="bg mx-auto mt-4 flex w-fit flex-col gap-2 rounded-2xl border-3 border-purple-500/50 bg-purple-300/50 p-4">
        {grid.map((r, index) => (
          <div key={index} className="flex gap-2">
            {r.map((c, idx) => (
              <Block key={idx} block={c} />
            ))}
          </div>
        ))}
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2">
        <button
          disabled={gameOver}
          onClick={() => handleSwipe("left")}
          className="rounded-lg border border-purple-500 px-4 py-2 font-medium duration-100 hover:-translate-y-1.5"
        >
          Swipe left
        </button>
        <button
          disabled={gameOver}
          onClick={() => handleSwipe("right")}
          className="rounded-lg border border-purple-500 px-4 py-2 font-medium duration-100 hover:-translate-y-1.5"
        >
          Swipe Right
        </button>
        <button
          disabled={gameOver}
          onClick={() => handleSwipe("up")}
          className="rounded-lg border border-purple-500 px-4 py-2 font-medium duration-100 hover:-translate-y-1.5"
        >
          Swipe Up
        </button>
        <button
          disabled={gameOver}
          onClick={() => handleSwipe("down")}
          className="rounded-lg border border-purple-500 px-4 py-2 font-medium duration-100 hover:-translate-y-1.5"
        >
          Swipe Down
        </button>
      </div>
      <p className="mt-4 text-gray-500">
        You can also use arrow keys ←↑→↓ to play
      </p>
    </div>
  );
}
