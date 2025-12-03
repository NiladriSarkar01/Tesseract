import React from 'react';

const TesseractRibbon = () => {
  return (
    <div className="ribbon-container bg-[#081414]/30 border-y border-cyan-700/50 py-4 md:py-6 relative z-10">
      
      {/* CSS for Ribbon Animation (Inline Style Block) */}
      {/* This block MUST be included with the component to ensure the animation works */}
      <style>
        {`
          @keyframes scroll-right-to-left {
            0% { transform: translate3d(0, 0, 0); }
            100% { transform: translate3d(-50%, 0, 0); }
          }
          .ribbon-container {
            overflow: hidden;
            white-space: nowrap;
          }
          .ribbon-content {
            display: inline-block;
            animation: scroll-right-to-left 30s linear infinite;
            padding-right: 5vw; /* Space between duplicated content */
          }
          .ribbon-text {
            font-size: 4rem; /* Large text size for impact */
            font-weight: 900;
            line-height: 1;
            padding: 0 1rem;
            display: inline-block;
            transform: skewY(-2deg); /* Added a slight skew for style */
          }
          .ribbon-outline {
            color: transparent;
            -webkit-text-stroke: 1px oklch(70.7% 0.165 254.624); /* red outline */
            text-stroke: 1px #ef4444;
          }

          /* Responsive adjustments */
          @media (max-width: 768px) {
            .ribbon-text {
              font-size: 2.5rem;
            }
          }
        `}
      </style>

      {/* Ribbon Content - Scrollable container */}
      <div className="ribbon-content">
        {/* Duplicated content for infinite scroll effect */}
        {[...Array(5)].map((_, index) => (
          <span key={index}>
            <span className="ribbon-text text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-500 uppercase tracking-widest">TESSERACT RELOADED</span>
            <span className="ribbon-text ribbon-outline uppercase tracking-widest">TESSERACT RELOADED</span>
          </span>
        ))}
      </div>
      {/* Duplicate the content div for seamless looping */}
      <div className="ribbon-content">
        {[...Array(5)].map((_, index) => (
          <span key={index + 5}>
            <span className="ribbon-text text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-500 uppercase tracking-widest">TESSERACT RELOADED</span>
            <span className="ribbon-text ribbon-outline uppercase tracking-widest">TESSERACT RELOADED</span>
          </span>
        ))}
      </div>
    </div>
  );
};

export default TesseractRibbon;
