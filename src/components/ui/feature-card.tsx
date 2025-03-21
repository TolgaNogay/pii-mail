import React from 'react';
import { motion } from 'framer-motion';

interface FeatureCardProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, icon }) => {
  return (
    <motion.div 
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm p-6 rounded-xl border border-gray-800 hover:border-blue-500/30 transition-all group"
    >
      {icon && (
        <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-400 mb-5 group-hover:bg-blue-500/30 transition-all">
          {icon}
        </div>
      )}
      <h3 className="text-xl font-bold mb-3 text-white group-hover:text-blue-400 transition-all">{title}</h3>
      <p className="text-gray-400 group-hover:text-gray-300 transition-all">
        {description}
      </p>
    </motion.div>
  );
};

export default FeatureCard; 