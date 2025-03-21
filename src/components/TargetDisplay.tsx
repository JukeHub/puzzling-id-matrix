
import React from "react";
import { TARGET_SEQUENCE } from "@/utils/puzzleUtils";

const TargetDisplay: React.FC = () => {
  return (
    <div className="flex flex-col items-center text-center mt-8 mb-10 animate-fade-in">
      <p className="text-xs font-medium uppercase tracking-wide text-foreground/50 mb-2">
        Target Sequence
      </p>
      <div className="flex gap-2 justify-center">
        {TARGET_SEQUENCE.map((num, index) => (
          <div 
            key={index}
            className="w-8 h-8 flex items-center justify-center rounded-md
                     bg-secondary/80 text-foreground/70 font-medium text-sm"
          >
            {num}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TargetDisplay;
