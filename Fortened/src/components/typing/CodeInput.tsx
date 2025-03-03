import React, { useRef } from 'react';
import { AlertTriangle } from 'lucide-react';

interface CodeInputProps {
  input: string;
  handleInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  isTestActive: boolean;
  isTestComplete: boolean;
  cheatingDetected: boolean;
  resetTest: () => void;
}

const CodeInput: React.FC<CodeInputProps> = ({
  input,
  handleInputChange,
  isTestActive,
  isTestComplete,
  cheatingDetected,
  resetTest
}) => {
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Prevent copy/paste in the textarea
  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
  };

  // Prevent copy from the input
  const handleCopy = (e: React.ClipboardEvent) => {
    e.preventDefault();
  };

  // Prevent context menu
  const handleContextMenu = (e: React.MouseEvent) => {
    if (isTestActive) {
      e.preventDefault();
    }
  };

  if (cheatingDetected) {
    return (
      <div className="mb-6 bg-red-900/30 border border-red-700 rounded-lg p-4 text-center">
        <AlertTriangle className="h-10 w-10 text-red-500 mx-auto mb-2" />
        <h3 className="text-xl font-bold text-white mb-2">Cheating Detected!</h3>
        <p className="text-gray-300 mb-4">
          Our system detected suspicious activity that violates the test rules.
          Copy-pasting or using automation tools is not allowed.
        </p>
        <button
          onClick={resetTest}
          className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-medium transition-all"
        >
          Try Again Honestly
        </button>
      </div>
    );
  }

  return (
    <div className="mb-6">
      <textarea
        ref={inputRef}
        value={input}
        onChange={handleInputChange}
        onPaste={handlePaste}
        onCopy={handleCopy}
        onContextMenu={handleContextMenu}
        disabled={!isTestActive || isTestComplete}
        className={`w-full h-32 p-4 bg-gray-900 text-gray-300 font-mono text-sm rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-emerald-500 border border-gray-700 ${!isTestActive && !isTestComplete ? 'cursor-not-allowed' : ''
          }`}
        placeholder={isTestActive ? "Start typing..." : "Click 'Start Test' to begin"}
        spellCheck="false"
      />
    </div>
  );
};

export default CodeInput;