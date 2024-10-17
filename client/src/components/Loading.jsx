import React from 'react';
import { useNavigate } from 'react-router-dom';

const Loading = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-purple-200 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-purple-800 mb-6">Welcome to My Blog</h1>
        <p className="text-xl text-purple-600 mb-8">Discover amazing stories and share your own</p>
        <div className="space-x-4">
          <button
            onClick={() => navigate('/login')}
            className="bg-purple-600 text-white px-6 py-2 rounded-full text-lg font-semibold transition duration-300 ease-in-out hover:bg-purple-700 hover:shadow-lg"
          >
            Login
          </button>
          <button
            onClick={() => navigate('/register')}
            className="bg-purple-600 text-white px-6 py-2 rounded-full text-lg font-semibold transition duration-300 ease-in-out hover:bg-purple-700 hover:shadow-lg"
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default Loading;