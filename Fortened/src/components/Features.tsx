import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Shield, Clock, Code2, Sparkles, RefreshCw } from 'lucide-react';

const features = [
  {
    icon: <Zap className="h-6 w-6 text-indigo-400" />,
    title: 'Instant Analysis',
    description: 'Get immediate feedback on your code with our lightning-fast AI analysis engine.'
  },


  {
    icon: <Sparkles className="h-6 w-6 text-indigo-400" />,
    title: 'Best Practices',
    description: 'Learn industry best practices and improve your coding style with personalized suggestions.'
  },

  {
    icon: <Clock className="h-6 w-6 text-indigo-400" />,
    title: 'Time-saving',
    description: 'Save hours of debugging and refactoring with proactive code quality analysis.'
  }
];

const Features: React.FC = () => {
  return (
    <section id="features" className="py-12 mb-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-white mb-4">Powerful Features</h2>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Our platform offers a comprehensive set of tools to help you write better code.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-indigo-500 transition-all hover:shadow-lg hover:shadow-indigo-500/10"
          >
            <div className="bg-gray-700 rounded-lg p-3 inline-block mb-4">
              {feature.icon}
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
            <p className="text-gray-400">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Features;