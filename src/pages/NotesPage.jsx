import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import NotesForm from '../components/notes/NotesForm';
import NotesList from '../components/notes/NotesList';

const NotesPage = () => {
  const { id } = useParams();
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem(`notes_${id}`);
    if (stored) {
      setNotes(JSON.parse(stored));
    }
  }, [id]);

  useEffect(() => {
    localStorage.setItem(`notes_${id}`, JSON.stringify(notes));
  }, [id, notes]);

  const handleAddNote = (newNote) => {
    setNotes([...notes, newNote]);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">📝 Catatan Karakter Proyek #{id}</h1>
      <Link to={`/projects/${id}`} className="text-blue-500 underline inline-block mb-4">
        ⬅ Kembali ke Detail Proyek
      </Link>
      <NotesForm onAddNote={handleAddNote} />
      <NotesList notes={notes} />
    </div>
  );
};

export default NotesPage;
