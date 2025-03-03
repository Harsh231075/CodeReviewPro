import React from 'react';
import { motion } from 'framer-motion';
import { Timer, RefreshCw, Trophy, BarChart2, Award } from 'lucide-react';

interface TestControlsProps {
  startTest: () => void;
  resetTest: () => void;
  changeSnippet: () => void;
  showCertificate: () => void;
  isTestActive: boolean;
  isTestComplete: boolean;
  cheatingDetected: boolean;
  userName: string;
  wpm: number | null;
  accuracy: number | null;
  level: string;
}

const TestControls: React.FC<TestControlsProps> = ({
  startTest,
  resetTest,
  changeSnippet,
  showCertificate,
  isTestActive,
  isTestComplete,
  cheatingDetected,
  userName,
  wpm,
  accuracy,
  level
}) => {
  // Minimum percentage of code that must be completed to get certificate
  const completionThreshold = 80;
  const isEligibleForCertificate = accuracy !== null && accuracy >= completionThreshold;

  return (
    <div className="flex flex-col md:flex-row flex-wrap gap-4 justify-between items-center">
      <div className="flex flex-wrap gap-2 w-full md:w-auto justify-center md:justify-start">
        <button
          onClick={startTest}
          disabled={isTestActive || !userName.trim()}
          className={`px-4 py-2 rounded-lg font-medium flex items-center transition-all ${isTestActive || !userName.trim()
            ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
            : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg hover:shadow-emerald-500/30'
            }`}
        >
          {isTestActive ? (
            <>
              <Timer className="mr-2 h-4 w-4 animate-pulse" />
              Test in Progress...
            </>
          ) : (
            <>
              <Timer className="mr-2 h-4 w-4" />
              {isTestComplete ? 'Restart Test' : 'Start Test'}
            </>
          )}
        </button>

        <button
          onClick={resetTest}
          disabled={isTestActive}
          className={`px-4 py-2 rounded-lg font-medium flex items-center transition-all ${isTestActive
            ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
            : 'bg-gray-700 hover:bg-gray-600 text-white'
            }`}
        >
          Reset
        </button>

        <button
          onClick={changeSnippet}
          disabled={isTestActive}
          className={`px-4 py-2 rounded-lg text-sm flex items-center transition-all ${isTestActive
            ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
            : 'bg-gray-700 hover:bg-gray-600 text-white'
            }`}
        >
          <RefreshCw className="h-4 w-4 mr-1" />
          Change Snippet
        </button>

        {isTestComplete && !cheatingDetected && isEligibleForCertificate && (
          <button
            onClick={showCertificate}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-all flex items-center shadow-lg hover:shadow-indigo-500/30"
          >
            <Trophy className="mr-2 h-4 w-4" />
            View Certificate
          </button>
        )}
      </div>

      {isTestComplete && !cheatingDetected && wpm !== null && accuracy !== null && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-wrap gap-3 justify-center md:justify-start"
        >
          <div className="flex items-center bg-gray-900 px-3 py-2 rounded-lg">
            <BarChart2 className="h-5 w-5 text-emerald-400 mr-2" />
            <span className="text-white font-medium">WPM: <span className="text-emerald-400">{wpm}</span></span>
          </div>
          <div className="flex items-center bg-gray-900 px-3 py-2 rounded-lg">
            <Award className="h-5 w-5 text-indigo-400 mr-2" />
            <span className="text-white font-medium">Accuracy: <span className="text-indigo-400">{accuracy}%</span></span>
          </div>
          <div className="flex items-center bg-gray-900 px-3 py-2 rounded-lg">
            <Trophy className="h-5 w-5 text-yellow-400 mr-2" />
            <span className="text-white font-medium">Level: <span className="text-yellow-400">{level}</span></span>
          </div>

          {!isEligibleForCertificate && (
            <div className="w-full mt-2 text-left md:text-center text-amber-400 text-sm">
              write code exactly same with equal space and Complete at least {completionThreshold}% of the code to earn a certificate
            </div>

          )}
        </motion.div>
      )}
    </div>
  );
};

export default TestControls;