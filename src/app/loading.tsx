import React from 'react';

export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 flex items-center justify-center">
      <div className="flex flex-col items-center">
        <div className="relative w-24 h-24 mb-8">
          {/* Animasyonlu logo */}
          <div className="absolute inset-0 rounded-full bg-blue-500/30 animate-pulse"></div>
          <svg 
            className="relative z-10" 
            width="96" 
            height="96" 
            viewBox="0 0 96 96" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="48" cy="48" r="43" fill="url(#loading-gradient)" />
            <circle 
              cx="48" 
              cy="48" 
              r="33" 
              stroke="white" 
              strokeWidth="2" 
              fill="none" 
              className="animate-[spin_3s_linear_infinite]"
            />
            <circle 
              cx="48" 
              cy="48" 
              r="19" 
              stroke="white" 
              strokeWidth="2" 
              fill="none" 
              className="animate-[spin_2s_linear_infinite_reverse]"
            />
            <circle cx="48" cy="48" r="7" fill="white" />
            <defs>
              <linearGradient 
                id="loading-gradient" 
                x1="0" 
                y1="0" 
                x2="96" 
                y2="96" 
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0%" stopColor="#3B82F6" />
                <stop offset="100%" stopColor="#8B5CF6" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <p className="text-white text-lg font-medium">Yükleniyor...</p>
        <p className="text-gray-400 text-sm mt-2">Pii.Mail deneyiminizi hazırlıyoruz</p>
      </div>
    </div>
  );
} 