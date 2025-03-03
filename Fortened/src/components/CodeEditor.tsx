import React, { useRef, useEffect } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';

interface CodeEditorProps {
  code: string;
  setCode: (code: string) => void;
  language: string;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ code, setCode, language }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const highlighterRef = useRef<HTMLDivElement>(null);

  // Sync scroll between textarea and syntax highlighter
  useEffect(() => {
    const textarea = textareaRef.current;
    const highlighter = highlighterRef.current;

    if (!textarea || !highlighter) return;

    const handleScroll = () => {
      highlighter.scrollTop = textarea.scrollTop;
      highlighter.scrollLeft = textarea.scrollLeft;
    };

    textarea.addEventListener('scroll', handleScroll);
    return () => textarea.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative border border-gray-700 rounded-md overflow-hidden bg-gray-900">
      <textarea
        ref={textareaRef}
        value={code}
        onChange={(e) => setCode(e.target.value)}
        className="w-full h-96 p-4 font-mono text-sm resize-none focus:outline-none absolute top-0 left-0 z-10 text-transparent caret-white bg-transparent"
        placeholder="// Paste or type your code here..."
        spellCheck="false"
      />
      <div
        ref={highlighterRef}
        className="w-full h-96 overflow-auto pointer-events-none"
      >
        <SyntaxHighlighter
          language={language}
          style={atomOneDark}
          customStyle={{
            padding: '1rem',
            height: '100%',
            margin: 0,
            background: 'transparent',
          }}
          wrapLines={true}
        >
          {code || ' '}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};

export default CodeEditor;