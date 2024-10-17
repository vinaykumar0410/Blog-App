import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-700">
      <div className="text-center">
        <h1 className="text-9xl font-bold animate-bounce text-purple-600">404</h1>
        <h2 className="text-3xl font-semibold mt-4">Page Not Found</h2>
        <p className="mt-2 text-lg">Oops! The page you are looking for does not exist.</p>
        <button 
          onClick={() => navigate('/home')}
          className="mt-6 bg-purple-600 text-white px-6 py-2 rounded-lg shadow hover:bg-purple-700 transform hover:scale-105 transition-all duration-200"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default NotFound;
