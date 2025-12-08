import React from "react";
import { ArrowLeft, Home } from "lucide-react";

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="text-center max-w-md w-full">
        {/* Illustration (SVG) */}
        <svg
          className="w-full h-64 mb-8 text-indigo-600 mx-auto"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9 17H15M9 13H15M9 9H15M12 2L2 22H22L12 2Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12 17V17.01"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Replace the above paths with a real illustration, e.g., from undraw.co. 
              Using a simple placeholder triangle icon for now to ensure it works everywhere. */}
          <text
            x="50%"
            y="50%"
            dominantBaseline="middle"
            textAnchor="middle"
            className="text-6xl font-bold fill-current opacity-10"
          >
            404
          </text>
        </svg>

        <p className="text-sm font-semibold text-indigo-600 uppercase tracking-wide">
          404 Error
        </p>
        <h1 className="mt-2 text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
          Page not found.
        </h1>
        <p className="mt-4 text-base text-gray-500">
          Sorry, we couldn’t find the page you’re looking for. It might have
          been moved or deleted.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          {/* Primary Action */}
          <a
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-colors shadow-sm"
          >
            <Home className="w-5 h-5 mr-2" />
            Go back home
          </a>

          {/* Secondary Action */}
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Go back
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
