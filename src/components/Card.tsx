'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  hover?: boolean;
  delay?: number;
}

export default function Card({ 
  children, 
  className = '', 
  onClick, 
  hover = true,
  delay = 0 
}: CardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={hover ? { y: -5, scale: 1.02 } : {}}
      className={`
        bg-white dark:bg-gray-900 rounded-lg shadow-lg dark:shadow-gray-800/50 p-6 border border-gray-200 dark:border-gray-700
        text-gray-900 dark:text-white
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
}
