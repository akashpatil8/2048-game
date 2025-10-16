export const arraysAreEqual = (a, b) =>
  a.length === b.length && a.every((v, i) => v === b[i]);

export const createEmptyGrid = (size) => {
  return Array.from({ length: size }, () => Array(size).fill(0));
};

export const isGameOver = (grid) => {
  const N = grid.length;
  for (let r = 0; r < N; r++) {
    for (let c = 0; c < N; c++) {
      if (grid[r][c] === 0) return false;
      if (c < N - 1 && grid[r][c] === grid[r][c + 1]) return false;
      if (r < N - 1 && grid[r][c] === grid[r + 1][c]) return false;
    }
  }
  return true;
};

export const isGameWon = (grid) => {
  for (let row of grid) {
    if (row.includes(2048)) return true;
  }
  return false;
};

export const addRandomNumber = (grid) => {
  const clone = grid.map((r) => r.slice());
  let isAdded = false;
  let isGridFull;

  while (!isAdded) {
    if (isGridFull) {
      break;
    }

    const randR = Math.floor(Math.random() * grid.length);
    const randY = Math.floor(Math.random() * grid.length);

    if (clone[randR][randY] === 0) {
      clone[randR][randY] = Math.random() < 0.9 ? 2 : 4;
      isAdded = true;
    }
  }
  return clone;
};

export const swipeLeft = (grid) => {
  const N = grid.length;

  const newGrid = grid.map((row) => row.slice());
  let moved = false;
  let scoreGained = 0;

  for (let r = 0; r < N; r++) {
    let row = newGrid[r].filter((val) => val !== 0);

    for (let c = 0; c < row.length - 1; c++) {
      if (row[c] === row[c + 1]) {
        row[c] *= 2;
        scoreGained += row[c];
        row[c + 1] = 0;
        c++;
      }
    }

    row = row.filter((val) => val !== 0);

    while (row.length < N) row.push(0);

    if (!arraysAreEqual(row, newGrid[r])) moved = true;

    newGrid[r] = row;
  }

  if (moved) {
    const updatedGrid = addRandomNumber(newGrid);
    return { grid: updatedGrid, scoreGained };
  }

  return { grid: newGrid, scoreGained: 0 };
};
export const swipeRight = (grid) => {
  const N = grid.length;

  const newGrid = grid.map((row) => row.slice());
  let moved = false;
  let scoreGained = 0;

  for (let r = 0; r < N; r++) {
    let row = [...newGrid[r]].reverse().filter((val) => val !== 0);

    for (let c = 0; c < row.length - 1; c++) {
      if (row[c] === row[c + 1]) {
        row[c] *= 2;
        scoreGained += row[c];
        row[c + 1] = 0;
        c++;
      }
    }

    row = row.filter((val) => val !== 0);
    while (row.length < N) row.push(0);
    row.reverse();

    if (!arraysAreEqual(row, newGrid[r])) moved = true;

    newGrid[r] = row;
  }

  if (moved) {
    const updatedGrid = addRandomNumber(newGrid);
    return { grid: updatedGrid, scoreGained };
  }

  return { grid: newGrid, scoreGained: 0 };
};
export const swipeUp = (grid) => {
  const N = grid.length;
  const newGrid = grid.map((row) => row.slice());
  let moved = false;
  let scoreGained = 0;

  for (let c = 0; c < N; c++) {
    let col = [];
    for (let r = 0; r < N; r++) {
      if (newGrid[r][c] !== 0) col.push(newGrid[r][c]);
    }

    for (let i = 0; i < col.length - 1; i++) {
      if (col[i] === col[i + 1]) {
        col[i] *= 2;
        scoreGained += col[i];
        col[i + 1] = 0;
        i++;
      }
    }

    col = col.filter((val) => val !== 0);
    while (col.length < N) col.push(0);

    for (let r = 0; r < N; r++) {
      if (newGrid[r][c] !== col[r]) moved = true;
      newGrid[r][c] = col[r];
    }
  }

  if (moved) {
    const updatedGrid = addRandomNumber(newGrid);
    return { grid: updatedGrid, scoreGained };
  }

  return { grid: newGrid, scoreGained: 0 };
};
export const swipeDown = (grid) => {
  const N = grid.length;
  const newGrid = grid.map((row) => row.slice());
  let moved = false;
  let scoreGained = 0;

  for (let c = 0; c < N; c++) {
    let col = [];
    for (let r = N - 1; r >= 0; r--) {
      if (newGrid[r][c] !== 0) col.push(newGrid[r][c]);
    }

    for (let i = 0; i < col.length - 1; i++) {
      if (col[i] === col[i + 1]) {
        col[i] *= 2;
        scoreGained += col[i];
        col[i + 1] = 0;
        i++;
      }
    }

    col = col.filter((val) => val !== 0);
    while (col.length < N) col.push(0);

    for (let r = N - 1, i = 0; r >= 0; r--, i++) {
      if (newGrid[r][c] !== col[i]) moved = true;
      newGrid[r][c] = col[i];
    }
  }

  if (moved) {
    const updatedGrid = addRandomNumber(newGrid);
    return { grid: updatedGrid, scoreGained };
  }

  return { grid: newGrid, scoreGained: 0 };
};

export const getTileColors = (num) => {
  switch (num) {
    case 2:
      return { bgColor: "#eee4da", textColor: "#776e65" };
    case 4:
      return { bgColor: "#ede0c8", textColor: "#776e65" };
    case 8:
      return { bgColor: "#f2b179", textColor: "#f9f6f2" };
    case 16:
      return { bgColor: "#f59563", textColor: "#f9f6f2" };
    case 32:
      return { bgColor: "#f67c5f", textColor: "#f9f6f2" };
    case 64:
      return { bgColor: "#f65e3b", textColor: "#f9f6f2" };
    case 128:
      return { bgColor: "#edcf72", textColor: "#f9f6f2" };
    case 256:
      return { bgColor: "#edc850", textColor: "#f9f6f2" };
    case 512:
      return { bgColor: "#edc53f", textColor: "#f9f6f2" };
    case 1024:
      return { bgColor: "#edc22e", textColor: "#f9f6f2" };
    case 2048:
      return { bgColor: "#3c3a32", textColor: "#f9f6f2" };
    default:
      return { bgColor: "#cdc1b4", textColor: "#776e65" };
  }
};
