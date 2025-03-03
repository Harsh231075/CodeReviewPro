import React from "react";
import { motion } from "framer-motion";
import { CopyBlock, dracula } from "react-code-blocks";

interface CodeReviewProps {
  review: string;
}

const CodeReview: React.FC<CodeReviewProps> = ({ review }) => {
  // Function to format review text
  const formatReview = (text: string) => {
    let formattedText = text
      .replace(/^## (.*$)/gim, '<h2 class="text-2xl font-bold text-yellow-400 mt-6 mb-3">$1</h2>') // H2 Headings
      .replace(/^### (.*$)/gim, '<h3 class="text-lg font-semibold text-indigo-400 mt-4 mb-2">$1</h3>') // H3 Headings
      .replace(/- (.*)/g, '<li class="ml-5 text-gray-300 mb-1">$1</li>') // Bullet points
      .replace(/(\d+)\. (.*)/g, '<li class="ml-5 text-gray-300 mb-1"><span class="text-indigo-400 font-medium">$1.</span> $2</li>') // Numbered lists
      .replace(/\*\*(.*?)\*\*/g, '<span class="text-green-400 font-bold">$1</span>') // Bold (Markdown **text**)
      .replace(/\*(.*?)\*/g, '<span class="text-blue-400 italic">$1</span>') // Italic (Markdown *text*)
      .replace(/`(.*?)`/g, '<span class="bg-gray-700 px-1 py-0.5 rounded text-red-400 font-mono">$1</span>') // Inline code (`code`)
      .replace(/\n/g, "<br />"); // Line breaks

    return formattedText;
  };

  // Extract code blocks from review
  const extractCodeBlocks = (text: string) => {
    const codeMatches = text.match(/```([\s\S]*?)```/g); // Match ```code``` blocks
    return codeMatches ? codeMatches.map((block) => block.replace(/```/g, "").trim()) : [];
  };

  const codeBlocks = extractCodeBlocks(review);
  const cleanedReview = review.replace(/```[\s\S]*?```/g, ""); // Remove code blocks from text

  return (
    <div className="p-6 bg-gray-900 text-gray-300 rounded-lg shadow-lg">
      {/* Animated Review Text */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="prose prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: formatReview(cleanedReview) }}
      />

      {/* Render Code Blocks */}
      {codeBlocks.length > 0 && (
        <div className="mt-4">
          {codeBlocks.map((code, index) => (
            <div key={index} className="mb-4">
              <CopyBlock text={code} language="javascript" theme={dracula} showLineNumbers wrapLongLines />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CodeReview;
