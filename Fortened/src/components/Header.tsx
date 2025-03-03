import React from 'react';
import { motion } from 'framer-motion';
import { Code, Github } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-900 border-b border-gray-800 sticky top-0 z-50"
    >
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <div className="bg-indigo-600 p-2 rounded-lg mr-3">
            <Code className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-2xl  font-bold text-white">CodeReviewPro</h1>
        </div>

        {/* <nav className="hidden md:flex items-center space-x-8">
          <a href="#features" className="text-gray-300 hover:text-white transition-colors">Features</a>
          <a href="#pricing" className="text-gray-300 hover:text-white transition-colors">Pricing</a>
          <a href="#docs" className="text-gray-300 hover:text-white transition-colors">Documentation</a>
        </nav> */}

        {/* <div className="flex items-center space-x-4">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors"
          >
            <Github className="h-5 w-5" />
          </a>
          <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-all">
            Sign In
          </button>
        </div> */}
      </div>
    </motion.header>
  );
};

export default Header;