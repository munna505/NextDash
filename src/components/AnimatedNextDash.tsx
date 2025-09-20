'use client';

import { useEffect, useState } from 'react';

export default function AnimatedNextDash() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div 
        className={`
          transform transition-all duration-700 ease-out
          ${isVisible 
            ? 'translate-y-0 opacity-100 scale-100' 
            : 'translate-y-8 opacity-0 scale-95'
          }
        `}
      >
        <div className="relative group animate-float">
          {/* Background with glassmorphism effect */}
          <div className="absolute inset-0 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-2xl"></div>
          
          {/* Animated gradient border */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 p-[1px]">
            <div className="w-full h-full bg-gray-900/90 rounded-2xl"></div>
          </div>
          
          {/* Content */}
          <div className="relative px-6 py-4 flex items-center space-x-3">
            {/* Animated icon */}
            <div className="relative">
              <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center">
                <div className="w-4 h-4 bg-white rounded-sm animate-pulse"></div>
              </div>
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg opacity-0 group-hover:opacity-30 transition-opacity duration-300 blur-sm"></div>
            </div>
            
            {/* Text with modern typography */}
            <div className="flex flex-col">
              <span className="text-white font-semibold text-lg tracking-tight">
                NextDash
              </span>
              <span className="text-gray-300 text-xs font-medium tracking-wider uppercase">
                Dashboard
              </span>
            </div>
            
            {/* Status indicator */}
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-green-400 text-xs font-medium">Live</span>
            </div>
          </div>
          
          {/* Hover effect overlay */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-400/0 via-blue-500/0 to-purple-600/0 group-hover:from-cyan-400/10 group-hover:via-blue-500/10 group-hover:to-purple-600/10 transition-all duration-500"></div>
        </div>
      </div>
    </div>
  );
}
