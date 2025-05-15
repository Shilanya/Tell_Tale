import React, { useState } from 'react';

const NotesForm = ({ onAddNote }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newNote = {
      id: Date.now(),
      name,
      description,
      image: image ? URL.createObjectURL(image) : null,
    };

    onAddNote(newNote);

    // Reset form
    setName('');
    setDescription('');
    setImage(null);
    e.target.reset();
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-6">
      <h2 className="text-lg font-semibold mb-4">Tambah Karakter</h2>

      <div className="mb-3">
        <label className="block font-medium">Nama Karakter</label>
        <input
          type="text"
          className="w-full border p-2 rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div className="mb-3">
        <label className="block font-medium">Deskripsi</label>
        <textarea
          className="w-full border p-2 rounded"
          rows="3"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label className="block font-medium">Upload Gambar (opsional)</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />
      </div>

      <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
        Simpan Karakter
      </button>
    </form>
  );
};

export default NotesForm;
