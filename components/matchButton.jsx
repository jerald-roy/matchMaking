// app/components/MatchButton.jsx
'use client';

import React, { useState } from 'react';

export default function MatchButton({ candidateName }) {
  const [clicked, setClicked] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleClick = () => {
    setClicked(true);
    setShowToast(true);

    // Automatically hide the toast after 3 seconds
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  return (
    <div className="relative w-full">
      {/* Toast Notification Banner on top of the UI */}
      {showToast && (
        <div className="absolute -top-12 left-0 right-0 bg-slate-900 text-white text-xs py-1.5 px-3 rounded-lg shadow-lg flex items-center justify-between z-20 transition-all">
          <span>Match proposal sent to {candidateName}!</span>
          <span className="text-emerald-400 font-bold">✓</span>
        </div>
      )}

      {/* Simple Blue Button */}
      <button
        onClick={handleClick}
        disabled={clicked}
        className={`w-full py-2 px-4 rounded-xl text-sm font-medium transition-colors duration-150 flex items-center justify-center gap-2 cursor-pointer ${
          clicked
            ? 'bg-emerald-600 text-white cursor-default'
            : 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm'
        }`}
      >
        {clicked ? 'Match Sent' : 'Send Match'}
      </button>
    </div>
  );
}