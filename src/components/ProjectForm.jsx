import React, { useState } from 'react';

const ProjectForm = ({ onAdd }) => {
  const [title, setTitle] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title) return;
    onAdd({ title });
    setTitle('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        placeholder="Judul proyek"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border px-2 py-1 rounded"
      />
      <button type="submit" className="bg-blue-600 text-white px-4 py-1 rounded">
        Tambah
      </button>
    </form>
  );
};

export default ProjectForm;
