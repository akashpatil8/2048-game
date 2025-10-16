# 2048 Game

A simple and fun web-based implementation of the classic **2048 puzzle game** built using React and Tailwind CSS.

---

## Link

- https://2048-game-mauve-one.vercel.app

---

## Table of Contents

- [Gameplay Instructions](#gameplay-instructions)
- [Installation](#installation)
- [Running the Game](#running-the-game)
- [Implementation Details](#implementation-details)
- [Features](#features)
- [Future Improvements](#future-improvements)
- [Author](#author)

---

## 🧩 Gameplay Instructions

- Use the **arrow keys** (↑ ↓ ← →) to move the tiles.
- When two tiles with the same number touch, they **merge into one**.
- Your goal is to **create a tile with the number 2048**.
- After each move, a new tile (2 or 4) appears in an empty spot.
- The game ends when no more moves are possible.

---

## ⚙️ Installation

Clone the repository and install dependencies.

```bash
git clone https://github.com/akashpatil8/2048-game.git
cd 2048-game
npm install
```

---

## 🚀 Running the Game

To start the game locally:

```bash
npm run dev
```

Then open your browser and navigate to:

```
http://localhost:5173
```

---

## 🧠 Implementation Details

- **Framework:** React (Vite)
- **Styling:** Tailwind CSS
- **State Management:** React Hooks (`useState`, `useEffect`)
- **Game Logic:**
  - Handles movement, merging, and spawning of tiles.
  - Prevents page scrolling when using arrow keys.
  - Responsive UI that adjusts for mobile and desktop screens.
- **Winning & Game Over Conditions:**
  - Detects when the player reaches **2048** (win).
  - Detects when **no valid moves** are possible (game over).

---

## 🎮 Features

- Smooth animations for tile movement and merging.
- Dynamic tile coloring based on tile value.
- Keyboard event handling for gameplay.
- Automatic game-over and win detection (coming soon).

---

## 🧠 Future Improvements

- Add animations for tile movement and merging
- Add sound effects for tile merges
- Save high scores using Local Storage
- Add support for larger boards (8×8, 10×10)
- Dark mode toggle

## 🧑‍💻 Author

Developed by **Akash Patil** — Full Stack Developer.
