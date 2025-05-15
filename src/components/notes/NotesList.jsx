import React from 'react';

const NotesList = ({ notes }) => {
  if (notes.length === 0) {
    return <p className="text-gray-600">Belum ada karakter ditambahkan.</p>;
  }

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Daftar Karakter</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {notes.map((note) => (
          <div key={note.id} className="border p-4 rounded shadow">
            {note.image && (
              <img src={note.image} alt={note.name} className="mb-3 rounded h-40 w-full object-cover" />
            )}
            <h3 className="text-xl font-bold">{note.name}</h3>
            <p className="text-sm text-gray-700 mt-1">{note.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotesList;
