'use client';

import { motion } from 'framer-motion';

interface ErrorProps {
  message: string;
  onRetry?: () => void;
}

export default function Error({ message, onRetry }: ErrorProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-red-50 border border-red-200 rounded-lg p-4 text-center"
    >
      <div className="text-red-600 font-medium mb-2">Error</div>
      <div className="text-red-500 text-sm mb-3">{message}</div>
      {onRetry && (
        <button
          onClick={onRetry}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
        >
          Try Again
        </button>
      )}
    </motion.div>
  );
}
