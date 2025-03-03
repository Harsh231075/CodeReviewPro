import React, { useState, useEffect, useRef } from 'react';
import codeSnippets from './typing/codeSnippets';
import CodeDisplay from './typing/CodeDisplay';
import CodeInput from './typing/CodeInput';
import TestControls from './typing/TestControls';
import TestHeader from './typing/TestHeader';
import UserNameInput from './typing/UserNameInput';
import Certificate from './typing/Certificate';

// Time options in seconds
const timeOptions = [30, 60, 120, 300];

const TypingTest: React.FC = () => {
  const [userName, setUserName] = useState<string>('');
  const [difficulty, setDifficulty] = useState<'beginner' | 'intermediate' | 'advanced'>('beginner');
  const [currentSnippetIndex, setCurrentSnippetIndex] = useState(0);
  const [selectedTime, setSelectedTime] = useState<number>(60);
  const [remainingTime, setRemainingTime] = useState<number | null>(null);
  const [input, setInput] = useState<string>('');
  const [startTime, setStartTime] = useState<number | null>(null);
  const [endTime, setEndTime] = useState<number | null>(null);
  const [wpm, setWpm] = useState<number | null>(null);
  const [accuracy, setAccuracy] = useState<number | null>(null);
  const [isTestActive, setIsTestActive] = useState<boolean>(false);
  const [isTestComplete, setIsTestComplete] = useState<boolean>(false);
  const [showCertificate, setShowCertificate] = useState<boolean>(false);
  const [level, setLevel] = useState<string>('');
  const [cheatingDetected, setCheatingDetected] = useState<boolean>(false);
  const [lastInputLength, setLastInputLength] = useState<number>(0);
  const [lastInputTime, setLastInputTime] = useState<number>(0);
  const [suspiciousActivity, setSuspiciousActivity] = useState<number>(0);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const currentSnippets = codeSnippets[difficulty];
  const targetText = currentSnippets[currentSnippetIndex].code;

  // Calculate level based on WPM and accuracy
  useEffect(() => {
    if (wpm !== null && accuracy !== null) {
      if (wpm >= 60 && accuracy >= 95) {
        setLevel('Expert');
      } else if (wpm >= 40 && accuracy >= 90) {
        setLevel('Advanced');
      } else if (wpm >= 25 && accuracy >= 80) {
        setLevel('Intermediate');
      } else {
        setLevel('Beginner');
      }
    }
  }, [wpm, accuracy]);

  // Timer countdown effect
  useEffect(() => {
    if (isTestActive && remainingTime !== null) {
      if (remainingTime <= 0) {
        endTest();
        return;
      }

      timerRef.current = setTimeout(() => {
        setRemainingTime(prev => prev !== null ? prev - 1 : null);
      }, 1000);
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [isTestActive, remainingTime]);

  // Auto-submit when code is complete
  useEffect(() => {
    if (isTestActive && input.length > 0 && input === targetText) {
      endTest();
    }
  }, [input, isTestActive, targetText]);

  // Anti-cheating measures
  useEffect(() => {
    if (isTestActive) {
      // Detect suspicious input patterns
      const now = Date.now();
      const timeDiff = now - lastInputTime;
      const lengthDiff = input.length - lastInputLength;

      // If a large chunk of text is added at once (potential paste)
      if (lengthDiff > 5 && timeDiff < 100) {
        setSuspiciousActivity(prev => prev + 1);

        if (suspiciousActivity > 2) {
          setCheatingDetected(true);
          endTest();
        }
      }

      setLastInputLength(input.length);
      setLastInputTime(now);
    }
  }, [input, isTestActive]);

  const startTest = () => {
    if (!userName.trim()) {
      alert('Please enter your name before starting the test.');
      return;
    }

    setInput('');
    setStartTime(Date.now());
    setRemainingTime(selectedTime);
    setEndTime(null);
    setWpm(null);
    setAccuracy(null);
    setIsTestActive(true);
    setIsTestComplete(false);
    setShowCertificate(false);
    setCheatingDetected(false);
    setSuspiciousActivity(0);
    setLastInputLength(0);
    setLastInputTime(Date.now());
  };

  const endTest = () => {
    if (!startTime) return;

    const endTimeValue = Date.now();
    setEndTime(endTimeValue);
    setIsTestActive(false);
    setIsTestComplete(true);

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    // Don't calculate results if cheating was detected
    if (cheatingDetected) {
      return;
    }

    // Calculate WPM
    const timeInMinutes = (endTimeValue - startTime) / 60000;
    const typedCharacters = input.length;
    const calculatedWpm = Math.round((typedCharacters / 5) / timeInMinutes); // Standard: 5 characters = 1 word
    setWpm(calculatedWpm);

    // Calculate accuracy
    let correctChars = 0;
    const inputLength = Math.min(input.length, targetText.length);

    for (let i = 0; i < inputLength; i++) {
      if (input[i] === targetText[i]) {
        correctChars++;
      }
    }

    const calculatedAccuracy = Math.round((correctChars / inputLength) * 100) || 0;
    setAccuracy(calculatedAccuracy);
  };

  const resetTest = () => {
    setInput('');
    setStartTime(null);
    setEndTime(null);
    setRemainingTime(null);
    setWpm(null);
    setAccuracy(null);
    setIsTestActive(false);
    setIsTestComplete(false);
    setShowCertificate(false);
    setCheatingDetected(false);
    setSuspiciousActivity(0);

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
  };

  const changeSnippet = () => {
    resetTest();
    setCurrentSnippetIndex((prev) => (prev + 1) % currentSnippets.length);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!isTestActive) return;
    setInput(e.target.value);
  };

  const handleDifficultyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDifficulty(e.target.value as 'beginner' | 'intermediate' | 'advanced');
    setCurrentSnippetIndex(0);
    resetTest();
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTime(parseInt(e.target.value));
    resetTest();
  };

  return (
    <div className="bg-gray-800 rounded-xl shadow-2xl overflow-hidden border border-gray-700">
      <TestHeader
        language={currentSnippets[currentSnippetIndex].language}
        difficulty={difficulty}
        selectedTime={selectedTime}
        remainingTime={remainingTime}
        isTestActive={isTestActive}
        isTestComplete={isTestComplete}
        handleDifficultyChange={handleDifficultyChange}
        handleTimeChange={handleTimeChange}
      />

      {!showCertificate ? (
        <div className="p-6">
          {!isTestActive && !isTestComplete && (
            <UserNameInput
              userName={userName}
              setUserName={setUserName}
            />
          )}

          <CodeDisplay
            targetText={targetText}
            input={input}
            isTestActive={isTestActive}
            difficulty={difficulty}
          />

          <CodeInput
            input={input}
            handleInputChange={handleInputChange}
            isTestActive={isTestActive}
            isTestComplete={isTestComplete}
            cheatingDetected={cheatingDetected}
            resetTest={resetTest}
          />

          <TestControls
            startTest={startTest}
            resetTest={resetTest}
            changeSnippet={changeSnippet}
            showCertificate={() => setShowCertificate(true)}
            isTestActive={isTestActive}
            isTestComplete={isTestComplete}
            cheatingDetected={cheatingDetected}
            userName={userName}
            wpm={wpm}
            accuracy={accuracy}
            level={level}
          />
        </div>
      ) : (
        <Certificate
          userName={userName}
          wpm={wpm}
          accuracy={accuracy}
          level={level}
          difficulty={difficulty}
          goBack={() => setShowCertificate(false)}
        />
      )}
    </div>
  );
};

export default TypingTest;