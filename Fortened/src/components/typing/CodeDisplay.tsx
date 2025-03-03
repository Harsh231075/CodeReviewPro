import React, { useRef } from 'react';
import { Shield } from 'lucide-react';

interface CodeDisplayProps {
  targetText: string;
  input: string;
  isTestActive: boolean;
  difficulty: string;
}

const CodeDisplay: React.FC<CodeDisplayProps> = ({
  targetText,
  input,
  isTestActive,
  difficulty
}) => {
  const codeDisplayRef = useRef<HTMLDivElement>(null);

  // Prevent copy from the code display
  const handleCopy = (e: React.ClipboardEvent) => {
    e.preventDefault();
  };

  // Prevent context menu
  const handleContextMenu = (e: React.MouseEvent) => {
    if (isTestActive) {
      e.preventDefault();
    }
  };

  const renderCharacters = () => {
    return targetText.split('').map((char, index) => {
      let className = 'text-gray-500';

      if (index < input.length) {
        className = input[index] === char ? 'text-green-400' : 'text-red-400';
      }

      return (
        <span key={index} className={className}>
          {char === ' ' ? '\u00A0' : char}
        </span>
      );
    });
  };

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <div className="text-white font-medium flex items-center">
          <span className={`h-4 w-4 mr-1 inline-block rounded-full ${difficulty === 'beginner' ? 'bg-green-400' :
              difficulty === 'intermediate' ? 'bg-yellow-400' : 'bg-red-400'
            }`}></span>
          {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)} Level
        </div>
      </div>
      <div
        ref={codeDisplayRef}
        className="font-mono text-sm bg-gray-900 p-4 rounded-lg overflow-x-auto max-h-80"
        onCopy={handleCopy}
        onContextMenu={handleContextMenu}
      >
        <pre className="whitespace-pre-wrap">{renderCharacters()}</pre>
      </div>
      {isTestActive && (
        <div className="mt-2 flex items-center text-amber-400 text-sm">
          <Shield className="h-4 w-4 mr-1" />
          Anti-cheat protection active: Copy-paste is disabled
        </div>
      )}
    </div>
  );
};

export default CodeDisplay;