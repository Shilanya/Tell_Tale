// src/pages/HomePage.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-white">
      <h1 className="text-5xl font-bold mb-8">📚 Tell Tale</h1>
      <Link
        to="/projects"
        className="bg-indigo-600 text-white px-6 py-3 rounded text-lg hover:bg-indigo-700 transition"
      >
        Mulai
      </Link>
    </div>
  );
};

export default HomePage;
