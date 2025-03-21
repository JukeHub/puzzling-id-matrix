
// Student ID: 801450236 (last digit removed for 8 tiles)
export const TARGET_SEQUENCE = [8, 0, 1, 4, 5, 0, 2, 3];

export type Position = { row: number; col: number };
export type PuzzleState = (number | null)[][];

// Check if the puzzle is in the winning state
export const isWinningState = (puzzleState: PuzzleState): boolean => {
  const flattened = puzzleState.flat().filter((num) => num !== null);
  return TARGET_SEQUENCE.every((num, index) => num === flattened[index]);
};

// Check if a tile can move (adjacent to the empty space)
export const canMoveTile = (
  puzzleState: PuzzleState,
  position: Position
): boolean => {
  const { row, col } = position;
  
  // Check all four directions (up, right, down, left)
  return (
    (row > 0 && puzzleState[row - 1][col] === null) || // Up
    (col < puzzleState[0].length - 1 && puzzleState[row][col + 1] === null) || // Right
    (row < puzzleState.length - 1 && puzzleState[row + 1][col] === null) || // Down
    (col > 0 && puzzleState[row][col - 1] === null) // Left
  );
};

// Get the position of the empty tile
export const findEmptyTilePosition = (puzzleState: PuzzleState): Position => {
  for (let row = 0; row < puzzleState.length; row++) {
    for (let col = 0; col < puzzleState[row].length; col++) {
      if (puzzleState[row][col] === null) {
        return { row, col };
      }
    }
  }
  throw new Error("No empty tile found in the puzzle");
};

// Move a tile to the empty space if possible
export const moveTile = (
  puzzleState: PuzzleState,
  position: Position
): PuzzleState => {
  const { row, col } = position;
  
  if (!canMoveTile(puzzleState, position)) {
    return puzzleState;
  }
  
  const emptyPos = findEmptyTilePosition(puzzleState);
  
  // Create a deep copy of the puzzle state
  const newPuzzleState = puzzleState.map(row => [...row]);
  
  // Swap the tile with the empty space
  newPuzzleState[emptyPos.row][emptyPos.col] = puzzleState[row][col];
  newPuzzleState[row][col] = null;
  
  return newPuzzleState;
};

// Generate a valid, shuffled puzzle state
export const generateShuffledPuzzle = (): PuzzleState => {
  // Start with the solved state
  const solvedState: PuzzleState = [
    [TARGET_SEQUENCE[0], TARGET_SEQUENCE[1], TARGET_SEQUENCE[2]],
    [TARGET_SEQUENCE[3], TARGET_SEQUENCE[4], TARGET_SEQUENCE[5]],
    [TARGET_SEQUENCE[6], TARGET_SEQUENCE[7], null]
  ];
  
  // Perform a series of random valid moves to shuffle
  let currentState = solvedState;
  let emptyPos = { row: 2, col: 2 };
  
  // Make enough random moves to sufficiently shuffle the puzzle
  // (at least 100 moves to ensure proper shuffling)
  for (let i = 0; i < 200; i++) {
    const possibleMoves: Position[] = [];
    
    // Check all four adjacent positions
    const directions = [
      { row: -1, col: 0 }, // Up
      { row: 0, col: 1 },  // Right
      { row: 1, col: 0 },  // Down
      { row: 0, col: -1 }  // Left
    ];
    
    directions.forEach(dir => {
      const newRow = emptyPos.row + dir.row;
      const newCol = emptyPos.col + dir.col;
      
      if (
        newRow >= 0 && newRow < 3 &&
        newCol >= 0 && newCol < 3
      ) {
        possibleMoves.push({ row: newRow, col: newCol });
      }
    });
    
    // Choose a random move from possible moves
    const randomMove = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
    
    // Swap the tile with the empty space
    currentState = moveTile(currentState, randomMove);
    emptyPos = findEmptyTilePosition(currentState);
  }
  
  // Ensure the shuffled puzzle is not already in the winning state
  if (isWinningState(currentState)) {
    return generateShuffledPuzzle(); // Rare case - try again
  }
  
  return currentState;
};

// Get the direction of movement for animation
export const getMovementDirection = (
  fromPos: Position,
  toPos: Position
): { x: number; y: number } => {
  return {
    x: toPos.col - fromPos.col,
    y: toPos.row - fromPos.row
  };
};
