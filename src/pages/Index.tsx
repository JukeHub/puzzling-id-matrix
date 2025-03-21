
import React, { useState, useEffect } from "react";
import Board from "@/components/Board";
import TargetDisplay from "@/components/TargetDisplay";
import SuccessModal from "@/components/SuccessModal";
import { Button } from "@/components/ui/button";
import { Shuffle, RotateCcw } from "lucide-react";
import { 
  PuzzleState, 
  isWinningState, 
  generateShuffledPuzzle, 
  TARGET_SEQUENCE 
} from "@/utils/puzzleUtils";
import { toast } from "sonner";

const Index = () => {
  const [puzzleState, setPuzzleState] = useState<PuzzleState>([]);
  const [isWin, setIsWin] = useState(false);
  const [moveCount, setMoveCount] = useState(0);
  const [isInitialized, setIsInitialized] = useState(false);
  
  // Initialize or reset the puzzle
  const initializePuzzle = () => {
    const newPuzzleState = generateShuffledPuzzle();
    setPuzzleState(newPuzzleState);
    setIsWin(false);
    setMoveCount(0);
    
    if (isInitialized) {
      toast.success("Puzzle shuffled");
    }
    setIsInitialized(true);
  };
  
  // Initialize the puzzle on first render
  useEffect(() => {
    initializePuzzle();
  }, []);
  
  // Check for win condition when puzzle state changes
  useEffect(() => {
    if (puzzleState.length === 0) return;
    
    if (isWinningState(puzzleState)) {
      setIsWin(true);
    }
  }, [puzzleState]);
  
  // Handle tile movement
  const handleMove = () => {
    setMoveCount(prev => prev + 1);
  };
  
  return (
    <div className="min-h-screen flex flex-col items-center px-4 py-12 md:py-16">
      <div className="w-full max-w-md mx-auto">
        <header className="text-center mb-8 animate-fade-in">
          <h1 className="text-xs font-medium uppercase tracking-wider text-primary/80 mb-1">
            Student ID Puzzle
          </h1>
          <h2 className="text-3xl font-medium">Number Puzzle</h2>
        </header>
        
        <TargetDisplay />
        
        <div className="mb-8 animate-fade-in" style={{ animationDelay: "100ms" }}>
          <Board 
            puzzleState={puzzleState}
            setPuzzleState={setPuzzleState}
            onMove={handleMove}
          />
        </div>
        
        <div className="flex items-center justify-between animate-fade-in" 
             style={{ animationDelay: "200ms" }}>
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm"
              className="rounded-full w-10 h-10 p-0 tile-shadow"
              onClick={initializePuzzle}
              aria-label="Shuffle puzzle"
            >
              <Shuffle className="h-4 w-4" />
            </Button>
            
            <Button 
              variant="ghost" 
              size="sm"
              className="rounded-full"
              onClick={() => {
                setPuzzleState([
                  [TARGET_SEQUENCE[0], TARGET_SEQUENCE[1], TARGET_SEQUENCE[2]],
                  [TARGET_SEQUENCE[3], TARGET_SEQUENCE[4], TARGET_SEQUENCE[5]],
                  [TARGET_SEQUENCE[6], TARGET_SEQUENCE[7], null]
                ]);
                setMoveCount(0);
                toast.info("Puzzle has been solved for you");
              }}
              aria-label="Solve puzzle"
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              Solve
            </Button>
          </div>
          
          <div className="text-sm font-medium">
            Moves: <span className="text-primary">{moveCount}</span>
          </div>
        </div>
      </div>
      
      {isWin && (
        <SuccessModal moveCount={moveCount} onReset={initializePuzzle} />
      )}
    </div>
  );
};

export default Index;
