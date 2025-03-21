
import React, { useState, useEffect } from "react";
import Tile from "./Tile";
import { 
  PuzzleState, 
  Position, 
  canMoveTile, 
  moveTile, 
  findEmptyTilePosition,
  getMovementDirection
} from "@/utils/puzzleUtils";

interface BoardProps {
  puzzleState: PuzzleState;
  setPuzzleState: React.Dispatch<React.SetStateAction<PuzzleState>>;
  onMove: () => void;
}

const Board: React.FC<BoardProps> = ({ 
  puzzleState, 
  setPuzzleState,
  onMove
}) => {
  const [animatingTile, setAnimatingTile] = useState<{
    position: Position;
    direction: { x: number; y: number };
  } | null>(null);

  const handleTileClick = (position: Position) => {
    if (canMoveTile(puzzleState, position)) {
      const emptyPos = findEmptyTilePosition(puzzleState);
      
      // Calculate animation direction
      const direction = getMovementDirection(position, emptyPos);
      
      // Set animating tile before updating the state
      setAnimatingTile({ position, direction });
      
      // Update move count
      onMove();
      
      // Set a short timeout to allow the animation to complete
      setTimeout(() => {
        setPuzzleState(moveTile(puzzleState, position));
        setAnimatingTile(null);
      }, 200); // Slightly shorter than animation duration for smooth transition
    }
  };

  return (
    <div className="grid grid-cols-3 gap-3 md:gap-4 w-full max-w-md mx-auto">
      {puzzleState.flatMap((row, rowIndex) =>
        row.map((value, colIndex) => {
          const position = { row: rowIndex, col: colIndex };
          const isMovable = canMoveTile(puzzleState, position);
          const index = rowIndex * 3 + colIndex;
          
          const isAnimating = 
            animatingTile !== null && 
            animatingTile.position.row === rowIndex && 
            animatingTile.position.col === colIndex;
          
          return (
            <Tile
              key={`${rowIndex}-${colIndex}`}
              value={value}
              position={position}
              index={index}
              isMovable={isMovable}
              onMove={() => handleTileClick(position)}
              animationDirection={isAnimating ? animatingTile.direction : null}
            />
          );
        })
      )}
    </div>
  );
};

export default Board;
