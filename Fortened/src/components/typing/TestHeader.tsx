import React from 'react';
import { Timer, Clock } from 'lucide-react';

interface TestHeaderProps {
  language: string;
  difficulty: string;
  selectedTime: number;
  remainingTime: number | null;
  isTestActive: boolean;
  isTestComplete: boolean;
  handleDifficultyChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  handleTimeChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const TestHeader: React.FC<TestHeaderProps> = ({
  language,
  difficulty,
  selectedTime,
  remainingTime,
  isTestActive,
  isTestComplete,
  handleDifficultyChange,
  handleTimeChange
}) => {
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const timeOptions = [30, 60, 120, 300];

  return (
    <div className="bg-gray-900 px-6 py-4 border-b border-gray-700 flex flex-col md:flex-row md:justify-between items-center space-y-4 md:space-y-0">
      <div className="flex flex-col md:flex-row items-center text-center md:text-left">
        <div className="flex items-center mb-2 md:mb-0">
          <Timer className="h-5 w-5 text-emerald-400 mr-2" />
          <h3 className="text-lg font-semibold text-white">
            Coding Speed Test - {language}
          </h3>
        </div>
        {isTestActive && remainingTime !== null && (
          <div className="ml-0 md:ml-4 text-white font-medium flex items-center">
            <Clock className="h-4 w-4 mr-1 text-indigo-400" />
            <span className={`${remainingTime < 10 ? 'text-red-400 animate-pulse' : 'text-indigo-400'}`}>
              {formatTime(remainingTime)}
            </span>
          </div>
        )}
      </div>
      <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-3 w-full md:w-auto">
        {!isTestActive && !isTestComplete && (
          <>
            <select
              value={difficulty}
              onChange={handleDifficultyChange}
              className="bg-gray-700 text-gray-200 rounded px-3 py-2 text-sm border border-gray-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 w-full md:w-auto"
            >
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
            <select
              value={selectedTime}
              onChange={handleTimeChange}
              className="bg-gray-700 text-gray-200 rounded px-3 py-2 text-sm border border-gray-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 w-full md:w-auto"
            >
              {timeOptions.map(time => (
                <option key={time} value={time}>
                  {time === 60 ? '1 minute' : time === 120 ? '2 minutes' : time === 300 ? '5 minutes' : `${time} seconds`}
                </option>
              ))}
            </select>
          </>
        )}
      </div>
    </div>
  );
};

export default TestHeader;
