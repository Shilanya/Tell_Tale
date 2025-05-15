// src/components/chapters/ChapterList.jsx
import React from 'react';

const ChapterList = ({ chapters }) => {
  if (chapters.length === 0) {
    return <p className="text-gray-600">Belum ada chapter ditambahkan.</p>;
  }

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Daftar Chapter</h2>
      <ul className="space-y-4">
        {chapters.map((chapter) => (
          <li key={chapter.id} className="border p-4 rounded shadow">
            <h3 className="text-xl font-bold">{chapter.title}</h3>
            <p className="text-sm text-gray-700 mt-1 mb-2">{chapter.content.slice(0, 100)}...</p>
            <div className="text-sm text-gray-500">
              Genre: {chapter.genre || '–'} | Status: {chapter.status} | Progress: {chapter.progress}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChapterList;
