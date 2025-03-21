
import React from "react";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

interface SuccessModalProps {
  moveCount: number;
  onReset: () => void;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ moveCount, onReset }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50 px-4">
      <div 
        className="bg-background rounded-2xl p-6 shadow-lg max-w-md w-full mx-auto
                  animate-scale-in flex flex-col items-center text-center"
      >
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
          <Sparkles className="w-8 h-8 text-primary animate-pulse-soft" />
        </div>
        <h2 className="text-2xl font-semibold mb-2">Puzzle Solved!</h2>
        <p className="text-muted-foreground mb-6">
          You completed the puzzle in {moveCount} {moveCount === 1 ? 'move' : 'moves'}.
        </p>
        <Button 
          onClick={onReset}
          size="lg" 
          className="px-8 rounded-xl"
        >
          Play Again
        </Button>
      </div>
    </div>
  );
};

export default SuccessModal;
