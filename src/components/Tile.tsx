
import React, { useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Position } from "@/utils/puzzleUtils";

interface TileProps {
  value: number | null;
  position: Position;
  index: number;
  isMovable: boolean;
  onMove: () => void;
  animationDirection?: { x: number; y: number } | null;
}

const Tile: React.FC<TileProps> = ({
  value,
  position,
  index,
  isMovable,
  onMove,
  animationDirection
}) => {
  const tileRef = useRef<HTMLDivElement>(null);
  
  // Apply animation when the tile moves
  useEffect(() => {
    if (!animationDirection || !tileRef.current) return;
    
    const { x, y } = animationDirection;
    const tileSize = tileRef.current.offsetWidth;
    
    // Set CSS variables for animation
    tileRef.current.style.setProperty('--slide-distance', `${x * tileSize}px`);
    
    // Add animation class
    if (x !== 0) {
      tileRef.current.classList.add('animate-slide');
    } else if (y !== 0) {
      tileRef.current.style.setProperty('--slide-distance', `${y * tileSize}px`);
      tileRef.current.classList.add('animate-slide-up');
    }
    
    // Remove animation class after animation completes
    const onAnimationEnd = () => {
      if (tileRef.current) {
        tileRef.current.classList.remove('animate-slide', 'animate-slide-up');
        tileRef.current.style.removeProperty('--slide-distance');
      }
    };
    
    tileRef.current.addEventListener('animationend', onAnimationEnd);
    return () => {
      tileRef.current?.removeEventListener('animationend', onAnimationEnd);
    };
  }, [animationDirection]);

  if (value === null) {
    return (
      <div 
        className="tile empty-tile" 
        aria-label="Empty space"
      />
    );
  }

  return (
    <button
      ref={tileRef}
      className={cn(
        "tile", 
        isMovable && "cursor-pointer hover:bg-secondary/70",
        !isMovable && "opacity-95 cursor-default"
      )}
      onClick={onMove}
      disabled={!isMovable}
      aria-label={`Tile ${value}`}
    >
      {value}
    </button>
  );
};

export default Tile;
