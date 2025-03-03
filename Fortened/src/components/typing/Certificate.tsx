import React, { useRef } from 'react';
import { Trophy, Download, Award, CheckCircle } from 'lucide-react';
import html2canvas from 'html2canvas';

interface CertificateProps {
  userName: string;
  wpm: number | null;
  accuracy: number | null;
  level: string;
  difficulty: string;
  goBack: () => void;
}

const Certificate: React.FC<CertificateProps> = ({
  userName,
  wpm,
  accuracy,
  level,
  difficulty,
  goBack
}) => {
  const certificateRef = useRef<HTMLDivElement>(null);
  const completionThreshold = 80; // Minimum percentage of code that must be completed

  // Calculate completion percentage based on WPM and accuracy
  const isEligibleForCertificate = () => {
    return wpm !== null && accuracy !== null && accuracy >= completionThreshold;
  };

  const downloadCertificate = () => {
    if (!certificateRef.current) return;

    html2canvas(certificateRef.current).then(canvas => {
      const link = document.createElement('a');
      link.download = `CodeReviewPro_Certificate_${userName.replace(/\s+/g, '_')}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    });
  };

  if (!isEligibleForCertificate()) {
    return (
      <div className="p-6">
        <div className="text-center py-10 px-4">
          <div className="bg-amber-500/20 rounded-full p-4 inline-flex mb-4">
            <Award className="h-12 w-12 text-amber-400" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-4">Certificate Not Available</h3>
          <p className="text-gray-300 mb-6 max-w-md mx-auto">
            You need to complete at least {completionThreshold}% of the code accurately to earn a certificate.
            Keep practicing to improve your coding speed and accuracy!
          </p>
          <button
            onClick={goBack}
            className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-all"
          >
            Back to Results
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6">
      <div className="mb-4 flex flex-col md:flex-row justify-between items-center gap-4">
        <h3 className="text-xl font-bold text-white flex items-center">
          <Trophy className="h-5 w-5 text-yellow-400 mr-2" />
          Your Achievement Certificate
        </h3>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={downloadCertificate}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-all flex items-center"
          >
            <Download className="mr-2 h-4 w-4" />
            Download Certificate
          </button>
          <button
            onClick={goBack}
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-medium transition-all"
          >
            Back to Results
          </button>
        </div>
      </div>

      <div
        ref={certificateRef}
        className="bg-white p-6 md:p-10 rounded-lg border border-gray-200 shadow-2xl max-w-4xl mx-auto"
      >
        {/* Certificate Header */}
        <div className="flex justify-between items-start mb-8">
          <div className="flex items-center">
            <div className="bg-indigo-600 p-2 rounded-lg mr-3">
              <Trophy className="h-6 w-6 text-white" />
            </div>
            <div>
              <h4 className="text-gray-900 font-bold text-lg">CodeReviewPro</h4>
              <p className="text-gray-500 text-sm">Coding Excellence Platform</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-gray-500 text-sm">Certificate ID: CR-{Math.floor(Math.random() * 10000).toString().padStart(4, '0')}</p>
            <p className="text-gray-500 text-sm">Date: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
          </div>
        </div>

        {/* Certificate Title */}
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Certificate of Achievement</h2>
          <div className="h-1 w-32 bg-indigo-600 mx-auto"></div>
          <p className="text-indigo-600 mt-2 font-medium">Coding Speed Proficiency</p>
        </div>

        {/* Certificate Body */}
        <div className="text-center mb-8">
          <p className="text-xl text-gray-700 mb-2">This certifies that</p>
          <h3 className="text-3xl font-bold text-indigo-700 mb-2 border-b-2 border-indigo-200 pb-2 inline-block px-4">{userName}</h3>
          <p className="text-xl text-gray-700 mt-2">has successfully demonstrated coding proficiency in</p>
          <p className="text-xl font-semibold text-indigo-600 mt-1">{difficulty.charAt(0).toUpperCase() + difficulty.slice(1)} Level {currentSnippets[difficulty][0].language} Programming</p>
        </div>

        {/* Achievement Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-gray-50 p-4 rounded-lg text-center border border-gray-200">
            <p className="text-gray-600 mb-1 text-sm">Typing Speed</p>
            <p className="text-2xl font-bold text-emerald-600">{wpm} WPM</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg text-center border border-gray-200">
            <p className="text-gray-600 mb-1 text-sm">Accuracy</p>
            <p className="text-2xl font-bold text-indigo-600">{accuracy}%</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg text-center border border-gray-200">
            <p className="text-gray-600 mb-1 text-sm">Achievement Level</p>
            <p className="text-2xl font-bold text-amber-600">{level}</p>
          </div>
        </div>

        {/* Certificate Footer with Signature */}
        <div className="flex flex-col md:flex-row justify-between items-end mt-10 pt-6 border-t border-gray-200">
          <div className="mb-4 md:mb-0">
            <div className="flex items-center mb-2">
              <CheckCircle className="h-5 w-5 text-emerald-600 mr-2" />
              <span className="text-gray-700 font-medium">Verified Achievement</span>
            </div>
            <p className="text-gray-500 text-sm">This certificate validates the holder's coding speed and accuracy.</p><br />
            <p className="text-gray-500 text-sm">Write Excalty same code with eqaul space.</p>
          </div>

          <div className="text-center">
            <div className="mb-1">
              <svg width="120" height="60" viewBox="0 0 120 60" className="mx-auto">
                <path d="M10,40 C20,20 30,50 40,30 C50,10 60,40 70,20 C80,40 90,10 110,30"
                  stroke="#4338ca"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round" />
              </svg>
            </div>
            <div className="h-px w-full bg-gray-300 mb-1"></div>
            <p className="text-gray-900 font-bold">Harsh singh baghel</p>
            <p className="text-gray-600 text-sm">CEO, CodeReviewPro</p>
          </div>
        </div>

        {/* Certificate Seal */}
        <div className="absolute bottom-6 right-10 opacity-20">
          <div className="rounded-full h-32 w-32 border-4 border-indigo-600 flex items-center justify-center">
            <Trophy className="h-16 w-16 text-indigo-600" />
          </div>
        </div>
      </div>
    </div>
  );
};

// Import code snippets to check language
import codeSnippets from './codeSnippets';
const currentSnippets = codeSnippets;

export default Certificate;