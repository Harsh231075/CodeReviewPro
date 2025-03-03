import { useState } from 'react';
import { motion } from 'framer-motion';
import { Code, Send, CheckCircle, Loader2, ArrowRight, Sparkles, Keyboard } from 'lucide-react';
import CodeEditor from './components/CodeEditor';
import CodeReview from './components/CodeReview';
import Header from './components/Header';
import Footer from './components/Footer';
import Features from './components/Features';
import TypingTest from './components/TypingTest';
import axios from 'axios';


function App() {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState<string>('javascript');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [review, setReview] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<'home' | 'review' | 'typing'>('home');

  const handleSubmit = async () => {
    if (!code.trim()) return;

    setIsLoading(true);

    try {
      console.log(code);
      const response = await axios.post('http://localhost:3000/ai/get-review', { code });
      console.log(response);

      if (response.data) {
        setReview(response.data);
        setActiveSection('review');
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (error) {
      console.error('Error submitting code for review:', error);
      setReview('Error: Could not fetch review. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setCode('');
    setReview(null);
    setActiveSection('home');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-8">
        {activeSection === 'home' && (
          <>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 ">
                Elevate Your Code with <span className="text-indigo-400">Expert Reviews</span>
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Our AI-powered platform provides detailed code reviews to help you write cleaner,
                more efficient, and more maintainable code.
              </p>

              <motion.div
                className="mt-8 flex flex-wrap justify-center gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <button
                  onClick={() => document.getElementById('code-editor')?.scrollIntoView({ behavior: 'smooth' })}
                  className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium flex items-center transition-all shadow-lg hover:shadow-indigo-500/30"
                >
                  Get Started <ArrowRight className="ml-2 h-5 w-5" />
                </button>
                <button
                  onClick={() => setActiveSection('typing')}
                  className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium flex items-center transition-all shadow-lg hover:shadow-emerald-500/30"
                >
                  Typing Test <Keyboard className="ml-2 h-5 w-5" />
                </button>
                <a
                  href="#features"
                  className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-medium flex items-center transition-all"
                >
                  Learn More
                </a>
              </motion.div>
            </motion.div>

            <Features />

            <motion.div
              id="code-editor"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="bg-gray-800 rounded-xl shadow-2xl overflow-hidden border border-gray-700 max-w-5xl mx-auto"
            >
              <div className="bg-gray-900 px-6 py-4 border-b border-gray-700 flex justify-between items-center">
                <div className="flex items-center">
                  <Code className="h-5 w-5 text-indigo-400 mr-2" />
                  <h2 className="text-lg font-semibold text-white">Code Editor</h2>
                </div>
                <div className="flex items-center space-x-3">
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="bg-gray-700 text-gray-200 rounded px-3 py-1 text-sm border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="javascript">JavaScript</option>
                    <option value="typescript">TypeScript</option>
                    <option value="python">Python</option>
                    <option value="java">Java</option>
                    <option value="csharp">C#</option>
                    <option value="php">PHP</option>
                    <option value="go">Go</option>
                    <option value="ruby">Ruby</option>
                  </select>
                </div>
              </div>

              <CodeEditor
                code={code}
                setCode={setCode}
                language={language}
              />

              <div className="bg-gray-900 px-6 py-4 border-t border-gray-700 flex justify-between items-center">
                <div className="text-sm text-gray-400">
                  {code ? `${code.split('\n').length} lines` : 'Paste or type your code here'}
                </div>
                <button
                  onClick={handleSubmit}
                  disabled={!code.trim() || isLoading}
                  className={`px-4 py-2 rounded-lg font-medium flex items-center transition-all ${!code.trim() || isLoading
                    ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                    : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg hover:shadow-indigo-500/30'
                    }`}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Submit for Review
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </>
        )}

        {activeSection === 'review' && review && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-5xl mx-auto"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white flex items-center">
                <Sparkles className="h-6 w-6 text-indigo-400 mr-2" />
                Code Review Results
              </h2>
              <div className="flex space-x-3">
                <button
                  onClick={() => setActiveSection('typing')}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition-all flex items-center"
                >
                  <Keyboard className="mr-2 h-4 w-4" />
                  Try Typing Test
                </button>
                <button
                  onClick={handleReset}
                  className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-medium transition-all"
                >
                  New Review
                </button>
              </div>
            </div>

            <div className="bg-gray-800 rounded-xl shadow-2xl overflow-hidden border border-gray-700">
              <div className="bg-gray-900 px-6 py-4 border-b border-gray-700 flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                <h3 className="text-lg font-semibold text-white">Analysis Complete</h3>
              </div>

              <CodeReview review={review} />
            </div>
          </motion.div>
        )}

        {activeSection === 'typing' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-5xl mx-auto"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white flex items-center">
                <Keyboard className="h-6 w-6 text-emerald-400 mr-2" />
                Typing Speed Test
              </h2>
              <button
                onClick={handleReset}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-medium transition-all"
              >
                Back to Home
              </button>
            </div>

            <TypingTest />
          </motion.div>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default App;