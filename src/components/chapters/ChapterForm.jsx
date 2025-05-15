// src/components/chapters/ChapterForm.jsx
import React, { useState } from 'react';

const ChapterForm = ({ onAddChapter }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [genre, setGenre] = useState('');
  const [status, setStatus] = useState('draft');
  const [progress, setProgress] = useState('ongoing');

  const handleSubmit = (e) => {
    e.preventDefault();

    const newChapter = {
      id: Date.now(),
      title,
      content,
      genre,
      status,
      progress,
    };

    onAddChapter(newChapter);

    // Reset form
    setTitle('');
    setContent('');
    setGenre('');
    setStatus('draft');
    setProgress('ongoing');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-6">
      <h2 className="text-lg font-semibold mb-4">Tambah Chapter Baru</h2>

      <div className="mb-3">
        <label className="block font-medium">Judul Chapter</label>
        <input
          type="text"
          className="w-full border p-2 rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div className="mb-3">
        <label className="block font-medium">Isi Cerita</label>
        <textarea
          className="w-full border p-2 rounded"
          rows="4"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label className="block font-medium">Tag Genre</label>
        <input
          type="text"
          className="w-full border p-2 rounded"
          placeholder="Misal: fantasy, romance"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label className="block font-medium">Status</label>
        <select
          className="w-full border p-2 rounded"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>
      </div>

      <div className="mb-3">
        <label className="block font-medium">Progress</label>
        <select
          className="w-full border p-2 rounded"
          value={progress}
          onChange={(e) => setProgress(e.target.value)}
        >
          <option value="ongoing">Ongoing</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded">
        Tambah Chapter
      </button>
    </form>
  );
};

export default ChapterForm;
