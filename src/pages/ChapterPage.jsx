import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import ChapterForm from '../components/chapters/ChapterForm';
import ChapterList from '../components/chapters/ChapterList';

const ChapterPage = () => {
  const { id } = useParams();
  const [chapters, setChapters] = useState([]);

  // Load dari localStorage
  useEffect(() => {
    const stored = localStorage.getItem(`chapters_${id}`);
    if (stored) {
      setChapters(JSON.parse(stored));
    }
  }, [id]);

  // Simpan ke localStorage tiap kali berubah
  useEffect(() => {
    localStorage.setItem(`chapters_${id}`, JSON.stringify(chapters));
  }, [id, chapters]);

  const handleAddChapter = (newChapter) => {
    setChapters([...chapters, newChapter]);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">📖 Chapter Proyek #{id}</h1>
      <Link to={`/projects/${id}`} className="text-blue-500 underline inline-block mb-4">
        ⬅ Kembali ke Detail Proyek
      </Link>
      <ChapterForm onAddChapter={handleAddChapter} />
      <ChapterList chapters={chapters} />
    </div>
  );
};

export default ChapterPage;
